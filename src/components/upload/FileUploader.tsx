'use client';

import { useCallback, useRef, useState } from 'react';

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = new Set(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
const ACCEPTED_EXTENSIONS = /\.(pdf|docx)$/i;

interface FileUploaderProps {
  onResult: (result: { text: string; charCount: number; likelyScanned: boolean }) => void;
  onError: (msg: string) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export default function FileUploader({ onResult, onError, loading, setLoading }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function validateFile(file: File): string | null {
    if (!ACCEPTED_EXTENSIONS.test(file.name)) {
      return `"${file.name}" is not supported. Please upload a PDF or DOCX file.`;
    }
    if (!ACCEPTED_TYPES.has(file.type)) {
      return `Unsupported file type. Please upload a PDF or DOCX file.`;
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is ${MAX_SIZE_MB} MB.`;
    }
    return null;
  }

  function handleFileSelect(file: File) {
    const validationError = validateFile(file);
    if (validationError) {
      onError(validationError);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    onError('');
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  async function handleUpload() {
    if (!selectedFile) return;
    setLoading(true);
    onError('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/extract-text', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        onError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      onResult(data);
    } catch {
      onError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        id="file-drop-zone"
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-[#0076df] bg-[#0076df]/10'
            : 'border-white/[0.08] hover:border-[#0076df]/50 hover:bg-white/[0.02]'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Click or drag and drop a resume file here"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          id="resume-file-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
            e.target.value = '';
          }}
        />

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#0076df]/10 border border-[#0076df]/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#0076df]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        {selectedFile ? (
          <div>
            <p className="text-white font-semibold mb-1 truncate max-w-full px-2">{selectedFile.name}</p>
            <p className="text-sm text-zinc-500">
              {(selectedFile.size / 1024).toFixed(0)} KB &nbsp;·&nbsp;
              <span className="text-[#0076df] hover:text-[#38bdf8]">Change file</span>
            </p>
          </div>
        ) : (
          <div>
            <p className="text-white font-medium mb-1">Drop your resume here</p>
            <p className="text-sm text-zinc-500">
              or <span className="text-[#0076df]">click to browse</span>
            </p>
            <p className="text-xs text-zinc-600 mt-2">PDF or DOCX &nbsp;·&nbsp; Max 5 MB</p>
          </div>
        )}
      </div>

      {/* Upload button */}
      <button
        id="upload-submit-btn"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="w-full btn-solid font-semibold py-3.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Extracting text…
          </span>
        ) : (
          'Extract Text'
        )}
      </button>
    </div>
  );
}
