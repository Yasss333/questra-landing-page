# Existing website and final blueprint differences

Audit date: 2 November 2026. Compared the complete supplied DOCX with current local Next.js source. Live fetches failed in this environment; this is not an independently verified deployed-site or backend audit. Status describes website coverage, not production feature availability.

## Navbar and footer differences

| Existing | Blueprint | Difference and action |
| --- | --- | --- |
| Platform, Student Portal, Solutions, Resources | Home, Platform, Intelligence, Solutions, Resources, Company | Add Home/Intelligence/Company; remove Student Portal top-level placement |
| Syllabus and Analytics inside Platform | Intelligence has Coverage, Bloom’s, CO/PO, Validation, Reports | Move/split links; add dedicated validation destination |
| Platform has Faculty review and Examination workflow | Platform groups setup, bank, studio, generation, approval | Remove duplicate review nav entry; move workflow to Resources; add setup |
| Resources contains About, Solutions, Security, workflow, FAQ, Contact/demo | Resources contains How It Works, Product Screens, FAQs, Blogs, Security & Privacy | Move About/Contact to Company; remove duplicate Solutions; add Screens/Blogs |
| Large Student Portal panel in Platform menu | No standalone Student Portal top-level group prescribed | Replace panel with relevant platform/approval navigation; retain portal destinations |
| CTA says `30-Minute Demo` in desktop navbar | `Request a 30-Minute Live Demo` | Replace abbreviated label |
| Footer has Platform / Explore / Company & contact | New architecture includes Intelligence, Resources, Company/legal | Regroup links; add approved privacy/terms |
| Attribution `A product of VoiceDots AI` | `A Product of Voicedots AI` | Apply approved spelling/case verbatim |

## Content and feature differences

