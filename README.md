# Questra Landing Page

**Intelligence Behind Every Question.**

An institutional marketing website for Questra, presenting its approach to syllabus management, AI-assisted question creation, faculty review, examination preparation, and student learning. The homepage includes an interactive dashboard preview with illustrative academic data.

![Questra design preview](artifacts/theme-colors-corrected.jpg)

## Features

- Responsive homepage with section navigation and a mobile menu.
- Interactive product dashboard preview for exploring academic workflows.
- Platform overview covering curriculum mapping, question banks, paper generation, and academic review.
- Faculty review, examination workflow, Student Portal, and analytics sections.
- Expandable FAQs and a validated institutional demo enquiry form.
- Theme switching, keyboard focus states, skip navigation, and reduced-motion styling.
- Site metadata, social preview image, favicon, robots rules, and sitemap.

## Technology

| Area | Stack |
| --- | --- |
| Framework | Next.js 15 with the App Router |
| Interface | React 19 and TypeScript |
| Styling | Tailwind CSS 4 and CSS Modules |
| Animation | Motion |
| Icons | Remix Icon and Lucide |
| Package manager | pnpm with a committed lockfile |

## Getting started

Install Node.js and pnpm, then clone the repository:

```sh
git clone https://github.com/Yasss333/questra-landing-page.git
cd questra-landing-page/template-solar-main
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The Next.js application lives in `template-solar-main/`. Run all application commands from that directory.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve an existing production build |
| `pnpm lint` | Run the configured Next.js lint command |
| `pnpm exec tsc --noEmit` | Check TypeScript types |

To run a local production server:

```sh
pnpm build
pnpm start
```

Development output is written to `.next-dev/`; production output is written to `.next/`.

## Repository structure

```text
questra-landing-page/
├── README.md
├── plan.md                         # Scope and recorded implementation checks
├── artifacts/                      # Design preview images
└── template-solar-main/             # Next.js application and hosting root
    ├── public/
    │   ├── brand/                  # Questra logo
    │   └── images/                 # Product and template images
    ├── src/
    │   ├── app/                    # Homepage, layout, styles, and metadata
    │   ├── components/
    │   │   ├── marketing/          # Homepage sections and demo enquiry form
    │   │   └── ui/dashboard/       # Interactive dashboard views and demo data
    │   ├── lib/                    # Shared helpers
    │   └── registry/               # Additional UI components
    ├── package.json
    ├── pnpm-lock.yaml
    └── LICENSE.md                  # Upstream template license
```

## Customization

Paths below are relative to `template-solar-main/`:

| Change | File or directory |
| --- | --- |
| Site name, canonical URL, description, and contact email | `src/app/siteConfig.ts` |
| Homepage section order | `src/app/page.tsx` |
| Marketing content | `src/components/marketing/HomeSections.tsx` |
| Enquiry fields and email draft | `src/components/marketing/DemoContact.tsx` |
| Marketing styles | `src/components/marketing/Marketing.module.css` |
| Navigation styles | `src/components/marketing/Navigation.module.css` |
| Dashboard sample data | `src/components/ui/dashboard/demo-data.ts` |
| Brand assets | `public/brand/` |

## Deployment

Use a hosting provider that supports Next.js and configure:

| Setting | Value |
| --- | --- |
| Project root | `template-solar-main` |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Start command, if required | `pnpm start` |

Set `siteConfig.url` to the intended public domain before deploying so generated metadata and sitemap URLs match the deployment. Environment files, dependencies, and generated output are excluded from Git.

## Project notes

- **Demo enquiries:** The form prepares a `mailto:` draft addressed to the configured contact email. Visitors must open and send the draft from their email application. The website does not automatically send or store enquiries.
- **Product preview:** Dashboard data and product concepts are illustrative. This repository contains the marketing site and frontend preview; production academic services and authentication require separate integration.
- **Verification:** `plan.md` records implementation scope and earlier checks. Run the commands above against your current checkout before deploying.

## Attribution

The project is based on Tremor's Solar template. Its included MIT license and copyright notice are preserved in [template-solar-main/LICENSE.md](template-solar-main/LICENSE.md).
