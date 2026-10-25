# Questra Landing Page

Questra's institutional marketing homepage with an interactive product dashboard preview, built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

The application is in `template-solar-main/`.

```sh
cd template-solar-main
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

## Production commands

From `template-solar-main/`:

```sh
pnpm build
pnpm start
```

When configuring hosting, use `template-solar-main` as the project root.

## Project notes

- The demo enquiry form prepares an email draft in the visitor's email application; the visitor must send it.
- Dashboard data is illustrative.
- `plan.md` contains the implementation scope and recorded verification status.
- `artifacts/` contains design previews.

The project is based on Tremor's Solar template. The included upstream license is preserved in [template-solar-main/LICENSE.md](template-solar-main/LICENSE.md).
