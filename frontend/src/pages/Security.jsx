import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { usePageMeta } from "../lib/meta.js";

const CONTROLS = [
  ["Role-based access control", "Every user sees only what their role permits."],
  ["Organisation-level isolation", "Each institution's data is isolated from every other."],
  ["Secure authentication", "Modern authentication with SSO available on Enterprise."],
  ["Audit logs", "Material actions are recorded and attributable."],
  ["Data encryption", "Data protected in transit and at rest."],
  ["Backups & retention", "Regular backups with configurable data-retention controls."],
  ["Access controls & monitoring", "Activity monitoring and granular access management."],
  ["Data export & privacy controls", "Your institution's data remains yours and exportable."],
];

export default function Security() {
  usePageMeta(
    "Security & Privacy",
    "Encode Campus implements role-based access control, organisation-level isolation, secure authentication, audit logs, encryption, backups and data-retention controls."
  );

  return (
    <>
      <PageHeader eyebrow="Security &amp; Privacy" title="Your institution's data deserves institutional-grade protection.">
        We describe exactly what Encode Campus implements — no unsupported claims like
        "military-grade encryption."
      </PageHeader>

      <Section>
        <div className="grid grid--2">
          {CONTROLS.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 40} className="card card--interactive sec">
              <div className="sec__icon"><Icon name="lock" /></div>
              <div>
                <h3>{t}</h3>
                <p className="muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Platform architecture" title="Multi-tenant by design." >
          Platform administrators get central control over the education ecosystem while
          each institution operates independently — organisation creation, module
          entitlements, subscription management and platform-level monitoring.
        </SectionHead>
      </Section>

      <CTASection
        title="Have a security or procurement question?"
        sub="Talk to our team — we'll walk you through the details."
        primary={{ to: "/contact", label: "Contact us" }}
        secondary={{ to: "/demo", label: "Book a Demo" }}
      />
    </>
  );
}
