export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 animate-spin rounded-full border border-white/10 border-t-cyan" />
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-dim">
          Loading
        </p>
      </div>
    </div>
  );
}
