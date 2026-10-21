<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Figma-MCP-to-UI Fidelity Rule (MANDATORY, applies to every Figma design I give you)

When I give you a Figma link / node / frame, the Figma file (read through the Figma MCP) is the single source of truth. Implement it EXACTLY. Do not redesign, improve, simplify, or substitute anything.

0. Access first: if the Figma MCP is not connected, the link/node-id is missing, or you cannot read the node, say so and STOP. Never guess from the file name, from memory, or from a similar design. Ask me for the link or specs.

1. Fetch before coding: for every frame/node you implement, pull all of: design context/layout data, variables/styles, a screenshot, and metadata (use whatever tools the MCP provides, e.g. get_design_context, get_variable_defs, get_screenshot, get_metadata). Use the exact node I linked, not the whole file. Treat MCP-generated code as a reference only: adapt it to this project's stack (Next.js App Router, Tailwind, shadcn/ui) but keep every value exact.

2. Colors: use the exact values from Figma (fills, strokes, text, gradients, shadows, opacity). If Figma variables/styles exist, map them to CSS variables with the exact same values. No theme defaults, no "close enough" colors.

3. Layout & spacing: match auto-layout direction, gap, padding, margins, sizes, constraints, alignment, grid/columns, borders, shadows, proportions. Typography: same font family, size, weight, line-height, letter-spacing (Arabic font: Cairo or Tajawal unless Figma uses another).

4. Border radius: read the exact value from the node (including per-corner radii) and apply the same px on every element. Never replace it with a theme default (rounded-md, rounded-lg...). Fully round stays fully round, square stays square.

5. Icons & assets: use the actual vector/image assets from Figma (export SVG/PNG from the node) when possible. Same shape, style, stroke weight, size, color, position. Never replace or drop an icon. If the exact asset cannot be exported, use the closest match and tell me.

6. Element order & hierarchy: follow the layer/auto-layout order exactly. Do not reorder, merge, add, or drop elements. Ignore hidden layers.

7. Text: use the same labels, headings, and placeholders as in Figma, unless I say otherwise. The whole site is Arabic: if the Figma text is in another language, translate it faithfully to Arabic without changing meaning or length drastically.

8. States & behavior: implement every variant/state in the design (hover, active, focus, disabled, selected, error, empty, loading). Follow the prototype connections: every click/interaction must work and lead to its matching page/screen, exactly as in the Figma prototype. Do not leave dead buttons or placeholder links.

9. Language & direction: the whole site is Arabic. All UI text in Arabic, dir="rtl", lang="ar". Mirror the layout (sidebar on the right, text/icons aligned right, table columns, form fields, breadcrumbs, arrows/chevrons). Use logical CSS properties (margin-inline-start, padding-inline-end, text-align: start), never left/right. If the Figma frame itself is LTR, ask me before mirroring.

10. Responsiveness: desktop identical to the Figma frame. If Figma has tablet/mobile frames, follow them exactly. If not, make it responsive without changing the design language. RTL on all breakpoints.

11. Components: build with shadcn/ui where it fits, but override styles so the result matches Figma exactly (colors, radius, spacing, typography). Reuse one component for repeated elements instead of duplicating.

12. Ask, don't guess: if anything is unclear (icon, color, spacing, radius, state, text, missing frame, conflicting values), STOP and ask me before implementing.

Before finishing: take the Figma screenshot of the node and compare it with the rendered result element by element (colors, radius, spacing, typography, icons, order, states, navigation, direction, Arabic text). Fix every difference. Do not ask me to repeat these rules.
