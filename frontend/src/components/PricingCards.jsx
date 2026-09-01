import { Button } from "./ui.jsx";
import Icon from "./Icon.jsx";
import { formatINR } from "../lib/api.js";

const CTA_TO = { "Get Started": "/demo", "Book a Demo": "/demo", "Talk to Sales": "/contact" };

export default function PricingCards({ plans }) {
  if (!plans?.length) return null;
  return (
    <div className="pcards">
      {plans.map((p) => (
        <div
          key={p.slug}
          className={`pcard ${p.is_popular ? "pcard--popular" : ""}`}
        >
          {p.is_popular && <span className="pcard__badge">Most Popular</span>}
          <h3 className="pcard__name">{p.name}</h3>
          <p className="pcard__price mono-num">
            {formatINR(p.price_per_student)}
            <span>{p.price_caption}</span>
          </p>
          <p className="pcard__pos">{p.positioning}</p>
          <Button
            to={CTA_TO[p.cta_label] || "/demo"}
            variant={p.is_popular ? "primary" : "secondary"}
            className="pcard__cta"
          >
            {p.cta_label}
          </Button>
          <ul className="pcard__list">
            {p.features.map((f) => (
              <li key={f}>
                <Icon name="check" size={17} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
