import FeatureLanding from "@/components/marketing/FeatureLanding"
import { phaseTwoFeatures } from "@/components/marketing/phaseTwoContent"
import { marketingMetadata } from "../marketing-metadata"
const content = phaseTwoFeatures.calendar
const title = "Examination Calendar & Paper Patterns | Questra"
export const metadata = marketingMetadata(
  "/examination-calendar",
  title,
  content.description,
)
export default function Page() {
  return (
    <FeatureLanding
      content={content}
      path="/examination-calendar"
      metadataTitle={title}
      metadataDescription={content.description}
    />
  )
}
