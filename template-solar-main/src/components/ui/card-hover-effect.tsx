"use client"
import { Children, useId, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import styles from "./card-hover-effect.module.css"
export function HoverEffect({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const id = useId()
  const reduced = useReducedMotion()
  return (
    <div className={className} onMouseLeave={() => setActive(null)}>
      {Children.map(children, (child, index) => (
        <div
          className={styles.slot}
          onMouseEnter={() => setActive(index)}
          onFocusCapture={() => setActive(index)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setActive(null)
          }}
        >
          <AnimatePresence>
            {active === index && (
              <motion.span
                aria-hidden="true"
                className={styles.highlight}
                layoutId={reduced ? undefined : `approval-hover-${id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.2,
                  layout: { type: "spring", stiffness: 320, damping: 30 },
                }}
              />
            )}
          </AnimatePresence>
          {child}
        </div>
      ))}
    </div>
  )
}
