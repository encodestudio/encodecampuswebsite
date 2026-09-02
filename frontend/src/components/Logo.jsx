import { Link } from "react-router-dom";

import logoUrl from "../assets/encodecampus-logo.png";

/**
 * Official Encode Campus logo lockup (mark + wordmark + tagline).
 * `onDark` reverses it to white for use on the dark footer / navy sections.
 */
export default function Logo({ to = "/", onDark = false, height = 38 }) {
  return (
    <Link
      to={to}
      className="logo"
      aria-label="Encode Campus — home"
      style={{ display: "inline-flex", alignItems: "center", flex: "none" }}
    >
      <img
        src={logoUrl}
        alt="Encode Campus — Mentoring progress, managing excellence."
        style={{
          height,
          width: "auto",
          display: "block",
          filter: onDark ? "brightness(0) invert(1)" : "none",
        }}
      />
    </Link>
  );
}
