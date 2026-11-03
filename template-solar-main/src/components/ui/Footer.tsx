import Link from "next/link"
import QuestraLogo from "../marketing/QuestraLogo"
import styles from "../marketing/PhaseZero.module.css"
import { siteConfig } from "@/app/siteConfig"
const groups = [
  [
    "Platform",
    [
      ["Academic Setup", "/academic-setup"],
      ["Question Bank", "/question-bank"],
      ["AI Question Studio", "/ai-question-studio"],
      ["Paper Generation", "/bulk-paper-generation"],
      ["Approval Engine", "/approval-automation"],
      ["Faculty Portal", "/faculty-portal"],
    ],
  ],
  [
    "Intelligence",
    [
      ["Syllabus Coverage", "/syllabus-intelligence"],
      ["Bloom’s & CO/PO Mapping", "/academic-analytics#outcome-mapping"],
      ["Quality Validation", "/quality-validation"],
      ["Reports", "/academic-analytics#reports"],
    ],
  ],
  [
    "Resources",
    [
      ["How It Works", "/how-it-works"],
      ["Product Screens", "/product-screens"],
      ["FAQs", "/faq"],
      ["Security & Privacy", "/security-governance"],
    ],
  ],
  [
    "Company",
    [
      ["About Questra", "/about"],
      ["Solutions", "/solutions"],
      ["Contact", "/contact"],
      ["Request Demo", "/book-demo"],
    ],
  ],
] as const
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label="Questra home">
            <QuestraLogo width={155} />
          </Link>
          <p>Questra.si — Intelligence Behind Every Question.</p>
          <small>A Product of Voicedots AI</small>
          <Link href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </Link>
        </div>
        {groups.map(([name, links]) => (
          <div className={styles.footerGroup} key={name}>
            <h2>{name}</h2>
            {links.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Questra. All rights reserved.</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  )
}
