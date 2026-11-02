import FeatureLanding from "@/components/marketing/FeatureLanding"
import { solutionsContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "Questra Solutions for Universities and Examination Teams"
const description =
  "See how Questra supports examination controllers, institutional leaders, academic heads, departments, faculty, reviewers, IT teams, and students."

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
