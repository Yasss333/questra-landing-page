# Questra final blueprint website rewrite plan

Prepared 2 November 2026. Status: planning only. Task checklist: `todo.md`. Detailed differences: `differences.md`.

## Starting differences and scope

The current application already has fourteen marketing routes, an institutional homepage, three approval pathway descriptions, feature pages, a demo enquiry form and structured SEO data. This is a content and information architecture rewrite of that application, not a new website or an instruction to implement the underlying examination platform.

The largest changes are: introduce Intelligence and Company navigation; relocate Student Portal; replace paraphrased copy with the final document's wording; expand six broad platform modules to twelve explicit feature areas; separate question, mid-term and end-semester approval explanations; add validation and calendar detail; replace illustrative metric-led walkthroughs with authentic product evidence; and complete demo lead routing.

Source of truth: `C:\Users\yashm\Downloads\Questra_Premium_Website_Content_and_Feature_Blueprint.docx`. Read all 188 nonempty paragraphs, including table cells. Customer-facing text is approved source copy. Assessment notes, ADD/UPDATE instructions, priorities and acceptance checklists are implementation requirements, not text to paste into the public interface. No website files were changed during this audit.

Audit basis: current local source on 2 November 2026. Live homepage, approval and demo URLs could not be fetched through the web tool; a separate HTTP attempt failed DNS resolution in this environment. This does not establish a public outage. Source inspection establishes what the frontend contains, not that advertised capabilities work in the production product. Earlier plan/build/deployment notes are historical, not current verification.

## Content policy

1. Preserve exact approved headlines, descriptions, feature names, workflow names, CTA labels and closing text, including case and punctuation. Layout line breaks may change without rewriting words.
2. Preserve separate variants where the document supplies them. The executive message is `One Intelligent Platform. Every Question. Every Examination. Every Approval.` The homepage H1 is `From Syllabus to Final Approval.` These are separate placements, not competing titles.
3. Use the homepage CTA pair from section 03: `Request a 30-Minute Live Demo` and `View How Questra Works`. Use section 01's `Explore the End-to-End Workflow` on the platform introduction where appropriate.
4. Build a copy inventory assigning each customer-facing passage a source section, destination, exact text and verification status. Do not silently blend old and new copy.
5. Where no finished text is supplied (privacy, terms, case studies, blogs, integration claims), mark the content dependency. Do not invent company policies, testimonials, metrics or released functionality.
6. Capability labels Live / Beta / Planned describe actual product evidence and sit separately from approved copy. Resolve unverified claims before publishing them as available. Do not remove human academic control or confidentiality boundaries.

## Navbar changes first

Target desktop order: **Home | Platform | Intelligence | Solutions | Resources | Company | Request a 30-Minute Live Demo**. Retain logo home link and theme toggle. Home may use the logo as its desktop affordance only if that interpretation is accepted during navigation review; default to the explicit document label. Use grouped dropdowns, with the same destinations in mobile accordions.

| Current item | Planned action | Target |
| --- | --- | --- |
| Platform overview | Keep and rewrite | `/platform` overview |
| AI Question Studio | Keep; replace copy | Platform → AI Question Studio |
| Question Bank | Keep; replace copy | Platform → Question Bank |
| Paper Generation | Keep destination; expand scope | Platform → Paper Generation |
| Syllabus Intelligence | Move out of Platform | Intelligence → Syllabus Coverage |
| Academic Analytics | Move and split into anchored topics | Intelligence → Bloom’s Analytics, CO/PO Mapping, Reports |
| Faculty review | Remove duplicate navbar entry; retain governance content | Approval Engine and Faculty Portal |
| Approval automation | Elevate and relabel | Platform → Approval Engine |
| Examination workflow | Move out of Platform | Resources → How It Works |
| Student Portal top-level link and large Platform promotional panel | Remove these placements; retain page | Platform → Student & Faculty Portals, plus footer |
| Solutions / Solutions by role | Keep top-level hub; remove duplicate from Resources | Universities; Autonomous Colleges; Examination Cells; Faculty & HoDs |
| Resources → About Questra | Move | Company → About |
| Resources → Security & governance | Reposition | Resources → Security & Privacy; existing governance route retained |
| Resources → FAQ homepage anchor | Expand resource destination | FAQs page; keep homepage FAQ excerpt |
| Resources → Contact & live demo | Move | Company → Contact / Request Demo |
| Missing Intelligence menu | Add | Syllabus Coverage; Bloom’s Analytics; CO/PO Mapping; Quality Validation; Reports |
| Missing Company menu | Add | About; Contact; Request Demo; Privacy Policy; Terms |
| Missing Resources destinations | Add when content is ready | Product Screens; Blogs; FAQs |
| `30-Minute Demo` abbreviated button | Replace visible copy | `Request a 30-Minute Live Demo` |

