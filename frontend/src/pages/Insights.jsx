import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader } from "../components/blocks.jsx";
import { Metric } from "../components/blocks.jsx";
import { LeadsByMonthChart } from "../components/charts.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";

const SEGMENT_LABEL = { smb: "SMB", mid_market: "Mid-market", high_value: "High value", "": "Unclassified" };
const INST_LABEL = {
  school: "Schools",
  college: "Colleges",
  coaching: "Coaching",
  group: "Education groups",
};

export default function Insights() {
  usePageMeta("Lead Insights", "Live demo-request analytics from the Encode Campus website database.");
  const { data, loading, error } = useAsync(() => api.leadInsights(), []);

  return (
    <>
      <PageHeader eyebrow="Website · Insights" title="Demo-request analytics.">
        Aggregated, non-identifying metrics read live from the website database — the same
        data the marketing and sales teams use to prioritise institutional leads.
      </PageHeader>

      <Section>
        {loading && <p className="muted">Loading insights…</p>}
        {error && (
          <p className="alert alert--error">
            Couldn't reach the API. Start the Django server on port 8000.
          </p>
        )}
        {data && (
          <>
            <div className="grid grid--4">
              <Metric value={data.total} label="Total demo requests" />
              <Metric
                value={data.by_segment.find((s) => s.segment === "high_value")?.count ?? 0}
                label="High-value leads"
                sub="Groups or 2,500+ learners"
              />
              <Metric
                value={data.by_institution.find((s) => s.institution_type === "school")?.count ?? 0}
                label="From schools"
              />
              <Metric value={data.by_month.length} label="Active months" />
            </div>

            <Reveal className="card" style={{ marginTop: 32 }}>
              <p className="dash__panel-title">Demo requests by month</p>
              <LeadsByMonthChart data={data.by_month} />
            </Reveal>

            <div className="grid grid--2" style={{ marginTop: 24 }}>
              <Reveal className="card">
                <p className="dash__panel-title">By segment</p>
                <ul className="bar-list">
                  {data.by_segment.map((s) => {
                    const max = Math.max(...data.by_segment.map((x) => x.count));
                    return (
                      <li key={s.segment || "none"}>
                        <span>{SEGMENT_LABEL[s.segment] ?? s.segment}</span>
                        <span className="gov-bar">
                          <span style={{ width: `${(s.count / max) * 100}%` }} />
                        </span>
                        <b className="mono-num">{s.count}</b>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
              <Reveal className="card">
                <p className="dash__panel-title">By institution type</p>
                <ul className="bar-list">
                  {data.by_institution.map((s) => {
                    const max = Math.max(...data.by_institution.map((x) => x.count));
                    return (
                      <li key={s.institution_type}>
                        <span>{INST_LABEL[s.institution_type] ?? s.institution_type}</span>
                        <span className="gov-bar">
                          <span style={{ width: `${(s.count / max) * 100}%` }} />
                        </span>
                        <b className="mono-num">{s.count}</b>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
