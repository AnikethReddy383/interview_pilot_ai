import { extractTextFromBuffer } from '../../utils/textExtractor'

export async function extractStage(
  arrayBuffer: ArrayBuffer,
  fileName: string,
  mimeType: string,
): Promise<string> {
  return extractTextFromBuffer(arrayBuffer, fileName, mimeType)
}
