import DemoContact from "@/components/marketing/DemoContact"
import styles from "@/components/marketing/ContentPages.module.css"
import { marketingMetadata, pageStructuredData } from "../marketing-metadata"
const title = "Book a 30-Minute Live Demo | Questra"
const description =
  "Explore Questra’s examination workflow in a focused 30-minute walkthrough for your institution. Prepare an enquiry and send it through your email app."
export const metadata = marketingMetadata("/book-demo", title, description)
export default function BookDemo() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData("/book-demo", title, description),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <DemoContact standalone />
    </main>
  )
}
