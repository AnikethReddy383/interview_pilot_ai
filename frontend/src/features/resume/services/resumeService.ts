import { supabase } from '../../../lib/supabase'
import { BUCKET_NAME, RESUME_STATUS } from '../constants/resumeConstants'
import type { ResumeMetadata } from '../types'
import { getResumeStoragePath } from '../utils/storage'

class ResumeService {
  /**
   * Fetches active resume metadata for the given user.
   */
  async fetchResume(userId: string): Promise<ResumeMetadata | null> {
    if (!supabase) {
      throw new Error('Supabase client is not configured.')
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      throw new Error(`Failed to fetch resume metadata: ${error.message}`)
    }

    return data as ResumeMetadata | null
  }

  /**
   * Uploads resume file to Supabase Storage and inserts or updates metadata record.
   * If replacing, increments version and overwrites/removes stale storage files.
   */
  async uploadResume(
    userId: string,
    file: File,
    fileHash: string,
    existingResume?: ResumeMetadata | null,
  ): Promise<ResumeMetadata> {
    if (!supabase) {
      throw new Error('Supabase client is not configured.')
    }

    const storagePath = getResumeStoragePath(userId, file.name)

    // If replacing and previous file extension changed (e.g. .pdf -> .docx), delete old path
    if (existingResume && existingResume.storage_path !== storagePath) {
      await supabase.storage.from(BUCKET_NAME).remove([existingResume.storage_path])
    }

    // 1. Upload to Supabase Storage (upsert = true for overwriting deterministic path)
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      })

    if (uploadError) {
      if (
        uploadError.message?.toLowerCase().includes('bucket not found') ||
        uploadError.message?.toLowerCase().includes('not_found') ||
        uploadError.message?.toLowerCase().includes('resource was not found')
      ) {
        throw new Error(
          `Storage bucket '${BUCKET_NAME}' does not exist in Supabase. Please create a bucket named '${BUCKET_NAME}' in your Supabase Dashboard under Storage -> New bucket.`,
        )
      }
      throw new Error(`Storage upload failed: ${uploadError.message}`)
    }

    // 2. Prepare metadata record
    const version = existingResume ? existingResume.version + 1 : 1

    const payload = {
      user_id: userId,
      file_name: file.name,
      storage_path: storagePath,
      file_size: file.size,
      mime_type: file.type,
      file_hash: fileHash,
      version,
      updated_at: new Date().toISOString(),
      status: RESUME_STATUS.UPLOADED,
    }

    // 3. Upsert database record (unique user_id key)
    const { data, error: dbError } = await supabase
      .from('resumes')
      .upsert(payload, { onConflict: 'user_id' })
      .select('*')
      .single()

    if (dbError) {
      if (
        dbError.message?.includes("Could not find the 'file_hash' column") ||
        dbError.message?.includes('schema cache')
      ) {
        throw new Error(
          `Database schema mismatch: The 'file_hash' column is missing in the 'resumes' table. Please run the updated SQL migration (202607220004_m5_resumes.sql) in your Supabase SQL Editor to add missing columns.`,
        )
      }
      throw new Error(`Database record save failed: ${dbError.message}`)
    }

    return data as ResumeMetadata
  }

  /**
   * Deletes resume file from Supabase Storage and deletes database metadata record.
   */
  async deleteResume(userId: string, resumeId: string, storagePath: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase client is not configured.')
    }

    // 1. Delete file from Storage
    const { error: storageError } = await supabase.storage.from(BUCKET_NAME).remove([storagePath])

    if (storageError) {
      throw new Error(`Storage deletion failed: ${storageError.message}`)
    }

    // 2. Delete database record
    const { error: dbError } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('user_id', userId)

    if (dbError) {
      throw new Error(`Database record deletion failed: ${dbError.message}`)
    }
  }

  /**
   * Generates a signed download / preview URL for the resume file.
   */
  async getDownloadUrl(storagePath: string): Promise<string> {
    if (!supabase) {
      throw new Error('Supabase client is not configured.')
    }

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(storagePath, 3600)

    if (error) {
      throw new Error(`Failed to generate signed URL: ${error.message}`)
    }

    return data.signedUrl
  }
}

export const resumeService = new ResumeService()
