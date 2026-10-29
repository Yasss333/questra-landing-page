import Link from "next/link"
import PageIntro from "@/components/marketing/PageIntro"
import { ClosingCTA, stakeholders } from "@/components/marketing/ProductContent"
import styles from "@/components/marketing/ContentPages.module.css"
import { marketingMetadata, pageStructuredData } from "../marketing-metadata"
const title = "Platform | Questra"
const description =
  "Explore Questra’s AI Question Studio, syllabus intelligence, paper patterns, validation, stakeholder dashboards, and institutional approval controls."
export const metadata = marketingMetadata("/platform", title, description)
const modules = [
  [
    "question-studio",
    "01 / AI Question Studio",
    "Three ways to build. One governed bank.",
    "Enter questions manually, request AI-assisted drafts against selected syllabus topics, or import supported PDF and Excel templates. Map each item to subject, unit, topic, marks, type, complexity, Course Outcome, and Bloom’s level. Faculty refine wording and answers before academic review.",
  ],
  [
    "syllabus",
    "02 / Syllabus intelligence",
    "Every question has academic context.",
    "Connect syllabus PDFs, curriculum versions, units, topics, and subtopics to your question bank. Review coverage by subject and examination scope, and find missing mappings before papers move forward.",
  ],
  [
    "paper-intelligence",
    "03 / Paper intelligence",
    "Your patterns. Consistent papers.",
    "Create reusable mid-term and end-semester patterns with sections, question counts, marks, internal choices, and topic coverage. Assemble papers from approved questions or generate draft candidates for review, including alternative paper sets.",
  ],
  [
    "validation",
    "04 / Responsive validation",
    "See exceptions before submission.",
    "Check marks, question counts, unit distribution, outcome mapping, Bloom’s levels, duplication, metadata, and paper-pattern conformity. Clear exceptions and corrective guidance help faculty resolve issues while retaining academic judgment.",
  ],
  [
    "governance",
    "05 / Approval intelligence & governance",
    "The right authority at every stage.",
    "Configure separate one-, two-, or three-stage policies for questions, mid-term papers, and end-semester papers. Role-based permissions and segregation of duties control who can review, comment, return, approve, escalate, and release. Retain timestamps, versions, and audit history.",
  ],
  [
    "exports",
    "06 / Controlled outputs",
    "Release with the evidence attached.",
    "Produce standardized PDF and Word papers with institution-specific headers, instructions, and formats, subject to permissions. Review answer keys and marking schemes alongside papers. Preserve validation results, approval records, and final-release accountability.",
  ],
]
export default function PlatformPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData("/platform", title, description),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="The Questra platform"
        title="Intelligence at every step. Authority with your institution."
        description="Bring question creation, paper generation, validation, and stakeholder approvals together. One connected workspace gives every team a clear view of what is ready and what needs attention."
      />
      <section className={styles.section} aria-labelledby="modules-heading">
        <span className={styles.eyebrow}>Connected capabilities</span>
        <h2 id="modules-heading">
          From syllabus to sanctioned question paper.
        </h2>
        <div className={styles.grid}>
          {modules.map(([id, label, name, text]) => (
            <article id={id} className={styles.card} key={id}>
              <span className={styles.number}>{label}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="dashboards"
        className={styles.section}
        aria-labelledby="dashboards-heading"
      >
        <span className={styles.eyebrow}>Stakeholder dashboards</span>
        <h2 id="dashboards-heading">Every stakeholder knows the next step.</h2>
        <p className={styles.intro}>
          Role-specific views surface assigned subjects, papers due, reviewer
          queues, overdue actions, coverage gaps, approval turnaround, and
          release status.
        </p>
        <div className={styles.grid}>
          {stakeholders.map(([name, text]) => (
            <article className={styles.card} key={name}>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className={styles.banner}>
          <h3>Institutional visibility. Faculty control.</h3>
          <p>
            Leadership can see readiness across examinations while faculty and
            reviewers act on their own assignments. Students access only
            institution-authorized practice materials and past papers.
          </p>
          <div className={styles.actions}>
            <Link className={styles.link} href="/#dashboard-preview">
              Try the interactive workspace →
            </Link>
            <Link className={styles.link} href="/#student-portal">
              Explore Student Portal →
            </Link>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </main>
  )
}
