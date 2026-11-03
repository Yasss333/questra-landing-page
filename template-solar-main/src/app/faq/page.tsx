import ResourceLayout from "@/components/marketing/ResourceLayout"
import styles from "@/components/marketing/ContentPages.module.css"
import { homeFaqItems } from "@/components/marketing/faqContent"
import { marketingMetadata } from "../marketing-metadata"
const title = "Frequently Asked Questions | Questra"
const description =
  "Answers about AI-assisted questions, configurable paper patterns, academic approvals, imports and institution-controlled access."
export const metadata = marketingMetadata("/faq", title, description)
export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqItems.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  }
  return (
    <ResourceLayout
      path="/faq"
      title="Good questions. Clear answers."
      description={description}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section
        className={styles.section}
        aria-label="Frequently asked questions"
      >
        <div className={styles.portalFaq}>
          {homeFaqItems.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </ResourceLayout>
  )
}
