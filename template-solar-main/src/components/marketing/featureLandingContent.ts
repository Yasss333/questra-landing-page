import { blueprintFeatures } from "./blueprint"
import type { FeatureLandingContent } from "./FeatureLanding"

export const featureLandingContent = {
  syllabus: {
    eyebrow: "Academic setup and syllabus intelligence",
    title: "Give every examination a connected academic foundation.",
    description: blueprintFeatures[1][2],
    sectionEyebrow: "A shared academic foundation",
    sectionTitle: "Start with the structure your institution already uses.",
    sectionIntro:
      "Set up the academic hierarchy once, then connect syllabus documents, subject assignments, and examination scope to the work that follows.",
    cards: [
      [
        "Semester-specific versions",
        "Associate each syllabus version with its semester and effective academic period. Preserve the source PDF and mapping history when curricula change.",
      ],
      [
        "Topic-level drilldowns",
        "Move from subject to unit, topic and subtopic to compare planned coverage with approved question availability and selected-paper coverage.",
      ],
      [
        "Academic masters",
        "Organize academic years, batches, degrees, departments, semesters, subject types, and subjects in a consistent hierarchy.",
      ],
      [
        "People and assignments",
        "Map staff and students to their departments, subjects, academic term, and permitted responsibilities.",
      ],
      [
        "Imports with checks",
        "Bring in supported spreadsheet data, review validation feedback, correct issues, and re-import clean records.",
      ],
      [
        "Syllabus documents",
        "Upload and view syllabus PDFs alongside their curriculum version, effective academic year, subject, units, and topics.",
      ],
      [
        "Outcome mapping",
        "Connect topics and questions with Course Outcomes, Programme Outcomes, and Bloom’s cognitive levels.",
      ],
      [
        "Coverage visibility",
        "Find unmapped topics and gaps in eligible questions before an examination moves to paper preparation.",
      ],
    ],
    steps: [
      [
        "Set the institution structure",
        "Create academic years, batches, degrees, departments, semesters, and subjects.",
      ],
      [
        "Add people and subject assignments",
        "Map faculty and student records to the appropriate academic structure.",
      ],
      [
        "Upload and version the syllabus",
        "Keep the source document connected to the unit and topic hierarchy.",
      ],
      [
        "Map outcomes and exam scope",
        "Give later question and paper workflows the curriculum context they need.",
      ],
    ],
    note: "Import formats, validation rules, and access to source documents follow the institution’s configured process.",
    related: [
      ["Question Bank", "/question-bank"],
      ["How It Works", "/how-it-works"],
      ["Academic Analytics", "/academic-analytics"],
    ],
  },
  questionStudio: {
    eyebrow: "AI Question Studio",
    title: "Move from a syllabus topic to a faculty-reviewed question.",
    description: blueprintFeatures[2][2],
    sectionEyebrow: "Draft with academic context",
    sectionTitle: "Keep the source, settings, and review together.",
    sectionIntro:
      "The studio gives question setters structured controls for producing relevant draft questions. The academic team remains responsible for the final content and approval.",
    cards: [
      [
        "Source-grounded suggestions",
        "Keep the selected syllabus topic and source reference visible with draft questions and answer-key suggestions.",
      ],
      [
        "AI and human provenance",
        "Retain whether a question was entered manually, imported or AI-assisted, together with subsequent faculty edits and reviewer decisions.",
      ],
      [
        "Choose a curriculum source",
        "Select the institution, academic term, subject, syllabus version, unit, and topic relevant to the question.",
      ],
      [
        "Set question requirements",
        "Specify marks, question format, difficulty, cognitive level, Course Outcome, and the number of drafts to prepare.",
      ],
      [
        "Review generated candidates",
        "Compare alternative drafts with their syllabus context and mapped academic attributes visible.",
      ],
      [
        "Edit questions and answers",
        "Refine question wording, suggested answers, examples, and marking guidance before submission.",
      ],
      [
        "Check for quality signals",
        "Review relevant warnings and duplication signals as aids to faculty judgement, not as guarantees.",
      ],
      [
        "Submit for approval",
        "Send the selected version into the institution’s configured question review workflow.",
      ],
    ],
    steps: [
      [
        "Select a topic",
        "Start from an approved syllabus version and a specific unit or topic.",
      ],
      [
        "Set the academic criteria",
        "Choose the marks, type, difficulty, Bloom’s level, and outcome mapping.",
      ],
      [
        "Review and refine",
        "Edit the draft, check the answer, and retain the faculty-reviewed version.",
      ],
      [
        "Submit to the bank workflow",
        "Route the question to its assigned reviewers for the required decisions.",
      ],
    ],
    note: "AI output is a draft. It does not independently approve questions or authorize examination release.",
    related: [
      ["Question Bank", "/question-bank"],
      ["Approval Automation", "/approval-automation"],
      ["Syllabus Intelligence", "/syllabus-intelligence"],
    ],
  },
  questionBank: {
    eyebrow: "Question Bank",
    title: "One governed repository for every question.",
    description: blueprintFeatures[2][2],
    sectionEyebrow: "Structured and searchable",
    sectionTitle: "Make every approved question easier to find and reuse.",
    sectionIntro:
      "Bring manual contributions and AI-assisted drafts together under consistent metadata, review history, and student publication rules.",
    cards: [
      [
        "Source and answer history",
        "Keep manual, imported and AI-assisted provenance, answer-key drafts, duplicate flags and reviewer edits with reusable tagged questions.",
      ],
      [
        "Multiple question formats",
        "Organize MCQs, short and descriptive answers, numerical problems, case studies, and application questions.",
      ],
      [
        "Academic metadata",
        "Track marks, difficulty, question type, Bloom’s K1–K6, Course Outcome, topic, answer, rubric, and source.",
      ],
      [
        "Find and filter",
        "Search by keywords and narrow results by subject, unit, topic, marks, type, difficulty, outcome, and status.",
      ],
      [
        "Review duplicates and versions",
        "Inspect similar questions, changes, reviewer comments, and prior decisions before reuse.",
      ],
      [
        "Use approved items in papers",
        "Keep paper assembly focused on questions that meet the institution’s approval and eligibility rules.",
      ],
      [
        "Publish selectively to students",
        "Make practice items and answers visible only when institution policy permits publication.",
      ],
    ],
    steps: [
      [
        "Create or import",
        "Add a question manually, bring in a supported template, or start with an AI-assisted draft.",
      ],
      [
        "Map its academic context",
        "Connect the question with the correct syllabus topic and learning outcomes.",
      ],
      [
        "Review and approve",
        "Use the configured reviewer route to request edits, approve, or return the item.",
      ],
      [
        "Reuse with control",
        "Select eligible questions for examination papers and publish practice content only when authorized.",
      ],
    ],
    note: "Student access is limited to approved content explicitly released by the institution.",
    related: [
      ["AI Question Studio", "/ai-question-studio"],
      ["Paper Generation", "/bulk-paper-generation"],
    ],
  },
  paperGeneration: {
    eyebrow: "Paper Blueprint and Generation",
    title: "Generate examination papers to your institution’s pattern.",
    description: blueprintFeatures[4][2],
    sectionEyebrow: "Patterns that carry through",
    sectionTitle: "From a reusable blueprint to a controlled final paper.",
    sectionIntro:
      "Use configured paper rules to help setters prepare consistent drafts while retaining faculty moderation and institution-defined final approval.",
    cards: [
      [
        "Equivalent sets and eligibility",
        "Select the syllabus scope and approved-question eligibility rules before assembling alternative sets. Compare marks, difficulty and coverage for equivalent papers.",
      ],
      [
        "Locked final versions",
        "Corrections create a new version. Keep the version approved by reviewers distinct from later changes and separate locking from authorized release.",
      ],
      [
        "Configure paper patterns",
        "Define duration, total marks, sections, compulsory and optional questions, internal choices, and local paper instructions.",
      ],
      [
        "Choose examination scope",
        "Select the examination type, syllabus version, subjects, units, topics, and academic period for the paper.",
      ],
      [
        "Assemble eligible questions",
        "Build a draft from approved bank questions or generate candidates within configured marks and coverage rules.",
      ],
      [
        "Prepare alternate sets",
        "Create and compare multiple sets, with checks for repeated items and equivalent syllabus coverage.",
      ],
      [
        "Validate before review",
        "Check total marks, question counts, internal choices, metadata, topic balance, Bloom’s levels, and mapped outcomes.",
      ],
      [
        "Authorize and export",
        "Route the approved version to authorized release and produce controlled PDF or Word outputs with permitted answer keys.",
      ],
    ],
    steps: [
      [
        "Select exam and syllabus scope",
        "Set the mid-term or end-semester context and the units or topics to assess.",
      ],
      [
        "Apply a paper blueprint",
        "Use the configured section structure, marks distribution, and internal choice rules.",
      ],
      [
        "Assemble and compare drafts",
        "Prepare eligible sets and inspect their pattern, coverage, and balance.",
      ],
      [
        "Review, validate, and release",
        "Resolve validation findings, complete approvals, and release only the authorized version.",
      ],
    ],
    note: "Final paper approval and release remain with the institution’s authorized academic roles.",
    related: [
      ["Approval Automation", "/approval-automation"],
      ["How It Works", "/how-it-works"],
      ["Academic Analytics", "/academic-analytics"],
    ],
  },
  analytics: {
    eyebrow: "Bloom’s & CO/PO Mapping",
    title: "Bloom’s taxonomy and outcome mapping. One connected view.",
    description: blueprintFeatures[1][2],
    sectionEyebrow: "Dashboards, Analytics & Reports",
    sectionTitle: "Academic coverage and examination readiness.",
    sectionIntro: blueprintFeatures[9][2],
    cards: [
      [
        "Bloom’s & CO/PO Mapping",
        "Map CO/PO and Bloom’s taxonomy; track planned vs available questions and paper coverage.",
      ],
      [
        "Academic scope",
        "Filters by batch/degree/department/semester/subject/exam; drilldowns; scheduled exports and permissions.",
      ],
      [
        "Coverage and quality checks",
        "Pre-approval checks for total marks, question count, internal choices, duplicate questions, topic distribution, CO/PO and Bloom’s coverage, difficulty balance and template adherence.",
      ],
    ],
    steps: [
      [
        "Syllabus structure",
        "Upload syllabus; structure units, topics and subtopics.",
      ],
      ["Academic mapping", "Map CO/PO and Bloom’s taxonomy."],
      ["Coverage", "Track planned vs available questions and paper coverage."],
      [
        "Reports",
        "Filters by batch/degree/department/semester/subject/exam; drilldowns; scheduled exports and permissions.",
      ],
    ],
    related: [
      ["Syllabus Intelligence", "/syllabus-intelligence"],
      ["Quality Validation", "/quality-validation"],
    ],
  },
  security: {
    eyebrow: "Security and academic governance",
    title: "Keep examination decisions, access, and release accountable.",
    description: blueprintFeatures[10][2],
    sectionEyebrow: "Governance built into the workflow",
    sectionTitle: "Make access and responsibility clear at each stage.",
    sectionIntro:
      "Configure who can prepare, review, approve, and release academic content, then preserve the context needed to understand each decision.",
    cards: [
      [
        "Recovery and retention planning",
        "Review backup frequency, restoration procedures, retention requirements and deletion expectations with the implementation team for your deployment.",
      ],
      [
        "Integrations by confirmed scope",
        "Optional ERP/LMS integrations are assessed against the institution’s systems, authentication and data needs. Request the supported connector details during the demo; no unverified vendor compatibility or certification is implied.",
      ],
      [
        "Role-defined access",
        "Assign platform responsibilities to administrators, setters, reviewers, examination teams, and students.",
      ],
      [
        "Separated decisions",
        "Configure review stages and prevent self-approval where institution policy requires independent review.",
      ],
      [
        "Version-aware review",
        "Keep comments, revisions, validation results, and approvals connected to the version under review.",
      ],
      [
        "Controlled release",
        "Restrict answer keys, confidential papers, and student-facing materials according to publication policy.",
      ],
      [
        "Traceable workflows",
        "Retain the decision history needed to follow ownership, review status, and authorized release.",
      ],
      [
        "Institutional configuration",
        "Set department and examination-specific policies that reflect the institution’s own governance model.",
      ],
    ],
    steps: [
      [
        "Define roles and ownership",
        "Map setters, reviewers, moderators, examination authorities, and administrators.",
      ],
      [
        "Configure approval paths",
        "Set the stages, handoffs, and escalation rules for question and paper requests.",
      ],
      [
        "Review versioned submissions",
        "Keep revisions and reviewer decisions attached to the right academic item.",
      ],
      [
        "Release under policy",
        "Make approved content available only through institution-authorized release controls.",
      ],
    ],
    note: "For details about deployment, data retention, integrations, and institution-specific security controls, request the current product and policy documentation. No certification or compliance claim is made here.",
    related: [
      ["Approval Automation", "/approval-automation"],
      ["Solutions", "/solutions"],
      ["Request a Demo", "/book-demo"],
    ],
  },
} satisfies Record<string, FeatureLandingContent>

