import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Academic Analytics and OBE Mapping | Questra"
const description =
  "Review question availability, syllabus coverage, Bloom’s taxonomy distribution, Course Outcomes, Programme Outcomes, and examination readiness with Questra."

export const metadata = marketingMetadata(
  "/academic-analytics",
  title,
  description,
)

export default function AcademicAnalyticsPage() {
  return (
    <FeatureLanding
      content={featureLandingContent.analytics}
      path="/academic-analytics"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
