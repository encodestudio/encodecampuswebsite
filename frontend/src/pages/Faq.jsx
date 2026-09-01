import { useMemo, useState } from "react";
import { Section, SectionHead } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import Accordion from "../components/Accordion.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";
import { FAQ_FALLBACK } from "../data/site.js";

export default function Faq() {
  usePageMeta("FAQ", "Answers to common questions about Encode Campus — product, data, pricing, operations and enterprise.");
  const { data } = useAsync(() => api.faqs(), []);
  const faqs = data?.length ? data : FAQ_FALLBACK;

  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category_label || "General"));
    return ["All", ...set];
  }, [faqs]);
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? faqs : faqs.filter((f) => (f.category_label || "General") === cat);

  return (
    <>
      <PageHeader eyebrow="FAQ" title="Frequently asked questions." />
      <Section>
        <div className="ptabs" role="tablist" aria-label="FAQ category">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              className={`ptab ${cat === c ? "is-active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="faq-wrap">
          <Accordion items={filtered} />
        </div>
      </Section>
      <CTASection
        title="Still have a question?"
        sub="Talk to our team."
        primary={{ to: "/contact", label: "Contact us" }}
        secondary={{ to: "/demo", label: "Book a Demo" }}
      />
    </>
  );
}
