import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5" id="footer-logo">
              <div className="w-8 h-8 rounded-lg bg-[#0076df] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4h12M2 8h8M2 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg">Hirelume</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              AI-powered resume analysis to help you land your dream job. Free to try — no account required.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5">Product</h3>
            <ul className="space-y-4">
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
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5">Legal</h3>
            <ul className="space-y-4">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Hirelume. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Built with Next.js &amp; Gemini AI</p>
        </div>
      </div>
    </footer>
  );
}