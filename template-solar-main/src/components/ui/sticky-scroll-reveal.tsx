"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import styles from "./sticky-scroll-reveal.module.css"
export type StickyItem = {
  title: string
  description: string
  image: string
  alt: string
}
export function StickyScroll({ content }: { content: readonly StickyItem[] }) {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.step))
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0 },
    )
    root.current
      ?.querySelectorAll("[data-step]")
      .forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={root} className={styles.layout}>
      <div className={styles.steps}>
        {content.map((item, index) => (
          <article
            key={item.title}
            data-step={index}
            data-active={active === index}
            className={styles.step}
          >
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(content.length).padStart(2, "0")}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className={styles.mobileImage}>
              <Image
                src={item.image}
                alt={item.alt}
                width={900}
                height={900}
                sizes="(max-width: 760px) 90vw, 1px"
              />
            </div>
          </article>
        ))}
      </div>
      <aside className={styles.visual} aria-label="Stakeholder illustrations">
        <div className={styles.imageStack}>
          {content.map((item, index) => (
            <div
              key={item.title}
              className={styles.image}
              data-active={active === index}
              aria-hidden={active !== index}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 1px, 45vw"
              />
            </div>
          ))}
        </div>
        <div className={styles.caption}>
          <span>{content[active].title}</span>
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(content.length).padStart(2, "0")}
          </span>
        </div>
        <small className={styles.disclaimer}>
          AI-generated conceptual illustration
        </small>
      </aside>
    </div>
  )
}
