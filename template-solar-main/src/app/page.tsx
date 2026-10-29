import { Hero } from "@/components/ui/Hero"
import DashboardPreview from "@/components/ui/DashboardPreview"
import {
  Analytics,
  FacultyReview,
  FAQ,
  Platform,
  StudentPortal,
  Workflow,
} from "@/components/marketing/HomeSections"
import BulkPaperSection from "@/components/marketing/BulkPaperSection"
import {
  ApprovalOverview,
  ClosingCTA,
  InstitutionProblem,
} from "@/components/marketing/ProductContent"
import styles from "@/components/marketing/Marketing.module.css"
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
      <InstitutionProblem />
      <BulkPaperSection />
      <div className={styles.dashboardWrap}>
        <DashboardPreview />
      </div>
      <Platform />
      <FacultyReview />
      <Workflow />
      <ApprovalOverview />
      <StudentPortal />
      <Analytics />
      <FAQ />
      <ClosingCTA />
    </main>
  )
}