export const solutionsContent: FeatureLandingContent = {
  eyebrow: "Solutions",
  title: "Solutions",
  description:
    "Universities; Autonomous Colleges; Examination Cells; Faculty & HoDs.",
  sectionEyebrow: "AUDIENCES",
  sectionTitle: "Who Questra serves",
  sectionIntro: "",
  cards: [
    ["Universities", ""],
    ["Autonomous Colleges", ""],
    ["Examination Cells", ""],
    ["Faculty & HoDs", ""],
  ],
}
export const aboutContent: FeatureLandingContent = {
  eyebrow: "About Questra",
  title: "The intelligence behind every question.",
  description:
    "Questra is an institution-wide examination intelligence platform that unifies syllabus ingestion, question bank management, AI-assisted question generation, blueprinting, multi-stage requests and approvals, automated validation, paper assembly and secure release in one governed workflow.",
  sectionEyebrow: "A connected approach to examinations",
  sectionTitle: "Help academic teams work with clarity and control.",
  sectionIntro:
    "The Questra experience is shaped around the people responsible for academic quality—from examination administrators and faculty to reviewers and students.",
  cards: [
    [
      "Start with the curriculum",
      "Keep academic masters, syllabus versions, topics, and outcomes connected to questions and papers.",
    ],
    [
      "Use AI as an assistant",
      "Accelerate structured question drafting while giving faculty the context and controls to review each suggestion.",
    ],
    [
      "Make decisions traceable",
      "Bring reviewer responsibilities, revisions, validation, and approval decisions into a coordinated process.",
    ],
    [
      "Prepare with confidence",
      "Use approved question content, configured paper patterns, and academic coverage insights to support examination teams.",
    ],
  ],
  steps: [
    [
      "Create with intelligence",
      "Connect syllabus context to question and paper preparation.",
    ],
    [
      "Review with confidence",
      "Keep subject experts and authorized academic reviewers in control.",
    ],
    [
      "Examine with purpose",
      "Move approved materials through validation and institution-authorized release.",
    ],
  ],
  note: "Questra is a product of VoiceDots AI.",
  related: [
    ["How It Works", "/how-it-works"],
    ["Solutions by Role", "/solutions"],
    ["Contact Questra", "/contact"],
  ],
}
