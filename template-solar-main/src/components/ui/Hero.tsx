import Link from "next/link"
import { ArrowRight, Check, Play } from "lucide-react"
import DashboardSlideshow from "../marketing/DashboardSlideshow"
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
            The Future of{" "}
            <span className={styles.heroHighlight}>
              Intelligent Examination Evaluation
            </span>
          </h1>
          <h2 className={styles.heroSubhead}>
            Beyond Question Paper Generation. Beyond Conventional Answer Valuation.
          </h2>
          <p className={styles.heroDescription}>
            Introducing <strong>Questra EvalIQ</strong>, an intelligent answer sheet
            evaluation and academic performance platform designed to transform
            how higher educational institutions assess student knowledge, ensure
            evaluation quality, measure learning outcomes and continuously
            improve academic excellence.
          </p>
          <p className={styles.heroDescription}>
            Powered by AI-assisted evaluation, faculty-controlled assessment,
            intelligent moderation and academic analytics, EvalIQ connects every
            question, every student answer and every awarded mark to meaningful
            educational outcomes.
          </p>
          <p className={styles.heroSubhead}>
            <strong>One Integrated Ecosystem. One Intelligent Evaluation Journey.</strong>
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
