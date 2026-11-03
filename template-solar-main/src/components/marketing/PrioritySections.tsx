import Link from "next/link"
import FeatureBento from "./FeatureBento"
import { ArrowRight } from "lucide-react"
import {
  blueprintFeatures,
  approvalCopy,
  approvalRoutes,
  journey,
  valuePillars,
} from "./blueprint"
import styles from "./PhaseZero.module.css"

export function Positioning() {
  return (
    <section
      className={`${styles.section} ${styles.center}`}
      aria-labelledby="positioning-heading"
    >
      <span className={styles.eyebrow}>
        EXAMINATION INTELLIGENCE, CONNECTED
      </span>
      <h2 id="positioning-heading">
        One Intelligent Platform. Every Question. Every Examination. Every
        Approval.
      </h2>
      <p className={styles.intro}>
        Transform the complete examination-paper lifecycle with curriculum-aware
        intelligence, configurable academic rules, transparent approvals and
        exam-ready outputs—while keeping academic decision-making under
        institutional control.
      </p>
      <div className={styles.pillars}>
        {valuePillars.map(([title, text], index) => (
          <article className={styles.pillar} key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
export function ExactWorkflow() {
  return (
    <section id="workflow" className={styles.blush}>
      <div className={styles.section}>
        <span className={styles.eyebrow}>HOW IT WORKS</span>
        <h2>From Syllabus to Final Approval.</h2>
        <ol className={styles.journey}>
          {journey.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <h3>{step}</h3>
            </li>
          ))}
        </ol>
        <Link className={styles.sectionLink} href="/how-it-works">
          Explore the End-to-End Workflow
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
export function PriorityApprovals({
  detailed = false,
}: {
  detailed?: boolean
}) {
  const Heading = detailed ? "h1" : "h2"
  return (
    <section id="approvals" className={styles.section}>
      <span className={styles.eyebrow}>
        AUTOMATED REQUEST & APPROVAL ENGINE
      </span>
      <Heading>
        Every Question Accountable. Every Paper Approved. Every Step Traceable.
      </Heading>
      <p className={styles.intro}>{approvalCopy}</p>
      <div className={styles.approvalGrid}>
        {approvalRoutes.map((route, index) => (
          <article
            id={detailed ? route.id : undefined}
            className={styles.approvalCard}
            key={route.id}
          >
            <span>0{index + 1} / CONFIGURABLE LEVEL 1–2–3</span>
            <h3>{route.title}</h3>
            <p>{detailed ? route.detail : route.initiator}</p>
            <ol>
              {route.reviewers.map((reviewer, stage) => (
                <li key={reviewer}>
                  <span>0{stage + 1}</span>
                  {reviewer}
                </li>
              ))}
            </ol>
            <div className={styles.outcome}>{route.outcome}</div>
            {!detailed && (
              <Link
                className={styles.sectionLink}
                href={`/approval-automation#${route.id}`}
              >
                Explore this flow
                <ArrowRight size={14} />
              </Link>
            )}
          </article>
        ))}
      </div>
      <p className={styles.note}>
        Institutions configure the required stages and reviewers. These pathways
        explain the product workflow; confirm availability and institutional
        policy during your demonstration.
      </p>
    </section>
  )
}
export function FeatureIndex() {
  return (
    <section id="platform" className={styles.section}>
      <span className={styles.eyebrow}>THE CONNECTED PLATFORM</span>
      <h2>
        From Syllabus to Final Approval — End-to-End AI-Powered Question Paper
        Automation
      </h2>
      <FeatureBento />
      <Link className={styles.sectionLink} href="/platform">
        Explore the platform
        <ArrowRight size={15} />
      </Link>
    </section>
  )
}
export function ExamComparison() {
  return (
    <section className={styles.blush}>
      <div className={styles.section}>
        <span className={styles.eyebrow}>TWO EXAMINATION JOURNEYS</span>
        <h2>Mid-term and end-semester.</h2>
        <div className={styles.comparison}>
          <table>
            <caption className={styles.srOnly}>
              Mid-term and end-semester workflow comparison
            </caption>
            <thead>
              <tr>
                <th scope="col">Workflow</th>
                <th scope="col">Mid-term paper</th>
                <th scope="col">End-semester paper</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Preparation</th>
                <td>
                  Faculty or paper setters submit papers tied to exam schedules
                  and syllabus coverage.
                </td>
                <td>
                  Authorized paper setters prepare papers under
                  institution-defined authorization chains.
                </td>
              </tr>
              <tr>
                <th scope="row">Review</th>
                <td>Subject reviewer → department approver → exam cell</td>
                <td>
                  Independent moderator → examination authority → final
                  controller
                </td>
              </tr>
              <tr>
                <th scope="row">Controls</th>
                <td>
                  Change requests, deadline alerts and final approval evidence.
                </td>
                <td>
                  Restricted preview, independent review, access logs and
                  version immutability.
                </td>
              </tr>
              <tr>
                <th scope="row">Outcome</th>
                <td>Validated, approved mid-term paper</td>
                <td>Restricted, sealed final paper</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
export function RolesAndValidation() {
  const roles = [
    [
      "Management",
      "Institution-wide visibility into examination readiness and academic governance.",
    ],
    [
      "Controller of Examinations",
      "Examination timelines, final authorization and controlled release.",
    ],
    [
      "HoD",
      "Department-level routing, subject coverage and pending approvals.",
    ],
    [
      "Faculty",
      "Assigned subjects, question drafts, paper requests and revision tasks.",
    ],
    [
      "Reviewers",
      "Assigned reviews, comments, version comparisons and traceable decisions.",
    ],
  ]
  return (
    <section id="validation" className={styles.section}>
      <span className={styles.eyebrow}>PEOPLE, PRECISION & GOVERNANCE</span>
      <h2>Validation & Quality Intelligence</h2>
      <p className={styles.intro}>{blueprintFeatures[8][2]}</p>
      <div className={styles.roles}>
        {roles.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
        <article>
          <h3>Security, Governance & Integrations</h3>
          <p>
            Academic approval remains with authorized people. Students may view
            permitted syllabus and academic learning resources, not confidential
            papers.
          </p>
        </article>
      </div>
      <Link href="/solutions" className={styles.sectionLink}>
        Explore solutions by role
        <ArrowRight size={15} />
      </Link>
      <p className={styles.note}>
        Blocking and advisory rules, explanations, exception approvals and
        validation reports support your institution’s governed workflow.
        Configure controls and reviewer responsibilities around your academic
        policy.
      </p>
    </section>
  )
}
export function PriorityClosing() {
  return (
    <section id="demo" className={styles.section}>
      <div className={styles.closing}>
        <span className={styles.eyebrow}>REQUEST A 30-MINUTE LIVE DEMO</span>
        <h2>
          Your institution has the curriculum. Questra brings the intelligence,
          governance and automation to transform it into examination-ready
          question papers.
        </h2>
        <p>
          Discover a more controlled, transparent and efficient way to create,
          review, validate and approve every paper.
        </p>
        <Link className={styles.primaryButton} href="/book-demo">
          Request a 30-Minute Live Demo
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}
