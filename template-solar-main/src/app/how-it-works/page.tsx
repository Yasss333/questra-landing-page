import PageIntro from "@/components/marketing/PageIntro"
import {
  ApprovalOverview,
  ClosingCTA,
} from "@/components/marketing/ProductContent"
import { Workflow } from "@/components/marketing/HomeSections"
import styles from "@/components/marketing/ContentPages.module.css"
import { marketingMetadata, pageStructuredData } from "../marketing-metadata"
const title = "How It Works | Questra"
const description =
  "Set up your institution in 11 guided steps, then connect syllabus mapping, question creation, paper validation, and accountable approvals."
export const metadata = marketingMetadata("/how-it-works", title, description)
const setup = [
  [
    "Institution Profile",
    "Set institutional identity, academic year, administrator, and governing structure.",
  ],
  [
    "Batch Years",
    "Create active and upcoming batches with clear academic timelines.",
  ],
  [
    "Degree Programmes",
    "Define programmes and semester counts with batch-wise mapping.",
  ],
  ["Departments", "Connect each department to its degree programmes."],
  [
    "Semester Structure",
    "Auto-create semesters and configure academic periods.",
  ],
  [
    "Subject Master",
    "Map subjects by batch, degree, department, and semester. Classify theory, practical, elective, or combined subjects.",
  ],
  [
    "Syllabus Intelligence",
    "Upload syllabus PDFs, structure units, topics, and subtopics, and monitor coverage.",
  ],
  [
    "Staff & Subject Allocation",
    "Assign faculty to multiple subjects with priorities, responsibilities, and role-based permissions.",
  ],
  [
    "Examination Configuration",
    "Create mid-term and end-semester examinations with dates, deadlines, and paper patterns.",
  ],
  [
    "Approval Hierarchy",
    "Configure independent one-, two-, or three-stage workflows for new questions and each paper type.",
  ],
  [
    "Review & Activate",
    "Resolve missing mappings, review readiness, and activate your institution.",
  ],
]
export default function HowItWorks() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData("/how-it-works", title, description),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="How Questra works"
        title="Set up once. Move every examination forward."
        description="Turn your academic structure into a connected foundation. From the first syllabus upload to the final authorized paper, every step carries the right context forward."
      />
      <section
        id="institution-setup"
        className={styles.section}
        aria-labelledby="setup-heading"
      >
        <span className={styles.eyebrow}>Institution onboarding</span>
        <h2 id="setup-heading">Eleven steps. One shared foundation.</h2>
        <p className={styles.intro}>
          Configure your institution’s structure, people, and policies before
          your examination cycle begins.
        </p>
        <ol className={styles.grid}>
          {setup.map(([name, text], i) => (
            <li className={styles.card} key={name}>
              <span className={styles.number}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <Workflow />
      <ApprovalOverview />
      <ClosingCTA />
    </main>
  )
}
