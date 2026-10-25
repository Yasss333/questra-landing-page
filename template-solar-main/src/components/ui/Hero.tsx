import {
  RiArrowDownLine,
  RiArrowRightUpLine,
  RiBuilding4Line,
  RiCheckLine,
  RiGraduationCapLine,
  RiTeamLine,
} from "@remixicon/react"
import styles from "../marketing/Marketing.module.css"
import { FlickeringGrid } from "@/registry/magicui/flickering-grid"
export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroGrid} aria-hidden="true">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="currentColor"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>
      <div className={styles.heroContent}>
        <a className={styles.heroBadge} href="#platform">
          <span /> Academic intelligence. Faculty control.{" "}
          <RiArrowRightUpLine size={14} aria-hidden="true" />
        </a>
        <h1 id="hero-heading">
          Better questions.
          <br />
          <span>Smarter examinations.</span>
        </h1>
        <p>
          Bring your syllabus, question bank, and examination workflow together.
          Create with AI assistance. Review with academic confidence.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.button} href="#demo">
            Book a live demo <RiArrowRightUpLine size={18} aria-hidden="true" />
          </a>
          <a className={styles.secondaryButton} href="#platform">
            Explore the platform{" "}
            <RiArrowDownLine size={16} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.heroQualities}>
          {["Syllabus-aligned", "Faculty-reviewed", "Examination-ready"].map(
            (item) => (
              <span key={item}>
                <RiCheckLine size={14} aria-hidden="true" />
                {item}
              </span>
            ),
          )}
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
