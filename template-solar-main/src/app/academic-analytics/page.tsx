import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Bloom’s & CO/PO Mapping | Questra"
const description =
  "Map CO/PO and Bloom’s taxonomy; track planned vs available questions and paper coverage."

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
