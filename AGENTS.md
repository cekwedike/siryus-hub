# SIRYUS Astro ecosystem instructions

## Scope

These rules apply to this repository. Read `docs/ecosystem/README.md` before implementation work.

## Package manager

- Use pnpm only. Convert every npm, yarn, or npx command to pnpm or pnpm dlx.
- Keep `pnpm-lock.yaml` as the only lockfile after the user approves lockfile cleanup.
- Do not delete `package-lock.json` files without explicit approval.

## Required research

- Before changing Astro, Sanity, Vercel, Cloudflare, or Remotion code, check current official documentation through Context7 or the matching documentation tool.
- Record material version-sensitive decisions in the relevant file under `docs/ecosystem/`.

## Product and brand rules

- Siryus Creative Media Ltd is the parent company. Never call it a holding company.
- The parent site is a small ecosystem doorway, not a duplicate of every brand site.
- The four parent-site cards are SIRYUS A.M, ARC. Creatives, PAVO, and SIGNAL.
- PAVO is the product name. PAVO Create Ltd is the legal name only. The PAVO card links to `https://pavocreate.com/`; do not build a PAVO route here.
- Always use the full name `ARC. Creatives` in prose. A compact logo may use `ARC.` only when the approved artwork does.
- SIGNAL. branding and logo are pending. Do not invent its visual identity.
- SIRYUS A.M currently manages Max Prodigy and Jlinez only. Hidaya is legacy. Winny is future and must not be presented as currently managed.
- Acoustic Rwanda must not appear in the new public experience.

## Design and copy hard rules

- Do not use eyebrow headers.
- Do not use pills, rounded badge chips, or pill-shaped navigation containers.
- Do not add horizontal line dividers unless the user asks.
- Do not use em dashes in visible copy.
- Avoid generic template layouts, needless gradients, and decorative elements without a purpose.
- Keep visible copy conversational, clear, and around Grade 6 to 7 reading level.
- Use a clear heading order, visible focus states, useful alt text, and reduced-motion support.
- Check at about 390 px and 1440 px, plus widths where the layout changes.

## Change safety

- Inspect `git status` before editing. Preserve existing work.
- Ask before deleting files, removing code or features, changing git history, committing, pushing, or deploying.
- Use a worktree or new branch for big or risky changes, after approval.
- Never write real secrets into files. Example environment files may contain empty keys only.
- Use `apply_patch` or the native editing tool for changes.
- Do not treat a route marked for retirement as permission to delete it. Follow the migration and redirect plan first.

## Verification

- After code edits run `pnpm install`, the configured lint task, `pnpm check`, and `pnpm build`.
- This repository currently has `lint:max-lines` rather than a general lint script. Run it and report that no full lint script exists.
- Check the built site with Playwright on desktop and mobile. Test navigation, external links, keyboard use, reduced motion, 404s, and redirects.
- Report every skipped or failed check. Deploy only after explicit approval for that deployment.

