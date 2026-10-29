"use client"

import Link from "next/link"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiBarChartLine,
  RiBookOpenLine,
  RiCloseLine,
  RiDashboardLine,
  RiFlowChart,
  RiGraduationCapLine,
  RiMailLine,
  RiMenuLine,
  RiQuestionAnswerLine,
  RiShieldCheckLine,
} from "@remixicon/react"
import QuestraLogo from "../marketing/QuestraLogo"
import styles from "../marketing/Marketing.module.css"
import menuStyles from "../marketing/Navigation.module.css"
import { AnimatedThemeToggler } from "./animated-theme-toggler"

type MenuName = "platform" | "resources"
const platformLinks = [
  {
    title: "Platform overview",
    description: "Explore the complete academic toolkit.",
    href: "/platform",
    Icon: RiBookOpenLine,
  },
  {
    title: "Faculty review",
    description: "Academic judgement at every step.",
    href: "/platform#governance",
    Icon: RiShieldCheckLine,
  },
  {
    title: "Examination workflow",
    description: "From syllabus to approved paper.",
    href: "/how-it-works",
    Icon: RiFlowChart,
  },
  {
    title: "Analytics & outcomes",
    description: "Coverage, Bloom’s levels, and COs.",
    href: "/platform#dashboards",
    Icon: RiBarChartLine,
  },
]
const resourceLinks = [
  {
    title: "Frequently asked questions",
    description: "Clear answers for your academic team.",
    href: "/#faq",
    Icon: RiQuestionAnswerLine,
  },
  {
    title: "Contact & live demo",
    description: "Let’s talk about your institution.",
    href: "/book-demo",
    Icon: RiMailLine,
  },
]

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<MenuName | null>(
    "platform",
  )
  const rootRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const platformRef = useRef<HTMLButtonElement>(null)
  const resourcesRef = useRef<HTMLButtonElement>(null)
  const closeMenus = useCallback(() => {
    setActiveMenu(null)
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenus()
    }
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return
      if (activeMenu) {
        event.preventDefault()
        ;(activeMenu === "platform"
          ? platformRef
          : resourcesRef
        ).current?.focus()
      } else if (mobileOpen) {
        event.preventDefault()
        toggleRef.current?.focus()
      }
      closeMenus()
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [activeMenu, mobileOpen, closeMenus])

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 801px)")
    breakpoint.addEventListener("change", closeMenus)
    return () => breakpoint.removeEventListener("change", closeMenus)
  }, [closeMenus])

  function openWithKeyboard(
    event: KeyboardEvent<HTMLButtonElement>,
    menu: MenuName,
  ) {
    if (event.key !== "ArrowDown") return
    event.preventDefault()
    setActiveMenu(menu)
    requestAnimationFrame(() =>
      rootRef.current
        ?.querySelector<HTMLAnchorElement>(`#${menu}-menu a`)
        ?.focus(),
    )
  }

  function menuLinks(items: typeof platformLinks) {
    return items.map(({ title, description, href, Icon }) => (
      <Link
        className={menuStyles.menuLink}
        key={href}
        href={href}
        onClick={closeMenus}
      >
        <span className={menuStyles.linkIcon}>
          <Icon size={20} aria-hidden="true" />
        </span>
        <span>
          <strong>{title}</strong>
          <small>{description}</small>
        </span>
        <RiArrowRightUpLine
          className={menuStyles.linkArrow}
          size={15}
          aria-hidden="true"
        />
      </Link>
    ))
  }

  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <header
        ref={rootRef}
        className={styles.navbar}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closeMenus()
        }}
      >
        <Link href="/" aria-label="Questra home" onClick={closeMenus}>
          <QuestraLogo />
        </Link>
        <nav
          className={`${styles.desktopNav} ${menuStyles.navigation}`}
          aria-label="Main navigation"
        >
          <button
            ref={platformRef}
            className={menuStyles.trigger}
            aria-expanded={activeMenu === "platform"}
            aria-controls="platform-menu"
            onClick={() =>
              setActiveMenu(activeMenu === "platform" ? null : "platform")
            }
            onKeyDown={(event) => openWithKeyboard(event, "platform")}
          >
            Platform <RiArrowDownSLine size={15} aria-hidden="true" />
          </button>
          {activeMenu === "platform" && (
            <div
              id="platform-menu"
              className={menuStyles.megaMenu}
              role="region"
              aria-label="Platform sections"
            >
              <div className={menuStyles.menuMain}>
                <div className={menuStyles.menuEyebrow}>
                  THE QUESTRA PLATFORM <span>Built around your curriculum</span>
                </div>
                <div className={menuStyles.linkGrid}>
                  {menuLinks(platformLinks)}
                </div>
                <Link
                  className={menuStyles.menuFooter}
                  href="/#dashboard-preview"
                  onClick={closeMenus}
                >
                  <span>
                    <RiDashboardLine size={16} aria-hidden="true" /> Explore the
                    interactive workspace{" "}
                    <span className={menuStyles.tryBadge}>Try it out</span>
                  </span>
                  <RiArrowRightLine size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className={menuStyles.menuFeature}>
                <span className={menuStyles.featureIcon}>
                  <RiGraduationCapLine size={25} aria-hidden="true" />
                </span>
                <span className={menuStyles.featureEyebrow}>
                  CONNECTED LEARNING
                </span>
                <h2>
                  Every subject.
                  <br />
                  One clear path.
                </h2>
                <p>
                  See how academic intelligence connects to everyday student
                  preparation.
                </p>
                <Link href="/#student-portal" onClick={closeMenus}>
                  Discover Student Portal{" "}
                  <RiArrowRightUpLine size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
          <Link
            className={menuStyles.directLink}
            href="/#student-portal"
            onClick={closeMenus}
          >
            Student Portal
          </Link>
          <button
            ref={resourcesRef}
            className={menuStyles.trigger}
            aria-expanded={activeMenu === "resources"}
            aria-controls="resources-menu"
            onClick={() =>
              setActiveMenu(activeMenu === "resources" ? null : "resources")
            }
            onKeyDown={(event) => openWithKeyboard(event, "resources")}
          >
            Resources <RiArrowDownSLine size={15} aria-hidden="true" />
          </button>
          {activeMenu === "resources" && (
            <div
              id="resources-menu"
              className={menuStyles.resourceMenu}
              role="region"
              aria-label="Resources sections"
            >
              <div className={menuStyles.menuEyebrow}>HERE TO HELP</div>
              {menuLinks(resourceLinks)}
              <div className={menuStyles.resourceNote}>
                <span /> Better examinations start with a conversation.
              </div>
            </div>
          )}
        </nav>
        <div className={styles.navActions}>
          <AnimatedThemeToggler className={styles.themeToggle} />
          <Link
            className={`${styles.button} ${styles.navCta}`}
            href="/book-demo"
            onClick={closeMenus}
          >
            Book a demo <RiArrowRightUpLine size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={toggleRef}
          className={styles.menuToggle}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setMobileOpen(!mobileOpen)
            setActiveMenu(null)
          }}
        >
          {mobileOpen ? <RiCloseLine size={23} /> : <RiMenuLine size={23} />}
        </button>
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            className={`${styles.mobileNav} ${menuStyles.mobileNavigation}`}
            aria-label="Mobile navigation"
          >
            <div className={menuStyles.mobileHeading}>
              EXPLORE QUESTRA<span>Intelligence behind every Question.</span>
            </div>
            <Link
              className={menuStyles.mobileHome}
              href="/"
              onClick={closeMenus}
            >
              Home
              <RiArrowRightUpLine size={15} aria-hidden="true" />
            </Link>
            <button
              className={menuStyles.mobileTrigger}
              aria-expanded={mobileExpanded === "platform"}
              aria-controls="mobile-platform-links"
              onClick={() =>
                setMobileExpanded(
                  mobileExpanded === "platform" ? null : "platform",
                )
              }
            >
              Platform
              <RiArrowDownSLine size={18} aria-hidden="true" />
            </button>
            {mobileExpanded === "platform" && (
              <div
                id="mobile-platform-links"
                className={menuStyles.mobileLinks}
              >
                {menuLinks(platformLinks)}
                <Link
                  className={menuStyles.menuLink}
                  href="/#dashboard-preview"
                  onClick={closeMenus}
                >
                  <span className={menuStyles.linkIcon}>
                    <RiDashboardLine size={19} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Interactive workspace</strong>
                    <small>Explore the product experience.</small>
                  </span>
                </Link>
              </div>
            )}
            <Link
              className={menuStyles.mobileStudent}
              href="/#student-portal"
              onClick={closeMenus}
            >
              <span>
                <RiGraduationCapLine size={19} aria-hidden="true" />
                Student Portal
              </span>
              <RiArrowRightUpLine size={15} aria-hidden="true" />
            </Link>
            <button
              className={menuStyles.mobileTrigger}
              aria-expanded={mobileExpanded === "resources"}
              aria-controls="mobile-resources-links"
              onClick={() =>
                setMobileExpanded(
                  mobileExpanded === "resources" ? null : "resources",
                )
              }
            >
              Resources
              <RiArrowDownSLine size={18} aria-hidden="true" />
            </button>
            {mobileExpanded === "resources" && (
              <div
                id="mobile-resources-links"
                className={menuStyles.mobileLinks}
              >
                {menuLinks(resourceLinks)}
              </div>
            )}
            <Link
              href="/book-demo"
              className={styles.button}
              onClick={closeMenus}
            >
              Book a live demo{" "}
              <RiArrowRightUpLine size={16} aria-hidden="true" />
            </Link>
          </nav>
        )}
      </header>
    </>
  )
}