Avoid squeezing seven groups into narrow desktop widths. Switch to the mobile menu at the width the content actually needs. Keep Escape dismissal, outside-click dismissal, visible focus, expanded state and keyboard navigation. No empty links or fake legal/blog pages.

## Page and route plan

Keep existing URLs where practical. New URLs below are implementation proposals; the document names sections but does not mandate slugs. Each of the twelve feature areas gets a clear destination and complete document content; related subtopics can share anchored pages rather than generating near-duplicate pages.

| Blueprint feature or destination | Route plan | Existing material to use |
| --- | --- | --- |
| Home | Rewrite `/` | Existing layout and section components |
| Platform overview | Rewrite `/platform` into twelve-feature index | Current six-module index |
| Academic Master Data & Onboarding | Add `/academic-setup` | Move 11-step setup detail out of the main workflow introduction |
| Syllabus Intelligence & Coverage | Rewrite `/syllabus-intelligence` | Existing syllabus feature page |
| Manual Question Bank & AI Question Studio | Rewrite `/question-bank` and `/ai-question-studio` as linked pages | Existing separate routes |
| Examination Calendar & Paper Patterns | Add `/examination-calendar` | Existing pattern references and onboarding setup |
| Question Paper Generation | Rewrite `/bulk-paper-generation` | Existing feature page; retain URL equity |
| Automated Question Request & Approval | `/approval-automation#questions` | Existing question route description |
| Automated Mid-Term Paper Request & Approval | `/approval-automation#mid-term` | Existing mid-term route description |
| Automated End-Semester Paper Request & Approval | `/approval-automation#end-semester` | Existing semester route description |
| Validation & Quality Intelligence | Add `/quality-validation` | Extract scattered validation descriptions |
| Dashboards, Analytics & Reports | Rewrite `/academic-analytics`; named anchors for Bloom’s, CO/PO and reports | Current analytics page |
| Security, Governance & Integrations | Expand `/security-governance` | Existing security page |
| Student & Faculty Portals | Retain/rewrite `/student-portal`; add `/faculty-portal` | Existing student page; role descriptions for faculty |
| How It Works | Rewrite `/how-it-works` | Lead with exact six stages; link detailed setup |
| Solutions | Rewrite `/solutions` with four anchored audiences | Existing role cards |
| Product Screens | Add `/product-screens` | Authentic screenshot gallery with role explanations |
| FAQs | Add `/faq`; retain short homepage section | Audit existing answers against final claims |
| Blogs | Add `/blogs` when editorial content exists | No blog route currently |
| About / Contact / Request Demo | Rewrite `/about`; add `/contact`; retain `/book-demo` | Current company and enquiry material |
| Privacy Policy / Terms | Add `/privacy-policy`, `/terms` after approved text | No corresponding routes currently |

## Homepage replacement order

