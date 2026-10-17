# 🛑 ULTRA-STRICT ARCHITECTURE & GOVERNANCE RULES

# Project Scope: Admin Dashboard (Next.js App Router)

# WARNING: AI MUST OBEY THESE RULES ABSOLUTELY. NO ASSUMPTIONS, NO DEVIATIONS, NO SHORTCUTS.

---

## 0. DESIGN FIDELITY (HIGHEST PRIORITY FOR ANYTHING VISUAL)

**The AI has NO design opinion.** The design provided by the user is the single source of truth for every visual decision.

### 0.1 Precedence

1. The user's design (Google Stitch export, screenshot, HTML/CSS, Figma link, DESIGN.md, or written spec) → wins for everything visual.
2. Sections 1–7 below → win for architecture, security, data flow, and file structure.
3. shadcn/ui defaults → used ONLY where the design is silent, and only after telling the user.

### 0.2 Before writing any UI code

- Open and actually inspect the provided design (view the image / read the HTML). Never work from memory or guesswork.
- Write a short summary first: layout structure, sections, colors, fonts, font sizes, spacing, radii, shadows, icons, and visible states.
- If no design exists for the screen being built, **STOP AND ASK**. Never invent a design.

### 0.3 Forbidden without explicit user approval

- Changing layout, section order, alignment, or hierarchy.
- Changing colors, gradients, fonts, font sizes, spacing, border radius, shadows, or borders.
- Swapping icons or changing icon style/size.
- Rewriting, shortening, or "improving" any text, label, or placeholder from the design.
- Adding or removing elements, sections, animations, hover effects, or decorations that are not in the design.
- "Modernizing", "polishing", or "making it cleaner".

### 0.4 How to implement the design

- **Tokens first:** extract colors, fonts, spacing, radii, and shadows from the design into CSS variables / the Tailwind theme (once, in the global theme file). Components consume tokens only. **No hard-coded hex values inside components.** If a DESIGN.md or token file is provided, use it as-is.
- **Provided HTML/CSS (e.g. Stitch export):** treat it as a visual spec. Convert to React + Tailwind + shadcn/ui while preserving the same structure, sizes, and look, then rewire data and behavior to this architecture (Server Components by default, `'use client'` only on leaf interactive components).
- **shadcn/ui is a tool, not a style.** Override its defaults through tokens or wrapper components so the result matches the design. Never edit `src/components/ui/` primitives directly.
- **Responsive:** implement only the viewports provided. If only one is provided, implement it exactly and ask for the others. Do not invent other layouts.
- **Missing states** (hover, focus, loading, empty, error, disabled): if not in the design, use the minimal neutral version built from existing tokens, and list each one in the final report under "Not in design".
- **Real data vs. design text:** structure and static labels stay exactly as designed; only dynamic values come from the API.
- **RTL / bilingual designs:** use Tailwind logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) instead of left/right.
- **Design vs. architecture conflict:** keep the visuals identical, change only the implementation to the compliant approach, and tell the user.

### 0.5 Figma MCP (when the design is a Figma link or frame)

- Use the **Figma MCP** for every Figma-based task. Never work from a link or a pasted screenshot alone when the MCP is available.
- Work **one frame at a time**. The user provides a link with a node/frame id. If the link points to a whole file or page, ask which frame.
- Required sequence per frame, BEFORE writing code: (1) fetch the frame's structure/design context, (2) fetch its variables/tokens (colors, typography, spacing, radii), (3) fetch a screenshot of the frame as the visual reference.
- Map Figma variables to the Tailwind theme / CSS variables (see 0.4). Match Figma auto layout (direction, gap, padding, alignment, sizing) to the equivalent flex/grid classes exactly. Reuse existing components in `src/components/shared/` before creating new ones.
- Code returned by the MCP is a **reference only**. Convert it to this project's stack and architecture (Sections 1–2). Never paste it as-is (it may contain inline styles, absolute positioning, hard-coded values, or client-side patterns that violate these rules).
- If a Figma icon has no exact Lucide equivalent, export it as SVG and ask the user where to place it. Do not substitute a "similar" icon.
- If a Figma frame and another design source (e.g. Stitch) exist for the same screen, ask which one wins.
- If the MCP is not connected, the link is inaccessible, or the frame is not found: **STOP and tell the user.** Never fall back to guessing.

### 0.6 Verification (mandatory)

- After implementing, compare the result against the design section by section (use a browser/screenshot tool if available) and fix every difference.
- The final report MUST include a line: `Design deviations: none` or a list of each deviation with the reason.

---

## 0B. API CONTRACT (POSTMAN MCP)

**The user's Postman collection, accessed through the Postman MCP, is the single source of truth for the backend API.** The AI must never invent endpoints, fields, or response shapes.

