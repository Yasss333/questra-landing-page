import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "AI Question Studio for Faculty | Questra"
const description =
  "Create syllabus-grounded question drafts with controls for marks, type, difficulty, Bloom’s level, and outcomes, with faculty editing and academic review."

export const metadata = marketingMetadata(
  "/ai-question-studio",
  title,
  description,
)

export default function AIQuestionStudioPage() {
  return (
    <FeatureLanding
      content={featureLandingContent.questionStudio}
      path="/ai-question-studio"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
