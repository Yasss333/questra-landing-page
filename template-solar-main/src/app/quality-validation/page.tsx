import FeatureLanding from "@/components/marketing/FeatureLanding"
import { phaseTwoFeatures } from "@/components/marketing/phaseTwoContent"
import { marketingMetadata } from "../marketing-metadata"
const content = phaseTwoFeatures.validation
const title = "Validation & Quality Intelligence | Questra"
export const metadata = marketingMetadata(
  "/quality-validation",
  title,
  content.description,
)
export default function Page() {
  return (
    <FeatureLanding
      content={content}
      path="/quality-validation"
      metadataTitle={title}
      metadataDescription={content.description}
    />
  )
}
