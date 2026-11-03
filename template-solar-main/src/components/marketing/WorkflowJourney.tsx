import Link from "next/link"
import {
  BookOpen,
  Sparkles,
  Files,
  Send,
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
} from "lucide-react"
import { journey } from "./blueprint"
import styles from "./WorkflowJourney.module.css"
const icons = [BookOpen, Sparkles, Files, Send, ShieldCheck, LockKeyhole]
const hrefs = [
  "/academic-setup",
  "/ai-question-studio",
  "/bulk-paper-generation",
  "/approval-automation",
  "/quality-validation",
  "/security-governance",
]
export default function WorkflowJourney() {
  return (
    <ol className={styles.grid}>
      {journey.map((title, index) => {
        const Icon = icons[index]
        return (
          <li key={title} className={styles.step}>
            <Link className={styles.card} href={hrefs[index]}>
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

            </Link>
            {index < journey.length - 1 && (
              <ArrowRight className={styles.connector} size={24} aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
