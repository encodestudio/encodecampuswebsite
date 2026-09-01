import { Link } from "react-router-dom";

/* Recreation of the Encode Campus brand mark: an open rounded frame with a
   navy left/bottom and a cyan top/right, plus a halftone profile. Kept as
   inline SVG so it stays crisp and inherits colour on dark sections. */
export function LogoMark({ size = 34 }) {
  const dots = [];
  const grid = [
    [0, 1, 1, 1, 0],
    [1, 1, 2, 1, 1],
    [1, 2, 2, 2, 1],
    [1, 1, 2, 1, 1],
    [0, 1, 1, 1, 0],
  ];
  grid.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (!cell) return;
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={30 + c * 7.5}
          cy={12 + r * 7.5}
          r={cell === 2 ? 2.7 : 1.7}
          fill="#22b6e6"
          opacity={cell === 2 ? 0.95 : 0.6}
        />
      );
    })
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      role="img"
      aria-label="Encode Campus"
    >
      <path
        d="M45 8 H16 A8 8 0 0 0 8 16 V56 A8 8 0 0 0 16 64 H40"
        stroke="var(--logo-navy, #0B1736)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M45 8 A19 19 0 0 1 64 27"
        stroke="#22b6e6"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {dots}
    </svg>
  );
}

export default function Logo({ to = "/", onDark = false, showWordmark = true, size = 34 }) {
  return (
    <Link
      to={to}
      className="logo"
      aria-label="Encode Campus — home"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        "--logo-navy": onDark ? "#ffffff" : "#0B1736",
      }}
    >
      <LogoMark size={size} />
      {showWordmark && (
        <span
          style={{
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.02em",
            color: onDark ? "#fff" : "var(--navy)",
          }}
        >
          Encode<span style={{ color: onDark ? "#7fd3ee" : "var(--blue)" }}>Campus</span>
        </span>
      )}
    </Link>
  );
}
