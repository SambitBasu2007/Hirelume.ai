// ── Shared file validation constants ──────────────────────────────────────────
// Used by both the client-side FileUploader and the server-side API route.

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_FILE_SIZE_MB = MAX_FILE_SIZE_BYTES / 1024 / 1024;

export const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export const ALLOWED_EXTENSIONS = /(\.pdf|\.docx)$/i;

export const ACCEPTED_EXTENSIONS_SET = new Set(['.pdf', '.docx']);

/**
 * Shared server-side validation for an uploaded file.
 * Returns null if valid, or an error message string if invalid.
 */
export function validateUploadedFile(file: File): string | null {
  // Extension check
  const fileName = file.name ?? '';
  const ext = '.' + fileName.split('.').pop()?.toLowerCase();
  if (!ACCEPTED_EXTENSIONS_SET.has(ext)) {
    return `Unsupported file type "${ext}". Please upload a PDF or DOCX file.`;
  }

  // MIME type check
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return `Unsupported MIME type "${file.type}". Only PDF and DOCX files are accepted.`;
  }

  // Size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB (received ${(file.size / 1024 / 1024).toFixed(1)} MB).`;
  }

  return null;
}

/**
 * Client-side validation for file selection (non-blocking).
 * Returns null if valid, or an error message string if invalid.
 */
export function validateFileForUpload(file: File): string | null {
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return `"${file.name}" is not supported. Please upload a PDF or DOCX file.`;
  }
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return 'Unsupported file type. Please upload a PDF or DOCX file.';
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}
