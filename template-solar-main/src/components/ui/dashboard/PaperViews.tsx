"use client"
import { useState, type FormEvent } from "react"
import { RiCheckLine, RiFileTextLine, RiLockLine } from "@remixicon/react"
import { useDemo } from "./DemoContext"
import {
  getPaperQuestions,
  levels,
  percent,
  units,
  type Paper,
  type PaperStatus,
} from "./demo-data"
import {
  Action,
  Check,
  Metrics,
  Notice,
  Panel,
  Pill,
  styles,
  Table,
} from "./DashboardKit"

function PaperBuilder({ paper }: { paper?: Paper }) {
  const demo = useDemo()
  const [error, setError] = useState("")
  const [subject, setSubject] = useState(
    paper?.subjectId || demo.scope.subject || demo.scopedSubjects[0]?.id || "",
  )
  const [count, setCount] = useState(5)
  const approved = demo.scopedSubjects.some((s) => s.id === subject)
    ? demo.questions.filter(
        (q) => q.subjectId === subject && q.status === "Approved",
      )
    : []
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!approved.length) return
    const fields = new FormData(e.currentTarget)
    const updated: Paper = {
      id: paper?.id || `QP-DEMO-${Date.now()}`,
      title: String(fields.get("title")).trim(),
      subjectId: subject,
      status: paper ? "Draft" : "Generated",
      version: paper ? "v1.2" : "v1.0",
      questions: approved.slice(0, count).map((q) => q.id),
      reviewer:
        demo.staff.find((s) => s.subjects.includes(subject))?.name ||
        "Academic administrator",
      comments: paper?.comments || [],
      history: [
        ...(paper?.history || []),
        paper
          ? "Demo · Draft revised using approved questions"
          : "Demo · Paper assembled from approved sample questions",
      ],
      set: String(fields.get("set")),
    }
    if (!updated.title) {
      setError("Enter an examination title with visible text.")
      return
    }
    demo.setPapers((all) =>
      paper
        ? all.map((p) => (p.id === paper.id ? updated : p))
        : [updated, ...all],
    )
    demo.closeDialog()
    demo.notify(
      paper
        ? "Paper draft updated. Submit it for review when ready."
        : "Sample paper assembled. It is ready to submit for faculty review.",
    )
  }
  return (
    <form className={styles.form} onSubmit={save} onChange={() => setError("")}>
      <label>
        Examination title
        <input
          name="title"
          defaultValue={paper?.title || "Data Structures · Model Examination"}
          required
          maxLength={100}
        />
      </label>
      <label>
        Subject
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {demo.scopedSubjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.formGrid}>
        <label>
          Question count
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[5, 8, 10].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Paper set
          <select name="set" defaultValue={paper?.set || "A"}>
            <option>A</option>
            <option>B</option>
          </select>
        </label>
      </div>
      <Notice tone="blue">
        {approved.length} approved questions available. This demo assembles up
        to {Math.min(count, approved.length)} questions and derives marks from
        them.
      </Notice>
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className={styles.primaryAction}
        disabled={!approved.length}
      >
        {paper ? "Save revised draft" : "Assemble sample paper"}
      </button>
    </form>
  )
}
export function PaperDocument({ paper }: { paper: Paper }) {
  const demo = useDemo()
  const questions = getPaperQuestions(paper, demo.questions)
  const subject = demo.subjects.find((s) => s.id === paper.subjectId)
  return (
    <div className={styles.document}>
      <div className={styles.documentMeta}>
        QUESTRA · SAMPLE EXAMINATION PAPER
      </div>
      <h4>{subject?.name}</h4>
      <p>
        {subject?.degree} · {subject?.department} · Semester {subject?.semester}
      </p>
      <div className={styles.paperMeta}>
        <strong>
          {paper.title} · Set {paper.set}
        </strong>
        <span>
          Max. marks: {questions.reduce((sum, q) => sum + q.marks, 0)}
        </span>
      </div>
      <p>Answer all questions. Show your working where applicable.</p>
      <ol>
        {questions.map((q) => (
          <li key={q.id}>
            <span>{q.title}</span>
            <strong>[{q.marks}]</strong>
          </li>
        ))}
      </ol>
      <div className={styles.documentFoot}>
        Illustrative examination content · {paper.version} · {paper.status}
      </div>
    </div>
  )
}
function PaperResources({ paper }: { paper: Paper }) {
  const demo = useDemo()
  const questions = getPaperQuestions(paper, demo.questions)
  const compare = () => {
    const other = demo.scopedPapers.find(
      (p) =>
        p.id !== paper.id &&
        p.subjectId === paper.subjectId &&
        p.set !== paper.set,
    )
    if (!other) {
      demo.notify("Create a second set for this subject to compare papers.")
      return
    }
    const otherQuestions = getPaperQuestions(other, demo.questions)
    const overlap = paper.questions.filter((id) =>
      other.questions.includes(id),
    ).length
    demo.showDialog(
      `Set ${paper.set} vs Set ${other.set}`,
      <div className={styles.viewStack}>
        <Table
          label="Paper set equivalence"
          headers={[
            "Measure",
            `Set ${paper.set}`,
            `Set ${other.set}`,
            "Result",
          ]}
          rows={[
            [
              "Questions",
              questions.length,
              otherQuestions.length,
              <Pill key="p">
                {questions.length === otherQuestions.length
                  ? "Matched"
                  : "Needs review"}
              </Pill>,
            ],
            [
              "Total marks",
              questions.reduce((s, q) => s + q.marks, 0),
              otherQuestions.reduce((s, q) => s + q.marks, 0),
              <Pill key="p">
                {questions.reduce((s, q) => s + q.marks, 0) ===
                otherQuestions.reduce((s, q) => s + q.marks, 0)
                  ? "Matched"
                  : "Needs review"}
              </Pill>,
            ],
            [
              "Higher-order questions",
              questions.filter((q) => q.bloom >= 4).length,
              otherQuestions.filter((q) => q.bloom >= 4).length,
              <Pill key="p" tone="blue">
                Compare balance
              </Pill>,
            ],
          ]}
        />
        <Notice>
          {percent(overlap, Math.max(1, paper.questions.length))}% question
          overlap. Faculty should check equivalence and avoid excessive reuse
          between sets.
        </Notice>
      </div>,
      `${paper.title} / ${other.title}`,
    )
  }
  return (
    <div className={styles.resourceList}>
      <button
        onClick={() =>
          demo.showDialog(
            "Answer key & marking rubric",
            <div className={styles.answerList}>
              {questions.map((q, i) => (
                <section key={q.id}>
                  <h4>
                    Question {i + 1} · {q.marks} marks
                  </h4>
                  <p>{q.answer}</p>
                  <div className={styles.tags}>
                    <Pill tone="blue">
                      Concepts · {Math.ceil(q.marks * 0.4)} marks
                    </Pill>
                    <Pill tone="green">
                      Application · {q.marks - Math.ceil(q.marks * 0.4)} marks
                    </Pill>
                  </div>
                </section>
              ))}
            </div>,
            "Sample answer outlines · subject to faculty review",
          )
        }
      >
        <RiFileTextLine size={20} />
        <span>
          <strong>Answer key & rubrics</strong>
          <small>Model answers and sample marking guidance</small>
        </span>
        View →
      </button>
      <button onClick={compare}>
        <RiCheckLine size={20} />
        <span>
          <strong>Set equivalence</strong>
          <small>Compare question count, marks, and overlap</small>
        </span>
        Compare →
      </button>
      {paper.status !== "Locked" && (
        <button
          onClick={() =>
            demo.showDialog(
              "Revise paper draft",
              <PaperBuilder paper={paper} />,
            )
          }
        >
          <RiFileTextLine size={20} />
          <span>
            <strong>Edit current draft</strong>
            <small>Reassemble from approved sample questions</small>
          </span>
          Edit →
        </button>
      )}
    </div>
  )
}
export default function PapersView() {
  const demo = useDemo()
  const [selected, setSelected] = useState("")
  const [status, setStatus] = useState("")
  const papers = demo.scopedPapers.filter(
    (p) =>
      (!status || p.status === status) &&
      `${p.id} ${p.title} ${demo.subjects.find((s) => s.id === p.subjectId)?.name}`
        .toLowerCase()
        .includes(demo.search.toLowerCase()),
  )
  const active = papers.find((p) => p.id === selected) || papers[0]
  const flow = [
    "Draft",
    "Generated",
    "Faculty review",
    "Moderator review",
    "Ready for approval",
    "Approved",
    "Locked",
  ]
  return (
    <div className={styles.viewStack}>
      <Metrics
        items={[
          {
            label: "Total papers",
            value: demo.scopedPapers.length,
            note: "In selected academic scope",
          },
          {
            label: "Drafts",
            value: demo.scopedPapers.filter((p) => p.status === "Draft").length,
            note: "Editable working papers",
          },
          {
            label: "In review",
            value: demo.scopedPapers.filter((p) =>
              /review|approval/.test(p.status),
            ).length,
            note: "Faculty, moderator, or final",
          },
          {
            label: "Locked",
            value: demo.scopedPapers.filter((p) => p.status === "Locked")
              .length,
            note: "Approved and read-only",
            color: "green",
          },
        ]}
      />
      <div className={styles.actionRow}>
        <Action
          primary
          onClick={() =>
            demo.showDialog("Create question paper", <PaperBuilder />)
          }
        >
          + Create paper
        </Action>
        <Action
          onClick={() => {
            const draft = demo.scopedPapers.find((p) => p.status === "Draft")
            if (draft)
              demo.showDialog(
                "Continue paper draft",
                <PaperBuilder paper={draft} />,
              )
            else
              demo.notify(
                "No sample drafts are available. Create a paper to get started.",
              )
          }}
        >
          Continue draft
        </Action>
        <select
          aria-label="Filter papers by status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {flow.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className={styles.lifecycle} aria-label="Paper lifecycle">
        {flow.map((stage, i) => (
          <span key={stage} data-active={active?.status === stage}>
            <i>{i + 1}</i>
            {stage}
            {i < flow.length - 1 && <b>→</b>}
          </span>
        ))}
      </div>
      <div className={styles.paperGrid}>
        <div className={styles.viewStack}>
          <Panel title="Question paper register">
            <Table
              label="Paper register"
              headers={["Paper", "Set", "Marks", "Version", "Status", "View"]}
              rows={papers.map((p) => [
                <span key="p">
                  <strong>{p.title}</strong>
                  <small className={styles.cellSub}>{p.id}</small>
                </span>,
                p.set,
                getPaperQuestions(p, demo.questions).reduce(
                  (sum, q) => sum + q.marks,
                  0,
                ),
                p.version,
                <Pill key="s">{p.status}</Pill>,
                <button
                  key="a"
                  className={styles.textAction}
                  onClick={() => setSelected(p.id)}
                >
                  Preview
                </button>,
              ])}
            />
          </Panel>
          {active && (
            <>
              <Panel title="Blueprint balance by unit & Bloom">
                <Table
                  label="Paper blueprint balance"
                  headers={["Unit", "Bloom distribution", "Questions"]}
                  rows={units.map((unit, i) => {
                    const qs = getPaperQuestions(active, demo.questions).filter(
                      (q) =>
                        active.questions.includes(q.id) && q.unit === i + 1,
                    )
                    return [
                      `Unit ${i + 1} · ${unit}`,
                      <span className={styles.stackedBar} key="b">
                        {levels.map((level, k) => {
                          const count = qs.filter(
                            (q) => q.bloom === k + 1,
                          ).length
                          return count ? (
                            <i
                              key={level}
                              style={{ flex: count }}
                              data-level={k + 1}
                              title={`K${k + 1} ${level}: ${count}`}
                            >
                              {count}
                            </i>
                          ) : null
                        })}
                      </span>,
                      qs.length,
                    ]
                  })}
                />
              </Panel>
              <Panel title="Answer keys & resources">
                <PaperResources paper={active} />
              </Panel>
            </>
          )}
        </div>
        <Panel
          title="Paper preview"
          action={active && <Pill tone="blue">Sample preview</Pill>}
        >
          {active ? (
            <>
              <PaperDocument paper={active} />
              <div className={styles.panelBody}>
                {active.status === "Locked" ? (
                  <Check>Locked paper · read-only</Check>
                ) : (
                  <Action
                    primary
                    onClick={() => demo.navigate("Review & approval")}
                  >
                    Open review workspace →
                  </Action>
                )}
              </div>
            </>
          ) : (
            <p className={styles.empty}>No papers match this academic scope.</p>
          )}
        </Panel>
      </div>
    </div>
  )
}
function ReviewActions({ paper }: { paper: Paper }) {
  const demo = useDemo()
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const next: Record<string, PaperStatus> = {
    Draft: "Faculty review",
    Generated: "Faculty review",
    "Faculty review": "Moderator review",
    "Moderator review": "Ready for approval",
    "Ready for approval": "Approved",
    Approved: "Locked",
  }
  const labels: Record<string, string> = {
    Draft: "Submit for faculty review",
    Generated: "Submit for faculty review",
    "Faculty review": "Send to moderator",
    "Moderator review": "Mark ready for approval",
    "Ready for approval": "Approve paper",
    Approved: "Lock approved paper",
  }
  function advance(changes = false) {
    if (paper.status === "Locked") return
    if (changes && !comment.trim()) {
      setError("Add a review comment explaining the requested changes.")
      return
    }
    const target = changes ? "Draft" : next[paper.status]
    if (!target) return
    const invalid = paper.questions.some(
      (id) => demo.questions.find((q) => q.id === id)?.status !== "Approved",
    )
    if (!changes && invalid) {
      setError(
        "This paper contains a question that is no longer approved. Revise the draft before continuing.",
      )
      return
    }
    demo.setPapers((all) =>
      all.map((p) =>
        p.id === paper.id
          ? {
              ...p,
              status: target,
              questionSnapshot:
                target === "Locked"
                  ? getPaperQuestions(p, demo.questions).map((q) => ({ ...q }))
                  : undefined,
              comments: comment.trim()
                ? [...p.comments, comment.trim()]
                : p.comments,
              history: [
                ...p.history,
                `Demo · ${changes ? "Changes requested; returned to draft" : `Moved to ${target}`}${comment.trim() ? ` · ${comment.trim()}` : ""}`,
              ],
            }
          : p,
      ),
    )
    setComment("")
    setError("")
    demo.notify(
      changes
        ? "Changes requested. Paper returned to draft."
        : `Paper moved to ${target.toLowerCase()}.`,
    )
  }
  return (
    <div className={styles.panelBody}>
      <h5>Review comments</h5>
      {paper.comments.length ? (
        paper.comments.map((c, i) => (
          <blockquote className={styles.reviewComment} key={i}>
            {c}
          </blockquote>
        ))
      ) : (
        <p>No comments yet. Add a clear note for the next reviewer.</p>
      )}
      {paper.status !== "Locked" && (
        <>
          <label className={styles.commentLabel}>
            Your review note
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Add academic feedback or explain a requested change…"
            />
          </label>
          {error && (
            <p className={styles.formError} role="alert">
              {error}
            </p>
          )}
          <div className={styles.actionRow}>
            {/review|approval/.test(paper.status) && (
              <Action onClick={() => advance(true)}>Request changes</Action>
            )}
            <Action primary onClick={() => advance()}>
              {labels[paper.status]}
            </Action>
          </div>
        </>
      )}
      {paper.status === "Locked" && (
        <Notice tone="green">
          <RiLockLine size={14} /> This sample paper is locked and read-only.
        </Notice>
      )}
      <h5 className={styles.spacedHeading}>Version comparison</h5>
      <Table
        label="Paper versions"
        headers={["Version", "Description"]}
        rows={[
          ["v0.9", "Initial sample draft"],
          [paper.version, "Current questions and answer outlines"],
        ]}
      />
    </div>
  )
}
export function ReviewView() {
  const demo = useDemo()
  const [selected, setSelected] = useState("")
  const [questionIndex, setQuestionIndex] = useState(0)
  const papers = demo.scopedPapers.filter((p) =>
    `${p.id} ${p.title} ${p.reviewer}`
      .toLowerCase()
      .includes(demo.search.toLowerCase()),
  )
  const active =
    papers.find((p) => p.id === selected) ||
    papers.find((p) => /review|approval/.test(p.status)) ||
    papers[0]
  const questions = active ? getPaperQuestions(active, demo.questions) : []
  const index = Math.min(questionIndex, Math.max(0, questions.length - 1))
  const question = questions[index]
  const columns = ["Faculty review", "Moderator review", "Ready for approval"]
  return (
    <div className={styles.viewStack}>
      <Metrics
        items={[
          {
            label: "Awaiting review",
            value: papers.filter((p) => /review|approval/.test(p.status))
              .length,
            note: "Across all review stages",
          },
          {
            label: "Changes requested",
            value: papers.filter(
              (p) => p.status === "Draft" && p.comments.length,
            ).length,
            note: "Returned to faculty",
            color: "pink",
          },
          {
            label: "Approved",
            value: papers.filter((p) => p.status === "Approved").length,
            note: "Ready for final locking",
            color: "green",
          },
          {
            label: "Locked",
            value: papers.filter((p) => p.status === "Locked").length,
            note: "Read-only sample papers",
          },
        ]}
      />
      <div className={styles.kanban}>
        {columns.map((column) => (
          <section className={styles.kanbanColumn} key={column}>
            <div>
              <h4>{column}</h4>
              <Pill tone="blue">
                {papers.filter((p) => p.status === column).length}
              </Pill>
            </div>
            <p>
              {column === "Faculty review"
                ? "Initial academic review"
                : column === "Moderator review"
                  ? "Independent subject moderation"
                  : "Moderator cleared · final decision"}
            </p>
            {papers
              .filter((p) => p.status === column)
              .map((p) => (
                <button
                  className={styles.paperCard}
                  data-selected={active?.id === p.id}
                  key={p.id}
                  onClick={() => {
                    setSelected(p.id)
                    setQuestionIndex(0)
                  }}
                >
                  <strong>{p.title}</strong>
                  <small>
                    {demo.subjects.find((s) => s.id === p.subjectId)?.name} ·{" "}
                    {p.version}
                  </small>
                  <span className={styles.inlinePerson}>
                    <span className={styles.miniAvatar}>
                      {p.reviewer
                        .split(" ")
                        .slice(-2)
                        .map((s) => s[0])
                        .join("")}
                    </span>
                    {p.reviewer}
                  </span>
                  <span>
                    {p.questions.length} questions{" "}
                    <span className={styles.cardIssue}>
                      {p.comments.length} comments
                    </span>
                  </span>
                </button>
              ))}
            {!papers.some((p) => p.status === column) && (
              <span className={styles.boardEmpty}>No papers at this stage</span>
            )}
          </section>
        ))}
      </div>
      <Panel
        title="All papers"
        action={
          <span className={styles.subtle}>
            Select any stage to inspect or submit
          </span>
        }
      >
        <div className={styles.paperChips}>
          {papers.map((p) => (
            <button
              key={p.id}
              aria-pressed={active?.id === p.id}
              onClick={() => {
                setSelected(p.id)
                setQuestionIndex(0)
              }}
            >
              {p.id}
              <Pill>{p.status}</Pill>
            </button>
          ))}
        </div>
        {!papers.length && (
          <p className={styles.empty}>No papers match these filters.</p>
        )}
      </Panel>
      {active && (
        <>
          <Panel
            title={`Selected paper review · ${active.title}`}
            action={<Pill>{active.status}</Pill>}
          >
            <div className={styles.reviewGrid}>
              <div className={styles.panelBody}>
                <div className={styles.questionPager}>
                  <h5>
                    Question {questions.length ? index + 1 : 0} of{" "}
                    {questions.length}
                  </h5>
                  <span>
                    <button
                      aria-label="Previous review question"
                      disabled={!index}
                      onClick={() => setQuestionIndex(index - 1)}
                    >
                      ←
                    </button>
                    <button
                      aria-label="Next review question"
                      disabled={index >= questions.length - 1}
                      onClick={() => setQuestionIndex(index + 1)}
                    >
                      →
                    </button>
                  </span>
                </div>
                {question ? (
                  <>
                    <p className={styles.questionReview}>{question.title}</p>
                    <div className={styles.tags}>
                      <Pill tone="purple">
                        K{question.bloom} · {levels[question.bloom - 1]}
                      </Pill>
                      <Pill>{question.outcome || "Unmapped"}</Pill>
                      <Pill tone="blue">{question.marks} marks</Pill>
                      <Pill>{question.difficulty}</Pill>
                    </div>
                    <h5 className={styles.spacedHeading}>Answer outline</h5>
                    <p>{question.answer}</p>
                  </>
                ) : (
                  <p>No questions in this paper.</p>
                )}
              </div>
              <div className={styles.panelBody}>
                <h5>Sample validation checklist</h5>
                <Notice tone="blue">
                  Demo checks assist reviewers. Faculty make the academic
                  decision.
                </Notice>
                <div className={styles.checklist}>
                  {[
                    {
                      label: "Syllabus relevance",
                      good: questions.every(
                        (q) => q.subjectId === active.subjectId,
                      ),
                    },
                    {
                      label: "Approved questions",
                      good: questions.every((q) => q.status === "Approved"),
                    },
                    {
                      label: "Answer outlines present",
                      good: questions.every((q) => Boolean(q.answer)),
                    },
                    {
                      label: "Higher-order balance",
                      good:
                        questions.filter((q) => q.bloom >= 4).length >=
                        questions.length * 0.3,
                    },
                    {
                      label: "Outcome tagging",
                      good: questions.every((q) => Boolean(q.outcome)),
                    },
                  ].map((check) => (
                    <div key={check.label}>
                      <span>{check.label}</span>
                      <Pill>{check.good ? "Passed" : "Needs review"}</Pill>
                    </div>
                  ))}
                </div>
              </div>
              <ReviewActions key={active.id} paper={active} />
            </div>
          </Panel>
          <Panel title="Audit history">
            <div className={styles.auditList}>
              {active.history.map((event, i) => (
                <div key={i}>
                  <i />
                  <span>{event}</span>
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}
    </div>
  )
}
