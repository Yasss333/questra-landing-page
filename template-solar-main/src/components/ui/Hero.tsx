import Link from "next/link"
import { ArrowRight, Check, Play } from "lucide-react"
import DashboardSlideshow from "../marketing/DashboardSlideshow"
import HeroHeadline from "./HeroHeadline"
import styles from "../marketing/PhaseZero.module.css"
export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroShape} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <span />
            THE INTELLIGENT EXAMINATION AUTOMATION PLATFORM
          </span>
          <h1 id="hero-heading">
            <span className={styles.srOnly}>The Future of Examination Intelligence.</span>
            <span aria-hidden="true">The Future of</span>
            <HeroHeadline />
          </h1>
          <p className={styles.heroDescription}>
            Meet <strong>Questra EvalIQ</strong>—from autonomous question paper
            generation to faculty-guided evaluation and academic insights. One
            connected examination journey.
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
        <div id="product-screens" className={styles.heroVisual}>
          <DashboardSlideshow />
        </div>
      </div>
    </section>
  )
}
