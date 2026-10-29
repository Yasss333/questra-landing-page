import Link from "next/link"
import {
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiBookOpenLine,
  RiCheckLine,
  RiCheckboxCircleFill,
  RiFileList3Line,
  RiFlowChart,
  RiGraduationCapLine,
  RiLockLine,
  RiMagicLine,
  RiShieldCheckLine,
  RiUploadCloud2Line,
} from "@remixicon/react"
import styles from "./Marketing.module.css"
import { capabilities, stakeholders } from "./ProductContent"

function SectionLabel({
  number,
  children,
}: {
  number: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.sectionLabel}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  )
}

export function Platform() {
  return (
    <section
      id="platform"
      className={styles.section}
      aria-labelledby="platform-heading"
    >
      <SectionLabel number="01">THE CONNECTED PLATFORM</SectionLabel>
      <div className={styles.sectionHeading}>
        <h2 id="platform-heading">
          One platform.
          <br />
          Every part of assessment.
        </h2>
        <p>
          Move beyond scattered spreadsheets and disconnected question banks.
          Give your academic team a shared foundation, from curriculum to
          examination.
        </p>
      </div>
      <div className={styles.primaryFeatures}>
        <article className={styles.featureCard}>
          <div className={styles.featureCopy}>
            <span className={styles.iconBox}>
              <RiBookOpenLine size={23} aria-hidden="true" />
            </span>
            <h3>
              Start with your syllabus.
              <br />
              Keep everything connected.
            </h3>
            <p>
              Organize academic masters, subjects, units, and topics. Map
              questions to the curriculum version and Course Outcomes that give
              them context.
            </p>
          </div>
          <div
            className={styles.syllabusViz}
            aria-label="Illustrative syllabus mapping"
          >
            <div className={styles.vizHeader}>
              <span>
                <span className={styles.tinyDot} /> SYLLABUS EXPLORER
              </span>
              <span>CS2301</span>
            </div>
            <div className={styles.subjectLabel}>
              <RiBookOpenLine size={17} aria-hidden="true" />
              <span>
                Data Structures<small>Semester III · 5 units</small>
              </span>
              <span className={styles.greenPill}>Mapped</span>
            </div>
            <div className={styles.unitTree}>
              <div>
                <span>01</span> Introduction & fundamentals
                <RiCheckLine size={14} aria-hidden="true" />
              </div>
              <div>
                <span>02</span> Linear data structures
                <RiCheckLine size={14} aria-hidden="true" />
              </div>
              <div className={styles.selectedUnit}>
                <span>03</span> Trees & traversals
                <span className={styles.topicPill}>CO3</span>
              </div>
              <div className={styles.topicBranch}>
                <span />
                Binary search trees <small>Understand · K2</small>
              </div>
            </div>
            <div className={styles.vizFooter}>
              <RiCheckLine size={13} aria-hidden="true" /> Every question begins
              with academic context.
            </div>
          </div>
        </article>
        <article className={`${styles.featureCard} ${styles.aiFeature}`}>
          <div className={styles.featureCopy}>
            <span className={`${styles.iconBox} ${styles.greenIcon}`}>
              <RiMagicLine size={23} aria-hidden="true" />
            </span>
            <h3>
              A head start for faculty.
              <br />A higher bar for questions.
            </h3>
            <p>
              AI Question Studio drafts from selected syllabus topics, with
              controls for marks, question type, difficulty, and Bloom’s level.
              Faculty can preview drafts, refine wording and answers, and review
              alternatives before approval.
            </p>
          </div>
          <div
            className={styles.questionViz}
            aria-label="Illustrative AI question draft"
          >
            <div className={styles.vizHeader}>
              <span>
                <RiMagicLine size={14} aria-hidden="true" /> AI QUESTION STUDIO
              </span>
              <span className={styles.draftPill}>Editable draft</span>
            </div>
            <div className={styles.questionTags}>
              <span>Data Structures</span>
              <span>5 marks</span>
              <span>Understand · K2</span>
            </div>
            <p>
              Explain insertion and deletion in a binary search tree with
              suitable examples.
            </p>
            <div className={styles.answerLines}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.reviewIndicator}>
              <RiShieldCheckLine size={15} aria-hidden="true" />
              <span>Ready for faculty review</span>
              <span className={styles.miniAvatar}>AS</span>
            </div>
          </div>
        </article>
      </div>
      <div className={styles.capabilityRow}>
        {capabilities.map(([title, text]) => (
          <article key={title}>
            <RiShieldCheckLine size={22} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className={styles.productNote}>
        One connected workspace, configured around your institution’s academic
        structure and approval policies.
      </p>
      <div id="solutions" className={styles.audienceSection}>
        <h3>Designed for the people behind academic quality.</h3>
        <p>One shared process, with a clear role for every academic team.</p>
        <div className={styles.audienceGrid}>
          {stakeholders.map(([title, text]) => (
            <article key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <Link className={styles.textLink} href="/book-demo">
          See Questra for your institution{" "}
          <RiArrowRightUpLine size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function FacultyReview() {
  return (
    <section
      id="faculty-review"
      className={styles.facultySection}
      aria-labelledby="faculty-heading"
    >
      <div className={styles.facultyInner}>
        <div>
          <SectionLabel number="02">FACULTY REVIEW & CONTROL</SectionLabel>
          <h2 id="faculty-heading">
            Intelligence in the process.
            <br />
            <span>Faculty at the centre.</span>
          </h2>
          <p>
            AI can help draft a question. Academic judgement makes it
            examination-ready. Questra’s review workflow keeps that
            responsibility with your team.
          </p>
          <ul>
            {[
              [
                "Edit before it moves forward",
                "Refine wording, verify suggested answers, and add the context only faculty can provide.",
              ],
              [
                "Review with the full picture",
                "Check syllabus relevance, marks, cognitive level, and outcome alignment together.",
              ],
              [
                "Approve with accountability",
                "Follow revisions and review comments before designated reviewers authorize release.",
              ],
            ].map(([title, text]) => (
              <li key={title}>
                <RiCheckboxCircleFill size={18} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link className={styles.lightLink} href="/how-it-works">
            See the review journey{" "}
            <RiArrowRightLine size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.reviewVisual}>
          <div className={styles.reviewWindow}>
            <div className={styles.reviewTop}>
              <span>
                <RiShieldCheckLine size={17} aria-hidden="true" /> Question
                review
              </span>
              <span>ILLUSTRATIVE PREVIEW</span>
            </div>
            <div className={styles.reviewBody}>
              <div className={styles.reviewMeta}>
                <span>Q–102 · DATA STRUCTURES</span>
                <span className={styles.reviewStatus}>In review</span>
              </div>
              <h3>
                Construct a binary search tree and demonstrate its traversals.
              </h3>
              <div className={styles.questionTags}>
                <span>10 marks</span>
                <span>Apply · K3</span>
                <span>CO3</span>
              </div>
              <div className={styles.feedback}>
                <span className={styles.miniAvatar}>FR</span>
                <div>
                  <strong>Faculty review note</strong>
                  <p>
                    Include a worked example and specify the keys to use in the
                    traversal.
                  </p>
                </div>
              </div>
              <div className={styles.revision}>
                <span>
                  <span /> AI draft<small>Version 1</small>
                </span>
                <RiArrowRightLine size={14} aria-hidden="true" />
                <span>
                  <span /> Faculty edited<small>Version 2</small>
                </span>
              </div>
              <div className={styles.readyReview}>
                <RiCheckLine size={15} aria-hidden="true" /> Revisions retained.
                Ready for the next review.
              </div>
            </div>
          </div>
          <div className={styles.approvalFloat}>
            <span>
              <RiLockLine size={17} aria-hidden="true" />
            </span>
            <div>
              <strong>Your reviewers. Your release.</strong>
              <small>Final authorization stays with your institution.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Workflow() {
  const steps = [
    {
      Icon: RiUploadCloud2Line,
      title: "Map the curriculum",
      text: "Bring in academic masters and organize your syllabus into subjects, units, and topics.",
    },
    {
      Icon: RiMagicLine,
      title: "Create the questions",
      text: "Build manually or use AI-assisted drafts with the right marks, type, and cognitive level.",
    },
    {
      Icon: RiShieldCheckLine,
      title: "Review the bank",
      text: "Edit questions, verify answers, and approve the content that can enter a paper.",
    },
    {
      Icon: RiFlowChart,
      title: "Set the blueprint",
      text: "Define your exam pattern, coverage, mark distribution, and internal choices.",
    },
    {
      Icon: RiFileList3Line,
      title: "Assemble & moderate",
      text: "Prepare paper sets from the approved bank, then review balance and consistency.",
    },
    {
      Icon: RiCheckLine,
      title: "Authorize & release",
      text: "Release approved papers, export the required format, and review academic coverage.",
    },
  ]
  return (
    <section
      id="workflow"
      className={styles.section}
      aria-labelledby="workflow-heading"
    >
      <SectionLabel number="03">HOW IT WORKS</SectionLabel>
      <div className={styles.sectionHeading}>
        <h2 id="workflow-heading">
          From syllabus to
          <br />
          signed-off paper.
        </h2>
        <p>
          A connected journey for the entire examination team. Each step carries
          the academic context forward.
        </p>
      </div>
      <ol className={styles.workflowGrid}>
        {steps.map(({ Icon, title, text }, i) => (
          <li key={title}>
            <div className={styles.stepTop}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <div className={styles.workflowBottom}>
        <span>
          <RiShieldCheckLine size={17} aria-hidden="true" /> Human review is
          part of the journey, from draft to release.
        </span>
        <Link href="/book-demo">
          See it in a demo <RiArrowRightUpLine size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function StudentPortal() {
  return (
    <section
      id="student-portal"
      className={styles.studentSection}
      aria-labelledby="student-heading"
    >
      <div className={styles.section}>
        <SectionLabel number="04">QUESTRA STUDENT INTELLIGENCE</SectionLabel>
        <div className={styles.studentHeading}>
          <div>
            <span className={styles.studentEyebrow}>
              <RiGraduationCapLine size={18} aria-hidden="true" /> A CLEARER
              PATH TO PREPARATION
            </span>
            <h2 id="student-heading">
              Every subject.
              <br />
              Every topic.
              <br />
              <span>One connected experience.</span>
            </h2>
          </div>
          <div>
            <p>
              Your institution’s academic intelligence, connected to everyday
              preparation. Give students an organized way to explore their
              semester and practice with purpose.
            </p>
            <Link className={styles.textLink} href="/book-demo">
              Bring Questra to your campus{" "}
              <RiArrowRightUpLine size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className={styles.studentBenefits}>
          {[
            [
              "Your semester, simplified",
              "Registered current-semester subjects, course codes, credits, syllabus resources, and faculty details where your institution publishes them.",
            ],
            [
              "Syllabus to questions",
              "Explore units, topics, subtopics, curriculum versions, learning objectives, and permitted syllabus PDFs. Move directly to relevant published practice questions.",
            ],
            [
              "Practice with context",
              "Discover approved questions by subject, topic, marks, type, difficulty, Bloom’s K1–K6 level, and Course Outcome. Answers and marking guidance appear only when authorized.",
            ],
            [
              "Learn from past papers",
              "Explore institution-authorized Mid-Term I, Mid-Term II, and End-Semester archives by subject, year, exam date, paper set, and version, with policy-aware viewing and downloads.",
            ],
            [
              "Clarity through analytics",
              "See published question types, Bloom’s distribution, Course Outcome coverage, and unit-level gaps. These describe available content, not measured student mastery.",
            ],
            [
              "Institution-managed access",
              "The portal connects your student profile and enrollment, with academic notices and help. Private records, future examination sets, and staff-only materials remain restricted.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className={styles.studentPolicy}>
          <RiShieldCheckLine size={15} aria-hidden="true" /> Participating
          institutions manage access and publication. Questions, answers, and
          past papers appear only when authorized.
        </p>
      </div>
    </section>
  )
}

export function Analytics() {
  return (
    <section
      id="analytics"
      className={styles.section}
      aria-labelledby="analytics-heading"
    >
      <SectionLabel number="05">ANALYTICS & ACADEMIC OUTCOMES</SectionLabel>
      <div className={styles.analyticsLayout}>
        <div className={styles.analyticsCopy}>
          <h2 id="analytics-heading">
            See the coverage.
            <br />
            <span>Find the gaps.</span>
          </h2>
          <p>
            Go beyond question counts. Explore how your question bank represents
            syllabus topics, cognitive levels, and Course Outcomes.
          </p>
          <div className={styles.analyticsPoints}>
            <div>
              <span>01</span>
              <p>
                <strong>Syllabus visibility</strong>Identify units and topics
                that need more questions.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>Cognitive balance</strong>Review Bloom’s levels from
                remembering to creating.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>Outcome alignment</strong>Understand how available
                content maps to your COs.
              </p>
            </div>
          </div>
          <Link className={styles.textLink} href="/book-demo">
            Explore academic insights{" "}
            <RiArrowRightUpLine size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.analyticsVisual}>
          <div className={styles.analyticsHeader}>
            <div>
              <small>CONTENT INTELLIGENCE</small>
              <h3>A clearer view of your curriculum.</h3>
            </div>
            <span>Sample data</span>
          </div>
          <div className={styles.analyticsCharts}>
            <div>
              <p>Bloom’s taxonomy</p>
              <div
                className={styles.taxonomy}
                role="img"
                aria-label="Illustrative Bloom’s distribution: Remember 24%, Understand 28%, Apply 22%, Analyze 14%, Evaluate 8%, Create 4%"
              >
                {[24, 28, 22, 14, 8, 4].map((value, i) => (
                  <div key={i}>
                    <strong>{value}%</strong>
                    <span
                      style={{
                        height: `${value * 4}px`,
                        background: i < 3 ? "#084DB5" : "#19A889",
                        opacity: 1 - (i % 3) * 0.15,
                      }}
                    />
                    <small>K{i + 1}</small>
                  </div>
                ))}
              </div>
              <div className={styles.chartLegend}>
                <span>
                  <i /> K1–K3
                </span>
                <span>
                  <i /> K4–K6
                </span>
              </div>
            </div>
            <div className={styles.outcomes}>
              <p>Course Outcome mapping</p>
              {[82, 68, 74, 58, 45].map((value, i) => (
                <div key={i}>
                  <span>
                    CO{i + 1}
                    <strong>{value}%</strong>
                  </span>
                  <div>
                    <span style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.analyticsNote}>
            <RiBookOpenLine size={15} aria-hidden="true" />
            <span>
              Content coverage describes available resources. Student
              proficiency requires evidence from actual assessments.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const items = [
    [
      "Can faculty edit AI-generated questions?",
      "Yes. The AI Question Studio workflow gives authorized faculty the ability to revise question wording, suggested answers, marks, and academic mapping before submitting content for review.",
    ],
    [
      "Does AI approve or release examination papers?",
      "No. Final approval and release remain with the institution’s designated academic reviewers. AI assistance is intended to support drafting and quality checks within that process.",
    ],
    [
      "Can papers follow our institution’s examination pattern?",
      "The blueprint and formatting modules support configurable sections, marks, internal choices, unit coverage, and institution-specific paper formats. Your demo can explore the patterns your team needs.",
    ],
    [
      "Can we bring in existing syllabus and question bank content?",
      "Yes. Upload syllabus PDFs and import questions using supported PDF and Excel templates. Academic masters support structured imports and mapping checks. Bring your current formats to the demo to explore the workflow.",
    ],
    [
      "What can students access in the Student Portal?",
      "The portal is designed around enrolled subjects, syllabus topics, published practice questions, and authorized past papers. Participating institutions control which questions, answer keys, and papers are available.",
    ],
    [
      "Does Questra support outcome-based academic review?",
      "Course Outcome/Programme Outcome mapping and Bloom’s taxonomy analytics support OBE-oriented review. Content coverage and cognitive distribution are kept distinct from measured student performance.",
    ],
  ]
  return (
    <section
      id="faq"
      className={`${styles.section} ${styles.faqSection}`}
      aria-labelledby="faq-heading"
    >
      <div>
        <SectionLabel number="06">A LITTLE MORE CLARITY</SectionLabel>
        <h2 id="faq-heading">
          Good questions.
          <br />
          Clear answers.
        </h2>
        <p>
          Have something more specific in mind?
          <br />
          We’d love to understand your institution.
        </p>
        <Link className={styles.textLink} href="/book-demo">
          Let’s talk <RiArrowRightUpLine size={17} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.faqList}>
        {items.map(([question, answer], i) => (
          <details key={question} open={i === 0}>
            <summary>
              {question}
              <span aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
