# Questra Homepage Plan

## Goal and scope

Create one premium, customer-facing marketing homepage using the selected Solar template and supplied Questra content. Navigation links move between sections on the same page. The primary conversion is an institutional demo enquiry; the Student Portal is part of the product offering.

Authentication, academic backend workflows, and image uploads/sharing between users remain outside this scope. At the user's request, the existing interactive dashboard is retained unchanged for a later phase.

## Approved palette

| Role | Color | Use |
| --- | --- | --- |
| Primary blue | `#084DB5` | Buttons, links, active navigation |
| Green | `#19A889` | Supporting accents and approved states |
| Deep navy | `#102442` | Headings and strong text |
| Soft background | `#F5F8FC` | Page and section backgrounds |
| White | `#FFFFFF` | Cards and product surfaces |
| Secondary text | `#64748B` | Descriptions and supporting labels |

Retain the template's spacious layout and typography. The rendered Solar branding, farming visuals, and marketing copy have been replaced with Questra content. The deferred dashboard keeps its existing styling.

## Page checklist

- [x] **Navbar:** Supplied logo, same-page section links, Book a Demo CTA, mobile menu, skip link, and keyboard dismissal.
- [x] **Hero:** Examination intelligence positioning, institutional value, primary demo CTA, and secondary platform link.
- [ ] **Interactive dashboard:** Existing interactive preview retained. Branding, additional imagery, and further dashboard changes are deferred.
- [x] **Platform capabilities:** Syllabus/masters, AI Question Studio, contextual question banks, paper patterns/generation, and answer keys/exports, with availability qualified where unverified.
- [x] **Faculty review:** Editable drafts, review comments, retained revisions, academic oversight, and controlled release, illustrated with a labelled concept.
- [x] **Workflow:** Six connected steps from curriculum mapping through question creation, bank review, blueprints, moderation, and authorized release.
- [x] **Student Portal:** Supplied concept image, current subjects, syllabus exploration, approved practice questions, and authorized past papers. Institution publication policies remain clear.
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
- [ ] Full production build: compilation passed, but lint is blocked by two missing React keys in `src/components/ui/dashboard/MasterDataView.tsx:41`. This separately edited dashboard file is left untouched.
- [ ] User review of the completed marketing homepage.
- [ ] Resume dashboard design only when requested.

## Delivery checks

- [x] Use supplied logo/imagery and label product concepts and illustrative data.
- [x] Add heading hierarchy, descriptive controls, keyboard focus, skip navigation, and reduced-motion styling.
- [x] Check mobile menu selection/Escape behavior and confirm no horizontal page overflow at phone and desktop widths.
- [x] Verify required form fields and email-draft contents with synthetic data; no test email was sent.
- [x] Replace rendered placeholder links and add Questra metadata, favicon, social image, robots, and sitemap.
- [x] Verify the homepage, favicon, social image, robots, and sitemap on localhost.
- [ ] Re-run the full production build after the dashboard lint errors are resolved; then check the production server.
- [ ] Confirm legal copy, product availability claims, and any deployment requirements before public release.

## Confirmed inputs and remaining items

- [x] Supplied PNG logo used; SVG remains optional for future refinement.
- [x] Supplied Student Portal concept image used.
- [x] Public contact email: `voicedotsio@gmail.com`; no phone number for now.
- [ ] Approved legal content before adding legal pages/links.
- [ ] Product-owner confirmation of live versus planned capabilities.
- [ ] Future dashboard images or changes, when that phase resumes.

The enquiry form prepares a real `mailto:` draft. It does not automatically send messages, store enquiries, or claim inbox delivery. An automatic delivery service would be a separate integration if requested.
