import { Link, useParams } from "react-router-dom";
import { Section, SectionHead, Reveal, Button } from "../components/ui.jsx";
import { CTASection } from "../components/blocks.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";

export default function SolutionDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useAsync(() => api.solution(slug), [slug]);
  usePageMeta(data ? `${data.title} — Solutions` : "Solution", data?.description);

  if (loading) return <Section><p className="muted">Loading…</p></Section>;
  if (error || !data)
    return (
      <Section>
        <h1>Solution not found</h1>
        <Link to="/solutions" className="link-arrow">Back to solutions →</Link>
      </Section>
    );

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Solutions · {data.institution_label}</span>
            <h1 style={{ marginTop: 14 }}>{data.headline}</h1>
            <p className="lead">{data.description}</p>
            <div className="pagehead__actions">
              <Button to="/demo" arrow>Book a Demo</Button>
              <Button to="/pricing" variant="secondary">See Pricing</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid grid--2">
          <Reveal>
            <SectionHead eyebrow="Today" title="What institutions struggle with" />
            <ul className="ticks ticks--muted">
              {data.problems.map((p) => (
                <li key={p}><Icon name="bolt" size={18} /> {p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <SectionHead eyebrow="With Encode Campus" title="What changes" />
            <ul className="ticks">
              {data.highlights.map((h) => (
                <li key={h}><Icon name="check" size={18} /> {h}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Modules" title={`A typical ${data.title} deployment`} />
        <div className="module-group__list">
          {data.modules.map((m) => (
            <span key={m} className="module-chip module-chip--static">
              <strong>{m}</strong>
            </span>
          ))}
        </div>
      </Section>

      <CTASection
        title={`See Encode Campus for ${data.title.toLowerCase()}.`}
        sub="Book a walkthrough with an education specialist."
      />
    </>
  );
}
