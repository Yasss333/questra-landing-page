"use client"

import { useId } from "react"
import styles from "./border-beam.module.css"

export function BorderBeam() {
  const gradientId = `beam-${useId().replace(/:/g, "")}`
  return (
    <svg className={styles.beam} width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--theme-accent, #0754b5)" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="var(--theme-green, #078d78)" />
        </linearGradient>
      </defs>
      <rect className={styles.track} x="1" y="1" rx="11" pathLength="100" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeDasharray="14 86" strokeLinecap="round" />
    </svg>
  )
}
