// Consistent line-icon set (1.75px stroke, rounded caps) per the design system.
const PATHS = {
  users: (
    <>
      <path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M17 15h1a3 3 0 0 1 3 3v1" />
      <path d="M16.5 4.5a3 3 0 0 1 0 6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
    </>
  ),
  book: (
    <>
      <path d="M5 4h11a2 2 0 0 1 2 2v13a1 1 0 0 0-1-1H6a1 1 0 0 1-1-1V4z" />
      <path d="M5 4v13" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2H9V4z" />
      <path d="M9 11h6M9 15h6" />
    </>
  ),
  check: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13l-1.5 7 4.5-2.5 4.5 2.5L15 13" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  message: (
    <>
      <path d="M4 5h16v11H8l-4 3V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M4 11h16M8 17v2M16 17v2" />
      <circle cx="8.5" cy="14.5" r="1" />
      <circle cx="15.5" cy="14.5" r="1" />
    </>
  ),
  library: (
    <>
      <path d="M5 4h4v16H5zM11 4h4v16h-4z" />
      <path d="M17 5l3 15-4 .8L13.5 6z" />
    </>
  ),
  box: (
    <>
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" />
      <path d="M4 8l8 4 8-4M12 12v8" />
    </>
  ),
  file: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 13h6M10 17h6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  landmark: (
    <>
      <path d="M4 21h16M5 21V10M19 21V10M9 21v-7M15 21v-7" />
      <path d="M12 3l8 5H4l8-5z" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  bolt: <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />,
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  link: (
    <>
      <path d="M9 15l6-6" />
      <path d="M8 7l1-1a4 4 0 0 1 6 6l-1 1M16 17l-1 1a4 4 0 0 1-6-6l1-1" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
};

export default function Icon({ name, size = 22, stroke = 1.75, className, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name] || PATHS.grid}
    </svg>
  );
}
