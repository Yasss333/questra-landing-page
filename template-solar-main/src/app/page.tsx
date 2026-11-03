import { Hero } from "@/components/ui/Hero"
import DashboardPreview from "@/components/ui/DashboardPreview"
import { FAQ } from "@/components/marketing/HomeSections"
import {
  ExactWorkflow,
  ExamComparison,
  FeatureIndex,
  Positioning,
  PriorityApprovals,
  PriorityClosing,
  RolesAndValidation,
} from "@/components/marketing/PrioritySections"
import styles from "@/components/marketing/PhaseZero.module.css"
import { homeStructuredData } from "./structured-data"
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Positioning />
      <ExactWorkflow />
      <PriorityApprovals />
      <ExamComparison />
      <section
        className={styles.section}
        aria-label="Interactive product preview"
      >
        <span className={styles.eyebrow}>EXPLORE THE WORKSPACE</span>
        <h2>Try the interactive preview.</h2>
        <p className={styles.note}>
          Overview, Master data and Question bank are available with sample
          records. Explore the complete product in a guided demo.
        </p>
      </section>
      <DashboardPreview />
      <FeatureIndex />
      <RolesAndValidation />

      <FAQ />
      <PriorityClosing />
    </main>
  )
}
