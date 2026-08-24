export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0076df]/20 border border-[#0076df]/30 flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 rounded bg-[#0076df]/60" />
        </div>
        <p className="text-sm text-zinc-500">Loading…</p>
      </div>
    </div>
  );
}
