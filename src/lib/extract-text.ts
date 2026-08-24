const pdfParse = require('pdf-parse');
import mammoth from 'mammoth';

export type ExtractionResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

export async function extractFromPdf(buffer: Buffer): Promise<ExtractionResult> {
  try {
    const result = await pdfParse(buffer);
    const text = result.text?.trim() ?? '';
    return { ok: true, text };
  } catch (err) {
    console.error('[extract-text] PDF parse error:', err);
    return { ok: false, error: 'Failed to parse PDF file.' };
  }
}

export async function extractFromDocx(buffer: Buffer): Promise<ExtractionResult> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim() ?? '';
    return { ok: true, text };
  } catch (err) {
    console.error('[extract-text] DOCX parse error:', err);
    return { ok: false, error: 'Failed to parse DOCX file.' };
  }
}

export const SCANNED_PDF_THRESHOLD = 100;

export function isLikelyScanned(text: string): boolean {
  return text.replace(/\s+/g, '').length < SCANNED_PDF_THRESHOLD;
}