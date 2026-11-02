import FeatureLanding from "@/components/marketing/FeatureLanding"
import { aboutContent } from "@/components/marketing/featureLandingContent"
import { marketingMetadata } from "../marketing-metadata"

const title = "About Questra | Examination Intelligence"
const description =
  "Learn about Questra’s connected approach to academic setup, AI-assisted question creation, examination workflows, faculty review, and academic intelligence."

export const metadata = marketingMetadata("/about", title, description)

export default function AboutPage() {
  return (
    <FeatureLanding
      content={aboutContent}
      path="/about"
      metadataTitle={title}
      metadataDescription={description}
    />
  )
}
