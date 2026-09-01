import { Link } from "react-router-dom";
import { Section, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";

const ICONS = { school: "landmark", college: "book", coaching: "users", group: "layers" };

export default function Solutions() {
  usePageMeta(
    "Solutions",
    "Encode Campus for schools, colleges and universities, coaching centres and multi-campus education groups."
  );
  const { data, loading } = useAsync(() => api.solutions(), []);

  return (
    <>
      <PageHeader eyebrow="Solutions" title="Built for the way education works.">
        The same connected platform and governance layer, tuned to how each type of
        institution actually operates.
      </PageHeader>

      <Section>
        {loading && <p className="muted">Loading…</p>}
        <div className="grid grid--2">
          {(data || []).map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 60}>
              <Link to={`/solutions/${s.slug}`} className="card card--interactive solution-card">
                <div className="feature-card__icon">
                  <Icon name={ICONS[s.institution_type] || "grid"} />
                </div>
                <h3>{s.title}</h3>
                <p className="lead" style={{ fontSize: 17 }}>{s.headline}</p>
                <p className="muted">{s.description}</p>
                <div className="solution-card__tags">
                  {s.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="chip">{h}</span>
                  ))}
                </div>
                <span className="link-arrow">
                  Explore {s.title} <span className="arrow">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Talk to an education specialist."
        sub="We'll map Encode Campus to your institution."
        primary={{ to: "/demo", label: "Book a Demo" }}
        secondary={{ to: "/pricing", label: "See Pricing" }}
      />
    </>
  );
}
