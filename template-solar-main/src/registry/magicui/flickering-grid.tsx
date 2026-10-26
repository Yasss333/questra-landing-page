"use client"

import { useEffect, useRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

// Local canvas implementation of the Magic UI FlickeringGrid interface.
// https://magicui.design/docs/components/flickering-grid
interface FlickeringGridProps extends HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  color?: string
  maxOpacity?: number
  flickerChance?: number
  hoverStrength?: number
  width?: number
  height?: number
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  color = "#6B7280",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  hoverStrength = 0,
  width,
  height,
  className,
  style,
  ...props
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!container || !canvas || !context) return

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )
    const cellSize = Math.max(1, squareSize + gridGap)
    const opacityLimit = Math.min(1, Math.max(0, maxOpacity))
    let columns = 0
    let rows = 0
    let canvasWidth = 0
    let canvasHeight = 0
    let opacities = new Float32Array(0)
    let frame = 0
    let previousTime = 0
    let inView = false
    let fillColor = color
    const hoverTarget = container.closest("section") ?? container
    let targetX = 0
    let targetY = 0
    let offsetX = 0
    let offsetY = 0

    function resetHover() {
      targetX = 0
      targetY = 0
    }

    function followPointer(event: PointerEvent) {
      if (event.pointerType !== "mouse" || motionPreference.matches) return
      const bounds = hoverTarget.getBoundingClientRect()
      targetX =
        ((event.clientX - bounds.left) / bounds.width - 0.5) * hoverStrength * 2
      targetY =
        ((event.clientY - bounds.top) / bounds.height - 0.5) * hoverStrength * 2
    }

    function paint() {
      if (!context) return
      context.clearRect(0, 0, canvasWidth, canvasHeight)
      context.fillStyle = fillColor
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          context.globalAlpha = opacities[row * columns + column]
          context.fillRect(
            column * cellSize + offsetX,
            row * cellSize + offsetY,
            squareSize,
            squareSize,
          )
        }
      }
      context.globalAlpha = 1
    }

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
    }

    function animate(time: number) {
      frame = 0
      if (!inView || document.hidden || motionPreference.matches) return
      if (!previousTime) previousTime = time
      const elapsed = (time - previousTime) / 1000
      // A decorative background only needs 30 updates per second.
      if (elapsed >= 1 / 30) {
        // Ease toward the cursor and gently return to rest on pointer leave.
        const easing = 1 - Math.exp(-elapsed / 0.16)
        offsetX += (targetX - offsetX) * easing
        offsetY += (targetY - offsetY) * easing
        const chance = Math.max(0, flickerChance) * Math.min(elapsed, 0.1)
        for (let index = 0; index < opacities.length; index++) {
          if (Math.random() < chance)
            opacities[index] = Math.random() * opacityLimit
        }
        paint()
        previousTime = time
      }
      frame = requestAnimationFrame(animate)
    }

    function syncAnimation() {
      stop()
      resetHover()
      offsetX = 0
      offsetY = 0
      paint()
      if (inView && !document.hidden && !motionPreference.matches) {
        frame = requestAnimationFrame(animate)
      }
    }

    function resize() {
      if (!canvas || !container || !context) return
      canvasWidth = width ?? container.clientWidth
      canvasHeight = height ?? container.clientHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvasWidth * pixelRatio)
      canvas.height = Math.round(canvasHeight * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      columns = Math.ceil(canvasWidth / cellSize)
      rows = Math.ceil(canvasHeight / cellSize)
      opacities = Float32Array.from(
        { length: columns * rows },
        () => Math.random() * opacityLimit,
      )
      paint()
    }

    function syncColor() {
      if (!canvas) return
      fillColor =
        color === "currentColor" ? getComputedStyle(canvas).color : color
      paint()
    }

    syncColor()
    resize()
    // Repaint immediately on a theme switch, including with reduced motion.
    const themeObserver = new MutationObserver(syncColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncAnimation()
    })
    intersectionObserver.observe(container)
    motionPreference.addEventListener("change", syncAnimation)
    document.addEventListener("visibilitychange", syncAnimation)
    if (hoverStrength > 0) {
      hoverTarget.addEventListener("pointermove", followPointer)
      hoverTarget.addEventListener("pointerleave", resetHover)
      window.addEventListener("blur", resetHover)
    }

    return () => {
      stop()
      themeObserver.disconnect()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      motionPreference.removeEventListener("change", syncAnimation)
      document.removeEventListener("visibilitychange", syncAnimation)
      hoverTarget.removeEventListener("pointermove", followPointer)
      hoverTarget.removeEventListener("pointerleave", resetHover)
      window.removeEventListener("blur", resetHover)
    }
  }, [
    squareSize,
    gridGap,
    color,
    maxOpacity,
    flickerChance,
    hoverStrength,
    width,
    height,
  ])

  return (
    <div
      {...props}
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
      style={style}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
