/**
 * Bottom-left floating button that reopens the Cookiebot consent dialog so
 * visitors can change their choice at any time, as GDPR requires. Calls the
 * `Cookiebot.renew()` API the loaded script exposes on `window`; does
 * nothing (and stays hidden) if the script hasn't loaded, e.g. with the
 * placeholder domain ID still in index.html.
 */
export function CookieBubble() {
  const onClick = () => {
    window.Cookiebot?.renew();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Cookieindstillinger"
      data-cursor
      className="fixed bottom-5 left-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-[0_16px_40px_-12px_rgba(20,29,61,0.55)] transition-transform hover:-translate-y-0.5 md:bottom-8 md:left-8"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20.5 12.3A8.5 8.5 0 1 1 11.7 3.5c-.3 1.4.1 2.9 1.1 3.9a3.5 3.5 0 0 0 3.9 1.1c1 1 1.4 2.5 1.1 3.9.6-.1 1.2-.1 1.7-.1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="13" r="1.1" fill="currentColor" />
        <circle cx="13" cy="16" r="1.1" fill="currentColor" />
        <circle cx="14.5" cy="11.5" r="1.1" fill="currentColor" />
      </svg>
    </button>
  );
}