- Before writing or changing any service, Server Action, or Zod schema that talks to the API, read the relevant request through the Postman MCP: method, URL, headers, auth type, query params, body, and saved response examples.
- Build Zod schemas (request AND response) and TypeScript types from those examples, in `src/features/[feature]/schemas/` and `types/`. API calls live only in `src/services/` (server-only).
- If an endpoint, field, or response example is missing or unclear, **ask the user.** Do not guess.
- Use the Postman MCP to test an endpoint while implementing or debugging (send the request, compare the real response to the schema). Report mismatches to the user instead of silently adapting the code.
- Map documented error responses (validation, 401, 403, 404, 5xx) to safe-action errors and user-facing toasts.
- Postman environment variables map to `.env` keys (base URL, tokens, keys). Private values stay server-only (Section 3). **Never** copy real token or secret values from Postman into code, commits, logs, or chat. Update `.env.example` with key names only.
- Do not modify the Postman collection unless the user asks.
- If the MCP is not connected or the collection/request is not found: **STOP and tell the user.** Never fall back to guessing.

---

## 1. ZERO-DEVIATION & ENFORCEMENT DIRECTIVE

- **DO NOT** modify established architectural patterns, folder structures, or core libraries without explicit user instruction.
- **DO NOT** use `useEffect` or client-side fetching for initial page data. Always use Server Components and native `fetch`.
- **DO NOT** place `'use client'` on `page.tsx`, `layout.tsx`, or route files. Push it strictly down to leaf interactive components.
- **DO NOT** expose backend API secrets, database credentials, or private tokens to the client side.
- If a task can be solved using the mandated stack tools, **never** introduce alternative libraries.
- **Scope discipline:** touch only the files required for the current task. No unrelated refactors, renames, or "cleanups".
- **Ambiguity protocol:** if a requirement, design detail, API shape, or business rule is unclear, ask the user one concise question (or list the exact assumption and wait for confirmation). Never silently guess.

---

## 2. TECH STACK (The Golden Standard)

<!-- npm i @tanstack/react-table @tanstack/react-query nuqs zustand react-hook-form zod @hookform/resolvers next-safe-action motion sonner lucide-react recharts date-fns clsx tailwind-merge class-variance-authority -->

- **Framework:** Next.js 15+ (App Router) with TypeScript (Strict Mode enabled).
- **Styling & Design System:** Tailwind CSS + shadcn/ui + Lucide React Icons (styled to match the provided design, see Section 0).
- **Data Tables:** `@tanstack/react-table` with server-side sorting, filtering, and pagination.
- **Data Visualization:** `recharts` (via shadcn/ui chart primitives).
- **URL State Management:** `nuqs` (type-safe query params for filters, tabs, search, and pagination).
- **Client State Management:** `zustand` (strictly restricted to global UI preferences such as sidebar state, theme, and table density).
- **Asynchronous Client Data:** `@tanstack/react-query` (restricted to client-side polling, live updates, or autocomplete/async-select search).
- **Forms & Validation:** `react-hook-form` + `zod` + `@hookform/resolvers`.
- **Server Mutations:** `next-safe-action` (wrapping Next.js Server Actions).
- **Animations & Feedback:** `motion` (Framer Motion) + `sonner` (toast notifications). Animations only where the design shows them.
- **Utilities & Formatting:** `date-fns` (dates) + native `Intl.NumberFormat` (currency/numbers).

---

## 3. ENVIRONMENT VARIABLES & SECRETS GOVERNANCE (`.env`)

- **Strict Separation:** All environment variables must be declared and validated at runtime.
- **Public vs. Private:**
  - Only variables prefixed with `NEXT_PUBLIC_` are accessible on the client side.
  - Private backend URLs, API secrets, and JWT secrets **MUST NOT** have the `NEXT_PUBLIC_` prefix and are strictly restricted to server-side execution (`import 'server-only'`).
- **Runtime Validation:** Use a Zod schema in `src/env.ts` to crash the application immediately on startup if any required variable is missing or malformed.
- **Template Compliance:** An up-to-date `.env.example` containing all required keys with empty values must be maintained at all times.
- **Never** commit `.env` or any real secret.

---

## 4. DASHBOARD ARCHITECTURAL STANDARDS

### A. Data Grids

1. Every list/table screen uses `@tanstack/react-table` driven entirely by `nuqs` URL search parameters (page, page size, sort, filters, search) for persistent, shareable state.
2. Sorting, filtering, and pagination happen on the server (API/Server Component), never by loading everything and filtering on the client.
3. Use one shared `DataTable` in `src/components/shared/`. Do not create per-feature copies.

### B. Forms

1. Every form uses `react-hook-form` + `zod` + `@hookform/resolvers`, submitted through a `next-safe-action` Server Action (Section 5).
2. For multi-line documents (invoices, orders, any repeating rows), strictly use `useFieldArray` with deep, strict Zod schemas.

