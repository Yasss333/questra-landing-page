"use client"

import { useEffect, useState } from "react"
import styles from "../marketing/PhaseZero.module.css"

const phrases = [
  "Examination Intelligence.",
  "Autonomous Paper Generation.",
  "Faculty-Guided Evaluation.",
  "360° Academic Insight.",
]

export default function HeroHeadline() {
  const [text, setText] = useState(phrases[0])
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    let phrase = 0
    let length = phrases[0].length
    let deleting = true
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      length += deleting ? -1 : 1
      setText(phrases[phrase].slice(0, length))

      let delay = deleting ? 32 : 65
      if (length === 0) {
        phrase = (phrase + 1) % phrases.length
        deleting = false
        delay = 280
      } else if (length === phrases[phrase].length) {
        deleting = true
        delay = 2400
      }
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 2400)
    return () => clearTimeout(timer)
  }, [reducedMotion])

  return (
    <span className={`${styles.heroHighlight} ${styles.typingHeadline}`} aria-hidden="true">
      {phrases.map((phrase) => (
        <span className={styles.typingMeasure} key={phrase}>{phrase}</span>
      ))}
      <span className={styles.typingText}>
        {reducedMotion ? phrases[0] : text}
        <span className={styles.typingCursor} />
      </span>
    </span>
  )
}
