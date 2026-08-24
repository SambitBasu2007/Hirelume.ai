import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black mt-auto">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4" id="footer-logo">
              <div className="w-7 h-7 rounded-lg bg-[#0076df] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4h12M2 8h8M2 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-bold text-white">Hirelume</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              AI-powered resume analysis to help you land your dream job. Free to try — no account required.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { label: 'Analyze Resume', href: '/upload' },
                { label: 'Features', href: '/#features' },
                { label: 'How it works', href: '/#how-it-works' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Hirelume. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Built with Next.js &amp; Gemini AI</p>
        </div>
      </div>
    </footer>
  );
}
