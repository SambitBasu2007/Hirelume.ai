'use client';

import { useState } from 'react';

interface ExtractedTextViewProps {
  text: string;
  charCount: number;
  likelyScanned: boolean;
}

export default function ExtractedTextView({ text, charCount, likelyScanned }: ExtractedTextViewProps) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => { },
    );
  }

  return (
    <div className="space-y-5">
      {/* Scanned PDF warning — more padding */}
      {likelyScanned && (
        <div
          id="scanned-pdf-warning"
          className="flex items-start gap-3 p-5 rounded-xl bg-amber-500/10 border border-amber-500/20"
          role="alert"
        >
          <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-300">Scanned PDF detected</p>
            <p className="text-xs text-amber-400/80 mt-1 leading-relaxed">
              This looks like an image-based PDF — we couldn&apos;t extract much text. Please use the &ldquo;Paste Text&rdquo; tab and paste your resume content manually.
            </p>
          </div>
        </div>
      )}

      {/* Result card — more rounded, better header spacing */}
      <div id="extracted-text-card" className="glass-card rounded-2xl overflow-hidden">
        {/* Header — more padding */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-400">Extracted Text</span>
            <span className="text-xs text-zinc-600">
              ({charCount.toLocaleString()} characters)
            </span>
          </div>
          <button
            id="copy-text-btn"
            onClick={copyToClipboard}
            className={`text-xs transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg ${copied
                ? 'text-emerald-400 bg-emerald-400/10'
                : 'text-zinc-500 hover:text-[#0076df] hover:bg-white/5'
              }`}
            aria-label={copied ? 'Copied to clipboard' : 'Copy extracted text to clipboard'}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Text area — more padding, slightly taller */}
        <pre
          id="extracted-text-content"
          className="text-sm text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap p-6 max-h-[28rem] overflow-y-auto"
        >
          {text || '(empty)'}
        </pre>
      </div>
    </div>
  );
}