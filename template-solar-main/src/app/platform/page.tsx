import Link from "next/link"
import { blueprintFeatures } from "@/components/marketing/blueprint"
import { PriorityClosing } from "@/components/marketing/PrioritySections"
import styles from "@/components/marketing/PhaseZero.module.css"
import { marketingMetadata } from "../marketing-metadata"
export const metadata = marketingMetadata(
  "/platform",
  "Platform | Questra",
  "Syllabus ingestion, question banks, AI-assisted generation, blueprinting, requests, approvals, validation and secure release.",
)
const detailLinks: Record<string, string> = {
  "academic-setup": "/how-it-works#institution-setup",
  syllabus: "/syllabus-intelligence",
  "question-studio": "/ai-question-studio",
  "paper-intelligence": "/bulk-paper-generation",
  "question-approval": "/approval-automation#questions",
  "mid-term-approval": "/approval-automation#mid-term",
  "semester-approval": "/approval-automation#end-semester",
  reports: "/academic-analytics",
  governance: "/security-governance",
  portals: "/student-portal",
}
export default function PlatformPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={styles.main}
      style={{ paddingTop: 105 }}
    >
      <section className={styles.section}>
        <span className={styles.eyebrow}>THE QUESTRA PLATFORM</span>
        <h1
          style={{
            fontSize: "clamp(34px,5vw,64px)",
            lineHeight: 1.15,
            fontWeight: 600,
            letterSpacing: "-.045em",
            margin: "22px 0",
          }}
        >
          One Intelligent Platform. Every Question. Every Examination. Every
          Approval.
        </h1>
        <p className={styles.intro}>
          Questra is an institution-wide examination intelligence platform that
          unifies syllabus ingestion, question bank management, AI-assisted
          question generation, blueprinting, multi-stage requests and approvals,
          automated validation, paper assembly and secure release in one
          governed workflow.
        </p>
        <p className={styles.note}>
          This overview describes the product blueprint. Confirm released
          capabilities and institution-specific configurations in your demo.
        </p>
        <div className={styles.featureGrid}>
          {blueprintFeatures.map(([id, title, text], index) => (
            <article id={id} className={styles.feature} key={id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2 style={{ fontSize: 21 }}>{title}</h2>
              <p>{text}</p>
              {detailLinks[id] && (
                <Link className={styles.sectionLink} href={detailLinks[id]}>
                  Explore this workflow →
                </Link>
              )}
            </article>
          ))}
        </div>
        <div id="exports" className={styles.note}>
          Secure export, release & reporting follow required academic approvals.
          Faculty work queues and student-safe access are covered under Student
          & Faculty Portals.
        </div>
        <div id="dashboards" className={styles.note}>
          Role-specific dashboards: Management, Controller of Examinations, HoD,
          Faculty and Reviewers.
        </div>
      </section>
      <PriorityClosing />
    </main>
  )
}
