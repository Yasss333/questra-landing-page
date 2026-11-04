"use client"
import {
  useMotionValue,
  motion,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react"
import { useState, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import styles from "./card-spotlight.module.css"
export function CardSpotlight({
  children,
  className,
  radius = 280,
  ...props
}: HTMLAttributes<HTMLDivElement> & { radius?: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, white, transparent 80%)`
  return (
    <div
      {...props}
      className={cn(styles.card, className)}
      data-active={active || undefined}
      onPointerMove={(event) => {
        if (reduced || event.pointerType === "touch") return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - rect.left)
        y.set(event.clientY - rect.top)
        setActive(true)
      }}
      onPointerLeave={() => setActive(false)}
    >
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className={styles.effect}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          <div className={styles.dots} />
        </motion.div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
