import { Link } from "react-router-dom";
import { Button, Reveal, Section, SectionHead } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";
import HeroDashboard from "../components/HeroDashboard.jsx";
import ConnectedDiagram from "../components/ConnectedDiagram.jsx";
import { PillarShowcase, CTASection, FeatureRow, Metric } from "../components/blocks.jsx";
import Accordion from "../components/Accordion.jsx";
import PricingCards from "../components/PricingCards.jsx";
import PricingCalculator from "../components/PricingCalculator.jsx";
import { SubjectPerformanceChart, AdmissionsFunnelChart } from "../components/charts.jsx";
import BrowserFrame from "../components/BrowserFrame.jsx";
import { api, formatINR } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";
import {
  BRAND,
  PROBLEMS,
  DIFFERENTIATORS,
  ERP_COMPARISON,
  AUTOMATIONS,
  PEOPLE_EXPERIENCES,
  ACADEMIC_DASH,
  ADMISSIONS_FUNNEL,
  FINANCE_DASH,
  GOVERNANCE_DASH,
  FAQ_FALLBACK,
} from "../data/site.js";

const INSTITUTIONS = [
  { icon: "landmark", title: "Schools", body: "Manage the complete K–12 institutional lifecycle.", to: "/solutions/schools" },
  { icon: "book", title: "Colleges & Universities", body: "Extend the same connected platform to higher education.", to: "/solutions/colleges-universities" },
  { icon: "users", title: "Coaching Centres", body: "Manage learners, batches, faculty, attendance, fees and performance.", to: "/solutions/coaching-centres" },
  { icon: "layers", title: "Education Groups", body: "Govern multiple institutions through central governance.", to: "/solutions/education-groups" },
];

