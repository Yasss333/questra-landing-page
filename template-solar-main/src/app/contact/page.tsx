import Link from "next/link"
import ResourceLayout from "@/components/marketing/ResourceLayout"
import styles from "@/components/marketing/ContentPages.module.css"
import { siteConfig } from "../siteConfig"
import { marketingMetadata } from "../marketing-metadata"
const title = "Contact Questra"
const description =
  "Talk to the Questra team about your institution’s examination workflows, academic structure and rollout requirements."
export const metadata = marketingMetadata("/contact", title, description)
export default function Page() {
  return (
    <ResourceLayout path="/contact" title={title} description={description}>
      <section className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading">Start with your institution’s questions.</h2>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Email the team</h3>
            <p>
              Share your institution name, your role and the examination
              workflow you would like to explore.
            </p>
            <a
              className={styles.link}
              href={"mailto:" + siteConfig.contactEmail}
            >
              {siteConfig.contactEmail}
            </a>
          </article>
          <article className={styles.card}>
            <h3>Request a focused walkthrough</h3>
            <p>
              Explore the syllabus-to-approval workflow in a 30-minute
              demonstration. Preferred dates are requests; the team will arrange
              a suitable time with you.
            </p>
            <Link className={styles.link} href="/book-demo">
              Prepare a demo enquiry →
            </Link>
          </article>
          <article className={styles.card}>
            <h3>Plan an institutional rollout</h3>
            <p>
              Bring your academic hierarchy, sample paper pattern, approval
              policy and any ERP/LMS requirements to the discussion.
            </p>
            <Link className={styles.link} href="/solutions">
              Explore institutional solutions →
            </Link>
          </article>
        </div>
      </section>
    </ResourceLayout>
  )
}
