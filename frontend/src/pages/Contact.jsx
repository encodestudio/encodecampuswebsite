import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, Reveal } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { usePageMeta } from "../lib/meta.js";

const EMPTY = { name: "", email: "", phone: "", organisation: "", subject: "", message: "" };

export default function Contact() {
  usePageMeta("Contact", "Talk to the Encode Campus team about your institution.");
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.submitContact(form);
      setStatus("done");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section>
      <div className="form-layout">
        <Reveal className="form-aside">
          <span className="eyebrow">Contact</span>
          <h1>Talk to the Encode Campus team.</h1>
          <p className="lead">
            Questions about the platform, pricing, security or implementation — we'll get
            back to you quickly.
          </p>
          <ul className="ticks">
            <li><Icon name="message" size={18} /> encodestudio.in@gmail.com</li>
            <li><Icon name="landmark" size={18} /> An Encode Studio product</li>
          </ul>
          <p className="muted">
            Looking for a walkthrough? <Link to="/demo" className="link-arrow">Book a Demo →</Link>
          </p>
        </Reveal>

        {status === "done" ? (
          <Reveal className="card form-done">
            <div className="form-done__icon"><Icon name="check" size={26} /></div>
            <h2>Message sent.</h2>
            <p className="muted">We'll reply to {form.email || "your email"} soon.</p>
          </Reveal>
        ) : (
          <Reveal as="form" className="card form-card" onSubmit={submit}>
            <div className="grid grid--2" style={{ gap: 0, columnGap: 18 }}>
              <div className="field">
                <label htmlFor="c-name">Name *</label>
                <input id="c-name" required value={form.name} onChange={set("name")} />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email *</label>
                <input id="c-email" type="email" required value={form.email} onChange={set("email")} />
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone</label>
                <input id="c-phone" value={form.phone} onChange={set("phone")} />
              </div>
              <div className="field">
                <label htmlFor="c-org">Organisation</label>
                <input id="c-org" value={form.organisation} onChange={set("organisation")} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-subject">Subject</label>
              <input id="c-subject" value={form.subject} onChange={set("subject")} />
            </div>
            <div className="field">
              <label htmlFor="c-msg">Message *</label>
              <textarea id="c-msg" rows="5" required value={form.message} onChange={set("message")} />
            </div>
            {status === "error" && (
              <p className="alert alert--error">Something went wrong — please try again.</p>
            )}
            <button type="submit" className="btn btn--primary btn--lg" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
