import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { api } from "../lib/api.js";
import { BRAND, FOOTER, FOOTER_LEGAL } from "../data/site.js";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const subscribe = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      await api.subscribe(email);
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo onDark />
          <p>{BRAND.category}</p>
          <p className="footer__blurb">
            Bring your people, academics, operations, finance and governance
            together on one connected platform.
          </p>
          <form className="footer__subscribe" onSubmit={subscribe}>
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="you@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={state === "loading"}>
              {state === "done" ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
          {state === "error" && (
            <p className="footer__msg">Something went wrong — please try again.</p>
          )}
        </div>

        <div className="footer__cols">
          {FOOTER.map((col) => (
            <div key={col.title} className="footer__col">
              <p className="footer__coltitle">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{BRAND.copyright}</span>
        <nav aria-label="Legal">
          {FOOTER_LEGAL.map((l, i) => (
            <span key={l.label}>
              {i > 0 && <span className="footer__sep">|</span>}
              <Link to={l.to}>{l.label}</Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
