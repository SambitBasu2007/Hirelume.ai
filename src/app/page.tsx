import Link from 'next/link';

// ── Feature data ──────────────────────────────────────────────────────────────
const features = [
  {
    id: 'feature-analysis',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: 'AI Resume Analysis',
    description:
      'Get a comprehensive score across role-fit, ATS clarity, impact, and readability — powered by Gemini AI.',
  },
  {
    id: 'feature-ats',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'ATS Keyword Matching',
    description:
      'Identify critical keywords missing from your resume that ATS systems and recruiters are scanning for.',
  },
  {
    id: 'feature-github',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'GitHub Project Import',
    description:
      'Connect your GitHub repos and auto-generate strong, quantified resume bullets from your actual project work.',
  },
  {
    id: 'feature-qa',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'AI Follow-up Q&A',
    description:
      'Answer targeted AI questions to fill resume gaps — "How many people did you lead? What was the outcome?"',
  },
];

const steps = [
  {
    id: 'step-upload',
    number: '01',
    title: 'Upload or Paste',
    description: 'Drop your PDF or DOCX resume, or paste the text directly. Optionally add a job description for targeted analysis.',
  },
  {
    id: 'step-analyze',
    number: '02',
    title: 'AI Analyzes',
    description: 'Gemini AI scores your resume across multiple dimensions and identifies keyword gaps against the target role.',
  },
  {
    id: 'step-improve',
    number: '03',
    title: 'Improve & Export',
    description: 'Act on specific, actionable feedback. Re-run analysis to see your score improve. Export the final version as PDF.',
  },
];

// #23: Demo scores with labels for animation
const demoScores = [
  { label: 'Overall', score: 82 },
  { label: 'ATS Clarity', score: 91 },
  { label: 'Role Fit', score: 74 },
  { label: 'Impact', score: 68 },
];

const demoFeedback = [
  { text: '✓ Strong quantified impact statements detected', color: 'text-emerald-400' },
  { text: '⚠ Missing keywords: TypeScript, CI/CD, REST APIs', color: 'text-amber-400' },
  { text: '✗ Summary section too generic for this role', color: 'text-red-400' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0076df]/30 bg-[#0076df]/10 text-[#0076df] text-xs font-medium mb-10 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0076df] animate-pulse" />
            Powered by Gemini AI
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8 text-white animate-fade-in-up delay-100">
            Your resume,{' '}
            <span className="text-accent">analyzed by AI</span>
            <br />
            in seconds
          </h1>

          {/* Sub-heading */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
            Upload your resume and get instant ATS scores, keyword gaps, and
            actionable feedback — tailored to any job description you&apos;re targeting.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up delay-300 mb-10">
            <Link
              href="/upload"
              id="hero-cta-primary"
              className="btn-solid font-semibold px-10 py-4 rounded-xl text-base w-full sm:w-auto text-center"
            >
              Analyze my resume →
            </Link>
            <Link
              href="/#how-it-works"
              id="hero-cta-secondary"
              className="text-zinc-300 hover:text-white font-medium px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-base w-full sm:w-auto text-center hover:bg-white/5"
            >
              See how it works
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-sm text-zinc-600 mb-20 animate-fade-in-up delay-400">
            No account required &nbsp;·&nbsp; Free to try &nbsp;·&nbsp; PDF &amp; DOCX supported
          </p>

          {/* Demo card — #23: animated scores */}
          <div className="w-full max-w-3xl animate-fade-in-up delay-500">
            <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl animate-float">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-zinc-600">resume_analysis.json</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {demoScores.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/[0.04] rounded-xl p-5 text-center border border-white/[0.04] hover:border-[#0076df]/20 transition-colors"
                  >
                    {/* #23: Each score animates in with a staggered delay using CSS animation */}
                    <div className="text-3xl font-black mb-1 text-accent animate-[fadeInUp_0.6s_ease-out_both]"
                      style={{ animationDelay: `${demoScores.indexOf(s) * 150 + 800}ms` }}>
                      {s.score}
                    </div>
                    <div className="text-xs text-zinc-500">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {demoFeedback.map((item) => (
                  <div key={item.text} className={`text-xs ${item.color} text-left font-mono`}>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 scroll-mt-20">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="text-center mb-20">
            <p className="text-xs font-semibold text-[#0076df] uppercase tracking-widest mb-4">Features</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Everything you need to{' '}
              <span className="text-accent">land the interview</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              From raw resume to polished, ATS-optimized application — Hirelume covers the full journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ... features map stays the same ... */}
          </div>
        </div>
      </section>


      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 bg-[#050505] scroll-mt-20">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
          <div className="text-center mb-20">
            <p className="text-xs font-semibold text-[#0076df] uppercase tracking-widest mb-4">How it works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              From upload to insights{' '}
              <span className="text-accent">in 30 seconds</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-8 left-[calc(33.33%+1rem)] w-[calc(33.33%-2rem)] h-px bg-[#0076df]/20" />
            <div className="hidden md:block absolute top-8 left-[calc(66.66%+1rem)] w-[calc(33.33%-2rem)] h-px bg-[#0076df]/20" />

            {steps.map((step) => (
              <div key={step.id} id={step.id} className="relative">
                <div className="glass-card rounded-2xl p-8 text-center hover:border-white/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-[#0076df]/10 border border-[#0076df]/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-black text-accent">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 text-white">
            Ready to get your{' '}
            <span className="text-accent">dream job?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of job seekers using Hirelume to craft resumes that get callbacks.
          </p>
          <Link
            href="/upload"
            id="bottom-cta"
            className="btn-solid font-semibold px-10 py-4 rounded-xl text-base inline-block"
          >
            Analyze my resume — it&apos;s free →
          </Link>
          <p className="mt-8 text-sm text-zinc-600">No signup needed. Results in seconds.</p>
        </div>
      </section>

    </div>
  );
}
