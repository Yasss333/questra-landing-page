import {
  PriorityApprovals,
  PriorityClosing,
} from "@/components/marketing/PrioritySections"
import styles from "@/components/marketing/PhaseZero.module.css"
import { marketingMetadata } from "../marketing-metadata"
export const metadata = marketingMetadata(
  "/approval-automation",
  "Question and Paper Approval Automation | Questra",
  "Configurable question, mid-term and end-semester requests, validation, review and authorized release.",
)
const controls = [
  [
    "Configurable routing",
    "Configurable 1–3 stages by exam, subject, department and institution; prevent self-approval when policy requires.",
  ],
  [
    "Assignments and separation",
    "Role and subject allotment checks; substitute reviewers, delegation and conflict-of-interest rules.",
  ],
  [
    "Alerts and escalation",
    "In-app/email alerts, overdue queues, escalation rules and complete request timelines.",
  ],
  [
    "Review and revision",
    "Inline annotations, revision comparison, resubmit actions and reviewer comments.",
  ],
  [
    "Approval evidence",
    "Approval evidence: actor, time, version, reason, validation result and final authorization.",
  ],
  [
    "Confidential release",
    "No release of confidential paper until all required approvals and validations pass.",
  ],
] as const
export default function ApprovalPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={styles.main}
      style={{ paddingTop: 110 }}
    >
      <PriorityApprovals detailed />
      <section className={styles.blush}>
        <div className={styles.section}>
          <span className={styles.eyebrow}>REQUIRED WORKFLOW STATES</span>
          <h2>Every decision stays with its version.</h2>
          <div className={styles.states}>
            <span>Draft</span>
            <b aria-hidden="true">→</b>
            <span>Submitted</span>
            <b aria-hidden="true">→</b>
            <span>In Review (Level 1/2/3 as configured)</span>
          </div>
          <div className={styles.branches}>
            <strong>Review outcomes</strong>
            <p>Changes Requested → revise and resubmit a new version.</p>
            <p>
              Rejected → retain the decision and version history; no release.
            </p>
            <p>Approved → continue to Final Validation.</p>
          </div>
          <div className={styles.states}>
            <span>Approved</span>
            <b aria-hidden="true">→</b>
            <span>Final Validation</span>
            <b aria-hidden="true">→</b>
            <span>Locked</span>
            <b aria-hidden="true">→</b>
            <span>Authorized Release</span>
          </div>
          <p className={styles.note}>
            Revisions create new versions and preserve previous decisions.
            Validation findings must be resolved or handled through an
            authorized exception process before locking and release.
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <span className={styles.eyebrow}>ESSENTIAL CONTROLS</span>
        <h2>Academic oversight at every stage.</h2>
        <div className={styles.featureGrid}>
          {controls.map(([title, text]) => (
            <article className={styles.feature} key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          Workflow illustrations describe the intended product controls. Confirm
          released capabilities with your institutional roles during a live
          demonstration.
        </p>
      </section>
      <PriorityClosing />
    </main>
  )
}
