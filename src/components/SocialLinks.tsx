/**
 * Social links with recognisable platform branding.
 *
 * - Instagram: official-style gradient tile (#F58529 → #DD2A7B → #8134AF → #515BD4).
 * - Facebook: current Facebook blue (#1877F2).
 * Brand marks (lucide no longer ships them) are inline SVG, so no dependency is added.
 *
 * Instagram: `instagramUrl` is the neutral internal redirect path (/go/instagram)
 * provided by getSiteSettings(); the real profile URL never reaches this component.
 * The visible text is the platform name only ("Instagram"), never the handle.
 */
const INSTAGRAM_GRADIENT =
  "linear-gradient(45deg, #F58529 0%, #DD2A7B 45%, #8134AF 75%, #515BD4 100%)";
const FACEBOOK_BLUE = "#1877F2";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

type SocialLinksProps = {
  /** Internal redirect path (e.g. /go/instagram). Empty hides the link. */
  instagramUrl: string;
  facebookUrl: string;
  className?: string;
};

const pillClass =
  "group inline-flex min-h-11 items-center gap-2.5 rounded-lg border border-line bg-coal/60 py-1.5 pl-1.5 pr-3.5 text-[14px] font-medium text-cream transition-colors duration-200 hover:border-line-gold hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const tileClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white shadow-sm transition-transform duration-200 group-hover:scale-105";

/** Used from a Server Component (Footer, Contact) and a Client Component
 *  (MobileMenu), so it stays a plain, data-in component. */
export function SocialLinks({ instagramUrl, facebookUrl, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={pillClass}
        >
          <span className={tileClass} style={{ backgroundImage: INSTAGRAM_GRADIENT }}>
            <InstagramGlyph className="h-[18px] w-[18px]" />
          </span>
          <span>
            Instagram<span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
          </span>
        </a>
      ) : null}
      {facebookUrl ? (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={pillClass}
        >
          <span className={tileClass} style={{ backgroundColor: FACEBOOK_BLUE }}>
            <FacebookGlyph className="h-[18px] w-[18px]" />
          </span>
          <span>
            Facebook<span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}
