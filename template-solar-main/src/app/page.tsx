import { Hero } from "@/components/ui/Hero"
import DashboardPreview from "@/components/ui/DashboardPreview"
import { FAQ } from "@/components/marketing/HomeSections"
import {
  ExactWorkflow,
  EvaluationGovernance,
  FeatureIndex,
  Positioning,
  PriorityApprovals,
  PriorityClosing,
  EvalIQMasterWizard,
  EvalIQBenefits,
  QuestraAdvantage,
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
      <ExactWorkflow />
      <FeatureIndex />
      <DashboardPreview />
      <EvalIQMasterWizard />
      <EvalIQBenefits />
      <EvaluationGovernance />
      <QuestraAdvantage />
      <Positioning />
      <PriorityApprovals />
      <PriorityClosing
        heading="Your Institution Has the Curriculum. Questra Brings the Intelligence."
        description={
          <>
            Move beyond disconnected examination workflows. Discover an
            integrated future of autonomous question paper generation,
            intelligent answer evaluation, academic governance, outcome
            attainment and continuous student improvement.
            <br />
            <strong>
              Experience the Next Evolution of Academic Assessment.
            </strong>
          </>
        }
      />
      <FAQ />
    </main>
  )
}
