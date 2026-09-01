import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { usePageMeta } from "../lib/meta.js";
import { DIFFERENTIATORS, ERP_COMPARISON } from "../data/site.js";

const MESSAGES = [
  ["Everything connected.", "Encode Campus eliminates institutional silos."],
  ["One source of truth.", "Institutional information lives in a connected data model."],
  ["Intelligence from data.", "Data becomes dashboards, insights and alerts."],
  ["Governance by design.", "Management gets visibility and control."],
  ["Built to scale.", "One institution today. Multiple campuses and institution types tomorrow."],
];

export default function WhyEncodeCampus() {
  usePageMeta(
    "Why Encode Campus",
    "More than an ERP. Our modules work together because they are built on a connected education data architecture."
  );

  return (
    <>
      <PageHeader eyebrow="Why Encode Campus" title="More than an ERP.">
        A traditional ERP gives you modules and reports. Encode Campus gives you a
        connected platform, live intelligence, automation and institutional governance.
      </PageHeader>

      <Section>
        <SectionHead eyebrow="The Encode Campus difference" title="The old way vs. the connected way" />
        <div className="why__compare why__compare--lg">
          <div className="why__col why__col--old">
            <p className="why__coltitle">Traditional ERP</p>
            {ERP_COMPARISON.map(([a]) => <span key={a}>{a}</span>)}
          </div>
          <div className="why__col why__col--new">
            <p className="why__coltitle">Encode Campus</p>
            {ERP_COMPARISON.map(([, b]) => (
              <span key={b}><Icon name="check" size={16} /> {b}</span>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Six reasons" title="What sets the platform apart" />
        <div className="grid grid--3">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 40} className="card card--interactive">
              <h3>{d.title}</h3>
              <p className="muted">{d.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Brand messaging" title="Five ideas we keep coming back to" />
        <div className="grid grid--2">
          {MESSAGES.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 40} className="msg">
              <span className="card__index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p className="muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Built for schools today. Designed for the entire education ecosystem."
        sub="Start with your school. Grow to multiple campuses and institution types."
      />
    </>
  );
}
