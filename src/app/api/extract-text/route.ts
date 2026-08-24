import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { fileTypeFromBuffer } from 'file-type';
import {
  extractFromPdf,
  extractFromDocx,
  isLikelyScanned,
} from '@/lib/extract-text';
import { MAX_FILE_SIZE_BYTES, ALLOWED_MIME_TYPES, ACCEPTED_EXTENSIONS_SET } from '@/lib/validation';

// ── Rate limiter (#5) ─────────────────────────────────────────────────────────
// 20 requests per minute per IP. For production, use a Redis-backed limiter.
const rateLimiter = new RateLimiterMemory({
  points: 20,
  duration: 60,
});

// ── CORS configuration (#9) ───────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

// ── Route handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);

  // ── Rate limit (#5) ────────────────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'anonymous';

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Request must be multipart/form-data.' },
      { status: 400, headers },
    );
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file provided. Send a "file" field in the form data.' },
      { status: 400, headers },
    );
  }

  // ── 1. Size check ──────────────────────────────────────────────────────────
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: `File too large. Maximum allowed size is 5 MB (received ${(file.size / 1024 / 1024).toFixed(1)} MB).` },
      { status: 413, headers },
    );
  }

  // ── 2. Extension check ─────────────────────────────────────────────────────
  const fileName = file.name ?? '';
  const ext = '.' + fileName.split('.').pop()?.toLowerCase();
  if (!ACCEPTED_EXTENSIONS_SET.has(ext)) {
    return NextResponse.json(
      { error: `Unsupported file type "${ext}". Please upload a PDF or DOCX file.` },
      { status: 415, headers },
    );
  }

  // ── 3. MIME type check ─────────────────────────────────────────────────────
  const mimeType = file.type;
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: `Unsupported MIME type "${mimeType}". Only PDF and DOCX files are accepted.` },
      { status: 415, headers },
    );
  }

  // ── 4. Read into buffer ────────────────────────────────────────────────────
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // ── 5. Magic byte validation (#6) ──────────────────────────────────────────
  const detected = await fileTypeFromBuffer(buffer);
  const isPdf = mimeType === 'application/pdf';

  if (isPdf) {
    // file-type may return null for some valid PDFs; also check magic bytes manually
    const pdfMagic = buffer[0] === 0x25 && buffer[1] === 0x50; // %P
    if (!pdfMagic && (!detected || detected.mime !== 'application/pdf')) {
      return NextResponse.json(
        { error: 'File content does not match a valid PDF. Please upload a genuine PDF file.' },
        { status: 415, headers },
      );
    }
  } else {
    // DOCX is a ZIP-based format
    const zipMagic = buffer[0] === 0x50 && buffer[1] === 0x4b; // PK
    if (!zipMagic && (!detected || !detected.mime.includes('zip'))) {
      return NextResponse.json(
        { error: 'File content does not match a valid DOCX. Please upload a genuine DOCX file.' },
        { status: 415, headers },
      );
    }
  }

  // ── 6. Extract based on MIME ───────────────────────────────────────────────
  const result = isPdf
    ? await extractFromPdf(buffer)
    : await extractFromDocx(buffer);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500, headers });
  }

  const { text } = result;
  const likelyScanned = isPdf && isLikelyScanned(text);

  // ── 7. Validate extracted text is reasonable (#7) ──────────────────────────
  // Check for binary garbage: if non-printable characters exceed 10%, reject
  const nonPrintable = text.replace(/[\x20-\x7E\x0A\x0D\x09]/g, '').length;
  const nonPrintableRatio = text.length > 0 ? nonPrintable / text.length : 0;
  if (nonPrintableRatio > 0.1 && text.length > 0) {
    return NextResponse.json(
      { error: 'Extracted content appears to contain binary data. The file may be corrupted or not a valid document.' },
      { status: 422, headers },
    );
  }

  return NextResponse.json(
    {
      text,
      charCount: text.length,
      likelyScanned,
    },
    { headers },
  );
}
