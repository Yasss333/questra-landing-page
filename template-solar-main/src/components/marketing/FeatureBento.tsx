import {
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
import styles from "./FeatureBento.module.css"

const cards = [
  [
    2,
    "EvalIQ Digitization",
    "Upload scanned scripts in bulk, identify them by QR or barcode, and flag missing, duplicate or unreadable pages.",
  ],
  [
    4,
    "EvalIQ Handwriting Recognition",
    "Recognize handwriting, equations and question structure. Faculty verify uncertain extracts, with multilingual recognition where supported.",
  ],
  [
    2,
    "EvalIQ Answer Evaluation",
    "Suggest rubric-based marks and partial credit against approved model answers. Faculty verify or override each suggestion.",
  ],
  [
    11,
    "EvalIQ Faculty Workspace",
    "Review scripts beside approved rubrics, annotate answers, enter marks and submit evaluations for moderation.",
  ],
  [
    8,
    "EvalIQ Evaluation Quality",
    "Flag valuation differences, overlooked answers and low-confidence suggestions for faculty review.",
  ],
  [
    5,
    "EvalIQ Moderation",
    "Configure single, double or triple valuation with independent examiners, escalation thresholds and COE authorization.",
  ],
  [
    7,
    "EvalIQ Result Processing",
    "Consolidate verified marks, apply institutional grading rules and control when approved results are published.",
  ],
  [
    1,
    "EvalIQ Outcome Attainment",
    "Connect question-wise marks to CO/PO attainment and report outcomes by student, subject or department.",
  ],
  [
    9,
    "EvalIQ Bloom’s Analytics",
    "Analyze evaluated answers across the six Bloom’s levels to identify cognitive learning gaps.",
  ],
  [
    0,
    "EvalIQ Student Competency",
    "Build student competency profiles from verified results, highlighting topic strengths, gaps and progress.",
  ],
  [
    6,
    "EvalIQ Assessment Improvement",
    "Use observed difficulty and response patterns to identify questions and blueprints for faculty review.",
  ],
  [
    9,
    "EvalIQ Learning Support",
    "Use approved results to recommend targeted practice and track faculty or mentor interventions.",
  ],
] as const

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
function Illustration({
  index,
  importing,
}: {
  index: number
  importing: boolean
}) {
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
          {importing ? (
            <Upload className={styles.spark} size={32} />
          ) : (
            <Sparkles className={styles.spark} size={32} />
          )}
          <i />
          <i />
          <i />
          <span>
            {importing ? "Scan · Index · Verify" : "AI + academic judgment"}
          </span>
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
                ? "Measure · Review · Refine"
                : "Consolidate · Approve · Release"}
          </small>
        </div>
      ) : index === 8 ? (
        <div className={styles.checks}>
          {["Mark deviations", "Missing marks", "AI confidence"].map((t) => (
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
      {cards.map(([index, title, description], position) => {
        const importing = position === 0
        const Icon = importing ? Upload : icons[index]
        return (
          <article
            key={title}
            className={`${styles.card} ${[0, 3, 6, 9].includes(position) ? styles.wide : ""}`}
            data-tone={position % 3}
          >
            <div className={styles.art}>
              <Illustration index={index} importing={importing} />
            </div>
            <div className={styles.copy}>
              <Icon className={styles.icon} size={23} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