1. **Hero.** Exact eyebrow `THE INTELLIGENT EXAMINATION AUTOMATION PLATFORM`; H1 `From Syllabus to Final Approval.`; subheadline `End-to-End AI-Powered Question Paper Automation.`; complete section 03 description beginning `Import your curriculum.` and ending `before secure release.` Use the exact CTA pair. Replace the existing combined paraphrased paragraph.
2. **Executive positioning and four value pillars.** Use section 01's executive message/supporting copy and section 03's Curriculum-first intelligence, Controlled automation, Exam-ready precision and Institution-wide visibility. Replace the unsourced problem section and generic platform slogans rather than stacking more introductions.
3. **Exact six-stage journey.** `01 Academic setup & syllabus → 02 Question bank & AI studio → 03 Blueprint & paper generation → 04 Automated requests → 05 Multi-level review, validation & approval → 06 Secure export, release & reporting`. Replace current differently ordered six steps. Keep the 11-step onboarding as secondary detail.
4. **Signature approval showcase.** Exact headline `Every Question Accountable. Every Paper Approved. Every Step Traceable.` and full section 05 website copy. Show three separate flow cards and configurable Level 1–2–3 routing, then link to detailed approval anchors.
5. **Product walkthrough.** Present the eight required screen types with authentic screenshots. Replace the synthetic bulk overview metrics as evidence; retain interactive sample preview only as a clearly separate optional demo if it remains useful. Do not imply its locked tabs demonstrate real approvals.
6. **Twelve-feature index.** Use document titles and summaries, linking to the route map. Reuse the current card system while replacing old descriptions.
7. **Mid-term versus end-semester comparison.** Add an explicit table showing scope, schedules, routing, reviewers, confidentiality and release. Use document-specified distinctions; do not introduce universal full-syllabus requirements or timing guarantees.
8. **Role benefits.** Include Management, Controller of Examinations, HoD, Faculty and Reviewers. Link to the broader solutions hub and portals; retain administrator context where useful without displacing named roles.
9. **Validation and security.** Dedicated factual sections for blocking/advisory checks, exception approvals, audit evidence, permissions and confidential release.
10. **Student and faculty access.** Shorten the current student-heavy feature promotion into balanced portal coverage. Students see permitted learning resources, never confidential papers.
11. **FAQs and final conversion.** Use source-aligned answers; replace existing closing headline/body with both exact section 11 paragraphs. Link to the demo form.
12. **Footer.** Mirror new information architecture. Apply exact brand line `Questra.si — Intelligence Behind Every Question.` and attribution `A Product of Voicedots AI`. Keep useful contact details; add approved legal destinations.

## Detailed feature requirements

For every feature, place the document's primary paragraph verbatim and implement the ADD/UPDATE requirements as supporting sections/screens, not editorial labels on the public page.

| Area | Required detail beyond the main paragraph |
| --- | --- |
| Academic setup | Guided wizard, academic hierarchy, sample import templates, PDF view, error correction/re-import and completeness |
| Syllabus | Topic drilldowns, version control, missing-coverage alerts, semester mapping, planned versus available question coverage |
| Bank and studio | Source context, answer-key drafts, reviewer edits, duplicate flags, AI/human provenance, reusable tagged questions |
| Calendar and patterns | Schedules, creation deadlines, marks/sections/choices/templates, deadline reminders, reusable blueprints, versioned rules |
| Generation | Manual/approved bank/AI-assisted routes, alternate sets, approved eligibility, scope, equivalent-set checks, locked versions |
| Question approvals | Institution/department/subject routing, 1–3 stages, delegation, SLA alerts, resubmission, escalation and audit history |
| Mid-term approvals | Schedule/scope relationship, complete draft-to-lock lifecycle, change requests, deadline alerts and final evidence |
| Semester approvals | Restricted previews, independent review, higher confidentiality, hierarchy, sealed release, access logs and immutability |
| Validation | Marks, count, choices, duplicates, topics, CO/PO, Bloom’s, difficulty, templates; blocking/advisory, explanations, exceptions and downloadable reports |
| Dashboards/reports | Onboarding, coverage, readiness, deadlines, pending decisions and bottlenecks; all six scope filters, drilldowns, scheduled exports and permissions |
| Security/integrations | Permissions, institution isolation, logs, encryption, backup, retention, separation of duties, recovery and verified integration catalog |
| Portals | Faculty queue, assigned subjects and priority, paper requests and status; student-safe syllabus/resources; responsive access |

## Approval flow detail

Reproduce the source table exactly in meaning and labels:

- Individual question: Assigned faculty → Subject reviewer → HoD → authorized approver → Approved question bank item.
- Mid-term paper: Paper setter / assigned faculty → Subject reviewer → department approver → exam cell → Validated, approved mid-term paper.
- End-semester paper: Authorized paper setter → Independent moderator → examination authority → final controller → Restricted, sealed final paper.

Required state model: `Draft → Submitted → In Review (Level 1/2/3 as configured) → Changes Requested / Rejected / Approved → Final Validation → Locked → Authorized Release`. Show changes requested and rejection as branches, not mandatory sequential steps. Revisions create new versions and preserve prior decisions. Locked and authorized release must be distinct.

Show routing by institution/department/subject/exam, no self-approval when policy requires, subject allotments, substitutes/delegation, conflict checks, alerts/overdue/escalation, annotations/comparisons/resubmission and evidence fields (actor, time, version, reason, validation result, authorization). Marketing diagrams explain these controls; only product test accounts can prove enforcement.

## Product evidence and demo conversion

