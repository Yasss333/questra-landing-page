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
  Users,
} from "lucide-react"
import { featureRoutes } from "./phaseTwoContent"
import { blueprintFeatures } from "./blueprint"
import styles from "./FeatureBento.module.css"
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
function Illustration({ index }: { index: number }) {
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
          <Sparkles className={styles.spark} size={32} />
          <i />
          <i />
          <i />
          <span>AI + academic judgment</span>
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
      {blueprintFeatures.map(([id, title, description], index) => {
        const Icon = icons[index]
        return (
          <article
            key={id}
            className={`${styles.card} ${[0, 4, 7, 11].includes(index) ? styles.wide : ""}`}
            data-tone={index % 3}
          >
            <div className={styles.art}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")} / QUESTRA
              </span>
              <Illustration index={index} />
              <span className={styles.artLabel}>{labels[index]}</span>
            </div>
            <div className={styles.copy}>
              <Icon className={styles.icon} size={23} aria-hidden="true" />
              <h3>
                <Link href={featureRoutes[index]}>{title}</Link>
              </h3>
              <p>{description}</p>
              <Link className={styles.cta} href={featureRoutes[index]}>
                Explore capability <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
