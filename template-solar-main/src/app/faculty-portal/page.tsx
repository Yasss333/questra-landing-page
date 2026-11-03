import FeatureLanding from "@/components/marketing/FeatureLanding"
import { phaseTwoFeatures } from "@/components/marketing/phaseTwoContent"
import { marketingMetadata } from "../marketing-metadata"
const content = phaseTwoFeatures.faculty
const title = "Questra Faculty Portal"
export const metadata = marketingMetadata(
  "/faculty-portal",
  title,
  content.description,
)
export default function Page() {
  return (
    <FeatureLanding
      content={content}
      path="/faculty-portal"
      metadataTitle={title}
      metadataDescription={content.description}
    />
  )
}
