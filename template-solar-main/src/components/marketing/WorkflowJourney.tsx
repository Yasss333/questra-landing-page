import {
  BookOpen, BrainCircuit, FileText, WandSparkles,
  ScanLine, ScanText, PenLine, BadgeCheck, ShieldCheck, Users,
  ChartNoAxesCombined, GraduationCap,
} from "lucide-react"
import styles from "./WorkflowJourney.module.css"

const journey = [
  {
    title: "Academic Intelligence",
    detail: "A shared foundation of syllabus, outcomes and academic rules.",
    icon: BookOpen,
    accent: BrainCircuit,
  },
  {
    title: "Autonomous Question Paper Generation",
    detail: "Turn approved questions and blueprints into examination papers.",
    icon: FileText,
    accent: WandSparkles,
  },
  {
    title: "EvalIQ Digitization",
    detail: "Bring student scripts into a structured digital workspace.",
    icon: ScanLine,
    accent: ScanText,
  },
  {
    title: "EvalIQ Answer Evaluation",
    detail: "Support marking with approved answers and faculty-reviewed suggestions.",
    icon: PenLine,
    accent: BadgeCheck,
  },
  {
    title: "EvalIQ Moderation",
    detail: "Review, moderate and authorize marks with academic oversight.",
    icon: ShieldCheck,
    accent: Users,
  },
  {
    title: "Academic Performance Intelligence",
    detail: "Connect verified results to learning outcomes and student progress.",
    icon: ChartNoAxesCombined,
    accent: GraduationCap,
  },
]

export default function WorkflowJourney() {
  return (
    <div className={styles.journey}>
      <div className={styles.phase}><span />Pre-exam<span /></div>
      <svg className={styles.ribbon} viewBox="0 0 1200 616" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.track} d="M 200 76 H 1000 C 1240 76 1240 432 1000 432 H 200" />
        <path className={styles.flow} d="M 200 76 H 1000 C 1240 76 1240 432 1000 432 H 200" />
      </svg>
      <ol className={styles.grid}>
        {journey.map(({ title, detail, icon: Icon, accent: Accent }, index) => (
          <li key={title} className={styles.step}>
            <article className={styles.stop}>
              <div className={styles.art} aria-hidden="true">
                <div className={styles.iconPanel}>
                  <Icon size={64} strokeWidth={1.25} />
                  <span className={styles.iconAccent}>
                    <Accent size={28} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <div className={styles.copy}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <div className={styles.postPhase}><span />Post-exam<span /></div>
    </div>
  )
}
