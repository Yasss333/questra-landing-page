# Questra final blueprint implementation checklist

Implementation status updated 2 November 2026: Phase 0 and Phase 2 marketing frontend work are implemented locally; see `phase-zero-review.md` and `phase-two-review.md`. The table below retains the original deliverable contract. T02/T18 production evidence, T22 provider delivery, T25 product-operation acceptance and T26 evidence-led growth remain dependent on external inputs. T20 legal/blog portions await approved source material. No deployment or product backend construction was performed in Phase 2. Paths below are relative to `template-solar-main/` unless specified.

| Task | Deliverable and acceptance criteria | Dependencies | Likely files | Verification | Size |
| --- | --- | --- | --- | --- | --- |
| T01 | Exact-copy inventory: every source passage assigned a destination; editorial notes classified non-public | None | `tasks/content-inventory.md` | Compare all document sections and tables | S |
| T02 | Capability/screen register: Live/Beta/Planned with owner/evidence; eight screenshots accounted for | T01 | `tasks/evidence-register.md` | Product owner review; flag unknowns | S |
| T03 | Navbar: six document groups plus CTA; desktop/mobile destinations agree; duplicates removed | T01 | `Navbar.tsx`, navigation CSS | Keyboard/mobile/link checks | M |
| T04 | Footer: revised groups, exact brand attribution, valid approved destinations | T03 | `Footer.tsx` | Link and copy audit | S |
| T05 | Hero and pillars: exact section 01/03 wording and CTA variants | T01 | `Hero.tsx`, `HomeSections.tsx` | Verbatim comparison; both themes/mobile | M |
| T06 | Homepage six-stage journey and closing: exact stages and final conversion text | T05 | `HomeSections.tsx`, `ProductContent.tsx` | Copy/order/link checks | M |
| T07 | Approval homepage showcase: exact signature copy; three distinct routes | T06 | `ProductContent.tsx`, homepage | Compare source table and responsive layout | S |
| T08 | Approval detail: three deep-linked flows, branching changes/rejection, separate validation/lock/release, evidence controls | T02,T07 | approval page, shared approval component/styles | Flow and evidence review; no backend claims inferred | M |
| T09 | Academic setup and syllabus pages: dedicated setup, imports/wizard, exact content and coverage detail | T01,T03 | new setup page, syllabus content | Copy/route review and screenshots | M |
| T10 | Bank and studio pages: exact source copy, provenance, reviewer edits and answer drafts | T01,T03 | feature content and existing route wrappers | Metadata/copy/screen checks | M |
| T11 | Calendar and generation: schedule/pattern destination, eligible/alternate sets, locked versions | T09,T10 | calendar page, generation content | Scenario/link/content checks | M |
| T12 | Validation: dedicated rules, advisory/blocking examples, exception and report explanation | T08,T11 | validation page/content | Check all ten source rule categories | M |
| T13 | Analytics: Bloom’s/CO/PO/report anchors, filters and operating readiness | T01,T03 | analytics content/page | All six scope filters and claim audit | M |
| T14 | Security: factual controls, recovery/retention and verified catalog | T02,T03 | security content/page | Evidence and copy review | M |
| T15 | Portals: faculty destination/queue and student-safe rewrite | T02,T03 | faculty page, student page/content | Role and confidentiality review | M |
| T16 | Platform index and How It Works: twelve areas and source six stages; setup detail relocated | T09–T15 | platform/how-it-works pages | Route coverage and source comparison | M |
| T17 | Solutions and comparison: four audience groups, five homepage roles, two exam scenarios | T08,T11 | solutions content, homepage section | No unsupported exam-policy assumptions | M |
| T18 | Product Screens: eight authenticated/redacted screenshots or explicitly recorded missing evidence | T02,T08–T15 | screens page, public assets | Authenticity, confidentiality, alt text | M |
| T19 | Remove legacy homepage duplication/sample metric evidence; fit approved sections | T05–T18 | homepage, bulk section, styles | Desktop/mobile content walkthrough | M |
| T20 | Company and resources: exact supplied copy; approved contact/FAQ/privacy/terms; blog content dependencies recorded | T01,T14 | route/content files, split by destination | No fabricated legal or editorial material | M per destination |
| T21 | Demo form: agreed labels/requiredness and truthful preferred-date request | T01 | `DemoContact.tsx`, `lib/demo-enquiry.ts` | Valid/invalid inputs and preserved fields | S |
| T22 | Demo delivery: agreed server/provider integration, truthful accepted/error states and verified lead receipt | T20,T21; provider input | submission endpoint/service and form | Input/abuse checks; provider and inbox evidence | M |
| T23 | Metadata: exact title/description, new canonicals/sitemap, schema visible-content agreement and old-link continuity | T16,T20 | site config, metadata, sitemap/schema | Production HTML and route crawl | M |
| T24 | Final QA: content traceability, type/lint/build, real-browser responsive/accessibility/theme/form checks | T03–T23 | QA scripts/results | All acceptance checks in plan pass | M |
| T25 | Product acceptance evidence: role accounts, approvals, invalid papers, access/release, imports/exports and notifications | T02; actual product access | evidence register | Separate operational verification, not frontend simulation | M per workflow |
| T26 | P2 growth: substantiated case studies, maintained blogs/search and integrations | Verified assets | resource destinations | Source-backed claims and search usability | M per slice |

## Checkpoints

- [ ] After T01–T04: review copy placement, navbar and route mapping.
- [ ] After T05–T07: review homepage before expanding remaining pages.
- [ ] After T08: review exact approval model and capability labels.
- [ ] After T09–T19: confirm twelve feature areas and eight screen categories are covered.
- [ ] After T20–T23: verify complete enquiry journey, legal dependencies and SEO.
- [ ] After T24–T25: record website and product verification separately; resolve publication gaps.
- [ ] Release readiness: concrete preview and verification report available for deployment decision.

## Commands for implementation verification

From `template-solar-main/`: `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, followed by production-server browser checks. Run focused tests for new submission logic. Do not weaken lint/type rules to pass. No implementation checks were run as part of this read-only source audit.
