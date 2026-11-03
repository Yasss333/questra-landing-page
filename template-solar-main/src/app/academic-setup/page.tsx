import FeatureLanding from "@/components/marketing/FeatureLanding"
import { phaseTwoFeatures } from "@/components/marketing/phaseTwoContent"
import { marketingMetadata } from "../marketing-metadata"
const content = phaseTwoFeatures.academicSetup
const title = "Academic Master Data & Onboarding | Questra"
export const metadata = marketingMetadata(
  "/academic-setup",
  title,
  content.description,
)
export default function Page() {
  return (
    <FeatureLanding
      content={content}
      path="/academic-setup"
      metadataTitle={title}
      metadataDescription={content.description}
    />
  )
}
