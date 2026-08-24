'use client';

import { useState } from 'react';
import FileUploader from '@/components/upload/FileUploader';
import ExtractedTextView from '@/components/upload/ExtractedTextView';

type Tab = 'file' | 'paste';

interface ExtractionResult {
  text: string;
  charCount: number;
  likelyScanned: boolean;
}

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState<Tab>('file');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [pasteText, setPasteText] = useState('');

  function handlePasteSubmit() {
    const trimmed = pasteText.trim();
    if (!trimmed) {
      setError('Please paste some text before continuing.');
      return;
    }
    setError('');
    setResult({ text: trimmed, charCount: trimmed.length, likelyScanned: false });
  }

  function handleNewUpload() {
    setResult(null);
    setError('');
    setPasteText('');
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Analyze your <span className="text-accent">resume</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg">
            Upload a file or paste your resume text below to get started.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Tabs */}
          <div
            className="flex bg-white/[0.04] rounded-xl p-1 mb-8"
            role="tablist"
            aria-label="Resume input method"
          >
            {([
              { id: 'file', label: 'Upload File', icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              )},
              { id: 'paste', label: 'Paste Text', icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              )},
            ] as { id: Tab; label: string; icon: React.ReactNode }[]).map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setError('');
                  setResult(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#0076df] text-white shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Error banner */}
          {error && (
            <div
              id="upload-error"
              role="alert"
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6"
            >
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Tab panels */}
          <div id="panel-file" role="tabpanel" aria-labelledby="tab-file" hidden={activeTab !== 'file'}>
            <FileUploader
              onResult={setResult}
              onError={setError}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div id="panel-paste" role="tabpanel" aria-labelledby="tab-paste" hidden={activeTab !== 'paste'}>
            <div className="space-y-5">
              <div>
                <label htmlFor="paste-resume-textarea" className="block text-sm font-medium text-zinc-300 mb-2.5">
                  Paste your resume text
                </label>
                <textarea
                  id="paste-resume-textarea"
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Paste the full text of your resume here…"
                  rows={14}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#0076df]/50 focus:border-[#0076df]/50 resize-none transition-all"
                />
                <p className="text-xs text-zinc-600 mt-1.5 text-right">
                  {pasteText.length.toLocaleString()} characters
                </p>
              </div>
              <button
                id="paste-submit-btn"
                onClick={handlePasteSubmit}
                disabled={!pasteText.trim()}
                className="w-full btn-solid font-semibold py-3.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all"
              >
                Use this text
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <>
              <ExtractedTextView
                text={result.text}
                charCount={result.charCount}
                likelyScanned={result.likelyScanned}
              />
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  id="analyze-btn"
                  disabled
                  className="flex-1 btn-solid font-semibold py-3.5 rounded-xl text-sm opacity-50 cursor-not-allowed"
                  title="AI analysis coming in Week 2"
                >
                  Analyze with AI →{' '}
                  <span className="text-xs opacity-70">(coming Week 2)</span>
                </button>
                <button
                  id="new-upload-btn"
                  onClick={handleNewUpload}
                  className="flex-1 text-zinc-400 hover:text-white font-medium py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-sm transition-all hover:bg-white/5"
                >
                  Start over
                </button>
              </div>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🔒', text: 'Your file never leaves this session' },
            { icon: '📄', text: 'PDF & DOCX supported, max 5 MB' },
            { icon: '⚡', text: 'Text extracted instantly, no AI yet' },
          ].map((tip) => (
            <div key={tip.text} className="glass-card rounded-xl p-3.5 flex items-center gap-2.5">
              <span className="text-lg">{tip.icon}</span>
              <p className="text-xs text-zinc-500">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
