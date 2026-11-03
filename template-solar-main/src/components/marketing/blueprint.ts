export const valuePillars = [
  [
    "Curriculum-first intelligence",
    "map units, topics, COs, POs and Bloom’s levels to every question.",
  ],
  [
    "Controlled automation",
    "request, review, revise and approve questions and papers with auditable stage-based workflows.",
  ],
  [
    "Exam-ready precision",
    "verify marks, pattern, coverage, complexity, duplication and outcome distribution before finalization.",
  ],
  [
    "Institution-wide visibility",
    "role-specific dashboards for administrators, examination cells, heads of department and faculty.",
  ],
] as const
export const journey = [
  "Academic setup & syllabus",
  "Question bank & AI studio",
  "Blueprint & paper generation",
  "Automated requests",
  "Multi-level review, validation & approval",
  "Secure export, release & reporting",
] as const
export const blueprintFeatures = [
  [
    "academic-setup",
    "Academic Master Data & Onboarding",
    "Guided institution setup for batch year, degree, department, semester, subject, syllabus, examination definitions, staff and student masters. Excel imports, validation and data completeness dashboards.",
  ],
  [
    "syllabus",
    "Syllabus Intelligence & Coverage",
    "Upload syllabus; structure units, topics and subtopics; map CO/PO and Bloom’s taxonomy; track planned vs available questions and paper coverage.",
  ],
  [
    "question-studio",
    "Manual Question Bank & AI Question Studio",
    "Author, edit, tag, bulk-import and reuse questions. AI-assisted generation by topic, marks, difficulty, type, cognitive level and outcomes.",
  ],
  [
    "calendar",
    "Examination Calendar & Paper Patterns",
    "Define mid-term names, schedules, paper creation deadlines, marks distribution, sections, choices, templates and institution-specific formats.",
  ],
  [
    "paper-intelligence",
    "Question Paper Generation",
    "Assemble mid-term and end-semester papers using manual selection, approved bank questions or AI-assisted generation; produce alternate sets.",
  ],
  [
    "question-approval",
    "Automated Question Request & Approval",
    "Faculty submit new or edited questions for configurable Level 1–2–3 review. Reviewers comment, request changes, approve or reject with timestamps and traceable ownership.",
  ],
  [
    "mid-term-approval",
    "Automated Mid-Term Paper Request & Approval",
    "Faculty or paper setters submit mid-term papers tied to exam schedules and syllabus coverage. Automatically route to nominated reviewers and examination authorities.",
  ],
  [
    "semester-approval",
    "Automated End-Semester Paper Request & Approval",
    "Manage end-semester paper requests under higher confidentiality, separated duties and institution-defined authorization chains.",
  ],
  [
    "validation",
    "Validation & Quality Intelligence",
    "Pre-approval checks for total marks, question count, internal choices, duplicate questions, topic distribution, CO/PO and Bloom’s coverage, difficulty balance and template adherence.",
  ],
  [
    "reports",
    "Dashboards, Analytics & Reports",
    "Executive overview of onboarding completion, syllabus coverage, question-bank readiness, exam timelines, pending approvals, bottlenecks and paper status.",
  ],
  [
    "governance",
    "Security, Governance & Integrations",
    "Role-based permissions, institution isolation, access logs, encryption, backups, retention controls and optional ERP/LMS integrations.",
  ],
  [
    "portals",
    "Faculty Portal",
    "Faculty see assigned subjects, tasks, paper requests and review status.",
  ],
] as const
export const approvalRoutes = [
  {
    id: "questions",
    title: "Individual question",
    initiator: "Assigned faculty",
    reviewers: ["Subject reviewer", "HoD", "authorized approver"],
    outcome: "Approved question bank item",
    detail: blueprintFeatures[5][2],
  },
  {
    id: "mid-term",
    title: "Mid-term paper",
    initiator: "Paper setter / assigned faculty",
    reviewers: ["Subject reviewer", "department approver", "exam cell"],
    outcome: "Validated, approved mid-term paper",
    detail: blueprintFeatures[6][2],
  },
  {
    id: "end-semester",
    title: "End-semester paper",
    initiator: "Authorized paper setter",
    reviewers: [
      "Independent moderator",
      "examination authority",
      "final controller",
    ],
    outcome: "Restricted, sealed final paper",
    detail: blueprintFeatures[7][2],
  },
] as const
export const approvalCopy =
  "Questra orchestrates the complete request-to-approval lifecycle for individual questions, mid-term papers and end-semester papers. Institutions define who prepares, reviews, moderates and authorizes each item. Automated routing, due-date alerts, comments and immutable decision history reduce manual coordination while retaining academic oversight."
