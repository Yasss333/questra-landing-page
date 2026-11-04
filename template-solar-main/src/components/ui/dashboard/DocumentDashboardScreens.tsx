"use client"
import { useDemo } from "./DemoContext"
import { Metrics, Panel, styles } from "./DashboardKit"
export default function DocumentDashboardScreens({ screen }: { screen: "command" | "master" | "faculty" }) {
  const demo = useDemo()
  const subjects = demo.scopedSubjects.filter((s) => `${s.name} ${s.id}`.toLowerCase().includes(demo.search.toLowerCase()))
  const mapped = subjects.filter((s) => s.pdf && demo.staff.some((staff) => staff.subjects.includes(s.id)))
  const pending = demo.scopedPapers.filter((p) => /review|approval/i.test(p.status))
  const completeness = subjects.length ? Math.round(mapped.length / subjects.length * 100) : 0
  const list = (items: readonly (readonly [string, string])[]) => <dl style={{ padding: "16px 20px", margin: 0 }}>{items.map(([label, value]) => <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--theme-border, #dbe4ee)", flexWrap: "wrap" }}><dt>{label}</dt><dd style={{ margin: 0, fontWeight: 600 }}>{value}</dd></div>)}</dl>
  return <div className={styles.viewStack}>
    {screen === "command" ? <>
      <Metrics items={[
        { label: "Setup completeness", value: `${completeness}%`, note: "Sample syllabus and staff mapping" },
        { label: "Active exams", value: 2, note: "Illustrative mid-term and end-semester" },
        { label: "Approval backlog", value: pending.length, note: "Sample papers awaiting review" },
        { label: "Risk alerts", value: subjects.length - mapped.length, note: "Subjects missing syllabus or staff mapping" },
      ]} />
      <Panel title="Setup completeness">{list(subjects.slice(0,5).map((s) => [s.name, mapped.includes(s) ? "Ready" : "Needs attention"]))}</Panel>
      <div className={styles.chartGrid}><Panel title="Active exams">{list([["Mid-term", "Sample examination"], ["End-semester", "Sample examination"]])}</Panel><Panel title="Risk alerts">{list([["Syllabus or staff mapping", `${subjects.length - mapped.length} subjects need attention`], ["Approval backlog", `${pending.length} pending`]])}</Panel></div>
    </> : screen === "master" ? <>
      <Metrics items={[
        {label:"Subjects",value:subjects.length,note:"Current academic selection"},
        {label:"Syllabus readiness",value:subjects.filter((s)=>s.pdf).length,note:"Subjects with a syllabus"},
        {label:"Staff readiness",value:demo.staff.filter((s)=>s.subjects.length).length,note:"Staff with allocated subjects"},
        {label:"Student readiness",value:demo.students.filter((s)=>s.complete).length,note:"Complete sample student records"},
      ]}/>
      <Panel title="Academic masters">{list(subjects.map((s)=>[s.name, `${s.batch} · ${s.degree} · ${s.department}`]))}</Panel>
      <Panel title="Syllabus and staff/student readiness">{list([["Syllabus",`${subjects.filter((s)=>s.pdf).length} subjects available`],["Staff",`${demo.staff.filter((s)=>s.subjects.length).length} mapped`],["Students",`${demo.students.filter((s)=>s.complete).length} complete`]])}</Panel>
    </> : <>
      <Panel title="Allocated subjects">{list(subjects.slice(0,5).map((s)=>[s.name,demo.staff.find((staff)=>staff.subjects.includes(s.id))?.name ?? "Unassigned"]))}</Panel>
      <div className={styles.chartGrid}><Panel title="Drafts">{list(demo.scopedQuestions.filter((q)=>q.status !== "Approved").slice(0,4).map((q,i)=>[`Sample draft ${i+1}`,q.status]))}</Panel><Panel title="Assigned review tasks">{list(pending.slice(0,4).map((p)=>[p.title,p.reviewer || "Sample reviewer"]))}</Panel></div>
      <Panel title="Due dates" note="Illustrative dates for the preview only.">{list([["Question draft", "12 Nov · Sample"],["Assigned paper review", "15 Nov · Sample"]])}</Panel>
    </>}
  </div>
}
