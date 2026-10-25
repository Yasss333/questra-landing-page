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
import DemoContact from "@/components/marketing/DemoContact"
import styles from "@/components/marketing/Marketing.module.css"
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <Hero />
      <div className={styles.dashboardWrap}>
        <DashboardPreview />
      </div>
      <Platform />
      <FacultyReview />
      <Workflow />
      <StudentPortal />
      <Analytics />
      <FAQ />
      <DemoContact />
    </main>
  )
}
