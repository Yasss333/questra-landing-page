import FeatureLanding from "@/components/marketing/FeatureLanding"
import { solutionsContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Questra Solutions"
const description =
  "Universities; Autonomous Colleges; Examination Cells; Faculty & HoDs."

export const metadata = marketingMetadata("/solutions", title, description)

export default function SolutionsPage() {
  return (
    <FeatureLanding
      content={solutionsContent}
      path="/solutions"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
