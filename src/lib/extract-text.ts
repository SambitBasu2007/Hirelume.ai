import mammoth from 'mammoth';
import PDFParser from 'pdf2json';

export type ExtractionResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

/** Timeout for PDF parsing to prevent hanging on malformed files (#3). */
const PDF_PARSE_TIMEOUT_MS = 30_000; // 30 seconds

export async function extractFromPdf(buffer: Buffer): Promise<ExtractionResult> {
  return new Promise((resolve) => {
    const pdfParser = new PDFParser();

    let settled = false;

    const settle = (result: ExtractionResult) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    pdfParser.on('pdfParser_dataReady', () => {
      try {
        const rawText = pdfParser.getRawTextContent();
        const text = rawText?.trim() ?? '';
        settle({ ok: true, text });
      } catch {
        settle({ ok: false, error: 'Failed to parse PDF file.' });
      }
    });

    pdfParser.on('pdfParser_dataError', (err: unknown) => {
      // #8: Don't log raw error objects that may contain sensitive internals
      const message = err instanceof Error ? err.message : 'Unknown PDF error';
      console.error('[extract-text] PDF data error:', message);
      settle({ ok: false, error: 'Failed to parse PDF file.' });
    });

    // #3: Timeout guard — reject if parsing hangs
    const timeout = setTimeout(() => {
      settle({ ok: false, error: 'PDF parsing timed out. The file may be malformed or too large.' });
    }, PDF_PARSE_TIMEOUT_MS);

    try {
      pdfParser.parseBuffer(buffer);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown PDF error';
      console.error('[extract-text] PDF parse exception:', message);
      settle({ ok: false, error: 'Failed to parse PDF file.' });
    } finally {
      clearTimeout(timeout);
    }
  });
}

export async function extractFromDocx(buffer: Buffer): Promise<ExtractionResult> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim() ?? '';
    return { ok: true, text };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown DOCX error';
    console.error('[extract-text] DOCX parse error:', message);
    return { ok: false, error: 'Failed to parse DOCX file.' };
  }
}

// #18: Increased from 100 to 300 to avoid false positives on sparse documents
export const SCANNED_PDF_THRESHOLD = 300;

export function isLikelyScanned(text: string): boolean {
  return text.replace(/\s+/g, '').length < SCANNED_PDF_THRESHOLD;
}
