"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

// Local implementation of Magic UI's sweeping color-band effect.
interface DiaTextRevealProps {
  text: string
  colors?: string[]
  textColor?: string
  className?: string
  delay?: number
  duration?: number
}

export function DiaTextReveal({ text, colors = ["#0754b5", "#38bdf8", "#078d78"], textColor = "var(--theme-accent, #0754b5)", className, delay = 0, duration = 1.5 }: DiaTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reducedMotion = useReducedMotion()
  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: "inline",
        color: textColor,
        backgroundImage: `linear-gradient(100deg, ${textColor} 30%, ${colors.join(", ")}, ${textColor} 70%)`,
        backgroundSize: "300% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
      initial={{ backgroundPosition: "100% 50%" }}
      animate={{ backgroundPosition: inView && !reducedMotion ? "0% 50%" : "100% 50%" }}
      transition={{ duration: reducedMotion ? 0 : duration, delay: reducedMotion ? 0 : delay, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  )
}
