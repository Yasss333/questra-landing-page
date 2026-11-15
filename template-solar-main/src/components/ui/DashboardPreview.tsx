"use client"

import Link from "next/link"
import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal"
import { useState } from "react"
import {
  RiArrowRightLine,
  RiDashboardLine,
  RiDatabase2Line,
  RiFileChartLine,
  RiLockLine,
  RiPieChartLine,
  RiQuestionAnswerLine,
  RiRestartLine,
  RiSearchLine,
  RiShieldCheckLine,
} from "@remixicon/react"
import QuestraLogo from "../marketing/QuestraLogo"
import DashboardCursor from "./DashboardCursor"
import { Metrics, Panel, Table, styles } from "./dashboard/DashboardKit"

type Entry = readonly [string, string]
const navigation: {
  icon: typeof RiDashboardLine
  title: string
  navLabel: string
  description: string
  highlights: string
  metrics?: readonly Entry[]
  panel?: string
  rows?: readonly Entry[]
}[] = [
  {
    icon: RiDashboardLine,
    title: "Controller of Examinations Dashboard",
    navLabel: "COE Overview",
    description:
      "Centralized visibility into answer script uploads, evaluator assignments, valuation progress, discrepancies, moderation, approval status and result readiness.",
    highlights:
      "Total scripts, evaluation completion, department-wise progress, pending approvals, valuation discrepancies and examination result readiness.",
    metrics: [
      ["Total scripts", "120"],
      ["Evaluation completion", "75%"],
      ["Pending approvals", "15"],
      ["Valuation discrepancies", "5"],
      ["Result readiness", "60%"],
    ],
    panel: "Department-wise progress",
    rows: [
      ["Computer Science", "36 of 48 evaluated"],
      ["Electronics", "30 of 40 evaluated"],
      ["Mathematics", "24 of 32 evaluated"],
    ],
  },
  {
    icon: RiQuestionAnswerLine,
    title: "Faculty Evaluation Dashboard",
    navLabel: "Faculty Review",
    description:
      "Manage assigned scripts, review AI suggestions, apply approved marking criteria, annotate responses, submit marks and monitor pending evaluations.",
    highlights:
      "Allocated scripts, evaluated scripts, pending scripts, flagged answers, evaluation hours and completion percentage.",
    metrics: [
      ["Allocated scripts", "40"],
      ["Evaluated scripts", "30"],
      ["Pending scripts", "10"],
      ["Flagged answers", "3"],
      ["Evaluation hours", "6"],
      ["Completion percentage", "75%"],
    ],
    panel: "Script evaluation progress",
    rows: [
      ["Engineering Mathematics", "18 of 24 evaluated"],
      ["Applied Mathematics", "12 of 16 evaluated"],
    ],
  },
  {
    icon: RiShieldCheckLine,
    title: "Chief Examiner & Moderation Dashboard",
    navLabel: "Moderation",
    description:
      "Monitor valuation differences, examiner workloads, quality exceptions, moderation requests and final marking approvals.",
    highlights:
      "First/second valuation variance, scripts awaiting moderation, unusual scoring patterns and reconciliation status.",
    metrics: [
      ["First/second valuation variance", "6 marks"],
      ["Scripts awaiting moderation", "5"],
      ["Unusual scoring patterns", "2"],
      ["Reconciled scripts", "3 of 8"],
    ],
    panel: "Reconciliation status",
    rows: [
      ["Independent valuation difference", "Awaiting moderation"],
      ["Missing mark flagged", "Under review"],
      ["Mark discrepancy", "Reconciled"],
    ],
  },
  {
    icon: RiDatabase2Line,
    title: "Student Performance Dashboard",
    navLabel: "Student Progress",
    description:
      "Offer students access to approved examination results, question-wise performance, topic-level progress, competency insights and improvement guidance.",
    highlights:
      "Subject scores, CO attainment, Bloom's performance, learning gaps and recommended next actions.",
  },
  {
    icon: RiFileChartLine,
    title: "HOD & Management Dashboard",
    navLabel: "HoD & Mgmt.",
    description:
      "Understand department-wise academic quality, course performance, learning outcome attainment, assessment effectiveness and student improvement trends.",
    highlights:
      "Department attainment, subject difficulty trends, student competency distribution and academic improvement metrics.",
  },
  {
    icon: RiPieChartLine,
    title: "Autonomous Evaluation Operations Dashboard",
    navLabel: "Evaluation Ops",
    description:
      "Track answer recognition, AI processing, upload exceptions, pending faculty reviews, workflow progress and system performance.",
    highlights:
      "Processing status, recognition failures, exception queues, workflow health and completion timelines.",
  },
]

