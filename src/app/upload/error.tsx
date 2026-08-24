'use client';

import { useEffect } from 'react';

export default function UploadError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[UploadError]', error.message);
  }, [error]);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Upload failed</h2>
        <p className="text-zinc-400 text-sm mb-8">
          Something went wrong while processing your file. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="btn-solid font-semibold px-6 py-3 rounded-xl text-sm"
          >
            Try again
          </button>
          <a
            href="/"
            className="text-zinc-400 hover:text-white font-medium px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-sm transition-all hover:bg-white/5 text-center"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
