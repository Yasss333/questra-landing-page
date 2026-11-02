import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Examination Security and Academic Governance | Questra"
const description =
  "Learn how Questra supports institution-defined roles, academic review routes, version-aware decisions, and controlled examination content release."

export const metadata = marketingMetadata(
  "/security-governance",
  title,
  description,
)

export default function SecurityGovernancePage() {
  return (
    <FeatureLanding
      content={featureLandingContent.security}
      path="/security-governance"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
