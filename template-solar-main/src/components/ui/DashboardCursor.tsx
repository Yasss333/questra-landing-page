"use client"

import { useEffect, useRef } from "react"
import { Pointer } from "lucide-react"
import styles from "./DashboardPreview.module.css"

export default function DashboardCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const frame = cursor?.parentElement
    if (!cursor || !frame) return
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")

    function hide() {
      frame!.removeAttribute("data-hand-cursor")
      cursor!.removeAttribute("data-visible")
      cursor!.removeAttribute("data-pressed")
    }

    function move(event: PointerEvent) {
      const target = event.target
      if (
        !finePointer.matches ||
        event.pointerType !== "mouse" ||
        !(target instanceof Element) ||
        target.closest(
          "input, textarea, select, label, [contenteditable], :disabled",
        )
      ) {
        hide()
        return
      }
      const bounds = frame!.getBoundingClientRect()
      cursor!.style.transform = `translate3d(${event.clientX - bounds.left - frame!.clientLeft}px, ${event.clientY - bounds.top - frame!.clientTop}px, 0)`
      frame!.setAttribute("data-hand-cursor", "true")
      cursor!.setAttribute("data-visible", "true")
    }

    function press() {
      cursor!.setAttribute("data-pressed", "true")
    }

    function release() {
      cursor!.removeAttribute("data-pressed")
    }

    frame.addEventListener("pointermove", move)
    frame.addEventListener("pointerleave", hide)
    frame.addEventListener("pointerdown", press)
    window.addEventListener("pointerup", release)
    window.addEventListener("blur", hide)
    window.addEventListener("scroll", hide, true)
    finePointer.addEventListener("change", hide)
    return () => {
      hide()
      frame.removeEventListener("pointermove", move)
      frame.removeEventListener("pointerleave", hide)
      frame.removeEventListener("pointerdown", press)
      window.removeEventListener("pointerup", release)
      window.removeEventListener("blur", hide)
      window.removeEventListener("scroll", hide, true)
      finePointer.removeEventListener("change", hide)
    }
  }, [])

  return (
    <span ref={cursorRef} className={styles.handCursor} aria-hidden="true">
      <span className={styles.handCursorGesture}>
        <span className={styles.handCursorHalo} />
        <Pointer size={30} strokeWidth={1.7} />
      </span>
    </span>
  )
}
