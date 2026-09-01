import { useReveal } from "../lib/hooks.js";

/* Animated "connected data" motif: source nodes flow into Encode Campus,
   then into insights & governance. Lines draw once on entering the viewport. */
const SOURCES = ["Students", "Teachers", "Parents", "Finance", "Academics", "HR", "Operations"];

export default function ConnectedDiagram() {
  const [ref, visible] = useReveal({ threshold: 0.3 });
  const W = 920;
  const H = 420;
  const topY = 60;
  const hubY = 210;
  const outY = 360;
  const hubX = W / 2;

  return (
    <div ref={ref} className="cdiagram">
      <svg viewBox={`0 0 ${W} ${H}`} className={`cdiagram__svg ${visible ? "is-in" : ""}`}>
        {SOURCES.map((label, i) => {
          const x = (W / (SOURCES.length + 1)) * (i + 1);
          return (
            <g key={label}>
              <path
                className="cdiagram__edge"
                d={`M ${x} ${topY + 16} C ${x} ${hubY - 60}, ${hubX} ${hubY - 70}, ${hubX} ${hubY - 34}`}
                style={{ animationDelay: `${300 + i * 90}ms` }}
              />
              <g
                className="cdiagram__node"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <rect x={x - 52} y={topY - 16} width="104" height="34" rx="8" />
                <text x={x} y={topY + 6} textAnchor="middle">
                  {label}
                </text>
              </g>
            </g>
          );
        })}

        <g className="cdiagram__hub" style={{ animationDelay: "760ms" }}>
          <rect x={hubX - 96} y={hubY - 32} width="192" height="64" rx="12" />
          <text x={hubX} y={hubY - 2} textAnchor="middle" className="cdiagram__hub-title">
            ENCODE CAMPUS
          </text>
          <text x={hubX} y={hubY + 16} textAnchor="middle" className="cdiagram__hub-sub">
            Data + Automation + Insights
          </text>
        </g>

        <path
          className="cdiagram__edge cdiagram__edge--strong"
          d={`M ${hubX} ${hubY + 34} L ${hubX} ${outY - 34}`}
          style={{ animationDelay: "1000ms" }}
        />

        <g className="cdiagram__out" style={{ animationDelay: "1120ms" }}>
          <rect x={hubX - 150} y={outY - 30} width="300" height="60" rx="12" />
          <text x={hubX} y={outY - 4} textAnchor="middle">
            Insights &amp; Governance
          </text>
          <text x={hubX} y={outY + 16} textAnchor="middle" className="cdiagram__out-sub">
            Better decisions
          </text>
        </g>
      </svg>
    </div>
  );
}
