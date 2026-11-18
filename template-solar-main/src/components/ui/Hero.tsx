import Link from "next/link"
import { ArrowRight, Check, Play } from "lucide-react"
import styles from "../marketing/PhaseZero.module.css"
export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <span />
            THE INTELLIGENT EXAMINATION AUTOMATION PLATFORM
          </span>
          <h1 id="hero-heading">
            The Future of Intelligence:{" "}
            <span className={styles.heroHighlight}>
              Examination, Evaluation,
            </span>{" "}
            and All Those Things.
          </h1>
          <h2 className={styles.heroSubhead}>
            Built for Higher Educational Institutions with hierarchy-based
            faculty accountability.
          </h2>
          <p className={styles.heroDescription}>
            Questra transforms institutional curriculum into examination-ready
            question papers through intelligence, governance and automation —
            ensuring every paper is controlled, transparent, efficient and
            academically aligned.
          </p>
          <div className={styles.heroChecks}>
            <span>
              <Check />
              Curriculum-aware
            </span>
            <span>
              <Check />
              Faculty-controlled
            </span>
            <span>
              <Check />
              Institution-governed
            </span>
          </div>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/book-demo">
              <span className={styles.buttonCircle}>
                <ArrowRight size={17} />
              </span>
              Request a 30-Minute Live Demo
            </Link>
            <Link className={styles.secondaryButton} href="/how-it-works">
              <Play size={15} />
              View How Questra Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
