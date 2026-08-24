import mammoth from 'mammoth';

// pdf-parse v2 uses CommonJS export
const pdfParse = require('pdf-parse');

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