"""Seed the database with Encode Campus marketing content.

Idempotent: safe to run repeatedly. Content is lifted from the Encode Campus
website blueprint, plan and visual-design-system specifications.

    python manage.py seed_content
    python manage.py seed_content --demo-leads   # also add sample leads for the insights chart
"""

import datetime
import random

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.text import slugify

from api.models import (
    BlogPost,
    DemoRequest,
    FAQ,
    Feature,
    PricingPlan,
    Solution,
)

FEATURES = [
    {
        "name": "Student Management",
        "pillar": "people",
        "icon": "user",
        "tagline": "One student. One connected record.",
        "problem": "Student information is spread across admissions files, class registers, fee software and spreadsheets, so no single record can be trusted.",
        "solution": "Every student gets one institutional identity that connects admission, academics, attendance, examinations, fees, transport, documents and communication.",
        "capabilities": [
            "Unique student identity", "Personal & parent/guardian information",
            "Admission & academic history", "Class / section allocation",
            "Attendance & examination history", "Fee history & ledgers",
            "Documents & certificates", "Transport & library records",
            "Discipline records", "Student status & alumni transition",
        ],
        "benefits": [
            "A single source of truth for every learner",
            "No duplicate or conflicting records across departments",
            "Full lifecycle visibility from enquiry to alumni",
        ],
        "seo_title": "Student Management System | Encode Campus",
        "seo_description": "Create one connected digital record for every student and connect it across admissions, academics, attendance, examinations and fees.",
    },
    {
        "name": "Admissions",
        "pillar": "administration",
        "icon": "clipboard",
        "tagline": "Run the entire admission lifecycle in one place.",
        "problem": "Enquiries live in notebooks and WhatsApp, applications in paper forms, and leadership has no view of conversion.",
        "solution": "Encode Campus manages the funnel from first enquiry to a confirmed student record, with analytics for leadership.",
        "capabilities": [
            "Enquiry & lead capture", "Online applications & forms",
            "Document collection & verification", "Interview & assessment scheduling",
            "Selection & offers", "Admission fee collection", "Seat & class allocation",
            "Automatic student record creation", "Admission analytics & funnel",
        ],
        "benefits": [
            "See conversion rate and applications by source",
            "Faster, paperless admissions",
            "Every admitted student starts with a complete record",
        ],
        "seo_title": "School Admissions Management Software | Encode Campus",
        "seo_description": "Manage enquiries, applications, verification, selection and admission confirmation with a connected admissions funnel.",
    },
    {
        "name": "Academics",
        "pillar": "academics",
        "icon": "book",
        "tagline": "Make academic operations easier to manage.",
        "problem": "Curriculum, timetables, lesson plans and homework are managed separately from student and exam data.",
        "solution": "A single academic engine covers sessions, classes, subjects, curriculum, allocation and day-to-day teaching — ready to extend to colleges and coaching.",
        "capabilities": [
            "Academic sessions", "Classes, sections & subjects", "Curriculum & syllabus",
            "Subject & teacher allocation", "Academic calendar", "Lesson planning",
            "Homework & assignments", "Study material & learning resources",
            "Academic progress tracking", "Timetable & examinations",
        ],
        "benefits": [
            "One academic structure the whole institution shares",
            "Teachers plan, assign and track in one workspace",
            "Architecture ready for schools, colleges and coaching",
        ],
        "seo_title": "Academic Management Software | Encode Campus",
        "seo_description": "Manage academic sessions, curriculum, timetables, lesson planning, homework and academic progress on one connected platform.",
    },
    {
        "name": "Attendance",
        "pillar": "academics",
        "icon": "check",
        "tagline": "Attendance that doesn't stop at marking presence.",
        "problem": "Daily registers don't surface absenteeism patterns until they have already become academic problems.",
        "solution": "Daily and period attendance for students and staff, with alerts, parent notifications and analytics that flag patterns early.",
        "capabilities": [
            "Student & staff attendance", "Daily & period-wise attendance",
            "Leave management", "Late arrival & early departure",
            "Attendance history & reports", "Attendance alerts & parent notifications",
            "Attendance analytics", "Biometric / RFID / face-recognition ready",
        ],
        "benefits": [
            "Identify absenteeism patterns before they hurt results",
            "Parents notified automatically",
            "Works with biometric and RFID devices",
        ],
        "seo_title": "School Attendance Management Software | Encode Campus",
        "seo_description": "Track student and staff attendance daily and period-wise, with alerts, parent notifications and attendance analytics.",
    },
    {
        "name": "Examination & Assessment",
        "pillar": "academics",
        "icon": "award",
        "tagline": "From marks to meaningful insight.",
        "problem": "Exam software captures marks but gives leadership no view of weak subjects, at-risk students or teacher trends.",
        "solution": "Configure exams, assessments and grading, publish results and report cards, and analyse performance across students, classes and subjects.",
        "capabilities": [
            "Examination setup & assessment types", "Marks entry & grade systems",
            "Weightage & internal assessment", "Practical assessment",
            "Report cards & result publishing", "Student / class / subject performance",
            "Comparative analytics", "Academic trends",
        ],
        "benefits": [
            "Spot weak subjects and students at risk early",
            "Consistent, auditable grading",
            "Publish results to parents in a click",
        ],
        "seo_title": "School Examination & Assessment Software | Encode Campus",
        "seo_description": "Create exams, configure assessments and grades, publish report cards and analyse performance across students, classes and subjects.",
    },
    {
        "name": "Fees & Finance",
        "pillar": "finance",
        "icon": "receipt",
        "tagline": "Know what is due, collected and outstanding.",
        "problem": "Fee data lives in a separate tool, so leadership can't see collection, ageing or where money is leaking.",
        "solution": "Model fee structures, collect online, track dues and reconcile — with a live collection dashboard for management.",
        "capabilities": [
            "Fee structures & fee heads", "Class-wise & student-specific fees",
            "Discounts, scholarships & concessions", "Installments & invoices",
            "Receipts & online payments", "Dues, reminders & refunds",
            "Student ledger", "Collection, outstanding & ageing reports",
        ],
        "benefits": [
            "Live view of demand, collection and overdue",
            "Automated reminders improve collection rate",
            "Every rupee traceable to a student ledger",
        ],
        "seo_title": "School Fee Management Software | Encode Campus",
        "seo_description": "Manage fee structures, online payments, dues, reminders and refunds with live collection, outstanding and ageing analytics.",
    },
    {
        "name": "Communication",
        "pillar": "communication",
        "icon": "message",
        "tagline": "Reach the right people at the right time.",
        "problem": "Important information doesn't always reach the right people, and there is no record of what was sent or read.",
        "solution": "One communication hub across app, web, email, SMS, WhatsApp and push — targeted by role, class or student, with delivery and read tracking.",
        "capabilities": [
            "Circulars, notices & announcements", "Fee, attendance & exam notifications",
            "Homework & event communication", "Emergency notifications",
            "Targeted audiences (institution, class, section, role)", "Templates & scheduling",
            "Delivery tracking", "Read tracking",
        ],
        "benefits": [
            "Every message reaches the intended audience",
            "Know what was delivered and read",
            "Consistent, on-brand institutional communication",
        ],
        "seo_title": "School Communication Software | Encode Campus",
        "seo_description": "Send circulars, notices and alerts across app, email, SMS, WhatsApp and push — targeted by audience with delivery and read tracking.",
    },
    {
        "name": "HR & Staff",
        "pillar": "people",
        "icon": "users",
        "tagline": "Manage the full employment lifecycle.",
        "problem": "Staff records, attendance, leave and payroll sit in different systems and rarely reconcile.",
        "solution": "One staff record connects HR, attendance, leave, payroll, performance and responsibilities.",
        "capabilities": [
            "Employee profiles & documents", "Departments & designations",
            "Joining information", "Attendance & leave", "Payroll & salary structures",
            "Payslips", "Staff performance", "Role assignment & employment lifecycle",
        ],
        "benefits": [
            "Headcount, attendance and payroll in one dashboard",
            "Accurate, on-time payroll",
            "Clear roles and responsibilities",
        ],
        "seo_title": "School HR & Payroll Software | Encode Campus",
        "seo_description": "Manage staff profiles, attendance, leave, payroll, payslips and performance with a connected HR dashboard.",
    },
    {
        "name": "Timetable & Scheduling",
        "pillar": "academics",
        "icon": "calendar",
        "tagline": "Drag, schedule, detect conflicts, publish.",
        "problem": "Timetables are built in spreadsheets, so clashes and substitutions are found the hard way.",
        "solution": "Build class and teacher timetables with room allocation, automatic conflict detection, substitutions and an academic calendar.",
        "capabilities": [
            "Class & teacher timetables", "Room allocation", "Subject & period scheduling",
            "Conflict detection", "Substitution management", "Academic calendar & events",
        ],
        "benefits": [
            "No double-booked teachers or rooms",
            "Substitutions handled in minutes",
            "Everyone sees the same schedule",
        ],
        "seo_title": "School Timetable Software | Encode Campus",
        "seo_description": "Create class and teacher timetables with room allocation, conflict detection, substitutions and an academic calendar.",
    },
    {
        "name": "Transport",
        "pillar": "operations",
        "icon": "bus",
        "tagline": "Every route, vehicle and student — accounted for.",
        "problem": "Route allocation, transport fees and vehicle documents are managed on paper with no visibility for parents.",
        "solution": "Manage vehicles, drivers, routes and stops, allocate students, bill transport fees and offer live tracking to parents.",
        "capabilities": [
            "Vehicles, drivers, routes & stops", "Student allocation", "Transport fees",
            "Vehicle documents & driver records", "GPS integration & live tracking",
            "Transport attendance", "Alerts",
        ],
        "benefits": [
            "Parents can see where the bus is",
            "Transport fees tied to the student ledger",
            "Document and compliance reminders",
        ],
        "seo_title": "School Transport Management Software | Encode Campus",
        "seo_description": "Manage vehicles, drivers, routes, stops, student allocation, transport fees and live GPS tracking with parent alerts.",
    },
    {
        "name": "Library",
        "pillar": "operations",
        "icon": "library",
        "tagline": "A catalogue that stays in sync with every student.",
        "problem": "Library issue/return lives in an isolated register with no link to the student record.",
        "solution": "Catalogue books, manage copies, issue, return, renew and reserve, and track overdue items and fines against the student.",
        "capabilities": [
            "Book catalogue, categories, authors & publishers", "Copies management",
            "Issue, return, renewal & reservation", "Overdue tracking & fines",
            "Library analytics",
        ],
        "benefits": [
            "Fines flow to the student ledger",
            "Know what is issued and overdue",
            "Usage analytics for acquisitions",
        ],
        "seo_title": "School Library Management Software | Encode Campus",
        "seo_description": "Catalogue books, manage copies, issue/return/renewal/reservation, and track overdue items and fines against the student record.",
    },
    {
        "name": "Inventory & Assets",
        "pillar": "operations",
        "icon": "box",
        "tagline": "Procurement to audit trail, connected to governance.",
        "problem": "Assets and stock are tracked in spreadsheets with no procurement workflow or audit trail.",
        "solution": "Manage inventory, assets, vendors and procurement, allocate and maintain assets, and keep a full audit trail.",
        "capabilities": [
            "Inventory & assets", "Categories & vendors", "Purchase requests & orders",
            "Stock & issue/return", "Asset allocation & maintenance",
            "Depreciation-ready data", "Audit trail",
        ],
        "benefits": [
            "Know what you own and where it is",
            "Structured procurement approvals",
            "Audit-ready records",
        ],
        "seo_title": "School Inventory & Asset Management Software | Encode Campus",
        "seo_description": "Manage inventory, assets, vendors, procurement, stock, allocation and maintenance with a full audit trail.",
    },
    {
        "name": "Certificates & Documents",
        "pillar": "administration",
        "icon": "file",
        "tagline": "Issue verified documents with an approval workflow.",
        "problem": "Bonafide, transfer and character certificates are typed manually with no template control or history.",
        "solution": "Certificate templates, approval workflows, digital issuance and verification, with a full document repository and history.",
        "capabilities": [
            "Certificate templates", "Bonafide / transfer / character certificates",
            "Student document repository", "Approval workflows", "Digital issuance & verification",
            "Certificate history",
        ],
        "benefits": [
            "Consistent, tamper-evident certificates",
            "Clear approval accountability",
            "Instant verification",
        ],
        "seo_title": "School Certificate & Document Management | Encode Campus",
        "seo_description": "Generate bonafide, transfer and character certificates from templates with approval workflows, digital issuance and verification.",
    },
    {
        "name": "Visitor & Gate Management",
        "pillar": "operations",
        "icon": "shield",
        "tagline": "Know who is on campus, and why.",
        "problem": "Gate registers are paper-based, with no link to hosts, students or emergencies.",
        "solution": "Register visitors, capture purpose and host, issue gate passes, manage student pickup and keep security logs.",
        "capabilities": [
            "Visitor registration", "Check-in / check-out", "Purpose & host identification",
            "Gate pass", "Student pickup", "Staff entry", "Emergency records & security logs",
        ],
        "benefits": [
            "Auditable record of everyone on campus",
            "Safer, verified student pickup",
            "Fast emergency roll information",
        ],
        "seo_title": "School Visitor & Gate Management | Encode Campus",
        "seo_description": "Register visitors, capture purpose and host, issue gate passes, manage student pickup and keep security logs.",
    },
    {
        "name": "Reports & Analytics",
        "pillar": "governance",
        "icon": "chart",
        "tagline": "Turn institutional data into decisions.",
        "problem": "Leadership waits for hand-built reports instead of seeing the institution live.",
        "solution": "Role-based dashboards for management, academics, finance and HR turn everyday activity into meaningful insight.",
        "capabilities": [
            "Management dashboard (strength, admissions, fees, attendance, academics, staff)",
            "Academic dashboard (results, subject & class performance)",
            "Finance dashboard (demand, collection, outstanding, ageing, trends)",
            "HR dashboard (headcount, attendance, leave, payroll)",
            "Attendance & admissions trends", "Comparative analysis",
        ],
        "benefits": [
            "See the institution live, not last month",
            "Every leader gets the view they need",
            "Decisions backed by data",
        ],
        "seo_title": "Education Analytics Platform | Encode Campus",
        "seo_description": "Role-based dashboards for management, academics, finance and HR that turn institutional activity into meaningful insight.",
    },
    {
        "name": "Governance & Administration",
        "pillar": "governance",
        "icon": "landmark",
        "tagline": "Don't just manage your institution. Govern it.",
        "problem": "Leadership sees individual departments rather than the whole institution, and problems surface late.",
        "solution": "A real-time view of institutional health, exceptions, data quality, pending approvals and critical indicators — plus platform-level organisation control.",
        "capabilities": [
            "Institution health & KPIs", "Exception & alert monitoring",
            "Data quality & provenance", "Approval workflows & audit trails",
            "Roles, permissions & configuration", "Organisation & multi-campus management",
            "Module entitlements & subscription", "Platform-level monitoring",
        ],
        "benefits": [
            "One health score for the whole institution",
            "Exceptions escalate automatically",
            "Central control with institutional independence",
        ],
        "seo_title": "Education Governance Platform | Encode Campus",
        "seo_description": "Give leadership a real-time view of institutional health, exceptions, data quality, approvals and critical indicators.",
    },
]

