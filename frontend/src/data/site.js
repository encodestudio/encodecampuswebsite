/* Static marketing content for the Encode Campus website.
   Copy is taken from the Encode Campus website blueprint & plan. */

export const BRAND = {
  name: "Encode Campus",
  category: "Education Operating & Governance Platform",
  tagline: "One Institution. One Platform. One Source of Truth.",
  headline: "The Operating System for Modern Education.",
  supporting:
    "Encode Campus connects students, teachers, administrators, parents, academics, finance, operations and leadership in one intelligent platform.",
  parentCompany: "Encode Studio",
  copyright: `© ${new Date().getFullYear()} Encode Campus. All rights reserved.`,
};

export const NAV = [
  {
    label: "Product",
    to: "/platform",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Platform Overview", to: "/platform" },
          { label: "Reports & Analytics", to: "/analytics" },
          { label: "Governance & Administration", to: "/governance" },
          { label: "Security & Privacy", to: "/security" },
          { label: "Product Tour", to: "/product-tour" },
        ],
      },
      {
        title: "Modules",
        links: [
          { label: "Student Management", to: "/features/student-management" },
          { label: "Admissions", to: "/features/admissions" },
          { label: "Academics", to: "/features/academics" },
          { label: "Attendance", to: "/features/attendance" },
          { label: "Examination & Assessment", to: "/features/examination-assessment" },
        ],
      },
      {
        title: "More modules",
        links: [
          { label: "Fees & Finance", to: "/features/fees-finance" },
          { label: "Communication", to: "/features/communication" },
          { label: "HR & Staff", to: "/features/hr-staff" },
          { label: "Transport", to: "/features/transport" },
          { label: "All modules", to: "/features" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    to: "/solutions",
    columns: [
      {
        title: "By institution",
        links: [
          { label: "Schools", to: "/solutions/schools" },
          { label: "Colleges & Universities", to: "/solutions/colleges-universities" },
          { label: "Coaching Centres", to: "/solutions/coaching-centres" },
          { label: "Education Groups", to: "/solutions/education-groups" },
        ],
      },
    ],
  },
  {
    label: "Why Encode Campus",
    to: "/why-encode-campus",
  },
  {
    label: "Resources",
    to: "/resources",
    columns: [
      {
        title: "Resources",
        links: [
          { label: "Product Tour", to: "/product-tour" },
          { label: "Blog & Guides", to: "/resources" },
          { label: "FAQ", to: "/faq" },
          { label: "Lead Insights", to: "/insights" },
        ],
      },
    ],
  },
  { label: "Pricing", to: "/pricing" },
];

export const FOOTER = [
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", to: "/platform" },
      { label: "All Modules", to: "/features" },
      { label: "Analytics", to: "/analytics" },
      { label: "Governance", to: "/governance" },
      { label: "Security", to: "/security" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Schools", to: "/solutions/schools" },
      { label: "Colleges & Universities", to: "/solutions/colleges-universities" },
      { label: "Coaching Centres", to: "/solutions/coaching-centres" },
      { label: "Education Groups", to: "/solutions/education-groups" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Product Tour", to: "/product-tour" },
      { label: "Blog & Guides", to: "/resources" },
      { label: "FAQ", to: "/faq" },
      { label: "Lead Insights", to: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Book a Demo", to: "/demo" },
    ],
  },
];

export const FOOTER_LEGAL = [
  { label: "Privacy", to: "/security" },
  { label: "Terms", to: "/security" },
  { label: "Security", to: "/security" },
  { label: "Cookie Policy", to: "/security" },
];

export const PILLARS = [
  {
    key: "people",
    title: "People",
    items: ["Students", "Parents", "Teachers", "Staff"],
    icon: "users",
  },
  {
    key: "academics",
    title: "Academics",
    items: ["Classes", "Subjects", "Curriculum", "Exams"],
    icon: "book",
  },
  {
    key: "administration",
    title: "Administration",
    items: ["Admissions", "Documents", "Certificates", "Workflows"],
    icon: "clipboard",
  },
  {
    key: "finance",
    title: "Finance",
    items: ["Fees", "Payments", "Receipts", "Dues"],
    icon: "receipt",
  },
  {
    key: "operations",
    title: "Operations",
    items: ["Transport", "Library", "Inventory", "Visitors"],
    icon: "box",
  },
  {
    key: "communication",
    title: "Communication",
    items: ["Notices", "Email", "SMS", "WhatsApp", "Push"],
    icon: "message",
  },
  {
    key: "governance",
    title: "Governance",
    items: ["Dashboards", "Alerts", "Audit", "Data Quality"],
    icon: "landmark",
  },
];

export const PROBLEMS = [
  {
    index: "01",
    title: "Scattered Data",
    body: "Student and institutional information lives across spreadsheets, registers and disconnected applications.",
  },
  {
    index: "02",
    title: "Manual Work",
    body: "Teams repeatedly enter, reconcile and verify the same information.",
  },
  {
    index: "03",
    title: "Delayed Visibility",
    body: "Management receives reports after the fact instead of seeing the institution live.",
  },
  {
    index: "04",
    title: "Communication Gaps",
    body: "Important information doesn't always reach the right people at the right time.",
  },
  {
    index: "05",
    title: "Limited Visibility",
    body: "Leadership sees individual departments rather than the whole institution.",
  },
  {
    index: "06",
    title: "Reactive Management",
    body: "Problems are discovered only after they have already become operational issues.",
  },
];

export const DIFFERENTIATORS = [
  {
    title: "One Source of Truth",
    body: "Connected institutional data instead of dozens of disconnected records.",
  },
  {
    title: "Built for Education",
    body: "Designed around real education workflows, not a generic ERP.",
  },
  {
    title: "Governance by Design",
    body: "Management visibility and control are built in, not an afterthought.",
  },
  {
    title: "Automation",
    body: "Reduce repetitive administrative work with rules, alerts and workflows.",
  },
  {
    title: "Data Quality",
    body: "Know whether your institutional data can actually be trusted.",
  },
  {
    title: "Scalable Architecture",
    body: "Start with one institution and grow to multiple campuses and types.",
  },
];

export const ERP_COMPARISON = [
  ["Multiple spreadsheets", "One connected platform"],
  ["Separate systems", "Unified data model"],
  ["Manual reports", "Live dashboards"],
  ["Reactive administration", "Alerts & automation"],
  ["Data duplication", "Single student record"],
  ["Limited visibility", "Institutional governance"],
  ["Department silos", "Connected workflows"],
  ["Delayed decisions", "Real-time insights"],
];

export const IMPLEMENTATION_STEPS = [
  { index: "01", title: "Configure", body: "Create your organisation and configure the institution." },
  { index: "02", title: "Migrate", body: "Import existing student and staff data." },
  { index: "03", title: "Set up", body: "Set classes, subjects, fees, roles and workflows." },
  { index: "04", title: "Train", body: "Train administrators and staff on the platform." },
  { index: "05", title: "Launch", body: "Go live across the institution." },
];
export const IMPLEMENTATION_GOVERN = {
  index: "06",
  title: "Govern",
  body: "Management starts running the institution from dashboards, alerts and insights.",
};

export const AUTOMATIONS = [
  {
    trigger: "Attendance drops below threshold",
    action: "Notify parent & administrator",
    tag: "Attendance",
  },
  {
    trigger: "Fee becomes overdue",
    action: "Start reminder workflow → parent notified",
    tag: "Fees",
  },
  {
    trigger: "Student performance declines",
    action: "Flag student → academic alert",
    tag: "Academics",
  },
  {
    trigger: "Required information is missing",
    action: "Create a data-quality exception",
    tag: "Data",
  },
  {
    trigger: "Approval exceeds its SLA",
    action: "Escalate to management",
    tag: "Governance",
  },
];

export const PEOPLE_EXPERIENCES = [
  {
    role: "Management",
    line: "See the institution.",
    items: ["Dashboard", "Governance", "Analytics", "Approvals"],
  },
  {
    role: "Teachers",
    line: "Run your classroom.",
    items: ["Timetable", "Attendance", "Homework", "Marks"],
  },
  {
    role: "Parents",
    line: "Stay connected.",
    items: ["Attendance", "Fees", "Homework", "Results", "Transport"],
  },
];

export const TOUR_FLOWS = {
  Management: ["Dashboard", "Attendance", "Fees", "Academics", "Staff", "Alerts", "Reports"],
  Administrator: ["Admissions", "Students", "Documents", "Certificates", "Fees", "Communication"],
  Teacher: ["Dashboard", "Timetable", "Attendance", "Homework", "Marks", "Students"],
  Parent: ["Dashboard", "Attendance", "Fees", "Results", "Homework", "Transport"],
  Student: ["Timetable", "Homework", "Learning material", "Attendance", "Results", "Notices"],
};

export const FAQ_FALLBACK = [
  {
    question: "What is Encode Campus?",
    answer:
      "Encode Campus is an Education Operating & Governance Platform that brings students, academics, administration, finance, communication, people, operations, data and governance together on one connected platform.",
    category_label: "Product",
  },
  {
    question: "Is Encode Campus a school ERP?",
    answer:
      "It is built for schools today and designed for the entire education ecosystem. Beyond modules, it adds a connected data model, automation and a governance layer.",
    category_label: "Product",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is based on active students or learners per month. Teachers, staff, administrators and parents are included, not licensed individually.",
    category_label: "Pricing",
  },
];

/* ---- Mock datasets for the product dashboards shown on the site ---- */
export const DASH = {
  kpis: [
    { label: "Students", value: 12480, delta: "+3.4%", format: "int" },
    { label: "Attendance", value: 94.2, delta: "+1.8%", format: "pct" },
    { label: "Fee Collection", value: 8.4, delta: "86.4%", format: "cr" },
    { label: "Data Quality", value: 96, delta: "Excellent", format: "pct" },
  ],
  attendanceTrend: [
    { label: "Mon", value: 92.1 },
    { label: "Tue", value: 93.4 },
    { label: "Wed", value: 91.8 },
    { label: "Thu", value: 94.6 },
    { label: "Fri", value: 95.2 },
    { label: "Sat", value: 93.1 },
  ],
  feeCollection: [
    { label: "Apr", value: 72 },
    { label: "May", value: 65 },
    { label: "Jun", value: 81 },
    { label: "Jul", value: 88 },
    { label: "Aug", value: 84 },
    { label: "Sep", value: 86 },
  ],
  health: [
    { label: "Academic Performance", value: 92, status: "healthy" },
    { label: "Attendance Compliance", value: 98, status: "healthy" },
    { label: "Fee Collection", value: 91, status: "attention" },
    { label: "Exam Completion", value: 100, status: "healthy" },
    { label: "Staff Data Completeness", value: 94, status: "healthy" },
  ],
};

export const FINANCE_DASH = {
  demand: 12500000,
  collected: 10800000,
  outstanding: 1700000,
  overdue: 820000,
  collectionRate: 86.4,
};

export const ACADEMIC_DASH = {
  cards: [
    { label: "Class Average", value: "78.4%" },
    { label: "Attendance", value: "94.8%" },
    { label: "Students At Risk", value: "23" },
    { label: "Top Improvement", value: "+12.4%" },
  ],
  subjects: [
    { subject: "Mathematics", score: 82 },
    { subject: "Science", score: 76 },
    { subject: "English", score: 88 },
    { subject: "Social Science", score: 71 },
    { subject: "Second Language", score: 79 },
  ],
  insight:
    "Mathematics performance has improved 8.2% over the previous assessment cycle.",
};

export const ADMISSIONS_FUNNEL = [
  { stage: "Enquiries", value: 1840 },
  { stage: "Applications", value: 1210 },
  { stage: "Verification", value: 960 },
  { stage: "Assessment", value: 720 },
  { stage: "Selection", value: 540 },
  { stage: "Admission", value: 468 },
];

export const GOVERNANCE_DASH = {
  score: 94,
  scoreLabel: "Healthy",
  bars: [
    { label: "Student Data", value: 96 },
    { label: "Attendance", value: 98 },
    { label: "Fee Collection", value: 91 },
    { label: "Exam Completion", value: 100 },
  ],
  counters: [
    { label: "Critical Alerts", value: "03" },
    { label: "Pending Approvals", value: "12" },
    { label: "Data Exceptions", value: "18" },
  ],
};

export const DATA_QUALITY = [
  { label: "Completeness", value: "96%" },
  { label: "Duplicates", value: "12" },
  { label: "Missing Documents", value: "28" },
  { label: "Data Freshness", value: "98%" },
];

export const PROVENANCE = [
  "Parent submitted",
  "Admin verified",
  "Imported from legacy system",
  "Last updated 2 hours ago",
];