export default function DashboardPreview() {
  const [view, setView] = useState(0)
  const [search, setSearch] = useState("")
  const screen = navigation[view]
  const query = search.trim().toLowerCase()
  const rows = screen.rows?.filter((row) =>
    row.join(" ").toLowerCase().includes(query),
  )

  function navigate(index: number) {
    setView(index)
    setSearch("")
  }

  return (
    <section
      id="dashboard-preview"
      aria-label="Interactive Questra EvalIQ dashboard preview"
      className={styles.section}
    >
      <div className={styles.intro}>
        <span className={styles.eyebrow}>
          <span /> 03 · EVALIQ ROLE DASHBOARDS
        </span>
        <h2>
          <DiaTextReveal text="Intelligent Dashboards for Every Academic Role" />
        </h2>
        <p>
          Try sample views for Controllers of Examinations, faculty evaluators
          and chief examiners. Explore the other role dashboards in a live demo.
        </p>
      </div>
      <div className={styles.frame}>
        <DashboardCursor />
        <aside
          className={styles.sidebar}
          aria-label="Dashboard preview navigation"
        >
          <div className={styles.brand}>
            <QuestraLogo width={156} />
          </div>
          <span className={styles.workspaceLabel}>EVALIQ WORKSPACE</span>
          <nav>
            {navigation.map(
              ({ title, navLabel, icon: Icon, metrics }, index) => (
                <button
                  key={title}
                  type="button"
                  className={view === index ? styles.activeNav : ""}
                  aria-current={view === index ? "page" : undefined}
                  aria-label={
                    !metrics
                      ? `${navLabel} — available in a live demo`
                      : undefined
                  }
                  title={title}
                  onClick={() => navigate(index)}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{navLabel}</span>
                  {!metrics ? (
                    <RiLockLine
                      size={13}
                      className={styles.navLock}
                      aria-hidden="true"
                    />
                  ) : (
                    view === index && <span className={styles.navDot} />
                  )}
                </button>
              ),
            )}
          </nav>
          <div className={styles.sidebarNote}>
            <RiShieldCheckLine size={20} aria-hidden="true" />
            <strong>Faculty in control</strong>
            <p>Faculty verify marks before results are released.</p>
            <span>
              <span /> Sample workspace
            </span>
          </div>
          <div className={styles.profile}>
            <span className={styles.avatar}>AS</span>
            <span>
              <strong>Academic administrator</strong>
              <small>Questra · Demo institution</small>
            </span>
          </div>
        </aside>
        <div className={styles.workspace}>
          <header className={styles.topbar}>
            <label className={styles.search}>
              <RiSearchLine size={16} aria-hidden="true" />
              <input
                aria-label="Search dashboard records"
                disabled={!screen.rows}
                placeholder="Search sample records…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <span className={styles.previewLabel}>
              <span /> Selected preview
            </span>
            <span className={styles.headerAvatar}>AS</span>
          </header>
          <div className={styles.content}>
            <div className={styles.pageHeading}>
              <div>
                <div className={styles.breadcrumb}>
                  Workspace <span>/</span> {screen.title}
                </div>
                <h3>{screen.title}</h3>
                <p>{screen.description}</p>
              </div>
              <span className={styles.term}>
                <span className={styles.sampleIndicator} /> Sample data
              </span>
            </div>
            <div key={view} className={styles.moduleContent}>
              {screen.metrics ? (
                <div className={styles.viewStack}>
                  <Metrics
                    items={screen.metrics.map(([label, value]) => ({
                      label,
                      value,
                      note: "Sample data",
                    }))}
                  />
                  <Panel title={screen.panel ?? screen.title}>
                    <Table
                      label={screen.panel ?? screen.title}
                      headers={["Sample record", "Status"]}
                      rows={(rows ?? []).map(([name, status]) => [
                        name,
                        status,
                      ])}
                      empty="No sample records match your search."
                    />
                  </Panel>
                </div>
              ) : (
                <div className={styles.lockedPreview}>
                  <div className={styles.lockArtwork} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className={styles.lockIcon}>
                    <RiLockLine size={28} aria-hidden="true" />
                  </span>
                  <p>{screen.highlights}</p>
                  <Link className={styles.unlockCta} href="/book-demo">
                    Book a demo to explore{" "}
                    <RiArrowRightLine size={16} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.workspaceFooter}>
              <span>
                <span /> Illustrative sample data
              </span>
              <button onClick={() => navigate(0)}>
                <RiRestartLine size={11} /> Reset demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.caption}>
        <span className={styles.captionDot} /> A little less admin. A lot more
        academic clarity.
        <span className={styles.captionTag}>Click around to explore</span>
      </div>
    </section>
  )
}
