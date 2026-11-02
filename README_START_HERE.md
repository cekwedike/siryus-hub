# SIRYUS Codex handoff package

## How to use
1. Extract the full package. Copy `AGENTS.md` to the **root of your existing** `siryus-hub` folder. If an `AGENTS.md` already exists, reconcile it first; do not overwrite blindly.
2. Copy `docs/` files into existing `docs/`, merging with existing docs. Copy `logos/signal/` into the folder `/logos/signal/` at project root. Add your genuine parent, A.M, ARC. Creatives and PAVO Create logo source assets into sibling `/logos` subfolders.
3. Put the approved SIGNAL. reference image in `/logos/signal/reference-approved-board.png` for comparison. The provided derivatives are visually inspired by that board but not pixel-exact original master vectors.
4. Open VS Code at `C:\Users\cheed\Desktop\SIRYUS\siryus-hub` and open Codex.
5. Paste the short kickoff below. The long complete prompt is at `docs/CODEX_MASTER_PROMPT.md`. Its instructions are enforceable via `AGENTS.md` and detailed docs.

## Codex kickoff prompt
> Read `AGENTS.md` and every document in `docs/`, especially `docs/CODEX_MASTER_PROMPT.md`. Inspect the entire actual Astro repository and current Git changes, including `src`, `public`, `studio`, `studio-arc`, `/logos` and deployment configuration. **Begin with PHASE 0 only**: create `docs/CURRENT_STATE_AUDIT.md` and a complete route/content migration matrix, identify what Codex already implemented incorrectly, run baseline build/lint, and propose file-specific corrections. Do not rewrite the repository or deploy yet. Show me the audit and repair order, then implement one reviewed phase at a time, honoring all hard rules.

## What is included
- `AGENTS.md` authoritative rules.
- `docs/CODEX_MASTER_PROMPT.md` complete specification and execution sequence.
- Architecture, navigation, copy, migration, Sanity, visual QA, deployment, SIGNAL. design specifications and checklist.
- `logos/signal/` source SVG approximations and raster exports.

## Limitations
This package is grounded in the **uploaded historical README and screenshots**, not an inspection of your local Windows repository. Codex must verify what exists now. All logo files here are **reconstructed working assets** and need comparison against the approved design. No production credentials or fabricated contacts are provided.
