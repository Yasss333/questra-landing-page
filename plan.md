# Questra Homepage Plan

## Goal and scope

Create one premium, customer-facing marketing homepage using the selected Solar template and supplied Questra content. Navigation links move between sections on the same page. The primary conversion is an institutional demo enquiry; the Student Portal is part of the product offering.

Authentication, academic backend workflows, and image uploads/sharing between users remain outside this scope. The interactive dashboard has since been expanded in place into an eleven-module frontend demo with temporary illustrative data.

## Approved palette

| Role | Color | Use |
| --- | --- | --- |
| Primary blue | `#084DB5` | Buttons, links, active navigation |
| Green | `#19A889` | Supporting accents and approved states |
| Deep navy | `#102442` | Headings and strong text |
| Soft background | `#F5F8FC` | Page and section backgrounds |
| White | `#FFFFFF` | Cards and product surfaces |
| Secondary text | `#64748B` | Descriptions and supporting labels |

Retain the template's spacious layout and typography. The rendered Solar branding, farming visuals, and marketing copy have been replaced with Questra content. The dashboard retains its frame and uses the approved palette with light/dark theme support.

## Page checklist

- [x] **Navbar:** Supplied logo, Platform mega menu covering capabilities/review/workflow/analytics/dashboard, Resources dropdown for FAQ/contact, direct Student Portal and demo links, mobile expandable groups, outside-click dismissal, and keyboard navigation/Escape support.
- [x] **Hero:** Examination intelligence positioning, institutional value, primary demo CTA, and secondary platform link.
- [x] **Interactive dashboard:** Existing frame extended with eleven modules, eight Master Data tabs, academic filters, question drafts/review/release, staff/outcome mapping, paper review/locking, and sample CSV exports.
- [x] **Platform capabilities:** Syllabus/masters, AI Question Studio, contextual question banks, paper patterns/generation, and answer keys/exports, with availability qualified where unverified.
- [x] **Faculty review:** Editable drafts, review comments, retained revisions, academic oversight, and controlled release, illustrated with a labelled concept.
- [x] **Workflow:** Six connected steps from curriculum mapping through question creation, bank review, blueprints, moderation, and authorized release.
- [x] **Student Portal:** Six feature descriptions cover current subjects, syllabus exploration, approved practice questions, authorized past papers, content analytics, and institution-managed access. The earlier concept image was removed in a separate user-directed update.
- [x] **Analytics:** Syllabus gaps, Bloom's levels, and outcome mapping, with sample figures labelled and content coverage distinguished from student proficiency.
- [x] **FAQ:** Expandable answers about faculty control, exam patterns, imports, student access, and outcome-oriented review.
- [x] **Demo / Contacts:** Validated form prepares an email addressed to `voicedotsio@gmail.com`. The visitor opens and sends it through their email app. No phone number is displayed.
- [x] **Footer:** Questra branding, contact email, internal navigation, and copyright. Legal links await approved content.

## Current progress

- [x] Review the blueprint, logo, and visual references.
- [x] Confirm the single-page marketing scope and approve the palette/section order.
- [x] Extract and assess the Solar template; run it at `http://127.0.0.1:3001`.
- [x] Add and verify the initial interactive dashboard in the earlier phase.
- [x] Build the Questra marketing homepage around the existing dashboard.
- [x] Verify desktop/mobile navigation, FAQs, image loading, form validation, and addressed email-draft preparation.
- [x] Pass TypeScript checks and lint for the marketing files; restart localhost and verify the homepage.
- [x] Full production build: compilation, lint, TypeScript, and static route generation passed on 26 October 2026; the earlier dashboard key errors are resolved.
- [ ] User review of the completed marketing homepage.
- [x] Complete the subsequently requested dashboard expansion in place.

## Delivery checks

- [x] Use supplied logo/imagery and label product concepts and illustrative data.
- [x] Add heading hierarchy, descriptive controls, keyboard focus, skip navigation, and reduced-motion styling.
- [x] Check mobile menu selection/Escape behavior and confirm no horizontal page overflow at phone and desktop widths.
- [x] Verify required form fields and email-draft contents with synthetic data; no test email was sent.
- [x] Replace rendered placeholder links and add Questra metadata, favicon, social image, robots, and sitemap.
- [x] Verify the homepage, favicon, social image, robots, and sitemap on localhost.
- [x] Run the full production build and verify the production server on localhost:3001, including read-only HTTP workload checks.
- [ ] Confirm legal copy, product availability claims, and any deployment requirements before public release.

## Confirmed inputs and remaining items

- [x] Supplied PNG logo used; SVG remains optional for future refinement.
- [x] Supplied Student Portal concept reviewed; its earlier image was subsequently removed at the user's request.
- [x] Public contact email: `voicedotsio@gmail.com`; no phone number for now.
- [ ] Approved legal content before adding legal pages/links.
- [ ] Product-owner confirmation of live versus planned capabilities.
- [ ] Future dashboard images or changes, when that phase resumes.

The enquiry form prepares a real `mailto:` draft. It does not automatically send messages, store enquiries, or claim inbox delivery. An automatic delivery service would be a separate integration if requested.

## Content and QA audit on 26 October 2026

- [x] Compare all 34 blueprint chapters with the marketing/demo scope; add missing capability, governance, audience, and Student Portal copy.
- [x] Fix whitespace-only enquiry/draft validation, dimension-dependent coverage totals, empty-scope paper assembly, dialog replacement/return focus, pagination reset after filter changes, outcome-event handling, misleading empty states, and formula-like CSV content.
- [x] Pass 88 data/form assertions and 1,440 academic scope combinations; exercise filtering over 10,000 sample records.
- [x] Pass 41 HTTP/SSR checks and a 40-request localhost workload at concurrency four against the verified production build.
- [x] Finish the current desktop/tablet/mobile browser matrix using the explicitly approved local Playwright fallback with installed Chrome. Pass 211 browser scenarios: ten widths from 320–1920px, light/dark themes, phone landscape, eleven modules, eight Master Data tabs, keyboard/focus, native browser touch events, animation/reduced motion, forms, downloads, release/locking, 110 rapid transitions, and four isolated concurrent contexts. No uncaught page exceptions or HTTP 5xx responses were observed. Physical devices, Safari, and Firefox were not tested.
- [x] Review screenshots of the additional content and rerun affected workflows against the final production build. All 340 browser/model/HTTP checks passed. No deployment was performed in this audit.

Current evidence and the chapter-by-chapter scope map are saved in `artifacts/questra-qa-report-2026-10-26.html`, with reproducible model and HTTP scripts/results beside it.