SOLUTIONS = [
    {
        "institution_type": "school",
        "title": "Schools",
        "headline": "Complete K–12 institutional management.",
        "description": "Run the entire school lifecycle — admissions, students, academics, attendance, examinations, fees, communication, people and operations — on one connected platform, with governance built in for leadership.",
        "problems": [
            "Student data scattered across registers, spreadsheets and point tools",
            "Fee collection and dues with no live visibility",
            "Communication that doesn't reliably reach parents",
            "Leadership seeing departments, not the whole school",
        ],
        "highlights": [
            "One connected student record", "Live fee collection dashboard",
            "Multi-channel parent communication", "Institution health & governance",
            "Parent, teacher and student apps",
        ],
        "modules": [
            "Student Management", "Admissions", "Academics", "Attendance",
            "Examination & Assessment", "Fees & Finance", "Communication", "HR & Staff",
            "Timetable", "Transport", "Library", "Certificates & Documents", "Governance",
        ],
    },
    {
        "institution_type": "college",
        "title": "Colleges & Universities",
        "headline": "Extend the same connected platform to higher education.",
        "description": "The same academic engine, student record and governance layer scale to departments, programmes, semesters and larger learner populations.",
        "problems": [
            "Programme and semester structures managed in silos",
            "Disconnected examination and results processes",
            "Fee structures that vary by programme and cohort",
            "No consolidated view across departments",
        ],
        "highlights": [
            "Programme & semester structures", "Departmental academic operations",
            "Flexible fee models", "Consolidated leadership dashboards",
            "Ready for multi-department governance",
        ],
        "modules": [
            "Student Information System", "Admissions", "Academics", "Attendance",
            "Examination & Assessment", "Fees & Finance", "Communication", "HR & Staff",
            "Analytics", "Governance",
        ],
    },
    {
        "institution_type": "coaching",
        "title": "Coaching Centres",
        "headline": "Manage learners, batches, faculty, attendance, fees and performance.",
        "description": "A lighter operational footprint on the same platform architecture — built around batches, test performance and fee cycles.",
        "problems": [
            "Batch and learner data in spreadsheets",
            "Test performance tracked manually",
            "Fee cycles and dues hard to follow",
            "No single view of learner progress",
        ],
        "highlights": [
            "Batch & learner management", "Test & performance analytics",
            "Fee cycles and reminders", "Faculty allocation and attendance",
            "Learner and parent communication",
        ],
        "modules": [
            "Student Management", "Admissions", "Academics", "Attendance",
            "Examination & Assessment", "Fees & Finance", "Communication", "Analytics",
        ],
    },
    {
        "institution_type": "group",
        "title": "Education Groups",
        "headline": "Govern multiple institutions from one platform.",
        "description": "Central administration, module entitlements, cross-campus analytics and advanced governance dashboards for multi-campus institutions and education groups.",
        "problems": [
            "Each campus on a different system",
            "No comparable data across institutions",
            "Central team lacks visibility and control",
            "Inconsistent processes and policies",
        ],
        "highlights": [
            "Central organisation administration", "Cross-campus analytics",
            "Advanced governance dashboards", "Module entitlements & subscription control",
            "Custom workflows and integrations",
        ],
        "modules": [
            "Governance & Administration", "Analytics", "Student Information System",
            "Fees & Finance", "Communication", "HR & Staff",
        ],
    },
]

