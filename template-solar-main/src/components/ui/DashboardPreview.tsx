"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
  RiDashboardLine,
  RiDatabase2Line,
  RiFileChartLine,
  RiFileList3Line,
  RiLockLine,
  RiPieChartLine,
  RiQuestionAnswerLine,
  RiRestartLine,
  RiSearchLine,
  RiShieldCheckLine,
  RiSparklingLine,
} from "@remixicon/react"
import QuestraLogo from "../marketing/QuestraLogo"
import DashboardCursor from "./DashboardCursor"
import {
  DemoContext,
  type DemoContextValue,
} from "./dashboard/DemoContext"
import {
  batches,
  createPapers,
  createQuestions,
  emptyScope,
  initialStaff,
  initialStudents,
  initialSubjects,
  matchesScope,
  type Paper,
  type DemoReport,
  type Question,
  type Scope,
  type Staff,
  type Student,
  type Subject,
  type View,
} from "./dashboard/demo-data"
import { styles } from "./dashboard/DashboardKit"
import DocumentDashboardScreens from "./dashboard/DocumentDashboardScreens"

const navigation = [
  { label: "Overview", title: "Institutional Command Center", icon: RiDashboardLine },
  { label: "Master data", title: "Academic Master Dashboard", icon: RiDatabase2Line },
  { label: "Question bank", title: "Faculty Workspace", icon: RiQuestionAnswerLine },
  { label: "AI question studio", title: "AI Question Studio", icon: RiSparklingLine },
  { label: "Question papers", title: "Paper Blueprint Builder", icon: RiFileList3Line },
  { label: "Review & approval", title: "Approval Cockpit", icon: RiShieldCheckLine },
  { label: "Coverage explorer", title: "Quality Validation", icon: RiPieChartLine },
  { label: "Reports", title: "Examination Calendar", icon: RiFileChartLine },
] as const
const screenTitle = (view: View) => navigation.find((item) => item.label === view)?.title ?? view
const screenDetails: Partial<Record<View, string>> = {
  Overview: "Setup completeness, active exams, approval backlog, risk alerts.",
  "Master data": "Batch, degree, department, subject, syllabus, staff/student readiness.",
  "Question bank": "Allocated subjects, drafts, assigned review tasks, due dates.",
  "AI question studio": "Source syllabus, controls, generated candidates, edit/submit.",
  "Question papers": "Marks, section patterns, choices, coverage and rule preview.",
  "Review & approval": "Level 1–2–3 stage progress, comments, pending actions, audit timeline.",
  "Coverage explorer": "Pass/warning/block issues with correction actions.",
  Reports: "Mid-term and end-semester deadlines, release status.",
}
const previewViews: readonly View[] = [
  "Overview",
  "Master data",
  "Question bank",
]
const isPreviewView = (view: View) => previewViews.includes(view)

function LockedPreview({ view }: { view: View }) {
  return (
    <div className={styles.lockedPreview}>
      <div className={styles.lockArtwork} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className={styles.lockIcon}>
        <RiLockLine size={28} aria-hidden="true" />
      </span>
      <span className={styles.eyebrow}>THE FULL EXPERIENCE AWAITS</span>
      <h4>Discover {screenTitle(view)} in action.</h4>
      <p>
        {screenDetails[view]}
      </p>
      <Link className={styles.unlockCta} href="/book-demo">
        Book a demo to explore <RiArrowRightLine size={16} aria-hidden="true" />
      </Link>
      <small>
        Command Center, Academic Master and Faculty Workspace are open for you to try.
      </small>
    </div>
  )
}

