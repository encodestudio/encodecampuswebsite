import { Link, useParams } from "react-router-dom";
import { Section, SectionHead, Reveal, Button } from "../components/ui.jsx";
import { CTASection } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";

export default function FeatureDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useAsync(() => api.feature(slug), [slug]);
  usePageMeta(
    data?.seo_title?.replace(" | Encode Campus", "") || data?.name || "Feature",
    data?.seo_description
  );

  if (loading) return <Section><p className="muted">Loading…</p></Section>;
  if (error || !data)
    return (
      <Section>
        <h1>Module not found</h1>
        <p className="muted">
          <Link to="/features" className="link-arrow">Back to all modules →</Link>
        </p>
      </Section>
    );

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <Reveal>
            <span className="chip">{data.pillar_label}</span>
            <h1 style={{ marginTop: 14 }}>{data.name}</h1>
            <p className="lead">{data.tagline}</p>
            <div className="pagehead__actions">
              <Button to="/demo" arrow>See Encode Campus in Action</Button>
              <Button to="/features" variant="secondary">All modules</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid grid--2">
          <Reveal className="card">
            <span className="eyebrow">The problem</span>
            <p style={{ marginTop: 12 }}>{data.problem}</p>
          </Reveal>
          <Reveal className="card" style={{ background: "var(--sky)", borderColor: "transparent" }}>
            <span className="eyebrow">How Encode Campus solves it</span>
            <p style={{ marginTop: 12 }}>{data.solution}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Capabilities" title={`What ${data.name} covers`} />
        <div className="grid grid--3">
          {data.capabilities.map((c, i) => (
            <Reveal key={c} delay={(i % 3) * 40} className="cap">
              <Icon name="check" size={18} />
              <span>{c}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      {data.benefits?.length > 0 && (
        <Section>
          <SectionHead eyebrow="Outcomes" title="What changes for your institution" />
          <div className="grid grid--3">
            {data.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 50} className="card card--interactive">
                <span className="card__index">{String(i + 1).padStart(2, "0")}</span>
                <p style={{ marginTop: 10, fontWeight: 500 }}>{b}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title={`Ready to connect ${data.name.toLowerCase()} to the rest of your institution?`}
        sub="Book a demo with an education specialist."
      />
    </>
  );
}
