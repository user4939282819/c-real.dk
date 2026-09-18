export function ArrowCircle({ light = false }: { light?: boolean }) {
  return (
    <span
      className={[
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45',
        light ? 'border-white/70 text-white' : 'border-navy/50 text-navy',
      ].join(' ')}
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  );
}