Required screens: Institutional Command Center; Academic Master Dashboard; Faculty Workspace; AI Question Studio; Paper Blueprint Builder; Approval Cockpit; Quality Validation; Examination Calendar. For each obtain a real redacted screenshot, role, scenario, actual availability and caption. No real confidential examination papers or personal data in public assets. If an authentic screen is unavailable, use a clearly labelled concept only where the document allows it and record that authentic walkthrough evidence is still incomplete. Do not manufacture dashboard counts or testimonials.

The existing form already includes institution, role, work email, optional mobile, optional exam focus and optional preferred date/time, plus name, institution type, scale, message and consent. Do not describe those fields as missing. Align labels with the blueprint, retain useful extra fields unless a leaner form is chosen, and decide required/optional status explicitly; the blueprint does not specify requiredness.

Lead routing is a separate integration task: select the intended inbox/CRM/service, submit server-side with input validation and abuse controls, report success only after acceptance, preserve entered values on failure, and provide a truthful confirmation. A preferred date is a request, not a confirmed calendar booking. Verify routing and receipt independently. Until implemented, retain the accurate email-draft message and never label draft preparation as submission.

## Implementation sequence and review points

**Phase 1 — Content contract and navigation.** Build exact-copy inventory, availability/evidence register and route mapping. Implement navbar/footer and route scaffolds. Review navigation before filling every page.

**Phase 2 — P0 homepage.** Replace hero, positioning, pillars, six stages, approval showcase, validation and closing copy. Remove redundant legacy messaging. Review homepage on desktop/mobile in both themes before scaling the design.

**Phase 3 — P0 approval detail.** Implement three deep-linked flows, correct state branches, evidence panels and confidentiality. Review against document and product evidence.

**Phase 4 — P1 feature pages.** Complete setup/syllabus/bank/studio; calendar/generation/validation; analytics/security/portals; solutions/company/resources. Each page uses a specific scenario rather than duplicated generic cards.

**Phase 5 — P1 screens and conversion.** Integrate authenticated product evidence, demo delivery and confirmation; add approved legal text needed for collection. Review complete visitor-to-enquiry journey.

**Phase 6 — SEO and release verification.** Apply exact section 09 title/description, update route metadata, canonical/sitemap/robots and existing schema. Check redirects/old anchors, accessibility, loading and consent behavior. Run production build and runtime checks; deploy only in an authorized implementation/release task.

**Phase 7 — P2 evidence-led growth.** Add independently substantiated case studies/metrics, maintained blogs/resources, searchable content and verified integrations as assets become available. These are not reasons to hold finished P0 pages indefinitely, but must remain recorded as incomplete if unavailable.

## Acceptance and technical checks

- Every customer-facing source passage maps to a destination or explicit non-public classification. Exact-copy comparison passes after normalizing layout-only whitespace; no unapproved paraphrases.
- All twelve feature areas, three approval routes, exact six stages and eight screen categories are accounted for. Links and mobile menu match the route map.
- Existing visual identity, branding, light/dark themes and accessible interactions remain. Review at 390px, tablet and wide desktop; no clipped navigation, overflow or unreadable diagrams.
- Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build` from `template-solar-main`; resolve failures without disabling checks. Add focused tests for changed submission behavior and state-diagram branches where implemented.
- Verify real browser navigation, menu dismissal/focus, anchors, form invalid/success/failure behavior, screenshots, metadata and production routes. Use existing QA scripts as starting points after auditing assertions.
- Use actual product admin/faculty/reviewer/exam-cell accounts to test compliant/invalid papers, revision/rejection/escalation/locking, access isolation, release authorization, imports/exports, PDF/DOCX fidelity and notifications. Record separately from website QA; no credentials are needed merely to rewrite marketing pages.
- Check live domain/SSL/canonicals/indexing/sitemap and demo delivery after deployment. Current audit did not verify these.

## Inputs needed before dependent work

Exact copy and page restructuring can proceed from this document. Publication dependencies are authentic product screens; released/beta/planned status; intended enquiry destination and provider; approved privacy/terms/contact details; verified security/integration statements; and substantiated case-study assets. These are recorded dependencies, not requests to delay this planning deliverable.

## Final difference register

See `differences.md` for the complete Keep / Replace / Expand / Move / New classification, beginning with navbar changes. It distinguishes content present in source from operational capabilities not verified. `todo.md` turns the plan into ordered, checkable implementation tasks. No source code was edited, committed, pushed or deployed for this planning request.
