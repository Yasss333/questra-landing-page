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
          <a href="#home" aria-label="Questra home">
            <QuestraLogo width={180} />
          </a>
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
          <a href="#platform">Capabilities</a>
          <a href="#faculty-review">Faculty review</a>
          <a href="#workflow">How it works</a>
          <a href="#analytics">Analytics & outcomes</a>
        </div>
        <div>
          <h2>Explore</h2>
          <a href="#student-portal">Student Portal</a>
          <a href="#faq">Common questions</a>
          <a href="#demo">Book a demo</a>
        </div>
        <div className={styles.footerContact}>
          <h2>Let’s talk</h2>
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
            <RiArrowRightUpLine size={14} aria-hidden="true" />
          </a>
          <p>Bring Questra to your institution.</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Questra. All rights reserved.</span>
        <span>Intelligence behind every Question.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
