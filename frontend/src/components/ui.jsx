import { Link } from "react-router-dom";
import { useReveal } from "../lib/hooks.js";

const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    →
  </span>
);

export function Button({
  to,
  href,
  variant = "primary",
  size,
  arrow = false,
  children,
  className = "",
  ...rest
}) {
  const cls = `btn btn--${variant} ${size ? `btn--${size}` : ""} ${className}`.trim();
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}

export function LinkArrow({ to, children }) {
  return (
    <Link to={to} className="link-arrow">
      {children} <Arrow />
    </Link>
  );
}

export function Reveal({ children, as: Tag = "div", delay = 0, className = "", style }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

export function Section({ children, tone, tight, id, className = "" }) {
  const cls = [
    "section",
    tight && "section--tight",
    tone === "mist" && "section--mist",
    tone === "navy" && "section--navy",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, center = false }) {
  return (
    <Reveal className={`section-head ${center ? "section-head--center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  );
}

export function Stat({ value, label, sub }) {
  return (
    <div className="stat">
      <div className="stat__value mono-num">{value}</div>
      <div className="stat__label">{label}</div>
      {sub && <div className="stat__sub">{sub}</div>}
    </div>
  );
}
