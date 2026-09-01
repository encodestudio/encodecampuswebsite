import { Link } from "react-router-dom";
import { Button, Reveal } from "./ui.jsx";
import Icon from "./Icon.jsx";
import { PILLARS } from "../data/site.js";

export function PageHeader({ eyebrow, title, children, actions }) {
  return (
    <section className="pagehead">
      <div className="container">
        <Reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {children && <p className="lead">{children}</p>}
          {actions && <div className="pagehead__actions">{actions}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function CTASection({
  title = "Your institution already generates the data.",
  sub = "Encode Campus turns it into action.",
  primary = { to: "/demo", label: "Book a Demo" },
  secondary = { to: "/platform", label: "Explore the Platform" },
}) {
  return (
    <section className="section section--navy cta-band">
      <div className="container center">
        <Reveal>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__sub">{sub}</p>
          <div className="cta-band__actions">
            <Button to={primary.to} arrow>
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="secondary">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PillarShowcase() {
  return (
    <div className="pillars">
      <div className="pillars__hub">
        <span>ENCODE CAMPUS</span>
        <small>Connected by design</small>
      </div>
      <div className="pillars__grid">
        {PILLARS.map((p, i) => (
          <Reveal key={p.key} delay={i * 60} className="pillar card card--interactive">
            <div className="pillar__icon">
              <Icon name={p.icon} />
            </div>
            <h3>{p.title}</h3>
            <ul>
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function FeatureRow({
  eyebrow,
  title,
  copy,
  points = [],
  cta,
  media,
  reverse = false,
}) {
  return (
    <Reveal className={`frow ${reverse ? "frow--reverse" : ""}`}>
      <div className="frow__text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h3>{title}</h3>
        {copy && <p className="muted">{copy}</p>}
        {points.length > 0 && (
          <ul className="frow__points">
            {points.map((p) => (
              <li key={p}>
                <Icon name="check" size={18} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <Link to={cta.to} className="link-arrow">
            {cta.label} <span className="arrow">→</span>
          </Link>
        )}
      </div>
      <div className="frow__media">{media}</div>
    </Reveal>
  );
}

export function Metric({ value, label, sub, tone }) {
  return (
    <div className={`metric ${tone === "navy" ? "metric--navy" : ""}`}>
      <div className="metric__value mono-num">{value}</div>
      <div className="metric__label">{label}</div>
      {sub && <div className="metric__sub">{sub}</div>}
    </div>
  );
}

export function StepsRail({ steps, highlight }) {
  return (
    <div className="steps">
      {steps.map((s) => (
        <Reveal key={s.index} className="steps__item">
          <span className="steps__idx">{s.index}</span>
          <h4>{s.title}</h4>
          <p>{s.body}</p>
        </Reveal>
      ))}
      {highlight && (
        <Reveal className="steps__item steps__item--hl">
          <span className="steps__idx">{highlight.index}</span>
          <h4>{highlight.title}</h4>
          <p>{highlight.body}</p>
        </Reveal>
      )}
    </div>
  );
}
