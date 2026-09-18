import type { ReactNode } from 'react';

type Variant = 'dark' | 'light' | 'glass';

const BASE: Record<Variant, string> = {
  dark: 'bg-navy text-white',
  light: 'bg-white text-navy',
  glass: 'border border-white/40 bg-white/15 text-white backdrop-blur-md',
};

const SWEEP: Record<Variant, string> = {
  dark: 'bg-white',
  light: 'bg-navy',
  glass: 'bg-white',
};

const HOVER_TEXT: Record<Variant, string> = {
  dark: 'group-hover:text-navy',
  light: 'group-hover:text-white',
  glass: 'group-hover:text-navy',
};

/**
 * Pill CTA, fixed in place (no cursor-follow): a rounded fill that slides up
 * from below the pill (so the curved edges stay clean), the label rolling up
 * one line, and an arrow easing in from the left.
 */
export function Button({
  href,
  children,
  variant = 'dark',
  size = 'md',
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  /** Opens in a new tab. Use for anything that leaves the site (maps, KID downloads, socials) so it never yanks a visitor off a page mid-video/mid-form. */
  external?: boolean;
  className?: string;
}) {
  const pad = size === 'sm' ? 'px-5 py-2.5 text-[13px]' : size === 'lg' ? 'px-9 py-[18px] text-[16px]' : 'px-7 py-4 text-[15px]';

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold ${pad} ${BASE[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute -inset-px translate-y-[102%] rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${SWEEP[variant]}`}
      />
      <span className={`relative overflow-hidden transition-colors duration-700 ${HOVER_TEXT[variant]}`}>
        <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">{children}</span>
      </span>
      <span
        aria-hidden
        className={`relative -ml-3 w-0 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-0 group-hover:w-4 group-hover:opacity-100 ${HOVER_TEXT[variant]}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
