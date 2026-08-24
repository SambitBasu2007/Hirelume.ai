/**
 * Pure text-extraction logic — no HTTP, no Next.js, just parsing.
 * Kept separate so it can be unit-tested independently.
 */

import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export type ExtractionResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

/**
 * Extracts plain text from a PDF Buffer.
 */
export async function extractFromPdf(buffer: Buffer): Promise<ExtractionResult> {
  try {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    const text = result.text?.trim() ?? '';
    await parser.destroy();
    return { ok: true, text };
  } catch (err) {
    console.error('[extract-text] PDF parse error:', err);
    return { ok: false, error: 'Failed to parse PDF file.' };
  }
}

/**
 * Extracts plain text from a DOCX Buffer using mammoth.
 */
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

/**
 * Minimum character threshold to consider a document text-extractable.
 * Below this, the file is likely a scanned/image PDF.
 */
export const SCANNED_PDF_THRESHOLD = 100;

export function isLikelyScanned(text: string): boolean {
  return text.replace(/\s+/g, '').length < SCANNED_PDF_THRESHOLD;
}
