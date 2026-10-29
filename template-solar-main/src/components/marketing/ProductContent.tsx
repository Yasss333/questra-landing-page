import Link from "next/link"
import styles from "./ContentPages.module.css"

export const capabilities = [
  [
    "Set up once. Govern every exam.",
    "Build a reusable institutional foundation: academic years, batches, programmes, departments, semesters, subjects, staff allocations, and examination policies.",
  ],
  [
    "Every topic accounted for.",
    "Upload syllabus PDFs and connect units, topics, subtopics, Course Outcomes, and Bloom’s levels to every question and paper.",
  ],
  [
    "AI speed. Faculty authority.",
    "Enter questions manually, draft with AI, or import supported PDF and Excel templates. Faculty edit and review questions before they enter the approved bank.",
  ],
  [
    "Paper patterns without guesswork.",
    "Configure sections, marks, question counts, internal choices, and coverage. Validate totals, duplication, metadata, and pattern conformity before submission.",
  ],
  [
    "No more invisible bottlenecks.",
    "Route questions and papers through independent approval policies. Track reviewer queues, deadlines, corrections, resubmissions, and escalations.",
  ],
  [
    "From draft to release, fully traceable.",
    "Keep versions, comments, validation results, and approvals together. Control PDF and Word exports, answer keys, marking schemes, and final release by permission.",
  ],
] as const

export const stakeholders = [
  [
    "Institution leadership",
    "See examination readiness across departments, identify bottlenecks, and monitor institutional policy compliance.",
  ],
  [
    "Controller of Examinations",
    "Manage examination schedules, paper templates, final approval rules, and controlled release.",
  ],
  [
    "Dean / Academic Head",
    "Monitor academic standards, departmental progress, and escalations.",
  ],
  [
    "Head of Department",
    "Allocate reviewers, oversee subject coverage, and clear departmental approvals.",
  ],
  [
    "Faculty / Paper Setter",
    "Work with assigned subjects, create questions, and submit papers for review.",
  ],
  [
    "Reviewer / Moderator",
    "Inspect question quality, comment, flag issues, and approve or return submissions.",
  ],
  [
    "System Administrator",
    "Configure academic masters, role permissions, workflows, and institution setup.",
  ],
] as const

const pathways = [
  [
    "New questions",
    "Faculty submission → Subject review → Department approval → Final academic authority → Approved question bank",
  ],
  [
    "Mid-term papers",
    "Paper setter → Subject review → Department moderation → Examination-cell authorization → Scheduled release",
  ],
  [
    "End-semester papers",
    "Authorized paper setter → Academic moderation → Examination controller or nominated final authority → Controlled release",
  ],
] as const

export function ApprovalOverview() {
  return (
    <section
      id="approvals"
      className={styles.section}
      aria-labelledby="approvals-heading"
    >
      <span className={styles.eyebrow}>Approval intelligence</span>
      <h2 id="approvals-heading">Three pathways. Clear accountability.</h2>
      <p className={styles.intro}>
        Questions, mid-term papers, and end-semester papers each follow their
        own approval policy, with the right people involved at every stage.
      </p>
      <div className={styles.grid}>
        {pathways.map(([title, path], i) => (
          <article className={styles.card} key={title}>
            <span className={styles.number}>0{i + 1}</span>
            <h3>{title}</h3>
            <p className={styles.path}>{path}</p>
          </article>
        ))}
      </div>
      <p className={styles.note}>
        These examples show the journey. Configure one, two, or three approval
        stages for each pathway, assign authorized roles, separate
        responsibilities, and return submissions for correction with comments
        and timestamps.
      </p>
      <div className={styles.actions}>
        <Link className={styles.link} href="/how-it-works#institution-setup">
          Explore the 11-step institution setup →
        </Link>
      </div>
    </section>
  )
}

export function ClosingCTA() {
  return (
    <section
      id="demo"
      className={styles.section}
      aria-labelledby="closing-heading"
    >
      <div className={styles.banner}>
        <span className={styles.eyebrow}>Your next examination cycle</span>
        <h2 id="closing-heading">
          Every question matters. Every approval matters.
        </h2>
        <p>
          Bring intelligent drafting, academic validation, and accountable human
          approvals into one connected workflow. See how Questra fits your
          institution in a focused, 30-minute live demonstration.
        </p>
        <div className={styles.actions}>
          <Link className={styles.button} href="/book-demo">
            Experience a live demo ↗
          </Link>
        </div>
      </div>
    </section>
  )
}

export function InstitutionProblem() {
  return (
    <section className={styles.section} aria-labelledby="problem-heading">
      <span className={styles.eyebrow}>One connected examination workflow</span>
      <h2 id="problem-heading">
        Your next paper should never begin with uncertainty.
      </h2>
      <p className={styles.intro}>
        Spreadsheets, document files, emails, and last-minute follow-ups make
        syllabus coverage hard to verify and approval responsibilities easy to
        lose. Questra connects the right syllabus, academic checks, and
        reviewers in one governed workspace.
      </p>
      <div className={styles.actions}>
        <Link className={styles.link} href="/how-it-works">
          See the journey from syllabus to release →
        </Link>
      </div>
    </section>
  )
}
