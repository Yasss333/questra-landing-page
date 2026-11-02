import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Syllabus Intelligence and Academic Setup | Questra"
const description =
  "Connect academic masters, syllabus versions, units, topics, staff assignments, and learning outcomes in Questra’s examination intelligence platform."

export const metadata = marketingMetadata(
  "/syllabus-intelligence",
  title,
  description,
)

export default function SyllabusIntelligencePage() {
  return (
    <FeatureLanding
      content={featureLandingContent.syllabus}
      path="/syllabus-intelligence"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