export default function DashboardPreview() {
  const [view, setView] = useState<View>("Overview")
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState<Scope>({ ...emptyScope })
  const [subjects, setSubjects] = useState<Subject[]>(() =>
    initialSubjects.map((s) => ({ ...s })),
  )
  const [questions, setQuestions] = useState<Question[]>(createQuestions)
  const [papers, setPapers] = useState<Paper[]>(() =>
    createPapers(createQuestions()),
  )
  const [staff, setStaff] = useState<Staff[]>(() =>
    initialStaff.map((s) => ({ ...s, subjects: [...s.subjects] })),
  )
  const [students, setStudents] = useState<Student[]>(() =>
    initialStudents.map((s) => ({ ...s })),
  )
  const [reportHistory, setReportHistory] = useState<
    { report: DemoReport; at: string }[]
  >([])
  const [dialog, setDialog] = useState<{
    title: string
    body: ReactNode
    subtitle?: string
  } | null>(null)
  const [toast, setToast] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const open = Boolean(dialog)
  const dialogTitle = dialog?.title
  useEffect(() => {
    if (dialogTitle) closeRef.current?.focus()
  }, [dialogTitle])
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialog(null)
        return
      }
      if (event.key === "Tab") {
        const elements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
        )
        if (!elements?.length) return
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKey)
      if (triggerRef.current?.isConnected) triggerRef.current.focus()
    }
  }, [open])
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    },
    [],
  )
  const notify = (text: string) => {
    setToast(text)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(""), 5500)
  }
  const navigate = (next: View) => {
    setView(next)
    setSearch("")
    setDialog(null)
  }
  const scopedSubjects = subjects.filter((s) => matchesScope(s, scope))
  const subjectIds = new Set(scopedSubjects.map((s) => s.id))
  const context: DemoContextValue = {
    reportHistory,
    setReportHistory,
    view,
    navigate,
    search,
    setSearch,
    scope,
    subjects,
    setSubjects,
    scopedSubjects,
    questions,
    setQuestions,
    scopedQuestions: questions.filter((q) => subjectIds.has(q.subjectId)),
    papers,
    setPapers,
    scopedPapers: papers.filter((p) => subjectIds.has(p.subjectId)),
    staff,
    setStaff,
    students,
    setStudents,
    showDialog: (title, body, subtitle) => {
      // Stored dialog actions can hold an older context; inspect the live
      // dialog ref so replacing its contents preserves the original opener.
      if (!modalRef.current)
        triggerRef.current = document.activeElement as HTMLElement
      setDialog({ title, body, subtitle })
    },
    closeDialog: () => setDialog(null),
    notify,
  }
  const reset = () => {
    const nextQuestions = createQuestions()
    setSubjects(initialSubjects.map((s) => ({ ...s })))
    setQuestions(nextQuestions)
    setPapers(createPapers(nextQuestions))
    setStaff(initialStaff.map((s) => ({ ...s, subjects: [...s.subjects] })))
    setStudents(initialStudents.map((s) => ({ ...s })))
    setReportHistory([])
    setScope({ ...emptyScope })
    setSearch("")
    setView("Overview")
    setDialog(null)
    notify("Demo reset. All sample records have been restored.")
  }
  const filters: {
    key: keyof Scope
    label: string
    options: { value: string; label: string }[]
  }[] = [
    {
      key: "batch",
      label: "Batch year",
      options: batches.map((v) => ({ value: v, label: v })),
    },
    {
      key: "degree",
      label: "Degree",
      options: [...new Set(subjects.map((s) => s.degree))].map((v) => ({
        value: v,
        label: v,
      })),
    },
    {
      key: "department",
      label: "Department",
      options: [...new Set(subjects.map((s) => s.department))].map((v) => ({
        value: v,
        label: v,
      })),
    },
    {
      key: "semester",
      label: "Semester",
      options: [...new Set(subjects.map((s) => s.semester))].map((v) => ({
        value: v,
        label: v,
      })),
    },
    {
      key: "subject",
      label: "Subject",
      options: subjects
        .filter((s) => matchesScope(s, { ...scope, subject: "" }))
        .map((s) => ({ value: s.id, label: s.name })),
    },
  ]
  const content: Partial<Record<View, ReactNode>> = {
    Overview: <DocumentDashboardScreens screen="command" />,
    "Master data": <DocumentDashboardScreens screen="master" />,
    "Question bank": <DocumentDashboardScreens screen="faculty" />,
  }

  return (
    <DemoContext.Provider value={context}>
      <section
        id="dashboard-preview"
        aria-label="Interactive Questra dashboard preview"
        className={styles.section}
      >
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            <span /> EXPLORE THE EXPERIENCE
          </span>
          <h2>Your academic workspace. At a glance.</h2>
          <p>
            Explore Command Center, Academic Master and Faculty Workspace. Discover the full
            examination workflow in a live demo.
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
            <span className={styles.workspaceLabel}>ACADEMIC WORKSPACE</span>
            <nav>
              {navigation.map(({ label, title, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className={view === label ? styles.activeNav : ""}
                  aria-current={view === label ? "page" : undefined}
                  aria-label={
                    !isPreviewView(label)
                      ? `${title} — available in a live demo`
                      : undefined
                  }
                  onClick={() => navigate(label)}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{title}</span>
                  {!isPreviewView(label) ? (
                    <RiLockLine
                      size={13}
                      className={styles.navLock}
                      aria-hidden="true"
                    />
                  ) : (
                    view === label && <span className={styles.navDot} />
                  )}
                </button>
              ))}
            </nav>
            <div className={styles.sidebarNote}>
              <RiShieldCheckLine size={20} aria-hidden="true" />
              <strong>Faculty in control</strong>
              <p>Every question. Reviewed before release.</p>
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
                  disabled={!isPreviewView(view)}
                  placeholder="Search dashboard records…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    if (
                      [
                        "Overview",
                        "AI question studio",
                        "Bloom’s analytics",
                        "Outcome mapping",
                      ].includes(view)
                    )
                      setView("Question bank")
                  }}
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
                    Workspace <span>/</span> {screenTitle(view)}
                  </div>
                  <h3>
                    {screenTitle(view)}
                  </h3>
                  <p>{screenDetails[view]}</p>
                </div>
                <span className={styles.term}>
                  <span className={styles.sampleIndicator} /> Sample data
                </span>
              </div>
              {isPreviewView(view) && (
                <div className={styles.academicFilters}>
                  {filters.map((filter) => (
                    <label key={filter.key}>
                      {filter.label}
                      <select
                        aria-label={`Dashboard ${filter.label.toLowerCase()}`}
                        value={scope[filter.key]}
                        onChange={(e) =>
                          setScope((current) => ({
                            ...current,
                            [filter.key]: e.target.value,
                            ...(filter.key !== "subject"
                              ? { subject: "" }
                              : {}),
                          }))
                        }
                      >
                        <option value="">
                          All{" "}
                          {filter.label === "Batch year"
                            ? "batches"
                            : filter.label === "Degree"
                              ? "degrees"
                              : filter.label === "Department"
                                ? "departments"
                                : filter.label === "Semester"
                                  ? "semesters"
                                  : "subjects"}
                        </option>
                        {filter.options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                  <button
                    className={styles.filterReset}
                    onClick={() => {
                      setScope({ ...emptyScope })
                      setSearch("")
                    }}
                    aria-label="Reset academic filters"
                  >
                    <RiRestartLine size={16} />
                  </button>
                </div>
              )}
              <div key={view} className={styles.moduleContent}>
                {isPreviewView(view) ? (
                  content[view]
                ) : (
                  <LockedPreview view={view} />
                )}
              </div>
              <div className={styles.workspaceFooter}>
                <span>
                  <span /> Illustrative data · Changes reset on reload
                </span>
                <button onClick={reset}>
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
        {dialog && (
          <div
            className={styles.detailOverlay}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setDialog(null)
            }}
          >
            <div
              ref={modalRef}
              className={styles.detailPanel}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dashboard-dialog-title"
            >
              <button
                ref={closeRef}
                className={styles.closeDetail}
                onClick={() => setDialog(null)}
                aria-label="Close dashboard details"
              >
                <RiCloseLine size={20} />
              </button>
              <span className={styles.eyebrow}>QUESTRA · SAMPLE WORKSPACE</span>
              <h3 id="dashboard-dialog-title">{dialog.title}</h3>
              {dialog.subtitle && (
                <p className={styles.dialogSubtitle}>{dialog.subtitle}</p>
              )}
              <div className={styles.dialogBody}>{dialog.body}</div>
            </div>
          </div>
        )}
        <div
          className={styles.toastRegion}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {toast && (
            <div className={styles.toast}>
              <RiCheckLine size={16} />
              <span>{toast}</span>
              <button
                aria-label="Dismiss notification"
                onClick={() => setToast("")}
              >
                <RiCloseLine size={15} />
              </button>
            </div>
          )}
        </div>
      </section>
    </DemoContext.Provider>
  )
}