export default function Home() {
  usePageMeta(
    "Education Operating & Governance Platform",
    "Manage students, academics, attendance, fees, staff, communication, operations, analytics and institutional governance with Encode Campus."
  );
  const faqs = useAsync(() => api.faqs(), []);
  const pricing = useAsync(() => api.pricingPlans("school"), []);
  const faqItems = (faqs.data?.length ? faqs.data : FAQ_FALLBACK).slice(0, 8);

  return (
    <>
      {/* 1 — HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <Reveal className="hero__copy">
            <span className="eyebrow">Education Operating &amp; Governance Platform</span>
            <h1 className="hero__headline">
              The Operating System for <span className="text-blue">Modern Education</span>.
            </h1>
            <p className="hero__sub">{BRAND.supporting}</p>
            <div className="hero__actions">
              <Button to="/demo" size="lg" arrow>
                Book a Demo
              </Button>
              <Button to="/platform" size="lg" variant="secondary">
                Explore Platform
              </Button>
            </div>
            <p className="hero__tagline">{BRAND.tagline}</p>
          </Reveal>
          <div className="hero__visual">
            <HeroDashboard />
          </div>
        </div>
      </section>

      {/* 2 — TRUST / POSITIONING */}
      <Section tight>
        <SectionHead
          center
          eyebrow="Everything connected. Everything visible."
          title="One institution. One connected platform."
        >
          Your institution already has the data it needs. The challenge is that it lives
          across spreadsheets, registers, disconnected applications and departments.
          Encode Campus brings it together.
        </SectionHead>
        <ConnectedDiagram />
      </Section>

      {/* 3 — PROBLEM */}
      <Section tone="mist">
        <SectionHead
          eyebrow="The problem"
          title="Your institution shouldn't run on disconnected systems."
        />
        <div className="grid grid--3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.index} delay={i * 50} className="card card--interactive problem">
              <span className="card__index">{p.index}</span>
              <h3>{p.title}</h3>
              <p className="muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — SOLUTION */}
      <Section>
        <div className="split">
          <Reveal>
            <span className="eyebrow">The solution</span>
            <h2 className="split__title">Everything connected. Everyone aligned.</h2>
            <p className="lead">
              Encode Campus creates a common digital layer across your institution.
            </p>
            <ul className="ticks">
              <li>
                <Icon name="check" size={18} /> One student record connects admissions,
                academics, attendance, examinations, fees, transport, communication and
                documents.
              </li>
              <li>
                <Icon name="check" size={18} /> One staff record connects HR, attendance,
                leave, payroll and responsibilities.
              </li>
              <li>
                <Icon name="check" size={18} /> One institution connects operational
                activity with management-level governance.
              </li>
            </ul>
          </Reveal>
          <Reveal className="split__metrics">
            <Metric value="30+" label="Connected modules" sub="One data model" />
            <Metric value="7" label="Platform pillars" sub="People → Governance" />
            <Metric value="1" label="Source of truth" sub="For every learner" />
            <Metric value="24/7" label="Institutional health" sub="Live, not monthly" />
          </Reveal>
        </div>
      </Section>

      {/* 5 — PLATFORM ECOSYSTEM */}
      <Section tone="mist">
        <SectionHead
          center
          eyebrow="Platform ecosystem"
          title="Everything your institution needs. Connected by design."
        >
          Seven pillars, one connected education data architecture.
        </SectionHead>
        <PillarShowcase />
      </Section>

      {/* 6 — STUDENT MANAGEMENT */}
      <Section>
        <FeatureRow
          eyebrow="Student Management"
          title="One student. One connected record."
          copy="Create a complete digital profile for every student and connect it across the institutional lifecycle."
          points={[
            "Personal & parent/guardian information",
            "Admission & academic history",
            "Attendance, examinations & fees",
            "Documents, transport & library",
            "Student status & alumni transition",
          ]}
          cta={{ to: "/features/student-management", label: "Explore Student Management" }}
          media={
            <BrowserFrame label="app.encodecampus / students">
              <div className="mini-profile">
                <div className="mini-profile__head">
                  <div className="mini-profile__avatar">AS</div>
                  <div>
                    <strong>Aarav Sharma</strong>
                    <span>Class VIII · Section A · EC-2026-01824</span>
                  </div>
                </div>
                <div className="mini-profile__grid">
                  <div><span>Attendance</span><strong>96%</strong></div>
                  <div><span>Fees</span><strong>Paid</strong></div>
                  <div><span>GPA</span><strong>8.7</strong></div>
                  <div><span>Status</span><strong>Active</strong></div>
                </div>
                <div className="mini-profile__tabs">
                  {["Overview", "Academics", "Attendance", "Fees", "Exams", "Documents", "Transport"].map(
                    (t, i) => (
                      <span key={t} className={i === 0 ? "is-active" : ""}>
                        {t}
                      </span>
                    )
                  )}
                </div>
                <div className="mini-profile__lifecycle">
                  Admission → Student → Academics → Attendance → Examination → Alumni
                </div>
              </div>
            </BrowserFrame>
          }
        />
      </Section>

      {/* 7 — ACADEMICS */}
      <Section tone="mist">
        <FeatureRow
          reverse
          eyebrow="Academic Intelligence"
          title="From marks to meaningful insight."
          copy="Encode Campus turns everyday academic activity into a clear picture of performance across students, classes and subjects."
          points={[
            "Sessions, classes, subjects & curriculum",
            "Lesson planning, homework & assignments",
            "Report cards & result publishing",
            "Comparative performance analytics",
          ]}
          cta={{ to: "/features/academics", label: "Explore Academics" }}
          media={
            <BrowserFrame label="app.encodecampus / academics">
              <div className="mini-dash">
                <div className="mini-dash__cards">
                  {ACADEMIC_DASH.cards.map((c) => (
                    <div key={c.label}>
                      <span>{c.label}</span>
                      <strong className="mono-num">{c.value}</strong>
                    </div>
                  ))}
                </div>
                <p className="mini-dash__title">Subject performance</p>
                <SubjectPerformanceChart data={ACADEMIC_DASH.subjects} height={200} />
                <div className="insight">
                  <Icon name="spark" size={16} />
                  <span>{ACADEMIC_DASH.insight}</span>
                </div>
              </div>
            </BrowserFrame>
          }
        />
      </Section>

      {/* 8 — FINANCE (navy) */}
      <section className="section section--navy">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Fees &amp; Finance</span>
            <h2 className="split__title">Know where your institution stands financially.</h2>
            <p className="lead" style={{ color: "#aebbd6" }}>
              Know exactly what is due, what is collected and where money is leaking.
            </p>
            <Link to="/features/fees-finance" className="link-arrow" style={{ color: "#7fd3ee" }}>
              Explore Fees &amp; Finance <span className="arrow">→</span>
            </Link>
          </Reveal>
          <Reveal className="finance-card">
            <div className="finance-card__row">
              <div><span>Demand</span><strong className="mono-num">{formatINR(FINANCE_DASH.demand, { compact: true })}</strong></div>
              <div><span>Collected</span><strong className="mono-num">{formatINR(FINANCE_DASH.collected, { compact: true })}</strong></div>
              <div><span>Outstanding</span><strong className="mono-num">{formatINR(FINANCE_DASH.outstanding, { compact: true })}</strong></div>
              <div><span>Overdue</span><strong className="mono-num">{formatINR(FINANCE_DASH.overdue, { compact: true })}</strong></div>
            </div>
            <div className="finance-card__bartrack">
              <div
                className="finance-card__bar"
                style={{ "--fill": `${FINANCE_DASH.collectionRate}%` }}
              >
                <span>{FINANCE_DASH.collectionRate}% collected</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 — COMMUNICATION */}
      <Section>
        <FeatureRow
          eyebrow="Communication"
          title="Reach the right people at the right time."
          copy="One communication hub across App, Web, Email, SMS, WhatsApp and Push — targeted by role, class or student, with delivery and read tracking."
          points={[
            "Circulars, notices & announcements",
            "Fee, attendance & exam notifications",
            "Targeted audiences & templates",
            "Delivery and read tracking",
          ]}
          cta={{ to: "/features/communication", label: "Explore Communication" }}
          media={
            <BrowserFrame label="app.encodecampus / communication">
              <div className="composer">
                <p className="composer__title">New Announcement</p>
                <div className="composer__field"><span>Audience</span><b>Class VIII · Parents</b></div>
                <div className="composer__field">
                  <span>Channels</span>
                  <b>☑ App&nbsp;&nbsp;☑ Email&nbsp;&nbsp;☑ WhatsApp</b>
                </div>
                <div className="composer__msg">Parent–Teacher Meeting on Saturday, 10:00 AM…</div>
                <div className="composer__actions">
                  <span className="btn btn--secondary btn--sm">Schedule</span>
                  <span className="btn btn--primary btn--sm">Send Now</span>
                </div>
                <div className="composer__track">
                  <div><span>Sent</span><b className="mono-num">1,248</b></div>
                  <div><span>Delivered</span><b className="mono-num">1,239</b></div>
                  <div><span>Read</span><b className="mono-num">1,182</b></div>
                </div>
              </div>
            </BrowserFrame>
          }
        />
      </Section>

      {/* 10 — ANALYTICS / ADMISSIONS */}
      <Section tone="mist">
        <FeatureRow
          reverse
          eyebrow="Reports &amp; Analytics"
          title="Don't just collect data. Use it."
          copy="Role-based dashboards for management, academics, finance and HR turn institutional activity into decisions — starting with a live admissions funnel."
          points={[
            "Management, academic, finance & HR dashboards",
            "Admissions funnel & conversion",
            "Attendance & collection trends",
            "Comparative class and subject analysis",
          ]}
          cta={{ to: "/analytics", label: "Explore Analytics" }}
          media={
            <BrowserFrame label="app.encodecampus / analytics">
              <div className="mini-dash">
                <p className="mini-dash__title">Admissions funnel · this session</p>
                <AdmissionsFunnelChart data={ADMISSIONS_FUNNEL} />
              </div>
            </BrowserFrame>
          }
        />
      </Section>

      {/* 11 — GOVERNANCE (navy) */}
      <section className="section section--navy">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Governance</span>
            <h2 className="split__title">Don't just manage your institution. Govern it.</h2>
            <p className="lead" style={{ color: "#aebbd6" }}>
              Give leadership a real-time view of institutional health, exceptions, data
              quality and critical operational indicators.
            </p>
            <Link to="/governance" className="link-arrow" style={{ color: "#7fd3ee" }}>
              Explore Governance <span className="arrow">→</span>
            </Link>
          </Reveal>
          <Reveal className="gov-card">
            <div className="gov-card__score">
              <div className="gov-card__num mono-num">{GOVERNANCE_DASH.score}</div>
              <div className="gov-card__meta">
                <span className="chip">Institution Health</span>
                <strong>{GOVERNANCE_DASH.scoreLabel}</strong>
              </div>
            </div>
            <ul className="gov-card__bars">
              {GOVERNANCE_DASH.bars.map((b) => (
                <li key={b.label}>
                  <span>{b.label}</span>
                  <span className="gov-bar">
                    <span style={{ width: `${b.value}%` }} />
                  </span>
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
        </div>
      </section>

      {/* 12 — AUTOMATION */}
      <Section>
        <SectionHead
          eyebrow="Automation &amp; Alerts"
          title="Let Encode Campus watch the institution for you."
        >
          Rules turn everyday exceptions into the right notification, workflow or
          escalation — automatically.
        </SectionHead>
        <div className="autos">
          {AUTOMATIONS.map((a, i) => (
            <Reveal key={a.trigger} delay={i * 55} className="auto card">
              <span className="chip">{a.tag}</span>
              <p className="auto__trigger">{a.trigger}</p>
              <span className="auto__arrow" aria-hidden="true">↓</span>
              <p className="auto__action">{a.action}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 13 — PEOPLE EXPERIENCE */}
      <Section tone="mist">
        <SectionHead
          center
          eyebrow="For everyone in the institution"
          title="One platform. Every role, aligned."
        />
        <div className="grid grid--3">
          {PEOPLE_EXPERIENCES.map((p, i) => (
            <Reveal key={p.role} delay={i * 60} className="card card--interactive role">
              <h3>{p.role}</h3>
              <p className="role__line">{p.line}</p>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>
                    <Icon name="check" size={16} /> {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 14 — INSTITUTION TYPES */}
      <Section>
        <SectionHead
          eyebrow="Built for the way education works"
          title="One platform, every type of institution."
        />
        <div className="grid grid--4">
          {INSTITUTIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 50}>
              <Link to={c.to} className="card card--interactive itype">
                <div className="itype__icon">
                  <Icon name={c.icon} />
                </div>
                <h3>{c.title}</h3>
                <p className="muted">{c.body}</p>
                <span className="link-arrow">
                  Learn more <span className="arrow">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 15 — WHY ENCODE CAMPUS */}
      <Section tone="mist">
        <SectionHead
          eyebrow="Why Encode Campus"
          title="More than an ERP."
        >
          Our modules work together because they are built on a connected education data
          architecture.
        </SectionHead>
        <div className="why">
          <div className="why__compare">
            <div className="why__col why__col--old">
              <p className="why__coltitle">Traditional ERP</p>
              {ERP_COMPARISON.map(([a]) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            <div className="why__col why__col--new">
              <p className="why__coltitle">Encode Campus</p>
              {ERP_COMPARISON.map(([, b]) => (
                <span key={b}>
                  <Icon name="check" size={16} /> {b}
                </span>
              ))}
            </div>
          </div>
          <div className="why__diffs grid grid--3">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={i * 40} className="card">
                <h3>{d.title}</h3>
                <p className="muted">{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 16 — PRICING */}
      <Section id="pricing">
        <SectionHead
          center
          eyebrow="Pricing"
          title="Simple pricing. Built around your learners."
        >
          Pay based on active students or learners — not individual users. Teachers,
          staff, administrators and parents are not separately licensed.
        </SectionHead>
        <PricingCards plans={pricing.data} />
        <div className="home-calc">
          <h3 className="center">See what Encode Campus could cost your institution</h3>
          <PricingCalculator />
        </div>
      </Section>

      {/* 17 — FAQ */}
      <Section tone="mist">
        <SectionHead center eyebrow="FAQ" title="Answers before you ask." />
        <div className="faq-wrap">
          <Accordion items={faqItems} />
        </div>
        <p className="center" style={{ marginTop: 28 }}>
          <Link to="/faq" className="link-arrow">
            See all FAQs <span className="arrow">→</span>
          </Link>
        </p>
      </Section>

      {/* 18 — FINAL CTA */}
      <CTASection />
    </>
  );
}
