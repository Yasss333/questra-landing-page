import FeatureLanding from "@/components/marketing/FeatureLanding"
import { featureLandingContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Academic Question Bank and Practice Content | Questra"
const description =
  "Manage searchable, syllabus-mapped questions with academic metadata, review history, approval status, answer guidance, and institution-controlled student publication."

export const metadata = marketingMetadata("/question-bank", title, description)

export default function QuestionBankPage() {
  return (
    <FeatureLanding
      content={featureLandingContent.questionBank}
      path="/question-bank"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
