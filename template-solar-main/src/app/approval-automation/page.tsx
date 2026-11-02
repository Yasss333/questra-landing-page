import PageIntro from "@/components/marketing/PageIntro"
import {
  ApprovalOverview,
  ClosingCTA,
} from "@/components/marketing/ProductContent"
import styles from "@/components/marketing/ContentPages.module.css"
import { marketingMetadata, pageStructuredData } from "../marketing-metadata"

const title = "Question and Paper Approval Automation | Questra"
const description =
  "Explore Questra’s configurable request, review, validation, and release workflows for questions, mid-term papers, and end-semester examinations."
export const metadata = marketingMetadata(
  "/approval-automation",
  title,
  description,
)

const stages = [
  ["Draft", "Prepare or revise a question or paper."],
  ["Submitted", "Send the item into its institution-defined review route."],
  ["In review", "Assigned reviewers check, comment, and request changes."],
  ["Changes requested", "Return work to the setter with comments and a clear resubmission path."],
  ["Rejected", "Record a reasoned decision and retain the associated version history."],
  ["Approved", "Required academic authorities record their decisions."],
  ["Validated", "Check marks, pattern, coverage, duplication, and outcome rules."],
  ["Locked and released", "Authorize the final version for controlled release."],
]

const controls = [
  [
    "Role-defined review",
    "Set the intended responsibilities for setters, reviewers, moderators, and examination authorities.",
  ],
  [
    "Return and resubmit",
    "Keep revision requests and reviewer comments connected to the item under review.",
  ],
  [
    "Version-aware decisions",
    "Make it clear which question or paper version is being reviewed and approved.",
  ],
  [
    "Release governance",
    "Keep final academic authorization with the institution’s designated people.",
  ],
  [
    "Deadlines and escalation",
    "Assign due dates, send reminders, and escalate overdue reviews using institution-defined rules.",
  ],
  [
    "Delegation and separation",
    "Support approved reviewer substitutions and independent decisions where policy requires them.",
  ],
]

export default function ApprovalAutomationPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData("/approval-automation", title, description),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="Question and paper approval automation"
        title="Every question accountable. Every paper approved."
        description="Questra coordinates question, mid-term paper, and end-semester paper requests through configurable review routes, reminders, and validation. Authorized academic teams retain the decisions and release authority."
      />
      <ApprovalOverview showDetailLink={false} />
      <section className={styles.section} aria-labelledby="stages-heading">
          <span className={styles.eyebrow}>Configurable approval workflow</span>
        <h2 id="stages-heading">A clear route from draft to release.</h2>
        <p className={styles.intro}>
          Institutions decide which stages apply, who is authorized to act, and
          when a paper is ready to leave the review process.
        </p>
        <ol className={styles.grid}>
          {stages.map(([name, text], index) => (
            <li className={styles.card} key={name}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className={styles.note}>
          Institutions configure the stages, roles, deadlines, and release
          controls that apply to each examination. The example above shows a
          common route; the configured process remains the source of truth.
        </p>
      </section>
      <section className={styles.section} aria-labelledby="controls-heading">
        <span className={styles.eyebrow}>Built around academic governance</span>
        <h2 id="controls-heading">Keep responsibility visible at each step.</h2>
        <div className={styles.grid}>
          {controls.map(([name, text]) => (
            <article className={styles.card} key={name}>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ClosingCTA />
    </main>
  )
}
