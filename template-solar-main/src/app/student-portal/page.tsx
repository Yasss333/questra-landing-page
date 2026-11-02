import Link from "next/link"
import PageIntro from "@/components/marketing/PageIntro"
import { ClosingCTA } from "@/components/marketing/ProductContent"
import { studentPortalContent } from "@/components/marketing/featureLandingContent"
import styles from "@/components/marketing/ContentPages.module.css"
import { marketingMetadata, pageStructuredData } from "../marketing-metadata"

const title = "Questra Student Portal | Syllabus, Questions and Past Papers"
const description =
  "Explore Questra’s student academic portal for enrolled subjects, syllabus topics, approved practice questions, Bloom’s levels, Course Outcomes, and authorized past papers."

export const metadata = marketingMetadata("/student-portal", title, description)

export default function StudentPortalPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageStructuredData("/student-portal", title, description),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="Introducing Questra Student Intelligence"
        title={studentPortalContent.title}
        description={studentPortalContent.description}
      />
      <section className={styles.section} aria-labelledby="student-preview-heading">
        <span className={styles.eyebrow}>A connected learning experience</span>
        <h2 id="student-preview-heading">One clear path through every subject.</h2>
        <p className={styles.intro}>
          Explore syllabus, published practice content, and released examination
          papers in the context of your current enrollment.
        </p>
        <figure className={styles.portalFigure}>
          <div className={styles.portalFrame}>
            <aside className={styles.portalSidebar} aria-label="Preview navigation">
              <span className={styles.portalBrand}>Questra <small>Student Portal</small></span>
              {[
                "Dashboard",
                "My Subjects",
                "Syllabus Explorer",
                "Question Bank",
                "Past Papers",
                "Learning Analytics",
              ].map((item, index) => (
                <span className={index === 1 ? styles.portalActive : ""} key={item}>
                  {item}
                </span>
              ))}
            </aside>
            <div className={styles.portalWorkspace}>
              <div className={styles.portalTopbar}>
                <span>My Subjects</span>
                <span>Illustrative preview</span>
              </div>
              <div className={styles.portalWelcome}>
                <span>YOUR CURRENT SEMESTER</span>
          <h3>Every subject. Every topic. One place to begin.</h3>
                <p>Sample workspace · Institution-managed academic resources</p>
              </div>
              <div className={styles.portalSubjects}>
                {[
                  ["Data Structures", "Syllabus · Practice questions · Outcomes"],
                  ["Database Systems", "Syllabus · Practice questions · Past papers"],
                  ["Operating Systems", "Syllabus · Practice questions · Outcomes"],
                ].map(([subject, resources]) => (
                  <article key={subject}>
                    <span className={styles.portalSubjectIcon} aria-hidden="true" />
                    <div>
                      <strong>{subject}</strong>
                      <small>{resources}</small>
                    </div>
                    <span aria-hidden="true">→</span>
                  </article>
                ))}
              </div>
              <div className={styles.portalDisclosure}>
                Available content follows institution publication and access rules.
              </div>
            </div>
          </div>
          <figcaption>
            Illustrative Student Portal preview. Sample subjects and interface
            labels shown; availability depends on institution configuration.
          </figcaption>
        </figure>
      </section>
      <section className={styles.section} aria-labelledby="student-features-heading">
        <span className={styles.eyebrow}>A semester, made easier to navigate</span>
        <h2 id="student-features-heading">Everything starts with your enrolled subjects.</h2>
        <div className={styles.grid}>
          {studentPortalContent.cards.map(([heading, description], index) => (
            <article className={styles.card} key={heading}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{heading}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="student-journey-heading">
        <span className={styles.eyebrow}>A clear preparation journey</span>
        <h2 id="student-journey-heading">From your subject list to focused practice.</h2>
        <ol className={`${styles.grid} ${styles.stepGrid}`}>
          {studentPortalContent.steps.map(([heading, description], index) => (
            <li className={styles.card} key={heading}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{heading}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <p className={styles.note}>
          Students see only their enrolled subjects and institution-authorized
          learning resources. Future exam papers, confidential materials, and
          staff-only question-bank records are not part of the student view.
        </p>
      </section>
      <section className={styles.section} aria-labelledby="student-faq-heading">
        <span className={styles.eyebrow}>Student Portal questions</span>
        <h2 id="student-faq-heading">A few helpful details.</h2>
        <div className={styles.portalFaq}>
          <details>
            <summary>Will I see every subject in the institution?</summary>
            <p>The portal is organized around your current enrollment. Your institution controls which subjects and resources are available to your account.</p>
          </details>
          <details>
            <summary>Can I view answers and previous examination papers?</summary>
            <p>Answers and past papers appear only after the institution has authorized their publication and access.</p>
          </details>
          <details>
            <summary>Do coverage analytics show my personal performance?</summary>
            <p>Question availability and syllabus coverage describe learning content. Personal proficiency requires actual attempt or assessment evidence and is identified separately.</p>
          </details>
          <details>
            <summary>How do I access the student portal?</summary>
            <p>Your institution provides the account and sign-in route for its participating students. Contact your academic or IT team for access details.</p>
          </details>
        </div>
        <div className={styles.actions}>
          <Link className={styles.button} href="/book-demo">Bring Questra to your campus ↗</Link>
          <Link className={styles.link} href="/#dashboard-preview">Explore the product preview →</Link>
        </div>
      </section>
      <ClosingCTA />
    </main>
  )
}
