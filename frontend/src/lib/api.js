// Thin API client for the Encode Campus Django backend.
// In dev, Vite proxies /api -> http://127.0.0.1:8000 (see vite.config.js).

const BASE = import.meta.env.VITE_API_BASE || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const body = isJson ? await res.json() : null;
  if (!res.ok) {
    const err = new Error("Request failed");
    err.status = res.status;
    err.data = body;
    throw err;
  }
  return body;
}

export const api = {
  features: () => request("/features/"),
  feature: (slug) => request(`/features/${slug}/`),
  solutions: () => request("/solutions/"),
  solution: (slug) => request(`/solutions/${slug}/`),
  pricingPlans: (institutionType) =>
    request(`/pricing-plans/${institutionType ? `?institution_type=${institutionType}` : ""}`),
  calculate: ({ institutionType, plan, students }) =>
    request(
      `/pricing/calculate/?institution_type=${institutionType}&plan=${plan}&students=${students}`
    ),
  faqs: () => request("/faqs/"),
  blogPosts: () => request("/blog-posts/"),
  leadInsights: () => request("/insights/leads/"),
  submitDemo: (payload) =>
    request("/demo-requests/", { method: "POST", body: JSON.stringify(payload) }),
  submitContact: (payload) =>
    request("/contact/", { method: "POST", body: JSON.stringify(payload) }),
  subscribe: (email) =>
    request("/newsletter/", { method: "POST", body: JSON.stringify({ email }) }),
};

export function formatINR(value, { compact = false } = {}) {
  const n = Number(value) || 0;
  if (compact) {
    if (n >= 1e7) return `₹ ${(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹ ${(n / 1e5).toFixed(2)} L`;
  }
  return `₹ ${n.toLocaleString("en-IN")}`;
}
