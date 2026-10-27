"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, useMotionValue, useReducedMotion } from "motion/react"
import styles from "./pointer.module.css"

export function Pointer({ children }: { children: ReactNode }) {
  const anchor = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const parent = anchor.current?.parentElement
    if (!parent) return
    const cursor = parent.style.cursor
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      x.set(event.clientX + 10)
      y.set(event.clientY + 8)
      parent.style.cursor = "none"
      setVisible(true)
    }
    const leave = () => {
      parent.style.cursor = cursor
      setVisible(false)
    }
    parent.addEventListener("pointermove", move)
    parent.addEventListener("pointerleave", leave)
    window.addEventListener("blur", leave)
    return () => {
      parent.removeEventListener("pointermove", move)
      parent.removeEventListener("pointerleave", leave)
      window.removeEventListener("blur", leave)
      parent.style.cursor = cursor
    }
  }, [x, y])

  return (
    <>
      <span ref={anchor} hidden aria-hidden="true" />
      {visible && createPortal(
        <motion.span className={styles.pointer} style={{ x, y }} aria-hidden="true">
          <motion.span
            className={styles.icon}
            animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {children}
          </motion.span>
        </motion.span>, document.body,
      )}
    </>
  )
}
