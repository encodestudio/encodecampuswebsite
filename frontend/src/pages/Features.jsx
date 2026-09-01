import { Link } from "react-router-dom";
import { Section, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";

export default function Features() {
  usePageMeta(
    "All Modules",
    "Every Encode Campus module — student management, admissions, academics, attendance, examinations, fees, communication, HR, transport, library, inventory, certificates, analytics and governance."
  );
  const { data, loading } = useAsync(() => api.features(), []);

  return (
    <>
      <PageHeader eyebrow="Product" title="Every module. One connected platform.">
        Each module consumes the same institutional data, so a student, a staff member or
        a fee is never entered twice.
      </PageHeader>

      <Section>
        {loading && <p className="muted">Loading modules…</p>}
        <div className="grid grid--3">
          {(data || []).map((f, i) => (
            <Reveal key={f.slug} delay={(i % 3) * 50}>
              <Link to={`/features/${f.slug}`} className="card card--interactive feature-card">
                <div className="feature-card__icon">
                  <Icon name={f.icon} />
                </div>
                <span className="chip">{f.pillar_label}</span>
                <h3>{f.name}</h3>
                <p className="muted">{f.tagline}</p>
                <span className="link-arrow">
                  Explore <span className="arrow">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
