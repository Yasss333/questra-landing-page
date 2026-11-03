"use client"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import QuestraLogo from "../marketing/QuestraLogo"
import { AnimatedThemeToggler } from "./animated-theme-toggler"
import styles from "../marketing/PhaseZero.module.css"
import legacy from "../marketing/Marketing.module.css"

export const navGroups = [
  {
    name: "Platform",
    links: [
      ["Platform overview", "/platform"],
      ["Academic Setup", "/academic-setup"],
      ["Question Bank", "/question-bank"],
      ["AI Question Studio", "/ai-question-studio"],
      ["Paper Generation", "/bulk-paper-generation"],
      ["Approval Engine", "/approval-automation"],
      ["Faculty Portal", "/faculty-portal"],
      ["Student Portal", "/student-portal"],
      ["Calendar & Patterns", "/examination-calendar"],
    ],
  },
  {
    name: "Intelligence",
    links: [
      ["Syllabus Coverage", "/syllabus-intelligence"],
      ["Bloom’s Analytics", "/academic-analytics"],
      ["CO/PO Mapping", "/academic-analytics#outcome-mapping"],
      ["Quality Validation", "/quality-validation"],
      ["Reports", "/academic-analytics#reports"],
    ],
  },
  {
    name: "Resources",
    links: [
      ["How It Works", "/how-it-works"],
      ["Product Screens", "/product-screens"],
      ["FAQs", "/faq"],
      ["Security & Privacy", "/security-governance"],
    ],
  },
  {
    name: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Request Demo", "/book-demo"],
    ],
  },
] as const

export function NavBar() {
  const [mobile, setMobile] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const root = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => {
    setActive(null)
    setMobile(false)
  }, [])
  useEffect(() => {
    function pointer(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) close()
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      if (mobile) toggle.current?.focus()
      else
        root.current
          ?.querySelector<HTMLButtonElement>(`button[data-menu="${active}"]`)
          ?.focus()
      close()
    }
    const breakpoint = window.matchMedia("(min-width: 1181px)")
    document.addEventListener("pointerdown", pointer)
    document.addEventListener("keydown", escape)
    breakpoint.addEventListener("change", close)
    return () => {
      document.removeEventListener("pointerdown", pointer)
      document.removeEventListener("keydown", escape)
      breakpoint.removeEventListener("change", close)
    }
  }, [active, mobile, close])
  function groupMenu(group: (typeof navGroups)[number]) {
    const id = group.name.toLowerCase()
    return (
      <div className={styles.navItem} key={id}>
        <button
          type="button"
          data-menu={group.name}
          aria-expanded={active === group.name}
          aria-controls={`${id}-menu`}
          onClick={() => setActive(active === group.name ? null : group.name)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setActive(group.name)
              requestAnimationFrame(() =>
                root.current
                  ?.querySelector<HTMLAnchorElement>(`#${id}-menu a`)
                  ?.focus(),
              )
            }
          }}
        >
          {group.name}
          <ChevronDown size={12} />
        </button>
        {active === group.name && (
          <div id={`${id}-menu`} className={styles.dropdown}>
            {group.links.map(([label, href]) => (
              <Link key={label} href={href} onClick={close}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
  return (
    <>
      <a className={legacy.skipLink} href="#main-content">
        Skip to content
      </a>
      <header
        ref={root}
        className={styles.header}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) close()
        }}
      >
        <div className={styles.headerInner}>
          <Link href="/" aria-label="Questra home" onClick={close}>
            <QuestraLogo width={165} />
          </Link>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/" onClick={close}>
              Home
            </Link>
            {navGroups.slice(0, 2).map(groupMenu)}
            <Link href="/solutions" onClick={close}>
              Solutions
            </Link>
            {navGroups.slice(2).map(groupMenu)}
          </nav>
          <div className={styles.headerActions}>
            <AnimatedThemeToggler className={styles.themeToggle} />
            <Link
              href="/book-demo"
              onClick={close}
              className={`${styles.primaryButton} ${styles.navCta}`}
            >
              Request a 30-Minute Live Demo
            </Link>
          </div>
          <button
            ref={toggle}
            type="button"
            className={styles.menuToggle}
            aria-expanded={mobile}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobile(!mobile)
              setActive(null)
            }}
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobile && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className={styles.mobileNav}
          >
            <Link href="/" onClick={close}>
              Home
            </Link>
            {navGroups.map((group, index) => (
              <div key={group.name}>
                {index === 2 && (
                  <Link
                    href="/solutions"
                    onClick={close}
                    style={{
                      display: "block",
                      padding: "15px 0",
                      fontSize: 14,
                    }}
                  >
                    Solutions
                  </Link>
                )}
                <div className={styles.mobileGroup}>
                  <button
                    type="button"
                    aria-expanded={active === group.name}
                    aria-controls={`mobile-${group.name}`}
                    onClick={() =>
                      setActive(active === group.name ? null : group.name)
                    }
                  >
                    {group.name}
                    <ChevronDown size={15} />
                  </button>
                  {active === group.name && (
                    <div id={`mobile-${group.name}`}>
                      {group.links.map(([label, href]) => (
                        <Link key={label} href={href} onClick={close}>
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}
