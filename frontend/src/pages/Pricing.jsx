import { useState } from "react";
import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import PricingCards from "../components/PricingCards.jsx";
import PricingCalculator from "../components/PricingCalculator.jsx";
import Accordion from "../components/Accordion.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";
import { FAQ_FALLBACK } from "../data/site.js";

const TABS = [
  { value: "school", label: "Schools" },
  { value: "college", label: "Colleges & Universities" },
  { value: "coaching", label: "Coaching Centres" },
];

const RULES = [
  "Billing unit: active student / learner per month.",
  "Teachers, administrators, management, staff and parents are not individually licensed.",
  "Minimum subscription of ₹ 3,000/month.",
  "Prices shown before applicable GST.",
  "Variable third-party usage (SMS, WhatsApp above allowance, payment gateway charges, excess storage, premium integrations) billed separately.",
];

export default function Pricing() {
  usePageMeta(
    "Pricing",
    "Simple pricing that scales with your institution. Pay for active students or learners — not individual users."
  );
  const [tab, setTab] = useState("school");
  const plans = useAsync(() => api.pricingPlans(tab), [tab]);
  const faqs = useAsync(() => api.faqs(), []);
  const pricingFaqs = (faqs.data || FAQ_FALLBACK).filter(
    (f) => (f.category || f.category_label || "").toLowerCase().includes("pricing")
  );

  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple pricing that scales with your institution.">
        Encode Campus is priced around the learners you serve — not the number of people
        who need access. One institution. One subscription. Unlimited operational users.
      </PageHeader>

      <Section tight>
        <div className="ptabs" role="tablist" aria-label="Institution type">
          {TABS.map((t) => (
            <button
              key={t.value}
              role="tab"
              aria-selected={tab === t.value}
              className={`ptab ${tab === t.value ? "is-active" : ""}`}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {plans.loading && <p className="muted center">Loading plans…</p>}
        <PricingCards plans={plans.data} />
      </Section>

      <Section tone="mist">
        <SectionHead center title="See what Encode Campus could cost your institution">
          The amount updates as you change the inputs.
        </SectionHead>
        <PricingCalculator />
      </Section>

      <Section>
        <div className="grid grid--2">
          <Reveal>
            <SectionHead eyebrow="Pricing rules" title="No surprises." />
            <ul className="ticks">
              {RULES.map((r) => (
                <li key={r}><Icon name="check" size={18} /> {r}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="card">
            <h3>Worked example</h3>
            <p className="muted" style={{ marginTop: 8 }}>
              1,000 active students on the Professional plan for a school:
            </p>
            <p className="calc__amount mono-num" style={{ fontSize: 34, marginTop: 12 }}>
              ₹ 25,000 <span>/ month</span>
            </p>
            <p className="mono-num muted">₹ 3,00,000 / year + applicable GST</p>
            <p className="muted" style={{ marginTop: 12 }}>
              80 active students → ₹ 2,000 calculated, billed at the ₹ 3,000/month minimum.
            </p>
          </Reveal>
        </div>
      </Section>

      {pricingFaqs.length > 0 && (
        <Section tone="mist">
          <SectionHead center eyebrow="Pricing FAQ" title="Common pricing questions" />
          <div className="faq-wrap">
            <Accordion items={pricingFaqs} />
          </div>
        </Section>
      )}

      <CTASection
        title="Calculate your cost, then see it live."
        sub="Book a demo and we'll tailor a plan to your institution."
        secondary={{ to: "/contact", label: "Talk to Sales" }}
      />
    </>
  );
}
