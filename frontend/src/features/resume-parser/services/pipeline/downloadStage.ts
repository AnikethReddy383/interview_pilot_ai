import { supabase } from '../../../../lib/supabase'

export async function downloadStage(storagePath: string): Promise<ArrayBuffer> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.')
  }

  const { data, error } = await supabase.storage.from('resumes').download(storagePath)

  if (error || !data) {
    throw new Error(`Failed to download resume from storage: ${error?.message || 'Empty file received'}`)
  }

  return await data.arrayBuffer()
}
