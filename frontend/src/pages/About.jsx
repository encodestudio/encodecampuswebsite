import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import { usePageMeta } from "../lib/meta.js";

const NARRATIVE = [
  "Manage your institution.",
  "Connect every department.",
  "Connect every piece of institutional data.",
  "Automate repetitive operations.",
  "See what's happening in real time.",
  "Govern your institution using data.",
];

export default function About() {
  usePageMeta(
    "About",
    "Encode Campus is the Education Operating & Governance Platform — built for schools today, designed for the entire education ecosystem."
  );

  return (
    <>
      <PageHeader eyebrow="About" title="The digital operating and governance layer for education.">
        Encode Campus isn't just software for managing a school. It's the connected
        platform that brings people, academics, operations, finance, communication and
        governance together — and turns institutional data into decisions.
      </PageHeader>

      <Section>
        <div className="split">
          <Reveal>
            <SectionHead eyebrow="Positioning" title="A category, not just a product." />
            <p className="lead">
              We position Encode Campus as an <strong>Education Operating &amp; Governance
              Platform</strong> — not another school ERP. The product story is simple:
              Manage → Connect → Automate → Understand → Govern.
            </p>
          </Reveal>
          <Reveal className="ladder">
            {NARRATIVE.map((n, i) => (
              <div key={n} className="ladder__step">
                <span className="mono-num">{i + 1}</span>
                <p>{n}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Phase 1" title="Built for schools today. Designed for the whole ecosystem." >
          Encode Campus is a connected digital platform that helps educational
          institutions manage their people, academics, administration, finance, operations
          and communication — while giving leadership the data, intelligence and
          governance capabilities to make better decisions. Start with your school. Grow
          to colleges, universities, coaching institutions and multi-campus groups.
        </SectionHead>
      </Section>

      <Section>
        <SectionHead eyebrow="Company" title="An Encode Studio product." >
          Encode Campus is developed by Encode Studio.
        </SectionHead>
      </Section>

      <CTASection />
    </>
  );
}
