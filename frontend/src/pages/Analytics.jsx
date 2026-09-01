import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import BrowserFrame from "../components/BrowserFrame.jsx";
import {
  AttendanceTrendChart,
  FeeCollectionChart,
  SubjectPerformanceChart,
  AdmissionsFunnelChart,
} from "../components/charts.jsx";
import { usePageMeta } from "../lib/meta.js";
import { DASH, ACADEMIC_DASH, ADMISSIONS_FUNNEL } from "../data/site.js";

const DASHBOARDS = [
  ["Management", "Student strength, admissions, fees, attendance, academic performance, staff and operations — in one view."],
  ["Academic", "Attendance, results, subject performance, class performance and students at risk."],
  ["Finance", "Demand, collection, outstanding, ageing and payment trends."],
  ["HR", "Headcount, attendance, leave and payroll."],
];

export default function Analytics() {
  usePageMeta(
    "Reports & Analytics",
    "Turn institutional data into decisions with role-based dashboards for management, academics, finance and HR."
  );

  return (
    <>
      <PageHeader eyebrow="Reports &amp; Analytics" title="Turn institutional data into decisions.">
        Encode Campus turns everyday institutional activity into meaningful insight for
        administrators, academic leaders and management — no report requests required.
      </PageHeader>

      <Section>
        <div className="grid grid--2">
          <Reveal className="card">
            <p className="dash__panel-title">Attendance trend</p>
            <AttendanceTrendChart data={DASH.attendanceTrend} height={220} />
          </Reveal>
          <Reveal className="card">
            <p className="dash__panel-title">Fee collection</p>
            <FeeCollectionChart data={DASH.feeCollection} height={220} />
          </Reveal>
          <Reveal className="card">
            <p className="dash__panel-title">Subject performance</p>
            <SubjectPerformanceChart data={ACADEMIC_DASH.subjects} height={240} />
          </Reveal>
          <Reveal className="card">
            <p className="dash__panel-title">Admissions funnel</p>
            <AdmissionsFunnelChart data={ADMISSIONS_FUNNEL} />
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Dashboards" title="A view for every leader." />
        <div className="grid grid--2">
          {DASHBOARDS.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 50} className="card card--interactive">
              <h3>{t} dashboard</h3>
              <p className="muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead center title="The executive dashboard" >
          The same dashboard leaders see every morning — live, not last month.
        </SectionHead>
        <BrowserFrame label="app.encodecampus / analytics">
          <div className="mini-dash">
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
            <div className="grid grid--2" style={{ marginTop: 18 }}>
              <div><p className="dash__panel-title">Attendance</p><AttendanceTrendChart data={DASH.attendanceTrend} height={150} /></div>
              <div><p className="dash__panel-title">Fee collection</p><FeeCollectionChart data={DASH.feeCollection} height={150} /></div>
            </div>
          </div>
        </BrowserFrame>
      </Section>

      <CTASection title="See these dashboards on your data." sub="Book a demo with an education specialist." />
    </>
  );
}
