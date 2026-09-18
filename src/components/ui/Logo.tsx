export const LOGO_VIEWBOX = '0 0 200.2 179.9';

/** Wordmark letters, left to right. */
export const LOGO_LETTERS = [
  'M32.6,138c5.2,0,9.8,2.6,12.7,6.5l-5.3,3.9c-1.6-2.4-4.3-3.9-7.3-3.9-5.3,0-9.1,4.5-9.1,10.2s3.8,9.7,9.1,9.7,6-1.7,7.6-4.3l5.7,3.3c-2.7,4.5-7.6,7.4-13.3,7.4-9,0-15.8-7.3-15.8-16.2s6.8-16.7,15.8-16.7Z',
  'M66.2,154.9v6.5h-17.2v-6.5h17.2Z',
  'M71.3,170.5v-32h11.3c7,0,11.6,3.5,11.6,10.4s-2.7,8.3-6.9,9.6l8.3,12.1h-7.3s-7.9-11.5-7.9-11.5h-2.3v11.5h-6.7ZM78,152.4h4.5c3.4,0,4.9-1.2,4.9-3.7s-1.5-3.6-4.9-3.6h-4.5v7.3Z',
  'M123.3,138.5v6.6h-16.7v6h14.4v6.7h-14.4v6.1h16.7v6.6h-23.4v-32h23.4Z',
  'M125.3,170.5l12.4-32h6.7l12.4,32h-6.9l-2.6-6.8h-12.5l-2.6,6.8h-6.9ZM137.3,157.1h7.3l-3.7-9.5-3.7,9.5Z',
  'M160,170.5v-32h6.7v25.4h16.7v6.6h-23.4Z',
];

/** The C mark with the house cut into it. */
export const LOGO_MARK =
  'M132.1,85c-2.1,2.9-4.6,5.3-7.4,7.4v-35.1l-19.8-12.9-21.8,12.7v34.2c-7.5-6.2-12.2-15.7-12.2-26.8,0-20.4,14.5-35.9,33.7-35.9s19.9,4.6,26.2,12.7l16.4-11.4c-10.4-12.9-25.8-20.3-42.6-20.3-30.4,0-54.2,24.1-54.2,54.9s23.8,53.4,54.2,53.4,35.1-8.6,45.1-23.2l-17.6-9.7ZM116.2,96.9c-2.5.9-5.2,1.5-7.9,1.8v-42.2l7.9,5.1v35.3ZM91.8,61.7l7.9-4.6v41.4c-2.8-.4-5.4-1.1-7.9-2.1v-34.7Z';

/** Letters only, for use next to the raster mark. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="16 136 168 38" className={className} fill="currentColor" role="img" aria-label="C-Real">
      {LOGO_LETTERS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} fill="currentColor" role="img" aria-label="C-Real">
      {LOGO_LETTERS.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <path d={LOGO_MARK} />
    </svg>
  );
}
