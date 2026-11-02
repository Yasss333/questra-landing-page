"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Pause,
  Play,
} from "lucide-react"
import styles from "./PhaseZero.module.css"
const slides = [
  {
    file: "question-bank",
    title: "Question Bank",
    width: 1536,
    height: 1024,
    brandWidth: "15.5%",
  },
  {
    file: "syllabus",
    title: "Syllabus Library & PDF Viewer",
    width: 1600,
    height: 900,
    brandWidth: "17.8%",
  },
  {
    file: "students",
    title: "Master Data Intelligence",
    width: 1600,
    height: 900,
    brandWidth: "13.5%",
  },
  {
    file: "outcomes",
    title: "Outcome Mapping",
    width: 1536,
    height: 1024,
    brandWidth: "13.7%",
  },
  {
    file: "blooms",
    title: "Bloom’s Analytics",
    width: 1536,
    height: 1024,
    brandWidth: "14%",
  },
  {
    file: "coverage",
    title: "Coverage Explorer",
    width: 1536,
    height: 1024,
    brandWidth: "15%",
  },
  {
    file: "approvals",
    title: "Review & Approval",
    width: 1536,
    height: 1024,
    brandWidth: "15.2%",
  },
]
export default function DashboardSlideshow() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [motionOptIn, setMotionOptIn] = useState(false)
  const autoplay = playing && (!mounted || !reducedMotion || motionOptIn)
  useEffect(() => {
    if (!autoplay || interacting) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % slides.length)
    }, 2000)
    return () => window.clearInterval(timer)
  }, [autoplay, interacting])
  function select(index: number) {
    setActive((index + slides.length) % slides.length)
    setPlaying(false)
  }
  return (
    <div
      className={styles.showcase}
      role="region"
      aria-roledescription="carousel"
      aria-label="Questra dashboard previews"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(false)
      }}
    >
      <div className={styles.browserBar}>
        <span className={styles.browserDots}>
          <i />
          <i />
          <i />
        </span>
        <span>Questra · Examination workspace</span>
        <span className={styles.previewTag}>PRODUCT CONCEPT</span>
      </div>
      <div
        className={styles.slideViewport}
        aria-live={autoplay ? "off" : "polite"}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.file}
            data-hero-slide={index}
            className={`${styles.slide} ${index === active ? styles.activeSlide : ""}`}
            aria-hidden={index !== active}
          >
            <div
              className={styles.slideImage}
              style={{ aspectRatio: `${slide.width}/${slide.height}` }}
            >
              <Image
                src={`/images/hero-dashboards/${slide.file}.png`}
                alt={`Questra ${slide.title} — illustrative dashboard supplied for the product preview`}
                fill
                sizes="(max-width: 1000px) 95vw, 58vw"
                priority={index === 0}
              />
              <div
                className={styles.imageBrand}
                style={{ width: slide.brandWidth }}
                aria-hidden="true"
              >
                <GraduationCap />
                <span>
                  Questra<small>Examination Intelligence</small>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.slideControls}>
        <div>
          <span className={styles.slideCount}>0{active + 1} / 07</span>
          <strong>{slides[active].title}</strong>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => select(active - 1)}
            aria-label="Previous dashboard"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              setMotionOptIn(true)
              setPlaying(!autoplay)
            }}
            aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
          >
            {autoplay ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            type="button"
            onClick={() => select(active + 1)}
            aria-label="Next dashboard"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className={styles.slideDots}>
        {slides.map((slide, index) => (
          <button
            key={slide.file}
            type="button"
            onClick={() => select(index)}
            aria-label={`Show ${slide.title}`}
            aria-pressed={active === index}
          />
        ))}
      </div>
      <p className={styles.previewNote}>
        Illustrative product views. Sample data, not institutional results.
      </p>
    </div>
  )
}
