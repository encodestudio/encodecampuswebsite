import { Section, SectionHead, Reveal } from "../components/ui.jsx";
import { PageHeader, CTASection } from "../components/blocks.jsx";
import { api } from "../lib/api.js";
import { useAsync } from "../lib/hooks.js";
import { usePageMeta } from "../lib/meta.js";

export default function Resources() {
  usePageMeta(
    "Resources",
    "Guides, leadership content and comparisons for institutions moving to a connected education platform."
  );
  const { data, loading } = useAsync(() => api.blogPosts(), []);

  return (
    <>
      <PageHeader eyebrow="Resources" title="Guides for building a connected institution.">
        Practical writing for school leadership, administrators and education groups.
      </PageHeader>

      <Section>
        {loading && <p className="muted">Loading…</p>}
        <div className="grid grid--3">
          {(data || []).map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 50} className="card card--interactive post">
              <span className="chip">{post.category}</span>
              <h3>{post.title}</h3>
              <p className="muted">{post.excerpt}</p>
              <p className="post__meta">
                {post.author} · {post.read_minutes} min read ·{" "}
                {new Date(post.published_date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Want a walkthrough instead of a whitepaper?"
        sub="Book a demo with an education specialist."
      />
    </>
  );
}
