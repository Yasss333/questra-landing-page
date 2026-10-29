import Link from "next/link"
import {
  RiArrowDownLine,
  RiArrowRightUpLine,
  RiBuilding4Line,
  RiCheckLine,
  RiGraduationCapLine,
  RiTeamLine,
} from "@remixicon/react"
import styles from "../marketing/Marketing.module.css"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroGrid} aria-hidden="true">
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[36, 20]}
          drift
        />
      </div>
      <div className={styles.heroContent}>
        <Link
          className={styles.heroBadge}
          href="/how-it-works#institution-setup"
        >
          <span /> Question paper super intelligence.{" "}
          <RiArrowRightUpLine size={14} aria-hidden="true" />
        </Link>
        <h1 id="hero-heading">
          From syllabus to
          <br />
          <span>sanctioned question paper.</span>
        </h1>
        <p>
          Generate smarter questions. Validate every requirement. Coordinate
          every stakeholder. Questra connects question banks, paper generation,
          and institutional approvals in one intelligent workspace.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.button} href="/book-demo">
            Experience a live demo{" "}
            <RiArrowRightUpLine size={18} aria-hidden="true" />
          </Link>
          <Link className={styles.secondaryButton} href="#platform">
            Explore the 11-step setup{" "}
            <RiArrowDownLine size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.heroQualities}>
          {[
            "Syllabus-aligned",
            "Faculty-controlled",
            "Bloom’s-aware",
            "Outcome-mapped",
          ].map((item) => (
            <span key={item}>
              <RiCheckLine size={14} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.audiences}>
        <p>DESIGNED FOR THE PEOPLE BEHIND ACADEMIC QUALITY</p>
        <div>
          <span>
            <RiBuilding4Line size={19} aria-hidden="true" />
            Universities & colleges
          </span>
          <span>
            <RiTeamLine size={19} aria-hidden="true" />
            Examination teams
          </span>
          <span>
            <RiGraduationCapLine size={20} aria-hidden="true" />
            Faculty & departments
          </span>
        </div>
      </div>
    </section>
  )
}
