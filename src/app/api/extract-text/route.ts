import { NextRequest, NextResponse } from 'next/server';
import {
  extractFromPdf,
  extractFromDocx,
  isLikelyScanned,
} from '@/lib/extract-text';

// ── Constants ──────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.docx']);

// ── Route handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let formData: FormData;

  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Request must be multipart/form-data.' },
      { status: 400 },
    );
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file provided. Send a "file" field in the form data.' },
      { status: 400 },
    );
  }

  // ── 1. Size check ────────────────────────────────────────────────────────────
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: `File too large. Maximum allowed size is 5 MB (received ${(file.size / 1024 / 1024).toFixed(1)} MB).` },
      { status: 413 },
    );
  }

  // ── 2. Extension check ───────────────────────────────────────────────────────
  const fileName = file.name ?? '';
  const ext = '.' + fileName.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: `Unsupported file type "${ext}". Please upload a PDF or DOCX file.` },
      { status: 415 },
    );
  }

  // ── 3. MIME type check (primary security gate) ───────────────────────────────
  const mimeType = file.type;
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: `Unsupported MIME type "${mimeType}". Only PDF and DOCX files are accepted.` },
      { status: 415 },
    );
  }

  // ── 4. Read into buffer ──────────────────────────────────────────────────────
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // ── 5. Extract based on MIME ─────────────────────────────────────────────────
  const isPdf = mimeType === 'application/pdf';
  const result = isPdf
    ? await extractFromPdf(buffer)
    : await extractFromDocx(buffer);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  const { text } = result;
  const likelyScanned = isPdf && isLikelyScanned(text);

  return NextResponse.json({
    text,
    charCount: text.length,
    likelyScanned,
  });
}