| ID | Area | Current source | Final document requirement | Classification/action |
| --- | --- | --- | --- | --- |
| D01 | Hero headline | Same core message with different case and line structure | `From Syllabus to Final Approval.` | Replace exact text |
| D02 | Hero body | Combined paraphrased subheadline and description | Separate exact subheadline and full import-to-release description | Replace, not append |
| D03 | Secondary CTA | `Explore the complete workflow` | `View How Questra Works` on homepage | Replace |
| D04 | Executive positioning | General connected-workflow/problem messaging | `One Intelligent Platform. Every Question. Every Examination. Every Approval.` and supplied supporting copy | Replace old introduction |
| D05 | Value pillars | Four short badges plus general capabilities | Four named pillars with supplied descriptions | Add exact pillar section; remove redundant slogans |
| D06 | Six stages | Curriculum → questions → bank review → blueprint → subsequent review/release | Setup → bank/studio → blueprint/generation → automated requests → review/validation/approval → secure export/release/reporting | Replace ordering and wording |
| D07 | Onboarding | Eleven-step guide on How It Works; combined syllabus/setup feature page | Dedicated academic master/onboarding coverage with wizard/import/error/re-import evidence | Expand; move detailed setup to dedicated destination |
| D08 | Platform index | Six broad modules | Twelve detailed feature areas | Expand and relink |
| D09 | Syllabus | Versioning, mapping and gap concepts already described | Explicit planned vs available, topic drilldowns, missing alerts, semester mapping | Retain concepts; replace copy and expand evidence |
| D10 | Question bank/studio | Existing separate pages include tags, edits, duplicates, sources and approval | Exact combined feature description plus explicit AI/human provenance and source-grounded suggestions | Rewrite both coherently; strengthen provenance evidence |
| D11 | Calendar/patterns | Pattern cards and setup descriptions; no calendar route | Schedules, deadlines, reminders, repeated blueprints and versioned rules | New focused page/screen |
| D12 | Generation | Existing detailed page, alternate sets and coverage checks | Exact copy plus equivalent sets, eligibility and locked versions | Expand evidence and replace wording |
| D13 | Bulk homepage section | Promotional `Simplicity of Super Intelligence...` headline and sample counts | Approved homepage copy and authentic dashboard walkthrough | Remove legacy headline; replace simulated metric evidence |
| D14 | Approval overview | Three pathways already exist | Exact signature headline and supplied overview | Replace copy; retain three-way structure |
| D15 | Question approval | Broad route and governance cards | Subject-specific 1–3 stages, delegation, SLA, revisions, escalations and history | Expand flow and evidence |
| D16 | Mid-term approval | Route summary shares generic states | Separate schedule/scope path with deadline and final approval evidence | Expand distinct anchored section |
| D17 | Semester approval | Independent moderation and sealed/timed release are described | Exact source route, restricted preview, logs, immutability and separation | Replace route copy; expand evidence; avoid unverified timing promises |
| D18 | State diagram | Changes requested and rejected listed in an ordered list; `Locked and released` combined | Branch outcomes; separate Final Validation, Locked, Authorized Release | Correct diagram semantics |
| D19 | Decision controls | Roles, returns, versions, escalation/delegation described | Explicit self-approval policy, conflicts, allotment, annotations/comparison and evidence fields | Expand; actual enforcement unverified |
| D20 | Validation | Scattered throughout platform/generation pages | Dedicated quality feature with advisory/blocking rules, explanations, exception approvals, downloadable reports | New dedicated destination and examples |
| D21 | Analytics | Coverage/Bloom’s/outcome content exists | Readiness, deadlines, pending approvals, bottlenecks, six scope filters, scheduled exports/permissions | Expand operational reporting |
| D22 | Dashboard walkthrough | Sample records; only Overview/Master data/Question bank unlocked | Eight named product screen categories and authentic dashboard screenshots | Add evidence gallery; do not unlock or rebuild product automatically |
| D23 | Faculty workspace | Role descriptions; no faculty-portal route | Assigned subjects, priorities, tasks, paper requests, review status | Add faculty destination and screen |
| D24 | Student access | Strong separate student marketing and practice/past-paper descriptions | Balanced Student & Faculty Portals; no confidential papers | Reposition; retain permitted-resource boundary; align copy |
| D25 | Solutions | Eight role cards on a general hub | Universities, Autonomous Colleges, Examination Cells, Faculty & HoDs; homepage five role benefits | Add institution-type sections; retain relevant role detail |
| D26 | Exam comparison | Mentions mid-term/end-semester in prose and bulk cards | Explicit comparison on homepage | Add comparison table |
| D27 | Security | General permissions/review/release descriptions | Factual isolation, encryption, backups, retention, recovery and verified integrations | Expand only with evidence; no certifications inferred |
| D28 | Demo form fields | Name, email, institution, optional mobile/type/scale/exam focus/date-time/message, role, consent | Institution, role, work email, phone, examination type, preferred date | Mostly existing; align labels and requiredness; do not rebuild as missing |
| D29 | Demo action | `prepareDemoEnquiry` builds email draft; no lead submission endpoint shown | Tested lead routing and confirmation | Separate integration required; date remains a preference |
| D30 | Closing section | `Every question matters. Every approval matters.` and custom paragraph | Exact two section 11 paragraphs and CTA | Replace |
| D31 | Product screens/resources | Homepage preview and FAQ anchor; no Screens/FAQ/Blogs routes | Dedicated Screens, FAQs, Blogs, maintained/searchable resources | Add destinations and publishing process |
| D32 | Company/contact/legal | About and demo routes; no standalone contact/privacy/terms | Company group with About, Contact, Request Demo, Privacy, Terms | Add approved content/routes; preserve demo URL |
| D33 | SEO text | Current title/description paraphrase automation/approval | Exact suggested title and description in section 09 | Replace config and related previews |
| D34 | Schema/SEO infrastructure | Organization, Website, WebPage, SoftwareApplication, FAQ; canonical/sitemap/robots already exist | Applicable schema and route discovery | Keep infrastructure; update content/routes rather than claim missing |
| D35 | Proof/case studies | Inspected homepage does not show verified case studies | Independently substantiated case studies and outcomes | P2 content dependency; do not invent |
| D36 | Availability | Marketing copy is not proof of released controls | Live / Beta / Planned classification and role-account testing | Add evidence register and publication labels |
| D37 | Quality checks | Source contains accessibility and reduced-motion work; historical QA artifacts exist | Current mobile/performance/accessibility/SEO/security/consent checks | Reverify current revision; historical passes are insufficient |

## Differences in what can be demonstrated

The repository is a marketing frontend with a sample-data dashboard. Its navigation exposes product concepts, but eight dashboard tabs are gated behind demo CTAs. Existing prose about routing, approvals, notifications, confidentiality, imports, exports or security does not prove those services are operational.

The document combines website requirements with product acceptance requirements. Rewriting pages and adding authentic screenshots belongs to this website project. Implementing institution authentication, actual 1–3-level approvals, immutable decisions, confidential release, notification infrastructure or ERP/LMS integrations is separate product work unless specifically commissioned. Product verification remains a dependency for publishing availability claims.

## Removal summary

Remove or replace the abbreviated navbar CTA, misplaced/duplicate navbar entries, top-level Student Portal placement, old problem/pillar/closing slogans, paraphrased hero and feature descriptions, old six-stage order, combined lock/release state, and synthetic counts presented as product evidence. Preserve useful routes, approved brand styling, themes, accessible controls, contact details and the student confidentiality boundary. Do not delete reusable dashboard code or legacy assets merely because their homepage placement changes.
