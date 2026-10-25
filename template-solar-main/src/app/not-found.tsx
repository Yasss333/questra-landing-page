import Link from "next/link"
import QuestraLogo from "@/components/marketing/QuestraLogo"
import styles from "@/components/marketing/Marketing.module.css"
export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <QuestraLogo width={180} />
      <p className={styles.kicker}>404 / PAGE NOT FOUND</p>
      <h1>Let’s get you back on course.</h1>
      <p>We couldn’t find the page you’re looking for.</p>
      <Link className={styles.button} href="/">
        Back to Questra
      </Link>
    </main>
  )
}
