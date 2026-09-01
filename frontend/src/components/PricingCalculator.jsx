import { useEffect, useMemo, useRef, useState } from "react";
import { api, formatINR } from "../lib/api.js";
import { useCountUp } from "../lib/hooks.js";
import { Button } from "./ui.jsx";

const INSTITUTIONS = [
  { value: "school", label: "School" },
  { value: "college", label: "College / University" },
  { value: "coaching", label: "Coaching Centre" },
];
const PLANS = [
  { value: "core", label: "Core" },
  { value: "professional", label: "Professional" },
  { value: "enterprise", label: "Enterprise" },
];

/* Local mirror of backend pricing so the number reacts instantly;
   the backend endpoint is the source of truth and is also called. */
const TABLE = {
  school: { core: 15, professional: 25, enterprise: 40 },
  college: { core: 20, professional: 35, enterprise: 55 },
  coaching: { core: 10, professional: 18, enterprise: 30 },
};
const MIN_MONTHLY = 3000;

export default function PricingCalculator() {
  const [institution, setInstitution] = useState("school");
  const [plan, setPlan] = useState("professional");
  const [students, setStudents] = useState(1000);
  const [serverNote, setServerNote] = useState(null);
  const debounce = useRef();

  const local = useMemo(() => {
    const unit = TABLE[institution][plan];
    const raw = unit * (Number(students) || 0);
    const monthly = students > 0 ? Math.max(raw, MIN_MONTHLY) : MIN_MONTHLY;
    return { unit, raw, monthly, minimumApplied: students > 0 && raw < MIN_MONTHLY };
  }, [institution, plan, students]);

  const animatedMonthly = useCountUp(local.monthly, {
    duration: 320,
    active: true,
  });

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      api
        .calculate({ institutionType: institution, plan, students: Number(students) || 0 })
        .then((r) => setServerNote(r))
        .catch(() => setServerNote(null));
    }, 250);
    return () => clearTimeout(debounce.current);
  }, [institution, plan, students]);

  return (
    <div className="calc card">
      <div className="calc__inputs">
        <div className="field">
          <label htmlFor="calc-inst">Institution</label>
          <select
            id="calc-inst"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          >
            {INSTITUTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="calc-plan">Plan</label>
          <select id="calc-plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
            {PLANS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="calc-count">Active students / learners</label>
          <input
            id="calc-count"
            type="number"
            min="0"
            step="50"
            value={students}
            onChange={(e) => setStudents(Math.max(0, Number(e.target.value)))}
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            value={Math.min(students, 10000)}
            onChange={(e) => setStudents(Number(e.target.value))}
            aria-label="Active students slider"
            className="calc__range"
          />
        </div>
      </div>

      <div className="calc__output">
        <p className="calc__label">Your estimated subscription</p>
        <p className="calc__amount mono-num">
          {formatINR(Math.round(animatedMonthly))} <span>/ month</span>
        </p>
        <p className="calc__year mono-num">
          {formatINR(Math.round(local.monthly * 12))} / year
        </p>
        <p className="calc__gst">+ applicable GST</p>
        {(local.minimumApplied || serverNote?.minimum_applied) && (
          <p className="calc__min">
            Minimum subscription of {formatINR(MIN_MONTHLY)}/month applied.
          </p>
        )}
        <p className="calc__unit">
          {formatINR(local.unit)} per active {institution === "school" ? "student" : "learner"} / month
          · teachers, staff & parents included
        </p>
        <div className="calc__cta">
          <Button to="/demo" arrow>
            Book a Demo
          </Button>
          <Button to="/contact" variant="secondary">
            Talk to Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
