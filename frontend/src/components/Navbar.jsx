import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Button } from "./ui.jsx";
import { NAV } from "../data/site.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  const closeTimer = useRef(null);

  // Forgiving open/close so the pointer can travel from the trigger to the
  // panel without the menu snapping shut.
  const openNow = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };
  const closeNow = () => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeNow();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setDrawer(false);
    closeNow();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [drawer]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Logo />

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={`nav__item ${openMenu === item.label ? "is-open" : ""}`}
              onMouseEnter={() => item.columns && openNow(item.label)}
              onMouseLeave={() => item.columns && closeSoon()}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "is-active" : ""}`
                }
                aria-haspopup={item.columns ? "true" : undefined}
                aria-expanded={item.columns ? openMenu === item.label : undefined}
                onFocus={() => item.columns && openNow(item.label)}
              >
                {item.label}
                {item.columns && <span className="nav__caret" aria-hidden="true">▾</span>}
              </NavLink>

              {item.columns && openMenu === item.label && (
                <div className="mega" role="menu" onMouseEnter={() => openNow(item.label)}>
                  <div className="mega__grid">
                    {item.columns.map((col) => (
                      <div key={col.title} className="mega__col">
                        <p className="mega__title">{col.title}</p>
                        <ul>
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link to={l.to} onClick={closeNow}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="nav__cta">
          <Link to="/pricing" className="nav__link nav__link--muted">
            Sign in
          </Link>
          <Button to="/demo" size="sm">
            Book a Demo
          </Button>
        </div>

        <button
          className="nav__burger"
          aria-label={drawer ? "Close menu" : "Open menu"}
          aria-expanded={drawer}
          onClick={() => setDrawer((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {drawer && (
        <div className="drawer">
          <nav aria-label="Mobile">
            {NAV.map((item) => (
              <details key={item.label} className="drawer__group">
                <summary>
                  <Link to={item.to}>{item.label}</Link>
                </summary>
                {item.columns &&
                  item.columns.map((col) => (
                    <div key={col.title} className="drawer__col">
                      <p className="drawer__coltitle">{col.title}</p>
                      {col.links.map((l) => (
                        <Link key={l.label} to={l.to}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ))}
              </details>
            ))}
          </nav>
          <div className="drawer__cta">
            <Button to="/demo" className="btn--lg">
              Book a Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
