import type { FeatureLandingContent } from "./FeatureLanding"
import { blueprintFeatures } from "./blueprint"

function feature(
  index: number,
  title: string,
  sectionTitle: string,
  cards: readonly (readonly [string, string])[],
  steps: readonly (readonly [string, string])[],
  related: readonly (readonly [string, string])[],
): FeatureLandingContent {
  return {
    eyebrow: blueprintFeatures[index][1],
    title,
    description: blueprintFeatures[index][2],
    sectionEyebrow: "Connected capabilities",
    sectionTitle,
    sectionIntro:
      "Keep the academic context, responsible people and evidence connected throughout the examination cycle.",
    cards,
    steps,
    related,
  }
}
export const phaseTwoFeatures = {
  academicSetup: feature(
    0,
    "A structured foundation for every examination.",
    "Set up the institution. Reuse the foundation.",
    [
      [
        "Guided institution wizard",
        "Work through institution identity, batches, degrees, departments, semesters, subjects, syllabus, staff, students and examination definitions. Review readiness before activation.",
      ],
      [
        "An explicit academic hierarchy",
        "Connect batch year → degree → department → semester → subject. Keep staff and student assignments tied to the same institutional structure.",
      ],
      [
        "Excel imports and correction",
        "Use the institution’s import template, review required-field and mapping errors, correct the source rows and re-import. Resolve incomplete records before dependent workflows proceed.",
      ],
      [
        "Syllabus PDF and version context",
        "Open a syllabus PDF alongside its subject and curriculum version, then structure units, topics and outcomes without losing the source reference.",
      ],
      [
        "People and subject allotments",
        "Assign faculty responsibilities and subject priority. Keep student enrollment and academic roles separate from paper-setting and release authority.",
      ],
      [
        "Completeness before activation",
        "Review missing syllabus, subject assignments, academic mappings and exam definitions from a single readiness view.",
      ],
    ],
    [
      [
        "Define the hierarchy",
        "Create a batch, its programme and department, and the semester’s subjects.",
      ],
      [
        "Import and resolve",
        "Review validation feedback and correct invalid or incomplete rows.",
      ],
      [
        "Map syllabus and people",
        "Link the current syllabus and assigned staff to each subject.",
      ],
      [
        "Review and activate",
        "Resolve readiness issues and reuse the setup for the next examination.",
      ],
    ],
    [
      ["Syllabus intelligence", "/syllabus-intelligence"],
      ["Examination calendar", "/examination-calendar"],
    ],
  ),
  calendar: feature(
    3,
    "Every examination has a pattern. Every team has a deadline.",
    "Make schedules and paper rules work together.",
    [
      [
        "Mid-term and semester schedules",
        "Name examinations, assign dates and connect each exam to its batch, programme, department, semester and subjects.",
      ],
      [
        "Paper preparation deadlines",
        "Set creation and review due dates before the examination. Use deadline reminders to make pending work visible to the assigned team.",
      ],
      [
        "Repeatable blueprints",
        "Configure marks, duration, sections, question counts, compulsory questions and internal choices. Reuse patterns across subjects where institutional rules allow.",
      ],
      [
        "Institution-specific formats",
        "Connect headers, instructions, numbering and output templates to the examination’s paper pattern.",
      ],
      [
        "Versioned examination rules",
        "Retain the pattern version used for a paper so later changes to a blueprint do not obscure the rules against which it was reviewed.",
      ],
      [
        "Coverage linked to the schedule",
        "Define selected-unit scope for a mid-term or the configured full-semester scope. Carry that selection into generation and validation.",
      ],
    ],
    [
      [
        "Create the examination",
        "Choose its name, type, academic scope and date.",
      ],
      [
        "Define the pattern",
        "Configure marks, sections, choices and syllabus coverage.",
      ],
      [
        "Assign deadlines",
        "Set paper preparation and review dates with responsible teams.",
      ],
      [
        "Generate against that version",
        "Carry the exam’s current pattern into paper generation and approval.",
      ],
    ],
    [
      ["Paper generation", "/bulk-paper-generation"],
      ["Quality validation", "/quality-validation"],
    ],
  ),
  validation: feature(
    8,
    "Know what needs attention before a paper moves forward.",
    "Clear checks. Explainable exceptions. Human decisions.",
    [
      [
        "Marks and question counts",
        "Check section totals and overall marks against the selected pattern, along with the required number of questions.",
      ],
      [
        "Choices and template adherence",
        "Verify compulsory and optional questions, either/or structures, instructions and institution-specific formatting requirements.",
      ],
      [
        "Duplication and topic distribution",
        "Flag repeated questions and compare question distribution with the selected units, topics and examination scope.",
      ],
      [
        "CO/PO and Bloom’s coverage",
        "Review outcome mapping and cognitive distribution against the configured academic targets.",
      ],
      [
        "Difficulty and balance",
        "Compare difficulty distribution and equivalent-set balance before final approval.",
      ],
      [
        "Blocking and advisory rules",
        "A blocking issue must be resolved before progression. An advisory calls for reviewer attention. Institutions configure the rule policy; warnings do not replace academic judgment.",
      ],
      [
        "Reasons and correction actions",
        "Read the rule, affected question or section, observed result and recommended correction. Rerun validation after a revised version is submitted.",
      ],
      [
        "Exceptions and evidence",
        "Authorized reviewers record permitted exception approvals with reasons. Download validation reports and retain actor, time, paper version and decision alongside the approval trail.",
      ],
    ],
    [
      [
        "Run checks on the draft",
        "Example: an 80-mark draft against a 100-mark pattern is flagged for correction.",
      ],
      [
        "Resolve blocking issues",
        "Update marks or question selection and validate the revised version.",
      ],
      [
        "Review advisory findings",
        "Example: a cognitive-distribution warning requires academic review under the institution’s policy.",
      ],
      [
        "Validate, then lock",
        "Retain the report and required approvals before locking and authorized release.",
      ],
    ],
    [
      ["Approval automation", "/approval-automation"],
      ["Academic analytics", "/academic-analytics"],
    ],
  ),
  faculty: feature(
    11,
    "Your subjects. Your tasks. Your next decision.",
    "A focused workspace for faculty and reviewers.",
    [
      [
        "Assigned subjects and priority",
        "See allocated subjects with their academic term, syllabus context and subject-allotment priority.",
      ],
      [
        "A personal work queue",
        "Bring drafts, new question requests, paper-setting assignments and review tasks together with due dates.",
      ],
      [
        "Prepare with context",
        "Move from an assigned subject to its syllabus, approved bank, AI-assisted drafts and examination pattern.",
      ],
      [
        "Review and resubmit",
        "Read comments, compare versions, make requested corrections and resubmit with the revision history intact.",
      ],
      [
        "Follow request status",
        "See the current stage, responsible reviewer and next action for questions, mid-term papers and end-semester papers.",
      ],
      [
        "Separate academic access",
        "Faculty actions follow their role and subject assignments. Students see only permitted learning resources; confidential papers remain outside the student view.",
      ],
    ],
    [
      [
        "Open your work queue",
        "Review assigned subjects, priorities and upcoming deadlines.",
      ],
      [
        "Prepare or review",
        "Draft questions, assemble a paper or examine an assigned submission.",
      ],
      [
        "Resolve feedback",
        "Revise with reviewer comments and submit the new version.",
      ],
      [
        "Track the decision",
        "Follow approval progress and authorized next actions from desktop or mobile.",
      ],
    ],
    [
      ["Student portal", "/student-portal"],
      ["Question bank", "/question-bank"],
      ["Approval automation", "/approval-automation"],
    ],
  ),
}
export const featureRoutes = [
  "/academic-setup",
  "/syllabus-intelligence",
  "/ai-question-studio",
  "/examination-calendar",
  "/bulk-paper-generation",
  "/approval-automation#questions",
  "/approval-automation#mid-term",
  "/approval-automation#end-semester",
  "/quality-validation",
  "/academic-analytics",
  "/security-governance",
  "/faculty-portal",
] as const
