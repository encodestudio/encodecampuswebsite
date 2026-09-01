import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, Reveal } from "../components/ui.jsx";
import Icon from "../components/Icon.jsx";
import { api } from "../lib/api.js";
import { usePageMeta } from "../lib/meta.js";

const INSTITUTIONS = [
  ["school", "School"],
  ["college", "College / University"],
  ["coaching", "Coaching Centre"],
  ["group", "Education Group / Multi-campus"],
];

const BULLETS = [
  "A walkthrough of the connected platform on realistic data",
  "The governance dashboard leadership actually uses",
  "A pricing estimate tailored to your student strength",
  "Answers on migration, integrations and onboarding",
];

const EMPTY = {
  name: "",
  organisation: "",
  designation: "",
  institution_type: "school",
  student_strength: "",
  city: "",
  phone: "",
  email: "",
  current_system: "",
  primary_challenge: "",
  message: "",
};

export default function Demo() {
  usePageMeta("Book a Demo", "See Encode Campus on your institution's data. Book a walkthrough with an education specialist.");
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    try {
      await api.submitDemo({
        ...form,
        student_strength: Number(form.student_strength) || 0,
        source: "website-demo",
      });
      setStatus("done");
      setForm(EMPTY);
    } catch (err) {
      setErrors(err.data || {});
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <Section>
        <Reveal className="card form-done">
          <div className="form-done__icon"><Icon name="check" size={26} /></div>
          <h1>Thanks — we've got your request.</h1>
          <p className="muted">
            An education specialist will be in touch shortly to schedule your walkthrough.
          </p>
          <Link to="/" className="link-arrow">Back to home <span className="arrow">→</span></Link>
        </Reveal>
      </Section>
    );

  return (
    <Section>
      <div className="form-layout">
        <Reveal className="form-aside">
          <span className="eyebrow">Book a Demo</span>
          <h1>See Encode Campus on your institution's data.</h1>
          <p className="lead">
            A 30-minute session with an education specialist — no obligation.
          </p>
          <ul className="ticks">
            {BULLETS.map((b) => (
              <li key={b}><Icon name="check" size={18} /> {b}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="form" className="card form-card" onSubmit={submit}>
          <div className="grid grid--2" style={{ gap: 0, columnGap: 18 }}>
            <div className="field">
              <label htmlFor="d-name">Name *</label>
              <input id="d-name" required value={form.name} onChange={set("name")} />
            </div>
            <div className="field">
              <label htmlFor="d-org">Organisation *</label>
              <input id="d-org" required value={form.organisation} onChange={set("organisation")} />
            </div>
            <div className="field">
              <label htmlFor="d-desig">Designation</label>
              <input id="d-desig" value={form.designation} onChange={set("designation")} />
            </div>
            <div className="field">
              <label htmlFor="d-type">Institution type</label>
              <select id="d-type" value={form.institution_type} onChange={set("institution_type")}>
                {INSTITUTIONS.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="d-strength">Student / learner strength</label>
              <input
                id="d-strength"
                type="number"
                min="0"
                value={form.student_strength}
                onChange={set("student_strength")}
              />
            </div>
            <div className="field">
              <label htmlFor="d-city">City</label>
              <input id="d-city" value={form.city} onChange={set("city")} />
            </div>
            <div className={`field ${errors.phone ? "field--error" : ""}`}>
              <label htmlFor="d-phone">Phone *</label>
              <input id="d-phone" required value={form.phone} onChange={set("phone")} />
              {errors.phone && <span className="hint">{errors.phone}</span>}
            </div>
            <div className={`field ${errors.email ? "field--error" : ""}`}>
              <label htmlFor="d-email">Email *</label>
              <input id="d-email" type="email" required value={form.email} onChange={set("email")} />
              {errors.email && <span className="hint">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="d-sys">Current system</label>
              <input id="d-sys" value={form.current_system} onChange={set("current_system")} />
            </div>
            <div className="field">
              <label htmlFor="d-chal">Primary challenge</label>
              <input id="d-chal" value={form.primary_challenge} onChange={set("primary_challenge")} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="d-msg">Anything else?</label>
            <textarea id="d-msg" rows="3" value={form.message} onChange={set("message")} />
          </div>

          {status === "error" && (
            <p className="alert alert--error">
              Please check the highlighted fields and try again.
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--lg" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Book a Demo"} <span className="arrow">→</span>
          </button>
          <p className="form-note">
            By submitting, you agree to be contacted about Encode Campus. We keep it short.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