PLAN_FEATURES = {
    "core": [
        "Organisation & institution setup", "Student, parent & staff management",
        "Admissions", "Attendance", "Basic academics & timetable",
        "Basic examinations", "Fees", "Notices", "Basic reports & dashboards",
        "Mobile / web access", "Role-based access", "Standard support",
    ],
    "professional": [
        "Everything in Core", "Advanced academics & examination",
        "Performance analytics", "Advanced fee management",
        "Communication hub + WhatsApp", "HR, leave & payroll",
        "Library, transport & inventory", "Certificates & visitor management",
        "Advanced dashboards", "Automation, alerts & data-quality monitoring",
        "Approval workflows & audit trails", "Parent / student / teacher apps",
        "Priority support",
    ],
    "enterprise": [
        "Everything in Professional", "Multi-campus governance & central administration",
        "Cross-campus analytics", "Advanced governance dashboards",
        "Custom workflows", "Advanced integrations & API access", "SSO",
        "Advanced data controls & custom reporting", "Dedicated account management",
        "Priority SLA & enhanced onboarding", "Enterprise support",
    ],
}

PRICING = [
    ("school", "Core", "15", "Essential institutional operations.", False, "Get Started"),
    ("school", "Professional", "25", "The complete institution platform.", True, "Book a Demo"),
    ("school", "Enterprise", "40", "Advanced governance and scale.", False, "Talk to Sales"),
    ("college", "Core", "20", "Essential higher-ed operations.", False, "Get Started"),
    ("college", "Professional", "35", "The complete higher-ed platform.", True, "Book a Demo"),
    ("college", "Enterprise", "55", "Advanced governance and scale.", False, "Talk to Sales"),
    ("coaching", "Core", "10", "Essential coaching operations.", False, "Get Started"),
    ("coaching", "Professional", "18", "The complete coaching platform.", True, "Book a Demo"),
    ("coaching", "Enterprise", "30", "Advanced governance and scale.", False, "Talk to Sales"),
]

