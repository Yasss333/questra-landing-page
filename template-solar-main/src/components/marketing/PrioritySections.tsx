import Link from "next/link"
import type { ReactNode } from "react"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import FeatureBento from "./FeatureBento"
import WorkflowJourney from "./WorkflowJourney"
import { ArrowRight } from "lucide-react"
import { approvalCopy, approvalRoutes, valuePillars } from "./blueprint"
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
        <span className={styles.eyebrow}>01 · HOW IT WORKS</span>
        <h2>From Syllabus to Student Success</h2>
        <p className={styles.intro}>
          Questra already brings curriculum-aware question bank management,
          autonomous question paper generation, configurable examination
          patterns, Bloom&apos;s taxonomy, CO/PO mapping and hierarchy-based
          academic approvals.
        </p>
        <p className={styles.intro}>
          Questra EvalIQ extends this foundation into intelligent answer
          evaluation, digital valuation, examination quality governance, outcome
          attainment and student performance intelligence.
        </p>
        <h3>Six Stages. One Unified Academic Intelligence Platform.</h3>
        <WorkflowJourney />
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
      <HoverEffect className={styles.approvalGrid}>
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
      </HoverEffect>
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
      <span className={styles.eyebrow}>
        02 · QUESTRA EVALIQ SIGNATURE CAPABILITIES
      </span>
      <h2>12 Intelligent Evaluation Innovations</h2>
      <FeatureBento />
    </section>
  )
}
export function EvaluationGovernance() {
  const cards = [
    {
      title: "Institutional rules and access",
      items: [
        "Institution-controlled evaluation regulations",
        "Role-based access for academic stakeholders",
        "Controlled access to answer sheets and academic results",
      ],
    },
    {
      title: "Confidentiality and audit history",
      items: [
        "Secure and anonymous digital valuation",
        "Encrypted storage and transmission of sensitive examination data",
        "Comprehensive audit trails and mark revision records",
      ],
    },
    {
      title: "Faculty control and moderation",
      items: [
        "Faculty authorization of high-stakes descriptive marks",
        "Configurable multi-level moderation and approvals",
        "Human review for uncertain AI-generated assessments",
        "Institution-governed revaluation and grievance handling",
      ],
    },
  ]
  return (
    <section
      className={styles.blush}
      aria-labelledby="evaluation-governance-heading"
    >
      <div className={styles.section}>
        <span className={styles.eyebrow}>06 · QUESTRA EVALIQ</span>
        <h2 id="evaluation-governance-heading">
          Security, Governance &amp; Academic Integrity
        </h2>
        <p className={styles.intro}>
          Intelligent Automation with Responsible Academic Control
        </p>
        <HoverEffect className={styles.approvalGrid}>
          {cards.map(({ title, items }) => (
            <article className={styles.approvalCard} key={title}>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </HoverEffect>
      </div>
    </section>
  )
}
export function EvalIQMasterWizard() {
  const steps = [
    {
      title: "Select Examination & Link Question Paper",
      description:
        "Choose batch year, degree, department, semester, subject and examination. Link the approved Questra question paper with its patterns and question mappings.",
      image: "/images/master-wizard/examination-planning.webp",
      alt: "Administrator organizing documents beside a laptop",
      photo: true,
    },
    {
      title: "Configure Answer Key & Evaluation Rules",
      description:
        "Attach approved model answers, rubrics and partial-credit criteria. Define the valuation method, permitted mark variations, moderation thresholds and academic regulations.",
      image: "/images/master-wizard/answer-marking.webp",
      alt: "Marking a completed answer sheet with a red pen",
      photo: true,
    },
    {
      title: "Assign Staff & Define Approval Hierarchy",
      description:
        "Assign eligible examiners, chief examiners and moderation authorities. Configure evaluation submission, moderation, verification and COE approval stages.",
      image: "/images/master-wizard/staff-meeting.webp",
      alt: "Colleagues discussing documents around a meeting table",
      photo: true,
    },
    {
      title: "Identify Answer Sheets & Enable AI Assistance",
      description:
        "Define scanning formats, barcode or QR-based mapping and anonymity rules. Configure supported answer recognition, AI suggestions and confidence-based faculty review.",
      image: "/images/master-wizard/answer-sheet-scanning.webp",
      alt: "Placing a document on a flatbed scanner",
      photo: true,
    },
    {
      title: "Configure Results, Validate & Activate",
      description:
        "Set mark consolidation, grading, institutional regulations and publication authorization. Review all configurations, resolve missing prerequisites and activate the evaluation workflow.",
      image: "/images/master-wizard/question-paper-review.webp",
      alt: "Reviewing a question paper beside an answer sheet",
      photo: true,
    },
  ]
  return (
    <section id="validation" className={styles.section}>
      <span className={styles.eyebrow}>04 · QUESTRA EVALIQ MASTER WIZARD</span>
      <h2>Complex Examination Evaluation. Remarkably Simple Configuration.</h2>
      <p className={styles.intro}>
        An intuitive guided setup enables authorized institutional teams to
        configure and launch evaluation workflows without repeated manual
        coordination.
      </p>
      <StickyScroll content={steps} />
      <Link href="/book-demo" className={styles.sectionLink}>
        Request a 30-Minute Live Demo <ArrowRight size={15} />
      </Link>
    </section>
  )
}
export function EvalIQBenefits() {
  const benefits = [
    [
      "Reduced Administrative Complexity",
      "Digitize answer sheet handling, staff allocation, progress monitoring and marks consolidation.",
    ],
    [
      "Improved Evaluation Consistency",
      "Support faculty assessment through common rubrics, quality checks and review workflows.",
    ],
    [
      "Greater Academic Transparency",
      "Maintain traceable evaluation decisions, marks revisions, approvals and moderation records.",
    ],
    [
      "Faster Operational Coordination",
      "Give examination teams a centralized view of pending activities and processing exceptions.",
    ],
    [
      "Stronger Outcome-Based Education",
      "Connect student assessment performance with verified learning outcomes and cognitive competencies.",
    ],
    [
      "More Time for Academic Development",
      "Reduce repetitive administrative work so faculty can devote more attention to teaching, mentoring, research and student improvement.",
    ],
  ]
  return (
    <section
      id="evaliq-benefits"
      className={styles.section}
      aria-labelledby="evaliq-benefits-heading"
    >
      <span className={styles.eyebrow}>05 · THE INSTITUTIONAL ADVANTAGE</span>
      <h2 id="evaliq-benefits-heading">
        Why Controllers of Examinations Should Choose Questra EvalIQ
      </h2>
      <p className={styles.intro}>
        For institutions managing hundreds of subjects, thousands of answer
        sheets and multiple examination cycles, conventional valuation processes
        can demand substantial coordination, repeated verification and manual
        follow-up.
      </p>
      <p className={styles.intro}>
        Questra EvalIQ is designed to bring those activities into a connected,
        transparent and intelligent academic workflow.
      </p>
      <div className={styles.featureGrid}>
        {benefits.map(([title, description]) => (
          <article className={styles.feature} key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function QuestraAdvantage() {
  const advantages = [
    ["One Curriculum", "A common academic foundation."],
    ["One Question Bank", "Approved, reusable academic questions."],
    [
      "One Examination Engine",
      "Intelligent, configurable question paper generation.",
    ],
    ["One Evaluation Platform", "Digital valuation and AI-assisted marking."],
    [
      "One Academic Governance Framework",
      "Faculty control, moderation and COE approvals.",
    ],
    [
      "One Intelligence Layer",
      "Student competency, outcome attainment and continuous improvement.",
    ],
  ]
  return (
    <section
      id="questra-advantage"
      className={styles.blush}
      aria-labelledby="questra-advantage-heading"
    >
      <div className={styles.section}>
        <span className={styles.eyebrow}>07 · THE QUESTRA ADVANTAGE</span>
        <h2 id="questra-advantage-heading">
          Why Stop at Generating Intelligent Question Papers?
        </h2>
        <p className={styles.intro}>
          Conventional examination systems can separate question paper creation,
          answer sheet evaluation, result processing and academic analytics into
          disconnected workflows. Questra’s vision is to unite these activities
          within one intelligent academic ecosystem.
        </p>
        <div className={styles.featureGrid}>
          {advantages.map(([title, description]) => (
            <article className={styles.feature} key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          Questra creates intelligence before examinations, supports evaluation
          during examinations and transforms results into intelligence after
          examinations.
        </p>
      </div>
    </section>
  )
}

export function PriorityClosing({
  heading = "Your institution has the curriculum. Questra brings the intelligence, governance and automation to transform it into examination-ready question papers.",
  description = "Discover a more controlled, transparent and efficient way to create, review, validate and approve every paper.",
}: { heading?: string; description?: ReactNode } = {}) {
  return (
    <section id="demo" className={styles.section}>
      <div className={styles.closing}>
        <span className={styles.eyebrow}>REQUEST A 30-MINUTE LIVE DEMO</span>
        <h2>{heading}</h2>
        <p>{description}</p>
        <Link className={styles.primaryButton} href="/book-demo">
          Request a 30-Minute Live Demo
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}
