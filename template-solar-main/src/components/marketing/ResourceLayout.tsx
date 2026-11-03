import Link from "next/link"
import { pageStructuredData } from "@/app/marketing-metadata"
import PageIntro from "./PageIntro"
import { PriorityClosing } from "./PrioritySections"
import styles from "./ContentPages.module.css"
export default function ResourceLayout({
  path,
  title,
  description,
  children,
}: {
  path: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData(path, title, description),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="Questra resources"
        title={title}
        description={description}
      />
      {children}
      <section className={styles.section}>
        <Link className={styles.link} href="/how-it-works">
          See how the workflow works →
        </Link>
      </section>
      <PriorityClosing />
    </main>
  )
}