FAQS = [
    ("product", "What is Encode Campus?",
     "Encode Campus is an Education Operating & Governance Platform. It brings students, academics, administration, finance, communication, people, operations, data and institutional governance together on one connected platform, so leadership can manage and govern the institution from a single source of truth."),
    ("product", "Is Encode Campus just a school ERP?",
     "No. Encode Campus is built for schools today and designed for the entire education ecosystem — colleges, universities, coaching centres and multi-campus education groups. Beyond modules, it adds a connected data model, automation and a governance layer that a conventional ERP does not."),
    ("product", "Is it cloud-based, and does it have mobile apps?",
     "Yes. Encode Campus is a cloud platform with dedicated experiences for management, administrators, teachers, parents and students."),
    ("product", "Can multiple campuses use Encode Campus?",
     "Yes. Start with one institution and grow to multiple campuses with central governance, cross-campus analytics and module entitlements managed centrally."),
    ("data", "Can we migrate our existing data?",
     "Yes. Onboarding includes structured import of your existing student and staff data, followed by configuration of classes, subjects, fees, roles and workflows."),
    ("data", "Can we export our data?",
     "Yes. Your institution's data remains yours and can be exported. Enterprise plans add advanced data controls and custom reporting."),
    ("data", "How is institutional data protected, and is each institution isolated?",
     "Encode Campus implements role-based access control, organisation-level isolation, secure authentication, audit logs, encryption, backups and data-retention controls. We describe exactly what is implemented rather than making unsupported claims."),
    ("pricing", "How is Encode Campus priced?",
     "Pricing is based on active students or learners per month. Teachers, administrators, staff and parents are included, not licensed individually. One institution, one subscription, unlimited operational users."),
    ("pricing", "Who counts as an active student, and are teachers or parents charged?",
     "You pay for active students/learners only. Teachers, staff, administrators and parents are never charged separately."),
    ("pricing", "Is there a minimum subscription, and is GST included?",
     "There is a minimum subscription of ₹ 3,000/month so very small institutions remain viable to support. All prices are shown before applicable GST."),
    ("pricing", "Can we upgrade later?",
     "Yes. You can start on Core or Professional and upgrade as your needs grow. Professional is the recommended plan for most institutions."),
    ("operations", "Does it support CBSE / ICSE / state boards, and custom workflows?",
     "Yes. Academic structure, grading, report cards and approval workflows are configurable to your board and your institution's processes."),
    ("operations", "Can we integrate biometric devices, payment gateways and WhatsApp?",
     "Yes. Attendance integrates with biometric, RFID and face-recognition devices; fees integrate with payment gateways; and communication includes WhatsApp (usage above the included allowance is billed separately)."),
    ("enterprise", "Can education groups manage multiple institutions with central governance?",
     "Yes. Education groups get central administration, cross-campus analytics, advanced governance dashboards, custom workflows and module entitlement control."),
    ("enterprise", "Does Encode Campus provide APIs and SSO?",
     "Enterprise plans include API access, SSO and advanced integrations."),
]

