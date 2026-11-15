import {
  BookOpen,
  ScanLine,
  Sparkles,
  Files,
  ShieldCheck,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react"
import styles from "./WorkflowJourney.module.css"
const journey = [
  "Academic Intelligence",
  "Autonomous Question Paper Generation",
  "Intelligent Answer Sheet Digitization",
  "AI-Assisted Answer Evaluation",
  "Faculty-Governed Moderation",
  "Academic Performance Intelligence",
]
const icons = [
  BookOpen,
  Files,
  ScanLine,
  Sparkles,
  ShieldCheck,
  ChartNoAxesCombined,
]
export default function WorkflowJourney() {
  return (
    <ol className={styles.grid}>
      {journey.map((title, index) => {
        const Icon = icons[index]
        return (
          <li key={title} className={styles.step}>
            <div className={styles.card}>
              <div className={styles.circle}>
                <div className={styles.art} aria-hidden="true">
                  <div className={styles.orbit} />
                  <div className={styles.backplate} />
                  <div className={styles.face}>
                    <Icon size={34} strokeWidth={1.4} />
                  </div>
                  <i className={styles.satellite} />
                  <i className={styles.satellite} />
                </div>
                <span className={styles.number}>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
            </div>
            {index < journey.length - 1 && (
              <ArrowRight
                className={styles.connector}
                size={24}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
