"use client"
import { useState } from "react"
import { useDemo } from "./DemoContext"
import {
  csvDownload,
  levels,
  outcomes,
  percent,
  questionTypes,
  units,
  type Question,
  type DemoReport,
} from "./demo-data"
import {
  Action,
  BarList,
  Donut,
  GrowthChart,
  Metrics,
  Notice,
  Panel,
  Pill,
  Progress,
  styles,
  Table,
} from "./DashboardKit"
import { QuestionTable } from "./QuestionViews"

export function UnitHeatmap({ outcome }: { outcome?: string }) {
  const demo = useDemo()
  const approved = demo.scopedQuestions.filter(
    (q) => q.status === "Approved" && (!outcome || q.outcome === outcome),
  )
  const max = Math.max(
    1,
    ...units.flatMap((_, u) =>
      levels.map(
        (_, k) =>
          approved.filter((q) => q.unit === u + 1 && q.bloom === k + 1).length,
      ),
    ),
  )
  return (
    <div className={styles.heatmapScroll}>
      <table
        className={styles.heatmap}
        aria-label="Approved questions by unit and Bloom level"
      >
        <thead>
          <tr>
            <th scope="col">Unit / topic</th>
            {levels.map((level, i) => (
              <th key={level} scope="col">
                K{i + 1}
                <small>{level}</small>
              </th>
            ))}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, u) => (
            <tr key={unit}>
              <th scope="row">
                Unit {u + 1}
                <small>{unit}</small>
              </th>
              {levels.map((level, k) => {
                const filtered = approved.filter(
                  (q) => q.unit === u + 1 && q.bloom === k + 1,
                )
                return (
                  <td key={level}>
                    <button
                      style={{
                        background: `rgba(8,77,181,${0.04 + (filtered.length / max) * 0.78})`,
                        color:
                          filtered.length / max > 0.55 ? "white" : "#102442",
                      }}
                      aria-label={`Unit ${u + 1}, K${k + 1}: ${filtered.length} approved questions`}
                      onClick={() =>
                        demo.showDialog(
                          `Unit ${u + 1} · K${k + 1} ${level}`,
                          <QuestionTable questions={filtered} />,
                          "Approved sample questions",
                        )
                      }
                    >
                      {filtered.length}
                    </button>
                  </td>
                )
              })}
              <td>
                <strong>
                  {approved.filter((q) => q.unit === u + 1).length}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.heatLegend}>
        <span>Lower coverage</span>
        <i />
        <span>Higher coverage</span>
      </div>
    </div>
  )
}
export function CoverageView() {
  const demo = useDemo()
  const [dimension, setDimension] = useState("Unit / topic")
  const questions = demo.scopedQuestions
  const required = demo.scopedSubjects.length * 30
  const approved = questions.filter((q) => q.status === "Approved")
  const gap = Math.max(0, required - questions.length)
  const dimensions = [
    "Unit / topic",
    "Batch",
    "Degree",
    "Department",
    "Semester",
    "Subject",
    "Marks",
    "Complexity",
    "Type",
    "Outcome",
    "Bloom",
  ]
  const groupKey = (q: Question) => {
    const subject = demo.subjects.find((s) => s.id === q.subjectId)!
    switch (dimension) {
      case "Unit / topic":
        return `Unit ${q.unit} · ${units[q.unit - 1]}`
      case "Batch":
        return subject.batch
      case "Degree":
        return subject.degree
      case "Department":
        return subject.department
      case "Semester":
        return subject.semester
      case "Subject":
        return subject.name
      case "Marks":
        return `${q.marks} marks`
      case "Complexity":
        return q.difficulty
      case "Type":
        return q.type
      case "Outcome":
        return q.outcome || "Unmapped"
      default:
        return `K${q.bloom} · ${levels[q.bloom - 1]}`
    }
  }
  const groups =
    dimension === "Unit / topic"
      ? units.map((unit, i) => `Unit ${i + 1} · ${unit}`)
      : [...new Set(questions.map(groupKey))]
  const rows = groups
    .filter((key) => key.toLowerCase().includes(demo.search.toLowerCase()))
    .map((key) => {
      const group = questions.filter((q) => groupKey(q) === key)
      const target =
        dimension === "Unit / topic"
          ? demo.scopedSubjects.length * 6
          : Math.max(
              group.length,
              Math.ceil(required / Math.max(1, groups.length)),
            )
      const need = Math.max(0, target - group.length)
      const progress = percent(group.length, target)
      return [
        key,
        target,
        group.length,
        group.filter((q) => q.status === "Approved").length,
        group.filter((q) => q.status === "In review").length,
        <span className={styles.gapNumber} key="g">
          {need}
        </span>,
        <Progress
          key="p"
          value={progress}
          tone={progress >= 80 ? "green" : "amber"}
        />,
        <Pill key="s">
          {progress >= 90
            ? "Good"
            : progress >= 70
              ? "Needs review"
              : "High priority"}
        </Pill>,
      ]
    })
  return (
    <div className={styles.viewStack}>
      <Metrics
        items={[
          {
            label: "Required",
            value: required,
            note: "30 questions per sample subject",
          },
          {
            label: "Added",
            value: questions.length,
            note: "All statuses in the bank",
          },
          {
            label: "Approved",
            value: approved.length,
            note: "Reviewed by faculty",
          },
          {
            label: "Need to add",
            value: gap,
            note: "To meet the demo blueprint",
            color: "pink",
          },
        ]}
      />
      <div className={styles.tabs} aria-label="Coverage dimensions">
        {dimensions.map((d) => (
          <button
            key={d}
            aria-pressed={dimension === d}
            onClick={() => setDimension(d)}
          >
            {d}
          </button>
        ))}
      </div>
      <Panel
        title={`Coverage by ${dimension.toLowerCase()}`}
        note="Required counts are illustrative blueprint targets. Added includes draft and review questions."
      >
        <Table
          label="Coverage explorer"
          headers={[
            dimension,
            "Required",
            "Added",
            "Approved",
            "In review",
            "Need to add",
            "Progress",
            "Status",
          ]}
          rows={rows}
        />
      </Panel>
      <div className={styles.twoColumns}>
        <Panel title="Unit vs Bloom’s level">
          <UnitHeatmap />
        </Panel>
        <Panel
          title="Highest-priority units"
          action={
            <button onClick={() => demo.navigate("AI question studio")}>
              Create questions →
            </button>
          }
        >
          <div className={styles.panelBody}>
            {units
              .map((unit, i) => {
                const added = questions.filter((q) => q.unit === i + 1).length
                const required = demo.scopedSubjects.length * 6
                return { unit, i, added, gap: Math.max(0, required - added) }
              })
              .sort((a, b) => b.gap - a.gap)
              .map((row) => (
                <div className={styles.priorityRow} key={row.unit}>
                  <span>
                    <strong>{row.unit}</strong>
                    <small>
                      Unit {row.i + 1} · {row.added} questions available
                    </small>
                  </span>
                  <Pill tone={row.gap ? "amber" : "green"}>
                    {row.gap} to add
                  </Pill>
                </div>
              ))}
          </div>
        </Panel>
      </div>
      <div className={styles.twoColumns}>
        <Panel title="Mark-wise gaps">
          <Table
            label="Marks gaps"
            headers={["Marks", "Required", "Added", "Need to add"]}
            rows={[2, 5, 10, 15].map((mark) => {
              const added = questions.filter((q) => q.marks === mark).length
              const target = Math.ceil(
                required * (mark === 5 || mark === 10 ? 1 / 3 : 1 / 6),
              )
              return [mark, target, added, Math.max(0, target - added)]
            })}
          />
        </Panel>
        <Panel title="Question type gaps">
          <Table
            label="Question type gaps"
            headers={["Type", "Required", "Added", "Need to add"]}
            rows={questionTypes.map((type) => {
              const added = questions.filter((q) => q.type === type).length
              const target = Math.ceil(required / 6)
              return [type, target, added, Math.max(0, target - added)]
            })}
          />
        </Panel>
      </div>
    </div>
  )
}
export function BloomView() {
  const demo = useDemo()
  const all = demo.scopedQuestions
  const approved = all.filter((q) => q.status === "Approved")
  const perLevel = demo.scopedSubjects.length * 5
  const higher = approved.filter((q) => q.bloom >= 4).length
  const gaps = levels.filter(
    (_, i) => approved.filter((q) => q.bloom === i + 1).length < perLevel,
  ).length
  return (
    <div className={styles.viewStack}>
      <Metrics
        items={[
          {
            label: "Levels mapped",
            value: new Set(all.map((q) => q.bloom)).size,
            note: "K1 to K6 · Bloom’s taxonomy",
          },
          {
            label: "Approved coverage",
            value: `${percent(approved.length, perLevel * 6)}%`,
            note: "Of illustrative blueprint target",
          },
          {
            label: "Higher-order questions",
            value: `${percent(higher, approved.length)}%`,
            note: "K4–K6 in approved questions",
          },
          {
            label: "Priority gaps",
            value: gaps,
            note: "Levels below blueprint target",
            color: "pink",
          },
        ]}
      />
      <div className={styles.twoColumns}>
        <Panel
          title="Bloom’s level distribution"
          note="Colored bars: approved · Gray bars: required blueprint target."
        >
          <BarList
            data={levels.map((level, i) => ({
              label: `K${i + 1} · ${level}`,
              value: approved.filter((q) => q.bloom === i + 1).length,
              target: perLevel,
            }))}
          />
        </Panel>
        <Panel title="Lower vs higher-order thinking">
          <Donut
            label="Approved"
            data={[
              { label: "Lower order · K1–K3", value: approved.length - higher },
              { label: "Higher order · K4–K6", value: higher },
            ]}
          />
        </Panel>
      </div>
      <div className={styles.twoColumns}>
        <Panel title="Unit vs Bloom’s level heatmap">
          <UnitHeatmap />
        </Panel>
        <Panel title="Bloom’s coverage table">
          <Table
            label="Bloom coverage"
            headers={[
              "Level",
              "Required",
              "Added",
              "Approved",
              "Approval gap",
              "Status",
            ]}
            pageSize={6}
            rows={levels.map((level, i) => {
              const count = approved.filter((q) => q.bloom === i + 1).length
              return [
                `K${i + 1} · ${level}`,
                perLevel,
                all.filter((q) => q.bloom === i + 1).length,
                count,
                Math.max(0, perLevel - count),
                <Pill key="p">
                  {count >= perLevel
                    ? "Good"
                    : count >= perLevel * 0.75
                      ? "Moderate"
                      : "Gap"}
                </Pill>,
              ]
            })}
          />
        </Panel>
      </div>
      <Panel title="Key insights & recommendations">
        <div className={styles.insightGrid}>
          {[
            {
              title: "Prioritize higher-order thinking",
              body: `${levels.filter((_, i) => i >= 3 && approved.filter((q) => q.bloom === i + 1).length < perLevel).length} higher-order levels are below target. Add and review questions in K4–K6.`,
            },
            {
              title: "Balance unit coverage",
              body: "Use the heatmap to find units with fewer approved questions before assembling a paper.",
            },
            {
              title: "Review tagging consistency",
              body: "Confirm that the requested reasoning matches each question’s Bloom level and outcome.",
            },
          ].map((insight, i) => (
            <article key={insight.title}>
              <span>{i + 1}</span>
              <div>
                <h5>{insight.title}</h5>
                <p>{insight.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  )
}
export function OutcomeView() {
  const demo = useDemo()
  const [selected, setSelected] = useState("CO3")
  const outcome = outcomes.find((o) => o.id === selected)!
  const all = demo.scopedQuestions
  const tagged = all.filter((q) => q.outcome)
  const unmapped = all.filter((q) => !q.outcome)
  const target = demo.scopedSubjects.length * 6
  const exportMapping = () => {
    csvDownload(
      "questra-outcome-mapping.csv",
      ["Question", "Outcome", "Unit", "Bloom"],
      all.map((q) => [q.id, q.outcome || "Unmapped", q.unit, `K${q.bloom}`]),
    )
    demo.notify("Sample outcome mapping exported.")
  }
  return (
    <div className={styles.viewStack}>
      <Metrics
        items={[
          {
            label: "Course outcomes",
            value: 5,
            note: "CO1–CO5 in sample curriculum",
          },
          {
            label: "Tagged questions",
            value: tagged.length,
            note: "Linked to a course outcome",
          },
          {
            label: "Mapping completion",
            value: `${percent(tagged.length, all.length)}%`,
            note: "Within selected scope",
          },
          {
            label: "Untagged questions",
            value: unmapped.length,
            note: "Awaiting outcome assignment",
            color: "pink",
          },
        ]}
      />
      <div className={styles.actionRow}>
        <Action onClick={exportMapping}>Export mapping</Action>
        <Action
          primary
          onClick={() =>
            demo.showDialog(
              "Map questions to outcomes",
              <OutcomeMappingQueue />,
              "Select an outcome to save the mapping immediately",
            )
          }
        >
          + Map questions
        </Action>
      </div>
      <div className={styles.twoColumns}>
        <Panel
          title="CO–unit–Bloom mapping matrix"
          note="Select an outcome to inspect its linked questions."
        >
          <div className={styles.heatmapScroll}>
            <table
              className={styles.heatmap}
              aria-label="Outcome mapping matrix"
            >
              <thead>
                <tr>
                  <th>Outcome</th>
                  {units.map((_, i) => (
                    <th key={i}>Unit {i + 1}</th>
                  ))}
                  {levels.map((_, i) => (
                    <th key={i}>K{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {outcomes.map((o) => (
                  <tr key={o.id}>
                    <th>
                      <button
                        className={styles.textAction}
                        onClick={() => setSelected(o.id)}
                        aria-pressed={selected === o.id}
                      >
                        {o.id}
                        <small>{o.name}</small>
                      </button>
                    </th>
                    {units.map((_, i) => (
                      <td key={`u${i}`} data-selected={selected === o.id}>
                        {
                          all.filter(
                            (q) => q.outcome === o.id && q.unit === i + 1,
                          ).length
                        }
                      </td>
                    ))}
                    {levels.map((_, i) => (
                      <td key={`k${i}`} data-selected={selected === o.id}>
                        {
                          all.filter(
                            (q) => q.outcome === o.id && q.bloom === i + 1,
                          ).length
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Selected outcome">
          <div className={styles.panelBody}>
            <span className={styles.outcomeId}>{outcome.id}</span>
            <h5>{outcome.name}</h5>
            <p>{outcome.statement}</p>
            <div className={styles.tags}>
              <Pill tone="purple">K3 Apply</Pill>
              <Pill tone="purple">K4 Analyze</Pill>
              <Pill tone="blue">Unit {outcome.unit}</Pill>
            </div>
          </div>
          <Table
            label="Linked outcome questions"
            headers={["Question", "Bloom", "Unit"]}
            pageSize={3}
            rows={all
              .filter((q) => q.outcome === selected)
              .map((q) => [q.title, `K${q.bloom}`, q.unit])}
          />
        </Panel>
      </div>
      <Panel title="Course outcomes mapping status">
        <Table
          label="Outcome readiness"
          headers={[
            "Outcome",
            "Learning statement",
            "Required",
            "Added",
            "Approved",
            "Need to add",
            "Readiness",
          ]}
          rows={outcomes.map((o) => {
            const group = all.filter((q) => q.outcome === o.id)
            return [
              `${o.id} · ${o.name}`,
              o.statement,
              target,
              group.length,
              group.filter((q) => q.status === "Approved").length,
              Math.max(0, target - group.length),
              <Progress
                key="p"
                value={percent(group.length, target)}
                tone="green"
              />,
            ]
          })}
        />
      </Panel>
      <div className={styles.twoColumns}>
        <Panel title="Unmapped questions review queue">
          <OutcomeMappingQueue />
        </Panel>
        <Panel
          title="Course outcome → programme outcome"
          note="Illustrative configured relationships: 3 High · 2 Moderate · 1 Low · — Not mapped."
        >
          <Table
            label="Course to programme outcome mapping"
            headers={["Outcome", "PO1", "PO2", "PO3", "PO4", "PO5", "PO12"]}
            rows={outcomes.map((o, i) => [
              o.id,
              ...[3, 2, 1, 0, 1, 0].map((n, j) => (
                <span key={j} className={styles.mappingValue}>
                  {(n + i) % 4 || "—"}
                </span>
              )),
            ])}
          />
        </Panel>
      </div>
    </div>
  )
}
function OutcomeMappingQueue() {
  const demo = useDemo()
  return (
    <Table
      label="Unmapped questions"
      headers={["Question", "Suggested unit", "Assign outcome"]}
      rows={demo.scopedQuestions
        .filter((q) => !q.outcome)
        .map((q) => [
          <span key="q">
            {q.id}
            <small className={styles.cellSub}>{q.title}</small>
          </span>,
          `Unit ${q.unit}`,
          <select
            key="s"
            aria-label={`Assign outcome for ${q.id}`}
            defaultValue=""
            onChange={(e) => {
              if (!e.target.value) return
              demo.setQuestions((all) =>
                all.map((item) =>
                  item.id === q.id
                    ? { ...item, outcome: e.target.value }
                    : item,
                ),
              )
              demo.notify(`${q.id} mapped to ${e.target.value}.`)
            }}
          >
            <option value="">Select CO</option>
            {outcomes.map((o) => (
              <option key={o.id}>{o.id}</option>
            ))}
          </select>,
        ])}
      empty="All sample questions have an outcome mapping."
    />
  )
}
type Report = DemoReport
export function ReportsView() {
  const demo = useDemo()
  const history = demo.reportHistory
  const setHistory = demo.setReportHistory
  const [period, setPeriod] = useState("Last 6 months")
  const subjects = demo.scopedSubjects
  const questions = demo.scopedQuestions
  const reports: Report[] = [
    {
      name: "Question bank coverage",
      subtitle: "Syllabus and unit-wise content readiness",
      headers: ["Subject", "Required", "Added", "Approved", "Gap"],
      rows: subjects.map((s) => {
        const group = questions.filter((q) => q.subjectId === s.id)
        return [
          s.name,
          30,
          group.length,
          group.filter((q) => q.status === "Approved").length,
          Math.max(0, 30 - group.length),
        ]
      }),
    },
    {
      name: "Bloom distribution",
      subtitle: "Question coverage across six thinking levels",
      headers: ["Level", "Added", "Approved"],
      rows: levels.map((level, i) => [
        `K${i + 1} ${level}`,
        questions.filter((q) => q.bloom === i + 1).length,
        questions.filter((q) => q.bloom === i + 1 && q.status === "Approved")
          .length,
      ]),
    },
    {
      name: "Outcome mapping",
      subtitle: "Course outcome links and mapping gaps",
      headers: ["Outcome", "Questions", "Approved"],
      rows: outcomes.map((o) => [
        o.id,
        questions.filter((q) => q.outcome === o.id).length,
        questions.filter((q) => q.outcome === o.id && q.status === "Approved")
          .length,
      ]),
    },
    {
      name: "Blueprint compliance",
      subtitle: "Required counts and paper readiness",
      headers: ["Paper", "Status", "Questions", "Marks"],
      rows: demo.scopedPapers.map((p) => [
        p.title,
        p.status,
        p.questions.length,
        p.questions.reduce(
          (sum, id) => sum + (questions.find((q) => q.id === id)?.marks || 0),
          0,
        ),
      ]),
    },
    {
      name: "Duplicate analysis",
      subtitle: "Sample question review indicators",
      headers: ["Question", "Title", "Review indicator"],
      rows: questions
        .slice(0, 3)
        .map((q) => [
          q.id,
          q.title,
          "Illustrative candidate · requires review",
        ]),
    },
    {
      name: "Paper set equivalence",
      subtitle: "Compare sample paper sets and marks",
      headers: ["Paper", "Set", "Questions", "Marks"],
      rows: demo.scopedPapers.map((p) => [
        p.id,
        p.set,
        p.questions.length,
        p.questions.reduce(
          (sum, id) => sum + (questions.find((q) => q.id === id)?.marks || 0),
          0,
        ),
      ]),
    },
    {
      name: "Review turnaround",
      subtitle: "Review stages and pending decisions",
      headers: ["Paper", "Reviewer", "Stage", "Audit events"],
      rows: demo.scopedPapers.map((p) => [
        p.title,
        p.reviewer,
        p.status,
        p.history.length,
      ]),
    },
    {
      name: "Audit trail",
      subtitle: "Sample paper workflow and changes",
      headers: ["Paper", "Event"],
      rows: demo.scopedPapers.flatMap((p) =>
        p.history.map((event) => [p.id, event]),
      ),
    },
  ]
  const download = (report: Report) => {
    csvDownload(
      `questra-${report.name.toLowerCase().replaceAll(" ", "-")}.csv`,
      report.headers,
      report.rows,
    )
    setHistory((all) => [
      {
        report,
        at: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...all,
    ])
    demo.notify(
      `${report.name} exported with ${report.rows.length} sample rows.`,
    )
  }
  return (
    <div className={styles.viewStack}>
      <div className={styles.actionRow}>
        <label className={styles.inlineLabel}>
          Report period
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option>Last 6 months</option>
            <option>Last 30 days</option>
          </select>
        </label>
        <Action primary onClick={() => download(reports[0])}>
          Download coverage report
        </Action>
      </div>
      <Metrics
        items={[
          {
            label: "Active batches",
            value: new Set(subjects.map((s) => s.batch)).size,
            note: "Within selected scope",
          },
          {
            label: "Degrees",
            value: new Set(subjects.map((s) => s.degree)).size,
            note: "Academic programmes",
          },
          {
            label: "Departments",
            value: new Set(subjects.map((s) => s.department)).size,
            note: "Represented in sample records",
          },
          {
            label: "Generated papers",
            value: demo.scopedPapers.filter((p) => p.status !== "Draft").length,
            note: "Across selected subjects",
          },
        ]}
      />
      <div className={styles.twoColumns}>
        <GrowthChart
          key={period}
          total={
            period === "Last 6 months"
              ? questions.length
              : Math.round(questions.length * 0.3)
          }
          dual
        />
        <Panel title="Department readiness">
          <BarList
            max={100}
            data={[...new Set(subjects.map((s) => s.department))].map(
              (dept) => {
                const group = subjects.filter((s) => s.department === dept)
                return {
                  label: dept,
                  value: percent(
                    group.filter(
                      (s) =>
                        s.pdf &&
                        demo.staff.some((st) => st.subjects.includes(s.id)),
                    ).length,
                    group.length,
                  ),
                  target: 100,
                }
              },
            )}
          />
          <div className={styles.panelBody}>
            <Notice
              tone="amber"
              action={
                <button onClick={() => demo.navigate("Review & approval")}>
                  Review →
                </button>
              }
            >
              {
                demo.scopedPapers.filter((p) =>
                  /review|approval/.test(p.status),
                ).length
              }{" "}
              papers await review or approval
            </Notice>
            <Notice
              tone="blue"
              action={
                <button onClick={() => demo.navigate("Outcome mapping")}>
                  Map →
                </button>
              }
            >
              {questions.filter((q) => !q.outcome).length} questions have no
              outcome mapping
            </Notice>
          </div>
        </Panel>
      </div>
      <Panel
        title="Report library"
        note={`${period} · Reports contain illustrative records from the current academic selection.`}
      >
        <div className={styles.reportGrid}>
          {reports
            .filter((r) =>
              `${r.name} ${r.subtitle}`
                .toLowerCase()
                .includes(demo.search.toLowerCase()),
            )
            .map((report, i) => (
              <article key={report.name}>
                <span
                  className={styles.reportIcon}
                  data-color={i % 2 ? "green" : "blue"}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h5>{report.name}</h5>
                <p>{report.subtitle}</p>
                <div className={styles.actionRow}>
                  <Action
                    onClick={() =>
                      demo.showDialog(
                        report.name,
                        <Table
                          label={report.name}
                          headers={report.headers}
                          rows={report.rows}
                        />,
                        "Current academic scope · sample data",
                      )
                    }
                  >
                    View
                  </Action>
                  <Action primary onClick={() => download(report)}>
                    Export CSV
                  </Action>
                </div>
              </article>
            ))}
        </div>
      </Panel>
      <Panel title="Generated report history">
        <Table
          label="Generated report history"
          headers={["Report", "Generated", "Format", "Status", "Download"]}
          rows={history.map((row) => [
            row.report.name,
            `Today · ${row.at}`,
            "CSV",
            <Pill key="p">Complete</Pill>,
            <button
              key="d"
              className={styles.textAction}
              onClick={() => {
                csvDownload(
                  `questra-report.csv`,
                  row.report.headers,
                  row.report.rows,
                )
                demo.notify("Sample report downloaded again.")
              }}
            >
              Download ↓
            </button>,
          ])}
          empty="Export a report above to start your sample report history."
        />
      </Panel>
    </div>
  )
}
