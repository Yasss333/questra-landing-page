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
          <span /> The intelligent examination automation platform{" "}
          <RiArrowRightUpLine size={14} aria-hidden="true" />
        </Link>
        <h1 id="hero-heading">
          From syllabus to
          <br />
          <span>final approval.</span>
        </h1>
        <p>
          End-to-end AI-powered question paper automation. Bring curriculum,
          question creation, paper validation, and approval routing into one
          connected workflow, with final academic authority staying with your
          institution.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.button} href="/book-demo">
            Request a 30-Minute Live Demo{" "}
            <RiArrowRightUpLine size={18} aria-hidden="true" />
          </Link>
          <Link className={styles.secondaryButton} href="/how-it-works">
            Explore the complete workflow{" "}
            <RiArrowDownLine size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.heroQualities}>
          {[
            "Syllabus-aligned",
            "Bloom’s-aware",
            "Outcome-mapped",
            "Faculty-authorized release",
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
