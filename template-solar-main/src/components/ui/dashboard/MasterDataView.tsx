"use client"
import { useState, type FormEvent } from "react"
import {
  RiArrowRightLine,
  RiBookOpenLine,
  RiFileTextLine,
  RiUserLine,
} from "@remixicon/react"
import { useDemo } from "./DemoContext"
import {
  batches,
  degrees,
  percent,
  units,
  type Staff,
  type Student,
  type Subject,
} from "./demo-data"
import {
  Action,
  BarList,
  Check,
  Donut,
  Metrics,
  Notice,
  Panel,
  Pill,
  Progress,
  styles,
  Table,
} from "./DashboardKit"

const tabs = [
  "Summary",
  "Batches",
  "Degrees",
  "Departments",
  "Subjects",
  "Syllabus PDFs",
  "Students",
  "Staff mapping",
]
function MappingEditor({ staff }: { staff: Staff }) {
  const demo = useDemo()
  const [selected, setSelected] = useState(staff.subjects)
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        demo.setStaff((all) =>
          all.map((s) =>
            s.id === staff.id ? { ...s, subjects: selected } : s,
          ),
        )
        demo.closeDialog()
        demo.notify(`Subject mapping saved for ${staff.name}.`)
      }}
    >
      <p>
        One staff member can teach multiple subjects. A subject can have
        multiple staff.
      </p>
      <fieldset className={styles.checkboxList}>
        <legend>Assign subjects</legend>
        {demo.subjects.map((subject) => (
          <label key={subject.id}>
            <input
              type="checkbox"
              checked={selected.includes(subject.id)}
              onChange={(e) =>
                setSelected(
                  e.target.checked
                    ? [...selected, subject.id]
                    : selected.filter((id) => id !== subject.id),
                )
              }
            />
            <span>
              {subject.name}
              <small>
                {subject.id} · {subject.department}
              </small>
            </span>
          </label>
        ))}
      </fieldset>
      <button className={styles.primaryAction} type="submit">
        Save mapping
      </button>
    </form>
  )
}
function StudentEditor({ student }: { student: Student }) {
  const demo = useDemo()
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        demo.setStudents((all) =>
          all.map((s) =>
            s.id === student.id
              ? { ...s, email: String(data.get("email")), complete: true }
              : s,
          ),
        )
        demo.closeDialog()
        demo.notify("Student profile updated in this demo.")
      }}
    >
      <label>
        Student name
        <input value={student.name} readOnly />
      </label>
      <label>
        Email address
        <input
          name="email"
          type="email"
          defaultValue={student.email}
          placeholder="student@example.com"
          required
        />
      </label>
      <button type="submit" className={styles.primaryAction}>
        Save profile
      </button>
    </form>
  )
}
function AddRecord({ kind }: { kind: "subject" | "student" | "staff" }) {
  const demo = useDemo()
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fields = new FormData(e.currentTarget)
    const name = String(fields.get("name")).trim()
    if (!name) return
    const id = `DEMO-${Date.now()}`
    if (kind === "subject")
      demo.setSubjects((all) => [
        ...all,
        {
          id,
          name,
          batch: "2025–2029",
          degree: "B.E.",
          department: String(fields.get("department")),
          semester: "IV",
          pdf: false,
          version: "—",
          credits: 4,
        },
      ])
    if (kind === "student")
      demo.setStudents((all) => [
        ...all,
        {
          id,
          name,
          batch: "2025–2029",
          degree: "B.E.",
          department: String(fields.get("department")),
          semester: "IV",
          email: String(fields.get("email")),
          complete: Boolean(fields.get("email")),
          duplicate: false,
        },
      ])
    if (kind === "staff")
      demo.setStaff((all) => [
        ...all,
        {
          id,
          name,
          department: String(fields.get("department")),
          role: "Assistant Professor",
          subjects: [],
        },
      ])
    demo.closeDialog()
    demo.notify(`${name} added to the sample ${kind} register.`)
  }
  return (
    <form className={styles.form} onSubmit={save}>
      <label>
        {kind === "subject" ? "Subject name" : "Full name"}
        <input
          name="name"
          required
          maxLength={100}
          placeholder={
            kind === "subject"
              ? "e.g. Artificial Intelligence"
              : "e.g. Dr. Kavya Iyer"
          }
        />
      </label>
      <label>
        Department
        <select name="department">
          <option>Computer Science</option>
          <option>Information Technology</option>
          <option>Electronics</option>
        </select>
      </label>
      {kind === "student" && (
        <label>
          Email address
          <input name="email" type="email" placeholder="student@example.com" />
        </label>
      )}
      <p>
        New demo records use B.E. · 2025–2029 · Semester IV where applicable.
        Clear academic filters to see all records.
      </p>
      <button type="submit" className={styles.primaryAction}>
        Add {kind}
      </button>
    </form>
  )
}
export default function MasterDataView() {
  const demo = useDemo()
  const [tab, setTab] = useState("Summary")
  const [selectedSubject, setSelectedSubject] = useState("CS401")
  const [selectedBatch, setSelectedBatch] = useState(batches[2])
  const [selectedDegree, setSelectedDegree] = useState("B.E.")
  const subjects = demo.scopedSubjects.filter((s) =>
    `${s.name} ${s.id} ${s.department}`
      .toLowerCase()
      .includes(demo.search.toLowerCase()),
  )
  const students = demo.students.filter(
    (s) =>
      (!demo.scope.batch || s.batch === demo.scope.batch) &&
      (!demo.scope.degree || s.degree === demo.scope.degree) &&
      (!demo.scope.department || s.department === demo.scope.department) &&
      (!demo.scope.semester || s.semester === demo.scope.semester) &&
      `${s.name} ${s.id} ${s.email}`
        .toLowerCase()
        .includes(demo.search.toLowerCase()),
  )
  const staff = demo.staff.filter(
    (s) =>
      (!demo.scope.department || s.department === demo.scope.department) &&
      (!demo.scope.subject || s.subjects.includes(demo.scope.subject)) &&
      `${s.name} ${s.department} ${s.subjects.map((id) => demo.subjects.find((subject) => subject.id === id)?.name).join(" ")}`
        .toLowerCase()
        .includes(demo.search.toLowerCase()),
  )
  const missing = subjects.filter((s) => !s.pdf).length
  const assigned = subjects.filter((s) =>
    demo.staff.some((staff) => staff.subjects.includes(s.id)),
  ).length
  const readiness = percent(
    subjects.filter(
      (s) => s.pdf && demo.staff.some((staff) => staff.subjects.includes(s.id)),
    ).length,
    subjects.length,
  )
  const activeSubject =
    subjects.find((s) => s.id === selectedSubject) || subjects[0]
  const openSubject = (subject: Subject) => {
    setSelectedSubject(subject.id)
    setTab("Subjects")
  }
  const mapStaff = (staff: Staff) =>
    demo.showDialog(
      `Map subjects · ${staff.name}`,
      <MappingEditor staff={staff} />,
      "Temporary sample workspace",
    )
  const syllabus = (subject: Subject) => (
    <div className={styles.document}>
      <div className={styles.documentMeta}>
        {subject.degree} · {subject.department} · Semester {subject.semester}
      </div>
      <h4>{subject.name}</h4>
      <p>Sample syllabus · {subject.version}</p>
      {units.map((unit, i) => (
        <section key={unit}>
          <h5>
            Unit {i + 1} — {unit}
          </h5>
          <p>
            Core concepts, applications, worked examples, and analysis. Learning
            activities connect theory with practical problem solving.
          </p>
        </section>
      ))}
    </div>
  )
  const openSyllabus = (subject: Subject) =>
    demo.showDialog(
      `${subject.name} · Syllabus preview`,
      syllabus(subject),
      "Illustrative document preview · no uploaded PDF",
    )
  const subjectTable = (
    <Table
      label="Subject register"
      headers={[
        "Subject",
        "Units",
        "Syllabus",
        "Version",
        "Staff",
        "Status",
        "Action",
      ]}
      rows={subjects.map((s) => [
        <strong key="name">
          {s.name}
          <small className={styles.cellSub}>{s.id}</small>
        </strong>,
        5,
        s.pdf ? (
          <button key="syllabus" className={styles.textAction} onClick={() => openSyllabus(s)}>
            View syllabus
          </button>
        ) : (
          <Pill key="syllabus">Missing</Pill>
        ),
        s.version,
        demo.staff.filter((st) => st.subjects.includes(s.id)).length,
        <Pill key="status">{s.pdf ? "Verified" : "Incomplete"}</Pill>,
        <button key="details" className={styles.textAction} onClick={() => openSubject(s)}>
          View details
        </button>,
      ])}
    />
  )
  const nameList = (ids: string[]) => (
    <div className={styles.tags}>
      {ids.length
        ? ids.map((id) => (
            <Pill key={id} tone="blue">
              {demo.subjects.find((s) => s.id === id)?.name || id}
            </Pill>
          ))
        : "—"}
    </div>
  )
  const studentProfile = (student: Student) =>
    demo.showDialog(
      student.name,
      <div className={styles.profileDetails}>
        <span className={styles.largeAvatar}>
          {student.name
            .split(" ")
            .map((s) => s[0])
            .slice(0, 2)
            .join("")}
        </span>
        <Pill>{student.complete ? "Complete" : "Incomplete"}</Pill>
        <dl>
          <dt>Registration</dt>
          <dd>{student.id}</dd>
          <dt>Programme</dt>
          <dd>
            {student.degree} · {student.department}
          </dd>
          <dt>Batch / semester</dt>
          <dd>
            {student.batch} · {student.semester}
          </dd>
          <dt>Email</dt>
          <dd>{student.email || "Missing"}</dd>
        </dl>
        <h4>Profile completeness</h4>
        <Progress value={student.complete ? 100 : 75} tone="green" />
        <Action
          onClick={() =>
            demo.showDialog(
              `Edit profile · ${student.name}`,
              <StudentEditor student={student} />,
            )
          }
        >
          Edit profile
        </Action>
      </div>,
      "Illustrative student · sample contact information",
    )
  return (
    <div className={styles.viewStack}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Master data sections"
      >
        {tabs.map((name) => (
          <button
            key={name}
            id={`master-tab-${name.replaceAll(" ", "-")}`}
            role="tab"
            aria-selected={tab === name}
            aria-controls="master-tabpanel"
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        id="master-tabpanel"
        role="tabpanel"
        aria-labelledby={`master-tab-${tab.replaceAll(" ", "-")}`}
        className={styles.viewStack}
      >
        <Metrics
          items={
            tab === "Students"
              ? [
                  {
                    label: "Student records",
                    value: students.length,
                    note: "Across selected batches",
                  },
                  {
                    label: "Complete profiles",
                    value: students.filter((s) => s.complete).length,
                    note: "Required details available",
                  },
                  {
                    label: "Incomplete profiles",
                    value: students.filter((s) => !s.complete).length,
                    note: "Missing contact information",
                    color: "orange",
                  },
                  {
                    label: "Duplicate candidates",
                    value: students.filter((s) => s.duplicate).length,
                    note: "Pending human review",
                    color: "pink",
                  },
                ]
              : tab === "Staff mapping"
                ? [
                    {
                      label: "Total staff",
                      value: staff.length,
                      note: "In sample directory",
                    },
                    {
                      label: "Mapped staff",
                      value: staff.filter((s) => s.subjects.length).length,
                      note: "At least one subject",
                    },
                    {
                      label: "Unmapped staff",
                      value: staff.filter((s) => !s.subjects.length).length,
                      note: "Available for assignment",
                      color: "orange",
                    },
                    {
                      label: "Subjects assigned",
                      value: `${assigned}/${subjects.length}`,
                      note: "Across this selection",
                    },
                  ]
                : [
                    {
                      label: "Active batches",
                      value: batches.length,
                      note: "2023–2027 to 2026–2030",
                    },
                    {
                      label: "Subject offerings",
                      value: subjects.length,
                      note: "In selected academic scope",
                    },
                    {
                      label: "Syllabus documents",
                      value: subjects.filter((s) => s.pdf).length,
                      note: `${missing} missing documents`,
                    },
                    {
                      label: "Master readiness",
                      value: `${readiness}%`,
                      note: "Syllabus + staff mapped",
                      color: "green",
                    },
                  ]
          }
        />
        {tab === "Summary" && (
          <>
            <Notice
              action={
                <button onClick={() => setTab("Subjects")}>
                  Resolve gaps <RiArrowRightLine size={13} />
                </button>
              }
            >
              {missing} syllabus documents missing ·{" "}
              {subjects.length - assigned} subjects without staff ·{" "}
              {students.filter((s) => !s.complete).length} incomplete student
              profiles
            </Notice>
            <div className={styles.twoColumns}>
              <Panel
                title="Batch-wise master readiness"
                action={
                  <button onClick={() => setTab("Batches")}>
                    View batches →
                  </button>
                }
              >
                <Table
                  label="Batch readiness"
                  headers={[
                    "Batch",
                    "Students",
                    "Syllabus",
                    "Staff mapped",
                    "Readiness",
                  ]}
                  rows={batches.map((batch) => {
                    const group = subjects.filter((s) => s.batch === batch)
                    return [
                      batch,
                      students.filter((s) => s.batch === batch).length,
                      `${group.filter((s) => s.pdf).length} / ${group.length}`,
                      `${group.filter((s) => demo.staff.some((st) => st.subjects.includes(s.id))).length} / ${group.length}`,
                      <Progress
                        key="p"
                        value={percent(
                          group.filter(
                            (s) =>
                              s.pdf &&
                              demo.staff.some((st) =>
                                st.subjects.includes(s.id),
                              ),
                          ).length,
                          group.length,
                        )}
                        tone="green"
                      />,
                    ]
                  })}
                />
              </Panel>
              <Panel
                title="Degree & department status"
                action={
                  <button onClick={() => setTab("Departments")}>
                    View departments →
                  </button>
                }
              >
                <Table
                  label="Department status"
                  headers={[
                    "Department",
                    "Subjects",
                    "Missing data",
                    "Readiness",
                  ]}
                  rows={[...new Set(subjects.map((s) => s.department))].map(
                    (dept) => {
                      const group = subjects.filter(
                        (s) => s.department === dept,
                      )
                      const good = group.filter(
                        (s) =>
                          s.pdf &&
                          demo.staff.some((st) => st.subjects.includes(s.id)),
                      ).length
                      return [
                        dept,
                        group.length,
                        group.length - good,
                        <Progress
                          key="p"
                          value={percent(good, group.length)}
                          tone="green"
                        />,
                      ]
                    },
                  )}
                />
              </Panel>
            </div>
            <div className={styles.twoColumns}>
              <Panel
                title="Subject & syllabus register"
                action={
                  <button onClick={() => setTab("Syllabus PDFs")}>
                    Syllabus library →
                  </button>
                }
              >
                {subjectTable}
              </Panel>
              <Panel
                title="Staff → multiple subject mapping"
                action={
                  <button onClick={() => setTab("Staff mapping")}>
                    Assign staff →
                  </button>
                }
              >
                <Table
                  label="Staff subject summary"
                  headers={["Staff", "Subjects", "Status"]}
                  rows={staff.map((s) => [
                    s.name,
                    nameList(s.subjects),
                    <Pill key="p">
                      {s.subjects.length ? "Mapped" : "Unmapped"}
                    </Pill>,
                  ])}
                />
              </Panel>
            </div>
            <Panel
              title="Student data quality"
              action={
                <button onClick={() => setTab("Students")}>
                  Review students →
                </button>
              }
            >
              <BarList
                data={batches.map((batch) => {
                  const group = students.filter((s) => s.batch === batch)
                  return {
                    label: batch,
                    value: group.filter((s) => s.complete).length,
                    target: group.length,
                  }
                })}
              />
            </Panel>
          </>
        )}
        {tab === "Batches" && (
          <>
            <Panel title="Batch register">
              <Table
                label="Batch register"
                headers={[
                  "Batch",
                  "Degrees",
                  "Students",
                  "Subjects",
                  "Syllabus coverage",
                  "Readiness",
                  "Action",
                ]}
                rows={batches
                  .filter((b) => !demo.scope.batch || b === demo.scope.batch)
                  .map((batch) => {
                    const group = subjects.filter((s) => s.batch === batch)
                    return [
                      batch,
                      new Set(group.map((s) => s.degree)).size,
                      students.filter((s) => s.batch === batch).length,
                      group.length,
                      <Progress
                        key="p"
                        value={percent(
                          group.filter((s) => s.pdf).length,
                          group.length,
                        )}
                      />,
                      <Pill key="r">
                        {group.every((s) => s.pdf) && group.length
                          ? "Good"
                          : "Needs review"}
                      </Pill>,
                      <button
                        key="v"
                        className={styles.textAction}
                        onClick={() => setSelectedBatch(batch)}
                      >
                        View
                      </button>,
                    ]
                  })}
              />
            </Panel>
            <div className={styles.twoColumns}>
              <Panel title={`Selected batch · ${selectedBatch}`}>
                <div className={styles.detailGrid}>
                  <span>
                    Admission year<strong>{selectedBatch.slice(0, 4)}</strong>
                  </span>
                  <span>
                    Expected graduation
                    <strong>{selectedBatch.slice(-4)}</strong>
                  </span>
                  <span>
                    Active semesters<strong>I–VIII</strong>
                  </span>
                  <span>
                    Status
                    <strong>
                      <Pill>Active</Pill>
                    </strong>
                  </span>
                </div>
                <Donut
                  label="Students"
                  data={degrees
                    .map((d) => ({
                      label: d.name,
                      value: students.filter(
                        (s) => s.batch === selectedBatch && s.degree === d.name,
                      ).length,
                    }))
                    .filter((d) => d.value)}
                />
              </Panel>
              <Panel title="Missing-data checklist">
                <div className={styles.actionList}>
                  <button onClick={() => setTab("Syllabus PDFs")}>
                    <RiFileTextLine size={19} />
                    <span>
                      Missing syllabus documents
                      <strong>
                        {
                          subjects.filter(
                            (s) => s.batch === selectedBatch && !s.pdf,
                          ).length
                        }
                      </strong>
                    </span>
                    →
                  </button>
                  <button onClick={() => setTab("Staff mapping")}>
                    <RiUserLine size={19} />
                    <span>
                      Unassigned subjects
                      <strong>
                        {
                          subjects.filter(
                            (s) =>
                              s.batch === selectedBatch &&
                              !demo.staff.some((st) =>
                                st.subjects.includes(s.id),
                              ),
                          ).length
                        }
                      </strong>
                    </span>
                    →
                  </button>
                  <button onClick={() => setTab("Students")}>
                    <RiUserLine size={19} />
                    <span>
                      Incomplete profiles
                      <strong>
                        {
                          students.filter(
                            (s) => s.batch === selectedBatch && !s.complete,
                          ).length
                        }
                      </strong>
                    </span>
                    →
                  </button>
                </div>
              </Panel>
            </div>
          </>
        )}
        {tab === "Degrees" && (
          <>
            <Panel title="Degree register">
              <Table
                label="Degree register"
                headers={[
                  "Degree",
                  "Level",
                  "Duration",
                  "Departments",
                  "Students",
                  "Status",
                  "Action",
                ]}
                rows={degrees
                  .filter(
                    (d) =>
                      (!demo.scope.degree || d.name === demo.scope.degree) &&
                      `${d.name} ${d.level}`
                        .toLowerCase()
                        .includes(demo.search.toLowerCase()),
                  )
                  .map((d) => [
                    <strong key="n">{d.name}</strong>,
                    d.level,
                    `${d.duration} years`,
                    d.departments.length,
                    students.filter((s) => s.degree === d.name).length,
                    <Pill key="p">Active</Pill>,
                    <button
                      key="a"
                      className={styles.textAction}
                      onClick={() => setSelectedDegree(d.name)}
                    >
                      View
                    </button>,
                  ])}
              />
            </Panel>
            <div className={styles.twoColumns}>
              <Panel title={`Degree details · ${selectedDegree}`}>
                <div className={styles.detailGrid}>
                  <span>
                    Level
                    <strong>
                      {degrees.find((d) => d.name === selectedDegree)?.level}
                    </strong>
                  </span>
                  <span>
                    Duration
                    <strong>
                      {degrees.find((d) => d.name === selectedDegree)?.duration}{" "}
                      years
                    </strong>
                  </span>
                  <span>
                    Regulations<strong>2023 curriculum</strong>
                  </span>
                  <span>
                    Approval
                    <strong>
                      <Pill>Verified</Pill>
                    </strong>
                  </span>
                </div>
                <div className={styles.panelBody}>
                  <h5>Department linkage</h5>
                  <div className={styles.tags}>
                    {degrees
                      .find((d) => d.name === selectedDegree)
                      ?.departments.map((d) => (
                        <Pill key={d}>{d}</Pill>
                      ))}
                  </div>
                </div>
              </Panel>
              <Panel title="Data completeness">
                <div className={styles.checklist}>
                  {[
                    "Programme duration",
                    "Semester structure",
                    "Department linkage",
                    "Regulation verification",
                    "Student linkage",
                  ].map((item) => (
                    <div key={item}>
                      <span>{item}</span>
                      <Check>Complete</Check>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </>
        )}
        {tab === "Departments" && (
          <Panel title="Department register">
            <Table
              label="Department register"
              headers={[
                "Degree",
                "Department",
                "Subjects",
                "Staff",
                "Students",
                "Status",
              ]}
              rows={degrees.flatMap((d) =>
                d.departments
                  .filter(
                    (dept) =>
                      (!demo.scope.department ||
                        dept === demo.scope.department) &&
                      (!demo.scope.degree || d.name === demo.scope.degree) &&
                      dept.toLowerCase().includes(demo.search.toLowerCase()),
                  )
                  .map((dept) => [
                    d.name,
                    dept,
                    subjects.filter((s) => s.department === dept).length,
                    staff.filter((s) => s.department === dept).length,
                    students.filter((s) => s.department === dept).length,
                    <Pill key="p">Active</Pill>,
                  ]),
              )}
            />
          </Panel>
        )}
        {tab === "Subjects" && (
          <>
            <Panel
              title="Subject register"
              action={
                <Action
                  primary
                  onClick={() =>
                    demo.showDialog("Add subject", <AddRecord kind="subject" />)
                  }
                >
                  + Add subject
                </Action>
              }
            >
              {subjectTable}
            </Panel>
            {activeSubject && (
              <Panel title={activeSubject.name}>
                <div className={styles.detailGrid}>
                  <span>
                    Programme
                    <strong>
                      {activeSubject.degree} · {activeSubject.department}
                    </strong>
                  </span>
                  <span>
                    Semester<strong>{activeSubject.semester}</strong>
                  </span>
                  <span>
                    Credits<strong>{activeSubject.credits}</strong>
                  </span>
                  <span>
                    Structure<strong>5 units · 25 topics</strong>
                  </span>
                </div>
                <div className={styles.twoColumns}>
                  <Table
                    label="Unit and topic structure"
                    headers={["Unit", "Title", "Topics", "Question readiness"]}
                    rows={units.map((unit, i) => [
                      i + 1,
                      unit,
                      5,
                      <Progress
                        key="p"
                        value={percent(
                          demo.questions.filter(
                            (q) =>
                              q.subjectId === activeSubject.id &&
                              q.unit === i + 1 &&
                              q.status === "Approved",
                          ).length,
                          6,
                        )}
                        tone="green"
                      />,
                    ])}
                  />
                  <div className={styles.panelBody}>
                    <h5>Mapped staff</h5>
                    {demo.staff
                      .filter((s) => s.subjects.includes(activeSubject.id))
                      .map((s) => (
                        <button
                          key={s.id}
                          className={styles.personRow}
                          onClick={() => mapStaff(s)}
                        >
                          <span className={styles.miniAvatar}>
                            {s.name
                              .split(" ")
                              .slice(-2)
                              .map((n) => n[0])
                              .join("")}
                          </span>
                          <span>
                            {s.name}
                            <small>{s.role}</small>
                          </span>
                          →
                        </button>
                      ))}
                    {!demo.staff.some((s) =>
                      s.subjects.includes(activeSubject.id),
                    ) && (
                      <p>
                        No staff assigned. Open Staff mapping to assign a
                        faculty member.
                      </p>
                    )}
                  </div>
                </div>
              </Panel>
            )}
          </>
        )}
        {tab === "Syllabus PDFs" && (
          <>
            <Notice tone="blue">
              Document previews below are illustrative syllabus content. Actual
              file uploads are outside this demo.
            </Notice>
            <div className={styles.twoColumns}>
              <Panel title="Syllabus register">
                <Table
                  label="Syllabus register"
                  headers={[
                    "Subject",
                    "Batch",
                    "Version",
                    "Approval",
                    "Preview",
                  ]}
                  rows={subjects.map((s) => [
                    s.name,
                    s.batch,
                    s.version,
                    <Pill key="p">{s.pdf ? "Verified" : "Missing"}</Pill>,
                    s.pdf ? (
                      <button
                        key="v"
                        className={styles.textAction}
                        onClick={() => setSelectedSubject(s.id)}
                      >
                        View
                      </button>
                    ) : (
                      "—"
                    ),
                  ])}
                />
              </Panel>
              <Panel title="Syllabus preview">
                {activeSubject?.pdf ? (
                  syllabus(activeSubject)
                ) : (
                  <p className={styles.empty}>
                    Select a subject with a syllabus document to preview it.
                  </p>
                )}
              </Panel>
            </div>
            {activeSubject?.pdf && (
              <div className={styles.twoColumns}>
                <Panel title="Version history">
                  <Table
                    label="Syllabus version history"
                    headers={["Version", "Updated", "Status"]}
                    rows={[
                      [
                        activeSubject.version,
                        "23 Oct 2026",
                        <Pill key="p">Current · Verified</Pill>,
                      ],
                      [
                        "v1.0",
                        "15 Jan 2026",
                        <Pill key="p" tone="neutral">
                          Archived
                        </Pill>,
                      ],
                    ]}
                  />
                </Panel>
                <Panel title="Unit extraction status">
                  <div className={styles.detailGrid}>
                    <span>
                      <RiBookOpenLine size={18} /> Units<strong>5</strong>
                    </span>
                    <span>
                      Topics<strong>25</strong>
                    </span>
                    <span>
                      Outcomes<strong>5</strong>
                    </span>
                    <span>
                      Review
                      <strong>
                        <Pill>Verified</Pill>
                      </strong>
                    </span>
                  </div>
                </Panel>
              </div>
            )}
          </>
        )}
        {tab === "Students" && (
          <>
            <Panel
              title="Student register"
              action={
                <Action
                  primary
                  onClick={() =>
                    demo.showDialog("Add student", <AddRecord kind="student" />)
                  }
                >
                  + Add student
                </Action>
              }
            >
              <Table
                label="Student register"
                headers={[
                  "Reg. no.",
                  "Student",
                  "Batch",
                  "Email",
                  "Profile",
                  "Action",
                ]}
                rows={students.map((s) => [
                  s.id,
                  <span className={styles.inlinePerson} key="n">
                    <span className={styles.miniAvatar}>
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    {s.name}
                  </span>,
                  s.batch,
                  s.email || "Missing",
                  <Pill key="p">{s.complete ? "Complete" : "Incomplete"}</Pill>,
                  <button
                    key="a"
                    className={styles.textAction}
                    onClick={() => studentProfile(s)}
                  >
                    View / edit
                  </button>,
                ])}
              />
            </Panel>
            <div className={styles.twoColumns}>
              <Panel title="Student completeness by batch">
                <BarList
                  data={batches.map((batch) => {
                    const group = students.filter((s) => s.batch === batch)
                    return {
                      label: batch,
                      value: group.filter((s) => s.complete).length,
                      target: group.length,
                    }
                  })}
                />
              </Panel>
              <Panel title="Duplicate review">
                <div className={styles.panelBody}>
                  <strong className={styles.largeNumber}>
                    {students.filter((s) => s.duplicate).length}
                  </strong>
                  <p>
                    Potential duplicate candidates. Review identity before
                    resolving.
                  </p>
                  {students
                    .filter((s) => s.duplicate)
                    .map((s) => (
                      <div key={s.id} className={styles.personRow}>
                        <span>
                          {s.name}
                          <small>{s.id} · Similar name in this register</small>
                        </span>
                        <Action
                          onClick={() => {
                            demo.setStudents((all) =>
                              all.map((student) =>
                                student.id === s.id
                                  ? { ...student, duplicate: false }
                                  : student,
                              ),
                            )
                            demo.notify(
                              "Candidate marked as a distinct student.",
                            )
                          }}
                        >
                          Mark distinct
                        </Action>
                      </div>
                    ))}
                </div>
              </Panel>
            </div>
          </>
        )}
        {tab === "Staff mapping" && (
          <>
            <Notice>
              {subjects.length - assigned} subjects need staff assignment.
            </Notice>
            <Panel
              title="Staff master & subject mapping"
              action={
                <Action
                  primary
                  onClick={() =>
                    demo.showDialog("Add staff", <AddRecord kind="staff" />)
                  }
                >
                  + Add staff
                </Action>
              }
            >
              <Table
                label="Staff register"
                headers={[
                  "Staff",
                  "Department",
                  "Designation",
                  "Mapped subjects",
                  "Status",
                  "Action",
                ]}
                rows={staff.map((s) => [
                  <strong key="n">{s.name}</strong>,
                  s.department,
                  s.role,
                  nameList(s.subjects),
                  <Pill key="p">
                    {s.subjects.length ? "Mapped" : "Unmapped"}
                  </Pill>,
                  <button
                    key="a"
                    className={styles.textAction}
                    onClick={() => mapStaff(s)}
                  >
                    Map subjects
                  </button>,
                ])}
              />
            </Panel>
            <Panel
              title="Subject assignment matrix"
              note="One staff member can teach multiple subjects; one subject can have multiple staff."
            >
              <Table
                label="Subject assignment matrix"
                headers={["Subject", ...staff.slice(0, 4).map((s) => s.name)]}
                rows={subjects.map((s) => [
                  s.name,
                  ...staff.slice(0, 4).map((st) =>
                    st.subjects.includes(s.id) ? (
                      <Check key={st.id}>Assigned</Check>
                    ) : (
                      <button
                        key={st.id}
                        className={styles.matrixAssign}
                        aria-label={`Assign ${s.name} to ${st.name}`}
                        onClick={() => {
                          demo.setStaff((all) =>
                            all.map((item) =>
                              item.id === st.id
                                ? {
                                    ...item,
                                    subjects: [...item.subjects, s.id],
                                  }
                                : item,
                            ),
                          )
                          demo.notify(`${s.name} assigned to ${st.name}.`)
                        }}
                      >
                        +
                      </button>
                    ),
                  ),
                ])}
              />
            </Panel>
          </>
        )}
      </div>
    </div>
  )
}
