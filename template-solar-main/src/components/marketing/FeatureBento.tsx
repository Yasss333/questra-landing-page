import Link from "next/link"
import {
  ArrowRight,
  Building2,
  BookOpen,
  Sparkles,
  CalendarDays,
  Files,
  GitPullRequest,
  Route,
  LockKeyhole,
  ShieldCheck,
  ChartNoAxesCombined,
  Fingerprint,
  Upload,
  Users,
} from "lucide-react"
import { featureRoutes } from "./phaseTwoContent"
import { blueprintFeatures } from "./blueprint"
import styles from "./FeatureBento.module.css"

const featuredCards = [
  {
    index: 4,
    title: "Autonomous Question Paper Generation",
    description: "Generate question papers with multiple patterns and greater complexity for Mid-Term and End-Semester examinations.",
  },
  {
    index: 1,
    title: "Outcome & Bloom’s Taxonomy Alignment",
    description: "Ensure proper distribution of outcomes and Bloom’s levels across every paper.",
    href: "/academic-analytics",
  },
  {
    index: 8,
    title: "Advanced Validation Before Finalisation",
    description: "Verify marks, patterns, syllabus coverage, complexity, duplication, and outcome distribution.",
  },
  {
    index: 2,
    title: "AI-Powered Question Creation",
    description: "Generate topic- and unit-based questions from the subject syllabus using Artificial Intelligence.",
  },
  {
    index: 2,
    title: "Flexible Question Import",
    description: "Import questions from digital media and configure them using academic rules.",
    href: "/question-bank",
    icon: Upload,
  },
  {
    index: 0,
    title: "Master Wizard Onboarding",
    description: "Simplified setup for academic structure, question bank, blueprint definition, review workflow, validation and approval.",
  },
  {
    index: 5,
    title: "Multi-Level Review & Approval",
    description: "Fully autonomous engine configuration with structured multi-level review and approval process.",
    href: "/approval-automation",
  },
  {
    index: 11,
    title: "Role-Based Secure Portals",
    description: "Dedicated access for faculty, students, Controller of Examinations, and management with strong governance.",
    href: "/security-governance",
  },
  {
    index: 9,
    title: "Dynamic Dashboards & Alerts",
    description: "Extensive dashboards and alerts for pre-approval checks and system intelligence.",
  },
]

const cards = [
  ...featuredCards,
  ...[3, 1, 10].map((index) => {
    const [, title, description] = blueprintFeatures[index]
    return { index, title, description, href: featureRoutes[index] }
  }),
]

const icons = [
  Building2,
  BookOpen,
  Sparkles,
  CalendarDays,
  Files,
  GitPullRequest,
  Route,
  LockKeyhole,
  ShieldCheck,
  ChartNoAxesCombined,
  Fingerprint,
  Users,
]
const labels = [
  "A connected academic foundation",
  "Every topic in context",
  "Faculty-led intelligence",
  "A rhythm for every examination",
  "From blueprint to paper",
  "The right reviewer, automatically",
  "Keep every request moving",
  "Confidence at the final stage",
  "Quality at every checkpoint",
  "See the bigger picture",
  "Control built into the workflow",
  "One platform. Every stakeholder.",
]
function Illustration({ index, importing }: { index: number; importing: boolean }) {
  const Icon = icons[index]
  return (
    <div className={styles.scene} aria-hidden="true">
      {index === 0 ? (
        <div className={styles.tree}>
          <span>
            <Building2 size={25} />
          </span>
          <div>
            <i />
            <i />
            <i />
          </div>
        </div>
      ) : index === 1 ? (
        <div className={styles.book}>
          <BookOpen size={95} strokeWidth={1} />
          <span>CO / PO · K1–K6</span>
        </div>
      ) : index === 2 ? (
        <div className={styles.sheet}>
          {importing ? <Upload className={styles.spark} size={32} /> : <Sparkles className={styles.spark} size={32} />}
          <i />
          <i />
          <i />
          <span>{importing ? "Import · Configure" : "AI + academic judgment"}</span>
        </div>
      ) : index === 3 ? (
        <div className={styles.calendar}>
          <CalendarDays size={78} strokeWidth={1} />
          <div>
            {Array.from({ length: 7 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
      ) : index === 4 ? (
        <div className={styles.papers}>
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Files size={23} />
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
      ) : [5, 6, 7].includes(index) ? (
        <div className={styles.flow}>
          {[Users, Icon, ShieldCheck].map((Node, i) => (
            <span key={i}>
              <Node size={23} />
              {i < 2 && <b>→</b>}
            </span>
          ))}
          <small>
            {index === 5
              ? "Submit · Review · Approve"
              : index === 6
                ? "Request · Route · Review"
                : "Moderate · Authorize · Release"}
          </small>
        </div>
      ) : index === 8 ? (
        <div className={styles.checks}>
          {["Pattern", "Coverage", "Outcomes"].map((t) => (
            <span key={t}>
              <ShieldCheck size={18} />
              {t}
              <b>✓</b>
            </span>
          ))}
        </div>
      ) : index === 9 ? (
        <div className={styles.chart}>
          {[35, 62, 48, 84, 70, 100, 92].map((n, i) => (
            <i key={i} style={{ height: n, animationDelay: `${i * -0.4}s` }} />
          ))}
        </div>
      ) : index === 10 ? (
        <div className={styles.security}>
          <div />
          <Fingerprint size={80} strokeWidth={1} />
          <LockKeyhole size={22} />
        </div>
      ) : (
        <div className={styles.people}>
          {[Users, BookOpen, Building2].map((Node, i) => (
            <span key={i}>
              <Node size={30} />
              <small>{["Faculty", "Students", "Institution"][i]}</small>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
export default function FeatureBento() {
  return (
    <div className={styles.grid}>
      {cards.map((card, position) => {
        const { index, title, description } = card
        const customIcon = "icon" in card ? card.icon : undefined
        const Icon = customIcon ?? icons[index]
        const href = card.href ?? featureRoutes[index]
        return (
          <article
            key={title}
            className={`${styles.card} ${[0, 3, 6, 9].includes(position) ? styles.wide : ""}`}
            data-tone={position % 3}
          >
            <div className={styles.art}>
              <span className={styles.number}>
                {String(position + 1).padStart(2, "0")} / QUESTRA
              </span>
              <Illustration index={index} importing={customIcon === Upload} />
              <span className={styles.artLabel}>{customIcon === Upload ? "Bring existing questions into the bank" : labels[index]}</span>
            </div>
            <div className={styles.copy}>
              <Icon className={styles.icon} size={23} aria-hidden="true" />
              <h3>
                {href ? (
                  <Link href={href}>{title}</Link>
                ) : (
                  title
                )}
              </h3>
              <p>{description}</p>
              {href && (
                <Link className={styles.cta} href={href}>
                  Explore capability <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}
