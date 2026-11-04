"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Pause,
  Play,
} from "lucide-react"
import styles from "./PhaseZero.module.css"
import controls from "./DashboardSlideshow.module.css"
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
  const frame = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const drag = useRef<{
    x: number
    y: number
    width: number
    height: number
    maxWidth: number
  } | null>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  )
  const [playing, setPlaying] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [motionOptIn, setMotionOptIn] = useState(false)
  const autoplay = playing && (!mounted || !reducedMotion || motionOptIn)
  useEffect(() => {
    if (!autoplay || (interacting && !motionOptIn)) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % slides.length)
    }, 1500)
    return () => window.clearInterval(timer)
  }, [autoplay, interacting, motionOptIn])
  function select(index: number) {
    setActive((index + slides.length) % slides.length)
    setPlaying(false)
  }
  return (
    <div
      ref={frame}
      className={`${styles.showcase} ${controls.frame}`}
      style={size ? { width: size.width } : undefined}
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
        ref={viewport}
        className={styles.slideViewport}
        style={size ? { height: size.height, aspectRatio: "auto" } : undefined}
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
              className={`${styles.slideImage} ${controls.image}`}
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
      <button
        type="button"
        className={`${controls.sideButton} ${controls.previous}`}
        onClick={() => select(active - 1)}
        aria-label="Previous dashboard"
      >
        <ChevronLeft size={20} />
      </button>
      <div className={controls.rightControls}>
        <button
          type="button"
          className={controls.sideButton}
          onClick={() => select(active + 1)}
          aria-label="Next dashboard"
        >
          <ChevronRight size={20} />
        </button>
        <button
          type="button"
          className={controls.sideButton}
          onClick={() => {
            setMotionOptIn(true)
            setInteracting(false)
            setPlaying(!autoplay)
          }}
          aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
        >
          {autoplay ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <button
        type="button"
        className={controls.resize}
        aria-label="Resize dashboard preview"
        title="Drag to resize. Arrow keys resize; Home resets."
        onPointerDown={(event) => {
          if (event.button !== 0 || !frame.current || !viewport.current) return
          event.preventDefault()
          const rect = frame.current.getBoundingClientRect()
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            width: rect.width,
            height: viewport.current.clientHeight,
            maxWidth: frame.current.parentElement?.clientWidth ?? rect.width,
          }
          event.currentTarget.setPointerCapture(event.pointerId)
          setPlaying(false)
        }}
        onPointerMove={(event) => {
          const start = drag.current
          if (!start) return
          setSize({
            width: Math.max(
              Math.min(360, start.maxWidth),
              Math.min(start.maxWidth, start.width + event.clientX - start.x),
            ),
            height: Math.max(
              220,
              Math.min(540, start.height + event.clientY - start.y),
            ),
          })
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onPointerCancel={() => {
          drag.current = null
        }}
        onLostPointerCapture={() => {
          drag.current = null
        }}
        onKeyDown={(event) => {
          if (event.key === "Home") {
            event.preventDefault()
            setSize(null)
            return
          }
          if (
            !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
              event.key,
            ) ||
            !frame.current ||
            !viewport.current
          )
            return
          event.preventDefault()
          const maxWidth =
            frame.current.parentElement?.clientWidth ??
            frame.current.clientWidth
          setSize({
            width: Math.max(
              Math.min(360, maxWidth),
              Math.min(
                maxWidth,
                frame.current.getBoundingClientRect().width +
                  (event.key === "ArrowRight"
                    ? 24
                    : event.key === "ArrowLeft"
                      ? -24
                      : 0),
              ),
            ),
            height: Math.max(
              220,
              Math.min(
                540,
                viewport.current.clientHeight +
                  (event.key === "ArrowDown"
                    ? 24
                    : event.key === "ArrowUp"
                      ? -24
                      : 0),
              ),
            ),
          })
          setPlaying(false)
        }}
      >
        <span aria-hidden="true">◢</span>
      </button>
      <p className={styles.previewNote}>
        Illustrative product views. Sample data, not institutional results.
      </p>
    </div>
  )
}
