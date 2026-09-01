import { useState } from "react";
import { Section, SectionHead, Reveal, Button } from "../components/ui.jsx";
import { PageHeader } from "../components/blocks.jsx";
import BrowserFrame from "../components/BrowserFrame.jsx";
import {
  AttendanceTrendChart,
  FeeCollectionChart,
  SubjectPerformanceChart,
  AdmissionsFunnelChart,
} from "../components/charts.jsx";
import { usePageMeta } from "../lib/meta.js";
import { TOUR_FLOWS, DASH, ACADEMIC_DASH, ADMISSIONS_FUNNEL } from "../data/site.js";

const ROLES = Object.keys(TOUR_FLOWS);

function Screen({ role, step }) {
  if (step === "Attendance")
    return <AttendanceTrendChart data={DASH.attendanceTrend} height={220} />;
  if (step === "Fees")
    return <FeeCollectionChart data={DASH.feeCollection} height={220} />;
  if (step === "Academics" || step === "Marks" || step === "Results")
    return <SubjectPerformanceChart data={ACADEMIC_DASH.subjects} height={220} />;
  if (step === "Admissions")
    return <AdmissionsFunnelChart data={ADMISSIONS_FUNNEL} />;
  return (
    <div className="tour-screen">
      <div className="mini-dash__cards">
        {DASH.kpis.map((k) => (
          <div key={k.label}>
            <span>{k.label}</span>
            <strong className="mono-num">
              {k.format === "int"
                ? k.value.toLocaleString("en-IN")
                : k.format === "cr"
                  ? `₹ ${k.value} Cr`
                  : `${k.value}%`}
            </strong>
          </div>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 16 }}>
        {role} · {step}
      </p>
    </div>
  );
}

export default function ProductTour() {
  usePageMeta(
    "Product Tour",
    "See Encode Campus in action — choose a role and walk through the interface."
  );
  const [role, setRole] = useState("Management");
  const [step, setStep] = useState(TOUR_FLOWS["Management"][0]);

  const pick = (r) => {
    setRole(r);
    setStep(TOUR_FLOWS[r][0]);
  };

  return (
    <>
      <PageHeader eyebrow="Product Tour" title="See Encode Campus in action.">
        Choose a role and walk through the interface that person actually uses.
      </PageHeader>

      <Section>
        <div className="tour__roles" role="tablist" aria-label="Role">
          {ROLES.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={role === r}
              className={`ptab ${role === r ? "is-active" : ""}`}
              onClick={() => pick(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="tour__body">
          <div className="tour__steps">
            {TOUR_FLOWS[role].map((s) => (
              <button
                key={s}
                className={`tour__step ${step === s ? "is-active" : ""}`}
                onClick={() => setStep(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <Reveal className="tour__frame">
            <BrowserFrame label={`app.encodecampus / ${role.toLowerCase()} / ${step.toLowerCase()}`}>
              <div className="mini-dash">
                <p className="mini-dash__title">
                  {role} · {step}
                </p>
                <Screen role={role} step={step} />
              </div>
            </BrowserFrame>
          </Reveal>
        </div>
      </Section>

      <Section tone="navy" tight>
        <div className="center">
          <h2>Ready to see it on your institution's data?</h2>
          <p className="lead" style={{ color: "#aebbd6", margin: "12px auto 24px" }}>
            Book a guided walkthrough with an education specialist.
          </p>
          <Button to="/demo" arrow>Book a Demo</Button>
        </div>
      </Section>
    </>
  );
}
