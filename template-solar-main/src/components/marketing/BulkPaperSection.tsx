import Link from "next/link"
import styles from "./BulkPaperSection.module.css"
import { Pointer } from "@/registry/magicui/pointer"
import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal"

const features = [
  ["01", "Bulk paper generation", "Select multiple batch years, degrees, departments, semesters and subjects in one coordinated workflow."],
  ["02", "Mid-term & end-semester", "Choose the mid-term examination type and syllabus coverage percentage, or use the complete syllabus for end-semester examinations."],
  ["03", "Intelligent syllabus mapping", "Connect each selected subject to its syllabus units and topics to define the examination scope."],
  ["04", "One to three approval levels", "Define a review hierarchy for each paper request, with authorized users able to view, edit, comment and approve."],
  ["05", "A complete overview", "See paper requests, examination types, generation progress, current approvers and approval status in one dashboard."],
  ["06", "Individual paper tracking", "Follow each paper from generation through review, revision and final approval, with pending actions visible."],
]
const featurePointers = ["📄", "📅", "📚", "✅", "📊", "📋"]
const papers = [
  ["Data Structures", "Mid-term I", "In review", "Level 2 of 3"],
  ["Engineering Mathematics", "End-semester", "Approved", "Complete"],
  ["Digital Electronics", "Mid-term II", "Draft", "Awaiting review"],
]
export default function BulkPaperSection() {
  return (
    <section id="bulk-paper-generation" className={styles.section} aria-labelledby="bulk-heading">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>EXAMINATION INTELLIGENCE · AT SCALE</span>
        <h2 id="bulk-heading">
          <DiaTextReveal
            text="Simplicity of Super Intelligence in Bulk Question Paper Generation"
            colors={["#0754b5", "#38bdf8", "#078d78", "#22c5a0", "#0754b5"]}
            delay={0.35}
            duration={2.4}
          />
        </h2>
        <p>Generate multiple question papers across your institution with intelligent syllabus mapping, configurable approval workflows and complete examination visibility.</p>
        <Link className={styles.cta} href="/book-demo">Schedule a live demo <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={styles.dashboard} aria-label="Illustrative bulk paper generation dashboard">
        <div className={styles.dashboardTop}><div><span className={styles.dot} /> EXAMINATION COMMAND CENTER</div><span>ILLUSTRATIVE VIEW</span></div>
        <div className={styles.dashboardTitle}><div><span>EXAMINATION WORKSPACE</span><h3>Bulk paper overview</h3><p>One clear view from generation to approval</p></div><span className={styles.tag}>● Examination cycle</span></div>
        <div className={styles.metrics}><div><span>Papers in scope</span><strong>24</strong></div><div><span>In review</span><strong>08</strong></div><div><span>Approved</span><strong>12</strong></div><div><span>Needs attention</span><strong>04</strong></div></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Subject</th><th>Examination</th><th>Status</th><th>Approval</th></tr></thead><tbody>{papers.map(([subject, exam, status, approval]) => <tr key={subject}><td>{subject}</td><td>{exam}</td><td><span className={styles.status}>{status}</span></td><td>{approval}</td></tr>)}</tbody></table></div>
        <p className={styles.note}>Sample records shown for illustration.</p>
      </div>
      <div className={styles.features}>{features.map(([number, title, description], index) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><Pointer>{featurePointers[index]}</Pointer></article>)}</div>
    </section>
  )
}
