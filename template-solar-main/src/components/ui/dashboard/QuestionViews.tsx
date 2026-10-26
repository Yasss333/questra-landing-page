"use client"
import { useState, type FormEvent } from "react"
import { RiArrowRightUpLine, RiSparklingLine } from "@remixicon/react"
import { useDemo } from "./DemoContext"
import {
  csvDownload,
  levels,
  questionTypes,
  units,
  type Question,
  type QuestionStatus,
} from "./demo-data"
import {
  Action,
  BarList,
  Donut,
  Metrics,
  Notice,
  Panel,
  Pill,
  styles,
  Table,
} from "./DashboardKit"

export function QuestionEditor({ question }: { question?: Question }) {
  const demo = useDemo()
  const [error, setError] = useState("")
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fields = new FormData(e.currentTarget)
    const updated: Question = {
      id: question?.id || `Q-DEMO-${Date.now()}`,
      title: String(fields.get("title")).trim(),
      subjectId: String(fields.get("subject")),
      unit: Number(fields.get("unit")),
      marks: Number(fields.get("marks")),
      type: String(fields.get("type")),
      bloom: Number(fields.get("bloom")),
      outcome: String(fields.get("outcome")),
      difficulty: String(fields.get("difficulty")),
      status: "Draft",
      answer: String(fields.get("answer")).trim(),
      source: "Demo faculty contribution",
      version: question ? "v1.2" : "v1.0",
      released: false,
    }
    if (!updated.title || !updated.answer) {
      setError("Enter a question and an answer outline with visible text.")
      return
    }
    demo.setQuestions((all) =>
      question
        ? all.map((q) => (q.id === question.id ? updated : q))
        : [...all, updated],
    )
    demo.closeDialog()
    demo.notify(
      question
        ? "Question updated as a draft for faculty review."
        : "Draft question added to the bank.",
    )
  }
  return (
    <form className={styles.form} onSubmit={save} onChange={() => setError("")}>
      <label>
        Question
        <textarea
          name="title"
          defaultValue={question?.title}
          required
          maxLength={800}
          rows={3}
          placeholder="Write a clear question aligned to the syllabus…"
        />
      </label>
      <div className={styles.formGrid}>
        <label>
          Subject
          <select
            name="subject"
            defaultValue={
              question?.subjectId || demo.scope.subject || demo.subjects[0].id
            }
          >
            {demo.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Unit
          <select name="unit" defaultValue={question?.unit || 1}>
            {units.map((unit, i) => (
              <option key={unit} value={i + 1}>
                Unit {i + 1} · {unit}
              </option>
            ))}
          </select>
        </label>
        <label>
          Question type
          <select name="type" defaultValue={question?.type}>
            {questionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Marks
          <select name="marks" defaultValue={question?.marks || 5}>
            {[1, 2, 5, 10, 15].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Bloom’s level
          <select name="bloom" defaultValue={question?.bloom || 3}>
            {levels.map((level, i) => (
              <option key={level} value={i + 1}>
                K{i + 1} · {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          Difficulty
          <select
            name="difficulty"
            defaultValue={question?.difficulty || "Medium"}
          >
            {["Easy", "Medium", "Hard"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Course outcome
          <select name="outcome" defaultValue={question?.outcome || ""}>
            <option value="">Unmapped</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>CO{n}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Answer outline
        <textarea
          name="answer"
          defaultValue={question?.answer}
          required
          rows={4}
          maxLength={2000}
          placeholder="Add the key concepts, steps, and marking criteria…"
        />
      </label>
      <Notice tone="blue">
        Saving creates a draft. Faculty review is required before approval and
        student release.
      </Notice>
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
      <button type="submit" className={styles.primaryAction}>
        Save draft
      </button>
    </form>
  )
}
export function useQuestionDetails() {
  const demo = useDemo()
  return (question: Question, student = false) =>
    demo.showDialog(
      question.title,
      <div className={styles.questionDetails}>
        <div className={styles.tags}>
          <Pill>{question.status}</Pill>
          <Pill tone="blue">{question.type}</Pill>
          <Pill tone="purple">
            K{question.bloom} · {levels[question.bloom - 1]}
          </Pill>
          <Pill tone="blue">{question.marks} marks</Pill>
          <Pill>{question.outcome || "Unmapped"}</Pill>
        </div>
        <div className={styles.detailGrid}>
          <span>
            Subject
            <strong>
              {demo.subjects.find((s) => s.id === question.subjectId)?.name}
            </strong>
          </span>
          <span>
            Unit
            <strong>
              {question.unit} · {units[question.unit - 1]}
            </strong>
          </span>
          <span>
            Difficulty<strong>{question.difficulty}</strong>
          </span>
          <span>
            Source / version
            <strong>
              {question.source} · {question.version}
            </strong>
          </span>
        </div>
        <h4>Suggested answer outline</h4>
        <p>{question.answer}</p>
        <Notice tone="blue">
          Illustrative question and answer. Faculty review applies before
          institution release.
        </Notice>
        {!student && (
          <div className={styles.actionRow}>
            <Action
              onClick={() =>
                demo.showDialog(
                  `Edit ${question.id}`,
                  <QuestionEditor question={question} />,
                )
              }
            >
              Edit question
            </Action>
            {question.status === "Draft" && (
              <Action
                primary
                onClick={() => {
                  demo.setQuestions((all) =>
                    all.map((q) =>
                      q.id === question.id ? { ...q, status: "In review" } : q,
                    ),
                  )
                  demo.closeDialog()
                  demo.notify(`${question.id} submitted for faculty review.`)
                }}
              >
                Submit for review
              </Action>
            )}
            {question.status === "In review" && (
              <Action
                primary
                onClick={() => {
                  demo.setQuestions((all) =>
                    all.map((q) =>
                      q.id === question.id ? { ...q, status: "Approved" } : q,
                    ),
                  )
                  demo.closeDialog()
                  demo.notify(`${question.id} approved in this demo.`)
                }}
              >
                Approve question
              </Action>
            )}
            {question.status === "Approved" && (
              <Action
                primary
                onClick={() => {
                  demo.setQuestions((all) =>
                    all.map((q) =>
                      q.id === question.id
                        ? { ...q, released: !q.released }
                        : q,
                    ),
                  )
                  demo.closeDialog()
                  demo.notify(
                    question.released
                      ? "Question withdrawn from the student preview."
                      : "Question released to the student preview.",
                  )
                }}
              >
                {question.released ? "Withdraw release" : "Release to students"}
              </Action>
            )}
          </div>
        )}
      </div>,
      `${question.id} · Sample question`,
    )
}
export function QuestionTable({
  questions,
  student = false,
  compact = false,
}: {
  questions: Question[]
  student?: boolean
  compact?: boolean
}) {
  const demo = useDemo()
  const open = useQuestionDetails()
  return (
    <Table
      label={student ? "Released practice questions" : "Question repository"}
      pageSize={compact ? 3 : 5}
      headers={
        compact
          ? ["Question", "Subject", "Status", "Marks", "Details"]
          : [
              "Question",
              "Unit",
              "Marks / type",
              "Bloom / CO",
              "Difficulty",
              "Status",
              "Details",
            ]
      }
      rows={questions.map((q) => {
        const title = (
          <span key="title">
            <small className={styles.questionId}>{q.id}</small>
            <span className={styles.questionTitle}>{q.title}</span>
          </span>
        )
        const action = (
          <button
            key="details"
            className={styles.detailButton}
            aria-label={`View question ${q.id}`}
            onClick={() => open(q, student)}
          >
            <RiArrowRightUpLine size={15} />
          </button>
        )
        return compact
          ? [
              title,
              demo.subjects.find((s) => s.id === q.subjectId)?.name,
              <Pill key="status">{q.status}</Pill>,
              q.marks,
              action,
            ]
          : [
              title,
              <span key="unit">
                Unit {q.unit}
                <small className={styles.cellSub}>
                  {demo.subjects.find((s) => s.id === q.subjectId)?.name}
                </small>
              </span>,
              <span key="type">
                {q.marks} marks
                <small className={styles.cellSub}>{q.type}</small>
              </span>,
              <span className={styles.tags} key="tags">
                <Pill tone="purple">K{q.bloom}</Pill>
                <Pill tone={q.outcome ? "green" : "red"}>
                  {q.outcome || "Unmapped"}
                </Pill>
              </span>,
              <Pill key="difficulty">{q.difficulty}</Pill>,
              <Pill key="status">{student ? "Released" : q.status}</Pill>,
              action,
            ]
      })}
    />
  )
}
export default function QuestionBankView({
  student = false,
}: {
  student?: boolean
}) {
  const demo = useDemo()
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [unit, setUnit] = useState("")
  const [duplicates, setDuplicates] = useState<string[]>([])
  const open = useQuestionDetails()
  const base = demo.scopedQuestions.filter(
    (q) => !student || (q.status === "Approved" && q.released),
  )
  const filtered = base.filter(
    (q) =>
      (!status || q.status === status) &&
      (!type || q.type === type) &&
      (!difficulty || q.difficulty === difficulty) &&
      (!unit || q.unit === Number(unit)) &&
      `${q.id} ${q.title} ${q.outcome} ${demo.subjects.find((s) => s.id === q.subjectId)?.name}`
        .toLowerCase()
        .includes(demo.search.toLowerCase()),
  )
  const exportQuestions = () => {
    csvDownload(
      "questra-sample-questions.csv",
      [
        "ID",
        "Question",
        "Subject",
        "Unit",
        "Marks",
        "Type",
        "Bloom",
        "Outcome",
        "Difficulty",
        "Status",
      ],
      filtered.map((q) => [
        q.id,
        q.title,
        demo.subjects.find((s) => s.id === q.subjectId)?.name || "",
        q.unit,
        q.marks,
        q.type,
        `K${q.bloom}`,
        q.outcome,
        q.difficulty,
        q.status,
      ]),
    )
    demo.notify("Filtered sample questions exported as CSV.")
  }
  const candidates = base.filter((q) => !duplicates.includes(q.id)).slice(0, 3)
  return (
    <div className={styles.viewStack}>
      <Metrics
        items={
          student
            ? [
                {
                  label: "Practice questions",
                  value: base.length,
                  note: "Approved and released",
                },
                {
                  label: "Subjects available",
                  value: new Set(base.map((q) => q.subjectId)).size,
                  note: "Within this academic scope",
                },
                {
                  label: "Syllabus units",
                  value: new Set(base.map((q) => `${q.subjectId}-${q.unit}`))
                    .size,
                  note: "Explore at your own pace",
                },
                {
                  label: "Bloom levels",
                  value: new Set(base.map((q) => q.bloom)).size,
                  note: "Recall through creation",
                },
              ]
            : [
                {
                  label: "Total questions",
                  value: base.length,
                  note: "In selected academic scope",
                },
                {
                  label: "Approved",
                  value: base.filter((q) => q.status === "Approved").length,
                  note: "Faculty reviewed",
                },
                {
                  label: "In review",
                  value: base.filter((q) => q.status === "In review").length,
                  note: "Awaiting a faculty decision",
                },
                {
                  label: "Needs revision",
                  value: base.filter((q) => q.status === "Needs revision")
                    .length,
                  note: `${base.filter((q) => q.status === "Draft").length} additional drafts`,
                  color: "pink",
                },
              ]
        }
      />
      {!student && (
        <div className={styles.threeColumns}>
          <Panel title="Questions by marks">
            <BarList
              data={[1, 2, 5, 10, 15].map((n) => ({
                label: `${n} mark${n > 1 ? "s" : ""}`,
                value: base.filter((q) => q.marks === n).length,
              }))}
            />
          </Panel>
          <Panel title="Question types">
            <Donut
              label="Questions"
              data={questionTypes.map((t) => ({
                label: t,
                value: base.filter((q) => q.type === t).length,
              }))}
            />
          </Panel>
          <Panel title="Difficulty level">
            <Donut
              label="Questions"
              data={["Easy", "Medium", "Hard"].map((d) => ({
                label: d,
                value: base.filter((q) => q.difficulty === d).length,
              }))}
            />
          </Panel>
        </div>
      )}
      {student && (
        <Notice tone="green">
          Only institution-approved, released sample content appears here.
          Content coverage does not measure student proficiency.
        </Notice>
      )}
      <Panel
        title={student ? "Published practice questions" : "Question repository"}
        action={
          <div className={styles.actionRow}>
            <Action onClick={exportQuestions}>Export CSV</Action>
            {!student && (
              <Action
                primary
                onClick={() =>
                  demo.showDialog("Add question", <QuestionEditor />)
                }
              >
                + Add question
              </Action>
            )}
          </div>
        }
      >
        <div className={styles.filterRow}>
          {!student && (
            <select
              aria-label="Filter questions by status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              {["Approved", "In review", "Draft", "Needs revision"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          )}
          <select
            aria-label="Filter question type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All question types</option>
            {questionTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            aria-label="Filter difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All difficulties</option>
            {["Easy", "Medium", "Hard"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <select
            aria-label="Filter unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="">All units</option>
            {units.map((u, i) => (
              <option key={u} value={i + 1}>
                Unit {i + 1}
              </option>
            ))}
          </select>
          <button
            className={styles.textAction}
            onClick={() => {
              setStatus("")
              setType("")
              setDifficulty("")
              setUnit("")
              demo.setSearch("")
            }}
          >
            Clear filters
          </button>
        </div>
        <QuestionTable
          key={JSON.stringify([
            demo.scope,
            demo.search,
            status,
            type,
            difficulty,
            unit,
          ])}
          questions={filtered}
          student={student}
        />
      </Panel>
      {!student && (
        <div className={styles.twoColumns}>
          <Panel title="Source & version tracking">
            <Table
              label="Question sources"
              headers={["Source", "Questions", "Version", "Status"]}
              rows={[
                "Faculty contribution",
                "Previous examination · 2024",
                "Demo faculty contribution",
                "Simulated question studio",
              ].map((source) => [
                source,
                base.filter((q) => q.source === source).length,
                "v1.0–v1.2",
                <Pill key="p" tone="blue">
                  Tracked
                </Pill>,
              ])}
            />
          </Panel>
          <Panel
            title="Duplicate review queue"
            note="Illustrative review candidates; similarity scores are sample indicators."
          >
            <Table
              label="Duplicate candidates"
              headers={["Question", "Similarity", "Action"]}
              rows={candidates.map((q, i) => [
                <button
                  key="q"
                  className={styles.questionLink}
                  onClick={() => open(q)}
                >
                  {q.id}
                  <small className={styles.cellSub}>{q.title}</small>
                </button>,
                <Pill key="p" tone="red">
                  {[92, 88, 85][i]}%
                </Pill>,
                <button
                  key="a"
                  className={styles.textAction}
                  onClick={() => {
                    setDuplicates((all) => [...all, q.id])
                    demo.notify(`${q.id} marked as distinct in this preview.`)
                  }}
                >
                  Mark distinct
                </button>,
              ])}
            />
          </Panel>
        </div>
      )}
    </div>
  )
}
export function QuestionStudioView() {
  const demo = useDemo()
  const [generated, setGenerated] = useState<Question[]>([])
  const [saved, setSaved] = useState(false)
  function generate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fields = new FormData(e.currentTarget)
    const subjectId = String(fields.get("subject"))
    const unit = Number(fields.get("unit"))
    const bloom = Number(fields.get("bloom"))
    const count = Number(fields.get("count"))
    const subject = demo.subjects.find((s) => s.id === subjectId)!
    const verbs = [
      "Define",
      "Explain",
      "Apply",
      "Analyze",
      "Evaluate",
      "Design",
    ]
    const result = Array.from(
      { length: count },
      (_, i): Question => ({
        id: `Q-DEMO-${Date.now()}-${i + 1}`,
        title: `${verbs[bloom - 1]} ${units[unit - 1].toLowerCase()} in ${subject.name.toLowerCase()}. ${["Support your answer with a worked example.", "Discuss a practical application and its limitations.", "Include relevant edge cases in your explanation."][i]}`,
        subjectId,
        unit,
        bloom,
        type: String(fields.get("type")),
        marks: Number(fields.get("marks")),
        outcome: String(fields.get("outcome")),
        difficulty: String(fields.get("difficulty")),
        status: "Draft" as QuestionStatus,
        answer:
          "Identify the core concepts, apply them to a worked example, and justify each step. Assess accuracy, reasoning, and clarity against the learning outcome.",
        source: "Simulated question studio",
        version: "v1.0",
        released: false,
      }),
    )
    setGenerated(result)
    setSaved(false)
    demo.notify(
      `${count} sample question draft${count > 1 ? "s" : ""} prepared. Review before adding to the bank.`,
    )
  }
  return (
    <div className={styles.viewStack}>
      <Notice tone="blue">
        Try the question creation workflow. This preview uses preset examples;
        it does not call an AI service.
      </Notice>
      <div className={styles.studioGrid}>
        <Panel title="Configure your questions">
          <form className={styles.form} onSubmit={generate}>
            <label>
              Subject
              <select
                name="subject"
                defaultValue={demo.scope.subject || demo.scopedSubjects[0]?.id}
              >
                {demo.scopedSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.formGrid}>
              <label>
                Unit
                <select name="unit">
                  {units.map((unit, i) => (
                    <option key={unit} value={i + 1}>
                      Unit {i + 1} · {unit}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Course outcome
                <select name="outcome">
                  {units.map((unit, i) => (
                    <option key={unit} value={`CO${i + 1}`}>
                      CO{i + 1} · {unit}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Question type
                <select name="type">
                  {questionTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                Marks
                <select name="marks" defaultValue="5">
                  {[1, 2, 5, 10, 15].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label>
                Bloom’s level
                <select name="bloom" defaultValue="3">
                  {levels.map((level, i) => (
                    <option key={level} value={i + 1}>
                      K{i + 1} · {level}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Difficulty
                <select name="difficulty" defaultValue="Medium">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </label>
              <label>
                Number of questions
                <select name="count">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className={styles.primaryAction}
              disabled={!demo.scopedSubjects.length}
            >
              <RiSparklingLine size={15} /> Generate sample drafts
            </button>
          </form>
        </Panel>
        <Panel
          title="Draft workspace"
          action={
            generated.length ? (
              <Pill tone={saved ? "green" : "amber"}>
                {saved ? "Added to bank" : `${generated.length} to review`}
              </Pill>
            ) : undefined
          }
        >
          {!generated.length ? (
            <div className={styles.studioEmpty}>
              <span>
                <RiSparklingLine size={30} />
              </span>
              <h4>Start with your syllabus.</h4>
              <p>
                Choose the academic context and thinking level. Your sample
                drafts will appear here, ready for faculty review.
              </p>
              <div className={styles.tags}>
                <Pill tone="blue">Syllabus aligned</Pill>
                <Pill tone="green">Faculty controlled</Pill>
              </div>
            </div>
          ) : (
            <div className={styles.panelBody}>
              {generated.map((q, i) => (
                <article className={styles.generatedCard} key={q.id}>
                  <span className={styles.eyebrow}>DRAFT {i + 1}</span>
                  <h5>{q.title}</h5>
                  <div className={styles.tags}>
                    <Pill tone="purple">
                      K{q.bloom} · {levels[q.bloom - 1]}
                    </Pill>
                    <Pill>{q.outcome}</Pill>
                    <Pill tone="blue">
                      {q.marks} marks · {q.type}
                    </Pill>
                  </div>
                  <p>{q.answer}</p>
                </article>
              ))}
              <div className={styles.actionRow}>
                <Action
                  primary
                  disabled={saved}
                  onClick={() => {
                    demo.setQuestions((all) => [...all, ...generated])
                    setSaved(true)
                    demo.notify(
                      "Sample drafts added to the question bank. They are not released to students.",
                    )
                  }}
                >
                  Add drafts to bank
                </Action>
                {saved && (
                  <Action onClick={() => demo.navigate("Question bank")}>
                    Open question bank →
                  </Action>
                )}
              </div>
            </div>
          )}
        </Panel>
      </div>
    </div>
  )
}
