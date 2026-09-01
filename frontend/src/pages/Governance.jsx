import { Section, SectionHead, Reveal, Button } from "../components/ui.jsx";
import { CTASection, StepsRail } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { usePageMeta } from "../lib/meta.js";
import { GOVERNANCE_DASH, DATA_QUALITY, PROVENANCE } from "../data/site.js";

const CAPABILITIES = [
  ["Central administration", "Organisation & multi-campus management, module entitlements, subscription."],
  ["Roles & permissions", "Role-based access, configuration and approval workflows per institution."],
  ["Audit trails", "Every material action recorded and attributable."],
  ["Data quality", "Validation, duplicate detection, completeness, consistency and accuracy indicators."],
  ["Data provenance", "Know whether a value came from manual entry, import, integration, a device, a parent or the system."],
  ["Exception monitoring", "Institutional KPIs, alerts, compliance tracking and operational oversight."],
];

export default function Governance() {
  usePageMeta(
    "Governance & Administration",
    "Give leadership a real-time view of institutional health, exceptions, data quality, approvals and critical operational indicators."
  );

  return (
    <>
      <section className="pagehead pagehead--navy">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Governance &amp; Administration</span>
            <h1>Don't just manage your institution. Govern it.</h1>
            <p className="lead">
              Encode Campus gives leadership a real-time view of institutional health,
              exceptions, data quality and critical operational indicators — and gives
              platform administrators central control across the education ecosystem.
            </p>
            <div className="pagehead__actions">
              <Button to="/demo" arrow>Book a Demo</Button>
              <Button to="/analytics" variant="secondary">See Analytics</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="navy" tight>
        <div className="split">
          <Reveal className="gov-card gov-card--lg">
            <div className="gov-card__score">
              <div className="gov-card__num mono-num">{GOVERNANCE_DASH.score}</div>
              <div className="gov-card__meta">
                <span className="chip">Institution Health</span>
                <strong>{GOVERNANCE_DASH.scoreLabel}</strong>
              </div>
            </div>
            <ul className="gov-card__bars">
              {[...GOVERNANCE_DASH.bars, { label: "Staff Data Completeness", value: 94 }].map((b) => (
                <li key={b.label}>
                  <span>{b.label}</span>
                  <span className="gov-bar"><span style={{ width: `${b.value}%` }} /></span>
                  <b className="mono-num">{b.value}%</b>
                </li>
              ))}
            </ul>
            <div className="gov-card__counters">
              {GOVERNANCE_DASH.counters.map((c) => (
                <div key={c.label}>
                  <b className="mono-num">{c.value}</b>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="split__title">A live governance dashboard.</h2>
            <p className="lead" style={{ color: "#aebbd6" }}>
              One health score for the whole institution, backed by the indicators that
              actually move it — and exceptions that escalate on their own.
            </p>
            <ul className="ticks ticks--dark">
              <li><Icon name="check" size={18} /> Real-time institutional KPIs</li>
              <li><Icon name="check" size={18} /> Automatic exception detection &amp; escalation</li>
              <li><Icon name="check" size={18} /> Pending approvals and SLA tracking</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Capabilities" title="Governance, end to end." />
        <div className="grid grid--3">
          {CAPABILITIES.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 40} className="card card--interactive">
              <h3>{t}</h3>
              <p className="muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Data quality &amp; provenance" title="Can you trust your institutional data?" />
        <div className="grid grid--4">
          {DATA_QUALITY.map((c, i) => (
            <Reveal key={c.label} delay={i * 40} className="card center">
              <div className="metric__value mono-num">{c.value}</div>
              <div className="metric__label">{c.label}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="provenance card">
          <p className="eyebrow">Student record · provenance</p>
          <ul>
            {PROVENANCE.map((p) => (
              <li key={p}><span className="status-dot status-dot--healthy" /> {p}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="From setup to go-live" title="We're with you." />
        <StepsRail
          steps={[
            { index: "01", title: "Configure", body: "Create the organisation and configure the institution." },
            { index: "02", title: "Migrate", body: "Import existing student and staff data." },
            { index: "03", title: "Train", body: "Train administrators and staff." },
            { index: "04", title: "Launch", body: "Go live across the institution." },
          ]}
          highlight={{ index: "05", title: "Govern", body: "Management runs the institution from dashboards, alerts and insights." }}
        />
      </Section>

      <CTASection
        title="Give leadership the view it's missing."
        sub="Book a governance-focused walkthrough."
      />
    </>
  );
}
