import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Bulk Question Paper Generation and Blueprints | Questra"
const description =
  "Configure examination blueprints, assemble multiple mid-term or end-semester papers, validate syllabus coverage and marks, and route approved versions for release."

export const metadata = marketingMetadata(
  "/bulk-paper-generation",
  title,
  description,
)

export default function BulkPaperGenerationPage() {
  return (
    <FeatureLanding
      content={featureLandingContent.paperGeneration}
      path="/bulk-paper-generation"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
