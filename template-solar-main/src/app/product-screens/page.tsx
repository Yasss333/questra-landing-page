import Link from "next/link"
import ResourceLayout from "@/components/marketing/ResourceLayout"
import styles from "@/components/marketing/ContentPages.module.css"
import {
  LockKeyhole,
  ArrowRight,
  LayoutDashboard,
  Database,
  Users,
  Sparkles,
  Files,
  GitPullRequest,
  ShieldCheck,
  CalendarDays,
} from "lucide-react"
import { marketingMetadata } from "../marketing-metadata"
const title = "Explore the Questra Workspace"
const description =
  "Discover eight connected workspaces, try the selected public preview, and request a guided walkthrough of the full examination workflow."
export const metadata = marketingMetadata(
  "/product-screens",
  title,
  description,
)
const screens = [
  [
    "Institutional Command Center",
    "Setup completeness, active examinations, approval backlog and risk alerts.",
    LayoutDashboard,
    true,
  ],
  [
    "Academic Master Dashboard",
    "Batch, degree, department, subject, syllabus and staff/student readiness.",
    Database,
    true,
  ],
  [
    "Faculty Workspace",
    "Allocated subjects, drafts, assigned review tasks and due dates.",
    Users,
    false,
  ],
  [
    "AI Question Studio",
    "Source syllabus, drafting controls, candidates, editing and submission.",
    Sparkles,
    false,
  ],
  [
    "Paper Blueprint Builder",
    "Marks, section patterns, choices, coverage and rule preview.",
    Files,
    false,
  ],
  [
    "Approval Cockpit",
    "Level 1–2–3 progress, comments, pending actions and decision timelines.",
    GitPullRequest,
    false,
  ],
  [
    "Quality Validation",
    "Pass, warning and blocking issues with correction actions.",
    ShieldCheck,
    false,
  ],
  [
    "Examination Calendar",
    "Mid-term and end-semester deadlines and release status.",
    CalendarDays,
    false,
  ],
] as const
export default function Page() {
  return (
    <ResourceLayout
      path="/product-screens"
      title={title}
      description={description}
    >
      <section className={styles.section} aria-labelledby="screens-heading">
        <span className={styles.eyebrow}>
          Selected preview. Full experience in your demo.
        </span>
        <h2 id="screens-heading">A workspace for every stage.</h2>
        <p className={styles.intro}>
          Try Overview, Master data and Question bank with illustrative sample
          records. Explore the remaining workflows privately with our team.
        </p>
        <div className={styles.grid}>
          {screens.map(([name, text, Icon, open]) => (
            <article key={name} className={styles.card}>
              <div className={styles.screenArt} aria-hidden="true">
                <Icon size={48} strokeWidth={1} />
                {!open && <LockKeyhole size={18} />}
              </div>
              <h3>{name}</h3>
              <p>{text}</p>
              <Link
                className={styles.link}
                href={open ? "/#dashboard-preview" : "/book-demo"}
              >
                {open ? "Try the selected preview" : "Book a demo to explore"}{" "}
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </ResourceLayout>
  )
}
