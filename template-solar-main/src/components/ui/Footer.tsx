import Link from "next/link"
import { RiArrowRightUpLine } from "@remixicon/react"
import QuestraLogo from "../marketing/QuestraLogo"
import styles from "../marketing/Marketing.module.css"
import { siteConfig } from "@/app/siteConfig"
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerPattern} aria-hidden="true" />
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label="Questra home">
            <QuestraLogo width={180} />
          </Link>
          <p>
            Create with intelligence.
            <br />
            Review with confidence.
            <br />
            Examine with purpose.
          </p>
        </div>
        <div>
          <h2>Platform</h2>
          <Link href="/platform">Capabilities</Link>
          <Link href="/platform#governance">Faculty review</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/platform#dashboards">Analytics & outcomes</Link>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/#student-portal">Student Portal</Link>
          <Link href="/#faq">Common questions</Link>
          <Link href="/book-demo">Book a demo</Link>
        </div>
        <div className={styles.footerContact}>
          <h2>Let’s talk</h2>
          <Link href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
            <RiArrowRightUpLine size={14} aria-hidden="true" />
          </Link>
          <p>Bring Questra to your institution.</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Questra. All rights reserved.</span>
        <span>Intelligence behind every Question.</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  )
}