### C. Charts & Metric Cards (Incremental Rendering)

1. Analytics, metric cards, and heavy widgets must use React Suspense boundaries and streaming.
2. Each independent widget gets its own Suspense boundary with a loading fallback built from existing tokens.
3. Charts use `recharts` through shadcn/ui chart primitives, and data is fetched in the Server Component, not in the chart.

### D. Authentication & Access Control

1. Every route inside `(dashboard)` requires an authenticated session. Enforce it in middleware/proxy AND again on the server (layout or data layer), never in middleware alone.
2. Hide UI actions the user is not permitted to perform, but the server is the real gate: every Server Action re-checks permissions (see Section 5).
3. If the API is multi-tenant, resolve the active tenant/organization ID securely on every request (session, route parameter, or header). Never trust a client-sent tenant ID.

### E. Financial Precision (only if the dashboard shows or calculates money, quantities, or tax)

1. Never use raw JavaScript floats for currency, quantities, or tax. Store and calculate money as integers in minor units (or as decimal strings from the backend) through a single shared utility in `src/lib/money.ts`, and display it only via `Intl.NumberFormat`.
2. Do not add a math library without user approval.

---

## 5. SECURITY, MUTATIONS & DATA MUTATION PROTOCOL

1. **Server Actions First:** All write operations (POST, PUT, DELETE) must execute through Next.js Server Actions wrapped in `next-safe-action`.
   - **Only exception:** Route Handlers in `src/app/api/` are allowed for inbound webhooks and OAuth callbacks, with signature verification and Zod validation.
2. **Dual Validation Protocol:**
   - Validate user data on the client with Zod + React Hook Form.
   - **Always re-validate** with the exact same Zod schema on the server inside the Server Action before any business logic.
3. **RBAC & Authorization:** Never trust client-sent IDs or roles. Verify authentication, organization membership (if multi-tenant), and permissions inside **every single Server Action**. Never rely solely on `middleware.ts` (or `proxy.ts` in Next.js 16+).
4. **Cache Invalidation:** Always call `revalidatePath` or `revalidateTag` inside Server Actions immediately after a successful mutation.

---

## 6. FOLDER STRUCTURE & FEATURE-BASED ORGANIZATION

- Maintain a feature-first layout inside `src/`:
  - `src/app/` -> App Router route groups (`(dashboard)`, `(auth)`, `api/`)
  - `src/components/ui/` -> shadcn/ui primitives (never modify directly, wrap them if needed)
  - `src/components/shared/` -> cross-cutting composites (`DataTable`, `PageHeader`, `CurrencyFormatter`)
  - `src/features/[feature-name]/` -> domain-isolated modules containing:
    - `components/` (UI pieces, forms, tables specific to the feature)
    - `actions/` (Server Actions wrapped with `next-safe-action`)
    - `schemas/` (Zod schemas)
    - `types/` (TypeScript interfaces and types)
  - `src/services/` -> server-only external API clients and HTTP wrappers (`import 'server-only'`)
  - `src/stores/` -> Zustand stores (`use-ui-store.ts`)
  - `src/lib/` -> global utilities (`utils.ts`, `safe-action.ts`, `formatters.ts`, `money.ts`)

---

## 7. POST-EDITION & DEPLOYMENT PROTOCOL (Git & Build Enforcement)

When a task or feature is **completed** (not after every single file edit):

1. **Verify:** run `npm run build` (and `npm run lint` if the script exists). Fix every error before continuing.
2. **Commit:** only after a successful build, stage ONLY the files touched for this task and commit with a Conventional Commit message (e.g. `feat(dashboard): add invoices table filters`, `fix(auth): resolve session redirect loop`).
3. **Never** `git push`, force-push, amend, or commit `.env` / secrets unless the user explicitly asks.
4. **Zero tolerance for broken builds:** never declare a task complete while `npm run build` fails.
5. If terminal access is not available, remind the user to run these steps.

---

## 8. DEFINITION OF DONE (include this checklist in the final report)

- [ ] Matches the provided design (Section 0.6), with deviations listed or "none"
- [ ] Figma frames were read through the Figma MCP (structure, variables, screenshot) before coding
- [ ] Every API call, schema, and type was verified against the Postman MCP; no invented endpoints or fields
- [ ] No `useEffect` / client fetching for initial data; `'use client'` only on leaf components
- [ ] Mutations via `next-safe-action` with server-side Zod re-validation and per-action authorization
- [ ] `revalidatePath` / `revalidateTag` called after mutations
- [ ] No secrets exposed; `.env.example` and `src/env.ts` updated if variables changed
- [ ] `npm run build` passes, changes committed per Section 7
