"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SVGProps,
} from "react"
import { cn } from "@/lib/utils"
import styles from "./interactive-grid-pattern.module.css"

interface InteractiveGridPatternProps extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number]
  squaresClassName?: string
  drift?: boolean
}

// Adapted from Magic UI's Interactive Grid Pattern. Track the containing
// section so the decorative SVG can respond without covering links or text.
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  drift = false,
  style,
  ...props
}: InteractiveGridPatternProps) {
  const gridRef = useRef<SVGSVGElement>(null)
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const [horizontal, vertical] = squares
  const rows = vertical + (drift ? 1 : 0)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const surface = grid.closest("section") ?? grid.parentElement
    if (!surface) return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let pointer: { x: number; y: number } | null = null
    let hoverFrame = 0

    function clear() {
      pointer = null
      cancelAnimationFrame(hoverFrame)
      hoverFrame = 0
      setHoveredSquare(null)
    }

    function updateHover() {
      hoverFrame = 0
      if (!pointer) return
      const bounds = grid!.getBoundingClientRect()
      const column = Math.floor((pointer.x - bounds.left) / width)
      const row = Math.floor((pointer.y - bounds.top) / height)
      setHoveredSquare(
        column >= 0 &&
          column < horizontal &&
          row >= 0 &&
          row < rows &&
          pointer.x <= bounds.right &&
          pointer.y <= bounds.bottom
          ? row * horizontal + column
          : null,
      )
      // Keep the highlighted cell under a resting cursor as the grid slides.
      if (drift && !reducedMotion.matches) {
        hoverFrame = requestAnimationFrame(updateHover)
      }
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
      pointer = { x: event.clientX, y: event.clientY }
      if (!hoverFrame) updateHover()
    }

    surface.addEventListener("pointermove", move)
    surface.addEventListener("pointerleave", clear)
    window.addEventListener("blur", clear)
    window.addEventListener("scroll", clear, true)
    document.addEventListener("visibilitychange", clear)
    reducedMotion.addEventListener("change", clear)
    return () => {
      clear()
      surface.removeEventListener("pointermove", move)
      surface.removeEventListener("pointerleave", clear)
      window.removeEventListener("blur", clear)
      window.removeEventListener("scroll", clear, true)
      document.removeEventListener("visibilitychange", clear)
      reducedMotion.removeEventListener("change", clear)
    }
  }, [width, height, horizontal, rows, drift])

  return (
    <svg
      ref={gridRef}
      width={width * horizontal}
      height={height * rows}
      aria-hidden="true"
      className={cn(styles.grid, drift && styles.drifting, className)}
      style={{ "--grid-cell-height": `${height}px`, ...style } as CSSProperties}
      {...props}
    >
      {Array.from({ length: horizontal * rows }, (_, index) => (
        <rect
          key={index}
          x={(index % horizontal) * width}
          y={Math.floor(index / horizontal) * height}
          width={width}
          height={height}
          className={cn(styles.square, squaresClassName)}
          data-active={hoveredSquare === index || undefined}
        />
      ))}
    </svg>
  )
}
