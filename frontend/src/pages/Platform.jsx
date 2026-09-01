import { Link } from "react-router-dom";
import { Section, SectionHead, Reveal, Button } from "../components/ui.jsx";
import { PageHeader, CTASection, PillarShowcase } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import HeroDashboard from "../components/HeroDashboard.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";
import { PILLARS } from "../data/site.js";

export default function Platform() {
  usePageMeta(
    "Platform Overview",
    "One platform for every part of your institution — people, academics, administration, finance, communication, operations and governance."
  );
  const features = useAsync(() => api.features(), []);
  const byPillar = (features.data || []).reduce((acc, f) => {
    (acc[f.pillar] ||= []).push(f);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Platform Overview"
        title="One platform. Every part of your institution."
        actions={
          <>
            <Button to="/demo" arrow>Book a Demo</Button>
            <Button to="/features" variant="secondary">Browse all modules</Button>
          </>
        }
      >
        Encode Campus brings student management, academics, administration, finance,
        communication, people, operations, data and governance together in one connected
        education platform.
      </PageHeader>

      <Section tight>
        <HeroDashboard />
      </Section>

      <Section tone="mist">
        <SectionHead center eyebrow="Seven pillars" title="Connected by design.">
          Rather than 30+ modules dumped onto a page, Encode Campus is organised into
          seven pillars built on one education data model.
        </SectionHead>
        <PillarShowcase />
      </Section>

      <Section>
        <SectionHead eyebrow="Module ecosystem" title="Every module, in its place." />
        {features.loading && <p className="muted">Loading modules…</p>}
        <div className="module-groups">
          {PILLARS.map((p) => {
            const items = byPillar[p.key] || [];
            if (!items.length) return null;
            return (
              <Reveal key={p.key} className="module-group">
                <div className="module-group__head">
                  <span className="pillar__icon">
                    <Icon name={p.icon} />
                  </span>
                  <h3>{p.title}</h3>
                </div>
                <div className="module-group__list">
                  {items.map((f) => (
                    <Link key={f.slug} to={`/features/${f.slug}`} className="module-chip">
                      <strong>{f.name}</strong>
                      <span>{f.tagline}</span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTASection
        title="See the platform on your institution's data."
        sub="Book a walkthrough with an education specialist."
        secondary={{ to: "/product-tour", label: "Take the Product Tour" }}
      />
    </>
  );
}
