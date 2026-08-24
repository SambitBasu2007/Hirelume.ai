import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-accent mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-zinc-400 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/upload"
            className="btn-solid font-semibold px-6 py-3 rounded-xl text-sm text-center"
          >
            Analyze resume
          </Link>
          <Link
            href="/"
            className="text-zinc-400 hover:text-white font-medium px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-sm transition-all hover:bg-white/5 text-center"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
