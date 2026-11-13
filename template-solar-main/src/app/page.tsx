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
      <FeatureIndex />
      <Positioning />
      <PriorityApprovals />
      <ExamComparison />
      <DashboardPreview />
      <ExactWorkflow />
      <RolesAndValidation />

      <PriorityClosing heading="Questra ensures curriculum-aware, faculty-controlled and institution-governed examination management." />
      <FAQ />
    </main>
  )
}
