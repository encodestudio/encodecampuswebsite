import { Section } from "../components/ui.jsx";
import { Button } from "../components/ui.jsx";
import { usePageMeta } from "../lib/meta.js";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <Section>
      <div className="center" style={{ padding: "60px 0" }}>
        <p className="eyebrow">404</p>
        <h1 style={{ marginTop: 12 }}>This page isn't part of the platform.</h1>
        <p className="lead" style={{ margin: "16px auto 28px", maxWidth: 480 }}>
          The link may be old or mistyped. Let's get you back on track.
        </p>
        <Button to="/" arrow>Back to home</Button>
      </div>
    </Section>
  );
}
