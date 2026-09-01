import { useReveal, useCountUp } from "../lib/hooks.js";
import { AttendanceTrendChart, FeeCollectionChart } from "./charts.jsx";
import BrowserFrame from "./BrowserFrame.jsx";
import { DASH } from "../data/site.js";

const SIDEBAR = [
  "Overview",
  "Students",
  "Admissions",
  "Academics",
  "Attendance",
  "Examinations",
  "Fees",
  "HR",
  "Operations",
  "Reports",
  "Governance",
];

function Kpi({ item, active }) {
  const decimals = item.format === "pct" || item.format === "cr" ? 1 : 0;
  const n = useCountUp(item.value, { active, decimals });
  const display =
    item.format === "int"
      ? Math.round(n).toLocaleString("en-IN")
      : item.format === "pct"
        ? `${n.toFixed(1)}%`
        : `₹ ${n.toFixed(1)} Cr`;
  return (
    <div className="kpi">
      <span className="kpi__label">{item.label}</span>
      <span className="kpi__value mono-num">{display}</span>
      <span className="kpi__delta">{item.delta}</span>
    </div>
  );
}

export default function HeroDashboard() {
  const [ref, visible] = useReveal({ threshold: 0.25 });

  return (
    <div ref={ref} className={`hero-dash ${visible ? "hero-dash--in" : ""}`}>
      <BrowserFrame label="app.encodecampus / overview">
        <div className="dash">
          <aside className="dash__side">
            <div className="dash__brand">Encode Campus</div>
            <ul>
              {SIDEBAR.map((s, i) => (
                <li key={s} className={i === 0 ? "is-active" : ""}>
                  {s}
                </li>
              ))}
            </ul>
          </aside>

          <div className="dash__main">
            <div className="dash__head">
              <div>
                <p className="dash__greet">Good morning, Principal</p>
                <p className="dash__ctx">Institution overview · 2 Sep 2026</p>
              </div>
              <div className="dash__bell" aria-hidden="true">
                <span className="dash__badge">3</span>
              </div>
            </div>

            <div className="dash__kpis">
              {DASH.kpis.map((k) => (
                <Kpi key={k.label} item={k} active={visible} />
              ))}
            </div>

            <div className="dash__charts">
              <div className="dash__panel">
                <p className="dash__panel-title">Attendance trend</p>
                <AttendanceTrendChart data={DASH.attendanceTrend} height={150} />
              </div>
              <div className="dash__panel">
                <p className="dash__panel-title">Fee collection</p>
                <FeeCollectionChart data={DASH.feeCollection} height={150} />
              </div>
            </div>

            <div className="dash__health">
              <p className="dash__panel-title">Institutional health</p>
              <ul>
                {DASH.health.map((h) => (
                  <li key={h.label}>
                    <span className={`status-dot status-dot--${h.status}`} />
                    <span className="dash__health-label">{h.label}</span>
                    <span className="dash__health-val mono-num">{h.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}
