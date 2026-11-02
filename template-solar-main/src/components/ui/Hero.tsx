"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Check, Play } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { TypingAnimation } from "@/registry/magicui/typing-animation"
import DashboardSlideshow from "../marketing/DashboardSlideshow"
import styles from "../marketing/PhaseZero.module.css"
export function Hero() {
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroShape} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <span />
            THE INTELLIGENT EXAMINATION AUTOMATION PLATFORM
          </span>
          <h1 id="hero-heading" aria-label="From Syllabus to Final Approval.">
            <span className={styles.srOnly}>
              From Syllabus to Final Approval.
            </span>
            <span aria-hidden="true">
              From Syllabus to
              <br />
              <span className={styles.typedLine}>
                {!mounted || reducedMotion ? (
                  "Final Approval."
                ) : (
                  <TypingAnimation
                    className={styles.typing}
                    loop
                    typeSpeed={95}
                    deleteSpeed={55}
                    pauseDelay={1800}
                  >
                    Final Approval.
                  </TypingAnimation>
                )}
              </span>
            </span>
          </h1>
          <h2 className={styles.heroSubhead}>
            End-to-End AI-Powered Question Paper Automation.
          </h2>
          <p className={styles.heroDescription}>
            Import your curriculum. Build a structured question bank. Generate
            syllabus-aligned questions. Configure mid-term and semester paper
            patterns. Route questions and papers through automated, role-based
            approvals. Validate every paper against your institution’s academic
            rules before secure release.
          </p>
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
        </div>
        <div id="product-screens" className={styles.heroVisual}>
          <DashboardSlideshow />
        </div>
      </div>
    </section>
  )
}