BLOG_POSTS = [
    ("How to Digitise a School: A Practical Framework", "Guides",
     "A step-by-step framework for moving a school from spreadsheets and registers to one connected platform — without disrupting the academic year."),
    ("What Should a Principal See on a School Dashboard?", "Leadership",
     "The eight indicators every institutional leader should be able to see live: strength, admissions, attendance, fee collection, academic performance, staff, data quality and open exceptions."),
    ("How to Improve Fee Collection Without Chasing Parents", "Guides",
     "Why collection rate stalls, and how structured fee heads, installments, automated reminders and a live ageing view change the outcome."),
    ("School ERP vs Education Operating & Governance Platform", "Comparison",
     "Modules versus a connected platform: what actually changes when institutional data shares one model and governance is built in."),
    ("Building a Data-Driven School: From Records to Decisions", "Leadership",
     "Data quality, provenance and live dashboards — the ingredients that turn institutional activity into decisions management can trust."),
    ("A School Governance Framework for Multi-Campus Groups", "Guides",
     "Central administration, module entitlements, cross-campus analytics and exception monitoring for education groups running several institutions."),
]


class Command(BaseCommand):
    help = "Seed Encode Campus marketing content (idempotent)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--demo-leads",
            action="store_true",
            help="Also create sample demo requests for the insights chart.",
        )

    def handle(self, *args, **options):
        self._seed_features()
        self._seed_solutions()
        self._seed_pricing()
        self._seed_faqs()
        self._seed_blog()
        if options["demo_leads"]:
            self._seed_demo_leads()
        self.stdout.write(self.style.SUCCESS("Seed complete."))

    def _seed_features(self):
        for order, data in enumerate(FEATURES, start=1):
            Feature.objects.update_or_create(
                slug=slugify(data["name"]),
                defaults={**data, "order": order, "is_published": True},
            )
        self.stdout.write(f"  features: {Feature.objects.count()}")

    def _seed_solutions(self):
        for order, data in enumerate(SOLUTIONS, start=1):
            Solution.objects.update_or_create(
                institution_type=data["institution_type"],
                defaults={**data, "slug": slugify(data["title"]), "order": order},
            )
        self.stdout.write(f"  solutions: {Solution.objects.count()}")

    def _seed_pricing(self):
        for order, (inst, name, price, positioning, popular, cta) in enumerate(PRICING, start=1):
            PricingPlan.objects.update_or_create(
                institution_type=inst,
                slug=slugify(name),
                defaults={
                    "name": name,
                    "price_per_student": price,
                    "positioning": positioning,
                    "is_popular": popular,
                    "cta_label": cta,
                    "features": PLAN_FEATURES[name.lower()],
                    "order": order,
                    "price_caption": "per active learner / month"
                    if inst != "school"
                    else "per active student / month",
                },
            )
        self.stdout.write(f"  pricing plans: {PricingPlan.objects.count()}")

    def _seed_faqs(self):
        for order, (category, q, a) in enumerate(FAQS, start=1):
            FAQ.objects.update_or_create(
                question=q,
                defaults={"answer": a, "category": category, "order": order, "is_active": True},
            )
        self.stdout.write(f"  faqs: {FAQ.objects.count()}")

    def _seed_blog(self):
        base = datetime.date(2026, 8, 1)
        for i, (title, category, excerpt) in enumerate(BLOG_POSTS):
            BlogPost.objects.update_or_create(
                slug=slugify(title),
                defaults={
                    "title": title,
                    "category": category,
                    "excerpt": excerpt,
                    "content": excerpt,
                    "author": "Encode Campus",
                    "read_minutes": 4 + i % 4,
                    "published_date": base - datetime.timedelta(days=i * 9),
                    "is_published": True,
                },
            )
        self.stdout.write(f"  blog posts: {BlogPost.objects.count()}")

    def _seed_demo_leads(self):
        if DemoRequest.objects.filter(source="seed").exists():
            self.stdout.write("  demo leads already seeded — skipping")
            return
        rng = random.Random(2026)
        cities = ["Pune", "Mumbai", "Nagpur", "Nashik", "Indore", "Hyderabad", "Jaipur", "Lucknow"]
        types = ["school", "school", "school", "college", "coaching", "group"]
        for i in range(48):
            months_ago = rng.randint(0, 5)
            created = timezone.make_aware(
                datetime.datetime(2026, 9, 1)
                - datetime.timedelta(days=months_ago * 30 + rng.randint(0, 27))
            )
            inst = rng.choice(types)
            strength = rng.choice([120, 260, 480, 700, 1100, 1800, 2600, 4200])
            obj = DemoRequest.objects.create(
                name=f"Sample Lead {i + 1}",
                organisation=f"{rng.choice(['Greenfield', 'St. Marys', 'Vidya', 'Horizon', 'Nalanda'])} "
                f"{'Group' if inst == 'group' else 'Institution'} {i + 1}",
                designation=rng.choice(["Principal", "Director", "Administrator", "Trustee", "Academic Head"]),
                institution_type=inst,
                student_strength=strength,
                city=rng.choice(cities),
                phone="+91-90000-000" + f"{i:02d}",
                email=f"lead{i + 1}@example.com",
                current_system=rng.choice(["Spreadsheets", "Legacy ERP", "None", "Multiple tools"]),
                primary_challenge=rng.choice(
                    ["Fee collection", "Disconnected data", "Reporting delays", "Communication gaps"]
                ),
                plan_interest=rng.choice(["core", "professional", "professional", "enterprise"]),
                source="seed",
            )
            DemoRequest.objects.filter(pk=obj.pk).update(created_at=created)
        self.stdout.write(f"  demo leads: {DemoRequest.objects.count()}")
