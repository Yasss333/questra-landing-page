import Link from "next/link"
import styles from "./ContentPages.module.css"
export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className={styles.hero}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className={styles.actions}>
        <Link className={styles.button} href="/book-demo">
          Experience a live demo ↗
        </Link>
        <Link className={styles.link} href="/platform">
          Explore the platform →
        </Link>
      </div>
    </header>
  )
}
