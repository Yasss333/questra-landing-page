"use client"

import { useRef, type HTMLAttributes } from "react"
import styles from "./magic-card.module.css"

// Pointer-following MagicCard treatment using the site's theme tokens.
export function MagicCard({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      {...props}
      ref={ref}
      className={`${styles.card} ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return
        const bounds = event.currentTarget.getBoundingClientRect()
        ref.current?.style.setProperty("--magic-x", `${event.clientX - bounds.left}px`)
        ref.current?.style.setProperty("--magic-y", `${event.clientY - bounds.top}px`)
        props.onPointerMove?.(event)
      }}
    >
      <div className={styles.glow} aria-hidden="true" />
      {children}
    </div>
  )
}
