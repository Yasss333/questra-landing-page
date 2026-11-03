import Link from "next/link"
import PageIntro from "@/components/marketing/PageIntro"
import { PriorityClosing } from "@/components/marketing/PrioritySections"
import { pageStructuredData } from "@/app/marketing-metadata"
import styles from "./ContentPages.module.css"

export type LandingCard = readonly [title: string, description: string]

export type FeatureLandingContent = {
  eyebrow: string
  title: string
  description: string
  sectionEyebrow: string
  sectionTitle: string
  sectionIntro: string
  cards: readonly LandingCard[]
  steps?: readonly LandingCard[]
  note?: string
  related?: readonly LandingCard[]
}

export default function FeatureLanding({
  content,
  path,
  metadataTitle,
  metadataDescription,
}: {
  content: FeatureLandingContent
  path: string
  metadataTitle: string
  metadataDescription: string
}) {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData(path, metadataTitle, metadataDescription),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <section
        id={path === "/academic-analytics" ? "outcome-mapping" : undefined}
        className={styles.section}
        aria-labelledby="capabilities-heading"
      >
        <span className={styles.eyebrow}>{content.sectionEyebrow}</span>
        <h2 id="capabilities-heading">{content.sectionTitle}</h2>
        <p className={styles.intro}>{content.sectionIntro}</p>
        <div className={styles.grid}>
          {content.cards.map(([title, description], index) => (
            <article className={styles.card} key={title}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </article>
          ))}
        </div>
        {content.note && <p className={styles.note}>{content.note}</p>}
      </section>
      {content.steps && (
        <section
          id={path === "/academic-analytics" ? "reports" : undefined}
          className={styles.section}
          aria-labelledby="journey-heading"
        >
          <span className={styles.eyebrow}>A connected workflow</span>
          <h2 id="journey-heading">
            From the first step to a reviewed result.
          </h2>
          <ol className={`${styles.grid} ${styles.stepGrid}`}>
            {content.steps.map(([title, description], index) => (
              <li className={styles.card} key={title}>
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      {content.related && (
        <section className={styles.section} aria-labelledby="related-heading">
          <span className={styles.eyebrow}>Explore Questra</span>
          <h2 id="related-heading">Continue exploring the platform.</h2>
          <div className={styles.grid}>
            {content.related.map(([title, href]) => (
              <article
                className={`${styles.card} ${styles.relatedCard}`}
                key={href}
              >
                <h3>{title}</h3>
                <Link className={styles.link} href={href}>
                  Explore {title.toLowerCase()} →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <PriorityClosing />
    </main>
  )
}
