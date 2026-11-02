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
          <small className={styles.footerProduct}>A product of VoiceDots AI</small>
        </div>
        <div>
          <h2>Platform</h2>
          <Link href="/platform">Capabilities</Link>
          <Link href="/ai-question-studio">AI Question Studio</Link>
          <Link href="/question-bank">Question Bank</Link>
          <Link href="/bulk-paper-generation">Paper Generation</Link>
          <Link href="/syllabus-intelligence">Syllabus Intelligence</Link>
          <Link href="/approval-automation">Approval automation</Link>
          <Link href="/academic-analytics">Analytics & outcomes</Link>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/student-portal">Student Portal</Link>
          <Link href="/solutions">Solutions by role</Link>
          <Link href="/security-governance">Security & governance</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/#faq">Common questions</Link>
        </div>
        <div className={styles.footerContact}>
          <h2>Company & contact</h2>
          <Link href="/about">About Questra</Link>
          <Link href="/book-demo">Request a 30-minute demo</Link>
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
