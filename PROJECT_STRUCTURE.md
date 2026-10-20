# إدارة أملاك — Project Design & Structure

> A single reference for the visual language, information architecture, routes, folders, and
> conventions of the **Real Estate Admin Dashboard (أبراج / إدارة أملاك)**.
>
> Last updated: 2026-10-20

---

## 1. At a Glance

| Item | Value |
| --- | --- |
| Product | إدارة أملاك — منصة إدارة وتشغيل العقارات (أبراج) |
| Type | RTL Arabic admin dashboard |
| Framework | Next.js `16.4.2` — App Router + Turbopack |
| UI | React `19.3.0`, Tailwind CSS v4, shadcn/ui (`base-nova`), Lucide icons |
| Language | TypeScript (strict), path alias `@/* → ./src/*` |
| Fonts | Cairo (Arabic + headings), Inter (Latin) |
| Base path | `/Edaret_Amlak` |
| Production build | Static export (`output: "export"`) + `trailingSlash: true` |
| Package name | `realestate-admin` |
| Entry URL | `/Edaret_Amlak/` → `/login` or `/dashboard` |

---

## 2. Technology Stack

| Concern | Library / Tool | Notes |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Server Components by default |
| Styling | Tailwind CSS 4 | Theme tokens in `src/app/globals.css` |
| Primitives | shadcn/ui (`base-nova` style) | `src/components/ui/` is generated, never edited directly |
| Icons | `lucide-react` | Plus a few inline SVG unit icons |
| Tables | `@tanstack/react-table` | Shared pagination in `components/shared/table-pagination.tsx` |
| URL state | `nuqs` | `NuqsAdapter` is mounted in the root layout |
| Client state | `zustand` | Only UI preferences (`sidebarOpen`, density, theme) |
| Async client data | `@tanstack/react-query` | Installed; reserved for polling/live updates |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` | Schemas live per feature |
| Mutations | `next-safe-action` | Client prepared in `src/lib/safe-action.ts` |
| Charts | `recharts` | Dashboard growth chart |
| Animation | `motion` (Framer Motion) | Sidebar active pill, transitions |
| Toasts | `sonner` | `<Toaster />` mounted in root layout |
| Dates / numbers | `date-fns`, `Intl.*` | Wrappers in `src/lib/formatters.ts` and `src/lib/money.ts` |

---

## 3. Design System

### 3.1 Brand palette (CSS theme tokens)

Defined once in `src/app/globals.css` under `@theme inline`:

| Token | Hex | Use |
| --- | --- | --- |
| `--color-brand-green` | `#374732` | Primary brand green |
| `--color-brand-green-hover` | `#2C3928` | Primary hover |
| `--color-brand-green-dark` | `#263323` | Deep green surfaces |
| `--color-brand-cream` | `#F4F6F0` | App / page background |
| `--color-brand-cream-card` | `#EEF2E8` | Soft card / field background |
| `--color-brand-border` | `#E2E6DB` | Hairline borders |
| `--color-brand-text` | `#172115` | Primary text |
| `--color-brand-muted` | `#64715F` | Secondary text |
| `--color-brand-tag` | `#495944` | Tags / dark chips |

Observed surfaces used throughout feature screens:

| Hex | Use |
| --- | --- |
| `#34432E` | Sidebar background, primary buttons |
| `#45583E` | Active navigation pill |
| `#2A3725` | Logo tile on sidebar |
| `#EFF3EA` | Dashboard canvas behind cards |
| `#FFFFFF` | Cards, tables, topbar |
| `#E2E6DC` | Card borders |
| `#DCE7D3` | Badges, avatar chips |
| `#7D8A78` / `#616E5D` | Muted copy |
| `#86EFAC` | Online / success dot |
| `#E53E3E` | Notification dot / destructive accent |

> The canonical tokens above are the intended source of truth. Many existing feature
> components currently repeat literal hex values; new work should consume the tokens
> (`text-brand-text`, `bg-brand-cream`, etc.) rather than adding new literals.

### 3.2 Typography

| Role | Font | Size / weight |
| --- | --- | --- |
| Page title | Cairo | `text-2xl` → `text-3xl`, bold (700–800) |
| Section title | Cairo | `text-base` → `text-xl`, bold |
| Body / table | Cairo | `text-xs` → `text-sm`, 400–600 |
| Micro labels / badges | Cairo | `10–11px`, 500–700 |
| Numerals / codes | Inter + `font-mono` | 10–12px |

Root layout applies `font-sans` (Cairo first, Inter fallback), `lang="ar"`, `dir="rtl"`.
Arabic and Latin subsets are both loaded from `next/font/google`.

### 3.3 Shape, elevation, spacing

- Base radius: `--radius: 0.625rem`, scaled through `--radius-sm … --radius-4xl`.
- Cards: `rounded-2xl` / `rounded-3xl`, white fill, `border border-[#E2E6DC]`, `shadow-2xs`.
- Pills / tabs / badges: `rounded-full` or `rounded-xl`.
- Elevation is intentionally flat: hairline borders + very soft shadows (`shadow-2xs`, `shadow-3xs`).
- Vertical rhythm: `space-y-6` between page sections; inner cards `p-5` / `p-6` / `p-7`.
- Grid: 12-column layout (`lg:grid-cols-12`), common splits `8/4` and `7/5`.
- Content width: `max-w-[1536px]`, centered, page padding `p-4 sm:p-6 lg:p-8`.

### 3.4 Layout & RTL

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar (start, 72px / 256px) │ Topbar (sticky)               │
│                               ├──────────────────────────────┤
│                               │ Breadcrumb (detail pages)    │
│                               │ Page content (max 1536px)    │
└──────────────────────────────────────────────────────────────┘
```

- RTL is global. Use logical utilities: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`.
- Sidebar is collapsible on desktop (`72px` mini ↔ `256px` expanded) and a drawer on mobile.
- Main content offsets itself with `lg:ms-64` / `lg:ms-[72px]`.
- Sidebar state lives in `useUIStore`.
- Breadcrumb is auto-derived from the URL and hidden on primary tab roots.

### 3.5 Icons & imagery

- Lucide outline icons, typically `w-4 h-4` (nav/actions) to `w-5 h-5` (topbar).
- Sidebar brand is `public/logo.png`; favicons and app icons live in `public/` and `src/app/`.
- Custom unit status icons are inline SVGs in `units-table.tsx`.
- Images go through the custom loader in `src/lib/image-loader.ts`, which prefixes
  local paths with `/Edaret_Amlak`.

---

## 4. Information Architecture (Design Tree)

```
App
├── Auth
│   ├── Login
│   └── Register
└── Dashboard shell
    ├── Home
    │   ├── Welcome banner
    │   ├── 4 KPI cards
    │   ├── Growth chart  +  Status breakdown
    │   ├── Recent owners  +  Recent properties
    │   └── Activity feed
    ├── Owners
    │   ├── List (header, KPIs, filters, advanced drawer, table, empty state)
    │   └── Owner detail (profile, 4 KPIs, quick actions, transferable balance)
    │       └── Tabs: Overview · Properties · Bookings · Billing · Activity
    ├── Properties
    │   ├── List (header, filters, table)
    │   ├── New property (form + success view)
    │   └── Property detail
    │       ├── Hero card, architectural specs, location, units, admin actions
    │       ├── Recent bookings table
    │       └── Activity log
    ├── Units
    │   └── List (header, filters, advanced drawer, table, row actions)
    ├── Bookings
    │   ├── List (shared owner-bookings view) + empty state
    │   ├── New booking (form + success view)
    │   └── Booking detail
    │       ├── Stay schedule · Assigned unit · Financial settlement · WhatsApp automation
    │       ├── Guest card · Smart lock · Activity timeline
    │       ├── Edit
    │       ├── Activity log
    │       └── WhatsApp message log
    ├── Guests
    │   └── Guest detail (profile, metrics, bookings table)
    └── Standalone logs
        ├── Booking activity log
        └── WhatsApp message log
```

---

## 5. Application Architecture

```
Browser (RTL)
   │
   ▼
src/app/layout.tsx ── Cairo/Inter · NuqsAdapter · Sonner Toaster
   │
   ├── (auth)/layout.tsx ── AuthShowcase · AuthHeader · AuthFooter
   │      ├── /login    → LoginForm
   │      └── /register → RegisterForm
   │
   └── (dashboard)/layout.tsx ── AuthGuard
          ├── Sidebar (zustand)   ├── DashboardContent
          └── Topbar · Breadcrumb · <main>
                 │
                 ▼
          app/(dashboard)/dashboard/**/page.tsx   (Server Components)
                 │  import views from
                 ▼
          src/features/<feature>/components      (client leaves + composites)
                 │  read types / mock data from
                 ▼
          src/features/<feature>/{types,data}
                 │
                 ▼
          src/lib/*  ·  src/components/shared/*  ·  src/services/api-client.ts
                                                    (server-only → backend API)
```

Rules of the codebase:

- `page.tsx` and `layout.tsx` stay server components; `'use client'` lives on leaf widgets.
- Data fetching belongs in server components / services, not `useEffect`.
- Feature folders own domain UI, types, schemas, data, and actions.
- Cross-feature UI belongs in `src/components/shared/`; shadcn primitives stay untouched.
- URL state (filters, tabs, pagination) is held by `nuqs`; global UI state by Zustand.

---

## 6. Route Map

All URLs are served under the base path `/Edaret_Amlak` with a trailing slash.

| URL (after base path) | File | Screen |
| --- | --- | --- |
| `/` | `app/page.tsx` | Client redirect → `/dashboard` or `/login` |
| `/login` | `app/(auth)/login/page.tsx` | Sign-in |
| `/register` | `app/(auth)/register/page.tsx` | Create account |
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Home dashboard |
| `/dashboard/owners` | `.../owners/page.tsx` | Owners list (+ `?empty=true` empty state) |
| `/dashboard/owners/[id]` | `.../owners/[id]/page.tsx` | Owner profile with tabs |
| `/dashboard/properties` | `.../properties/page.tsx` | Properties list |
| `/dashboard/properties/new` | `.../properties/new/page.tsx` | Add property |
| `/dashboard/properties/[id]` | `.../properties/[id]/page.tsx` | Property detail |
| `/dashboard/properties/[id]/activity` | `.../properties/[id]/activity/page.tsx` | Property audit log |
| `/dashboard/properties/activity` | `.../properties/activity/page.tsx` | Standalone property log |
| `/dashboard/units` | `.../units/page.tsx` | Units list |
| `/dashboard/bookings` | `.../bookings/page.tsx` | Bookings list |
| `/dashboard/bookings/new` | `.../bookings/new/page.tsx` | Add booking |
| `/dashboard/bookings/empty` | `.../bookings/empty/page.tsx` | Bookings empty state |
| `/dashboard/bookings/[id]` | `.../bookings/[id]/page.tsx` | Booking detail |
| `/dashboard/bookings/[id]/edit` | `.../bookings/[id]/edit/page.tsx` | Edit booking |
| `/dashboard/bookings/[id]/activity` | `.../bookings/[id]/activity/page.tsx` | Booking audit log |
| `/dashboard/bookings/[id]/whatsapp` | `.../bookings/[id]/whatsapp/page.tsx` | WhatsApp message log |
| `/dashboard/guests` | `.../guests/page.tsx` | Default guest preview |
| `/dashboard/guests/[id]` | `.../guests/[id]/page.tsx` | Guest profile |
| `/dashboard/activity` | `.../activity/page.tsx` | Standalone booking activity log |
| `/dashboard/whatsapp` | `.../whatsapp/page.tsx` | Standalone WhatsApp log |

**Static export:** every dynamic route exports `generateStaticParams()` with numeric and
prefixed IDs (e.g. `1…100`, `prop-1…100`, `bk-1…50`, `BK-10480…`, special slugs).
Add new ID formats there when introducing new mock records.

**Sidebar items without routes yet:** `operations`, `team`, `billing`, `reports`,
`settings`, `profile`. They deliberately show an “under construction” toast via
`showUnderConstructionToast()` instead of navigating.

---

## 7. Source Tree

```
REALESTATE/
├── public/
│   ├── .htaccess                  # Apache rewrites for static export + base path
│   ├── logo.png / logo-app-icon.png
│   ├── avatar.jpg
│   ├── favicon*.png / favicon.ico / apple-icon.png / icon.png
│   ├── properties/                # Property hero images & maps
│   │   ├── add_property_map.png · riyadh_google_map.png · riyadh_map.jpg
│   │   ├── aqeeq.png · nakheel.png · nakheel_hd.jpg · oasis.png · oasis_hd.jpg
│   │   └── suite_204_interior.jpg · villa_nakheel.jpg
│   └── (Next.js starter SVGs)
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx                 # Split auth shell (showcase + form panel)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                 # AuthGuard + Sidebar + Topbar + Breadcrumb
│   │   │   └── dashboard/
│   │   │       ├── page.tsx               # KPI / chart / owners / properties / feed
│   │   │       ├── activity/page.tsx      # Standalone booking activity
│   │   │       ├── whatsapp/page.tsx      # Standalone WhatsApp log
│   │   │       ├── owners/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/page.tsx
│   │   │       ├── properties/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   ├── activity/page.tsx
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx
│   │   │       │       └── activity/page.tsx
│   │   │       ├── units/page.tsx
│   │   │       ├── bookings/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/page.tsx
│   │   │       │   ├── empty/page.tsx
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx
│   │   │       │       ├── edit/page.tsx
│   │   │       │       ├── activity/page.tsx
│   │   │       │       └── whatsapp/page.tsx
│   │   │       └── guests/
│   │   │           ├── page.tsx
│   │   │           └── [id]/page.tsx
│   │   ├── error.tsx                       # Branded error boundary
│   │   ├── loading.tsx                     # Branded app loader
│   │   ├── not-found.tsx                   # Branded 404
│   │   ├── layout.tsx                      # RTL, fonts, Nuqs, Toaster
│   │   ├── page.tsx                        # Session-aware root redirect
│   │   ├── globals.css                     # Tailwind v4 + brand tokens
│   │   └── icon.png / apple-icon.png / favicon.ico
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── sidebar.tsx                 # Mini + expanded navigation, logout
│   │   │   ├── topbar.tsx                  # Search, user, notifications
│   │   │   ├── breadcrumb.tsx              # Auto breadcrumb + JSON-LD
│   │   │   ├── dashboard-content.tsx       # Sidebar-aware content offset
│   │   │   ├── table-pagination.tsx        # Shared pagination + page size
│   │   │   ├── action-dropdown.tsx         # Row action menu
│   │   │   ├── date-picker.tsx             # Date field
│   │   │   ├── table-date-cell.tsx         # Two-line date cell
│   │   │   ├── docking-bottom-bar.tsx      # Sticky form action bar
│   │   │   └── floating-confirmation-bar.tsx
│   │   └── ui/
│   │       ├── button.tsx                  # shadcn primitive
│   │       └── sonner.tsx                  # Toaster wrapper
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── actions/        login.action.ts · register.action.ts
│   │   │   ├── schemas/        login.schema.ts · register.schema.ts
│   │   │   ├── types/          index.ts
│   │   │   └── components/     auth-header · auth-footer · auth-showcase
│   │   │                       login-form · register-form
│   │   │                       auth-guard · root-auth-redirect
│   │   ├── dashboard/
│   │   │   ├── types/index.ts
│   │   │   └── components/     welcome · kpis · growth-chart · status-breakdown
│   │   │                       recent-owners · recent-properties · activity-feed
│   │   ├── owners/
│   │   │   ├── types/index.ts
│   │   │   ├── data/mock-owner-bookings.ts
│   │   │   └── components/     owners-header · owners-kpis · owners-filters
│   │   │                       owners-advanced-filter-drawer · owners-table
│   │   │                       owners-empty-state · owners-page-content
│   │   │                       owner-profile-card · owner-kpi-cards · owner-tabs
│   │   │                       owner-tabs-section · owner-quick-actions
│   │   │                       owner-operations-summary · owner-transferable-balance
│   │   │                       owner-properties-tab-view · owner-properties-list
│   │   │                       owner-properties-filter-drawer
│   │   │                       owner-bookings-tab-view · owner-bookings-kpis
│   │   │                       owner-bookings-filter-drawer
│   │   │                       owner-billing-tab-view
│   │   │                       owner-activity-tab-view · owner-activity-timeline
│   │   │                       owner-activity-filter-drawer
│   │   ├── properties/
│   │   │   ├── types/          index.ts · activity.ts
│   │   │   ├── data/           mock-property-detail.ts · mock-property-activity-log.ts
│   │   │   └── components/     properties-header · properties-filters · properties-table
│   │   │                       new-property-client-content · add-property-form
│   │   │                       add-property-success-view
│   │   │                       property-hero-card · property-architectural-specs
│   │   │                       property-location-card · property-units-card
│   │   │                       property-admin-actions · property-recent-bookings
│   │   │                       property-activity-log-view
│   │   ├── units/
│   │   │   ├── types/index.ts
│   │   │   ├── data/mock-units.ts
│   │   │   └── components/     units-header · units-filters
│   │   │                       units-advanced-filter-drawer · units-table
│   │   │                       unit-action-dropdown
│   │   ├── bookings/
│   │   │   ├── types/          index.ts · activity.ts · whatsapp.ts
│   │   │   ├── data/           mock-booking-detail.ts · mock-booking-activity-log.ts
│   │   │   │                   mock-whatsapp-messages.ts
│   │   │   └── components/     bookings-empty-state-view
│   │   │                       new-booking-client-content · add-booking-form
│   │   │                       add-booking-success-view
│   │   │                       edit-booking-form
│   │   │                       booking-detail-view · booking-detail-header
│   │   │                       booking-cancellation-banner
│   │   │                       booking-stay-schedule-card
│   │   │                       booking-assigned-unit-card
│   │   │                       booking-financial-settlement-card
│   │   │                       booking-whatsapp-automation-card
│   │   │                       booking-guest-card · booking-smart-lock-card
│   │   │                       booking-activity-timeline-card
│   │   │                       booking-activity-log-view
│   │   │                       booking-whatsapp-log-view
│   │   │                       cancel-booking-modal · change-unit-modal
│   │   │                       extend-stay-modal
│   │   └── guests/
│   │       ├── types/index.ts
│   │       ├── data/mock-guest-detail.ts
│   │       └── components/     guest-profile-header · guest-info-metrics-card
│   │                           guest-bookings-table-card · guest-detail-view
│   │
│   ├── lib/
│   │   ├── auth-session.ts          # Cookie + localStorage session helpers (client)
│   │   ├── safe-action.ts           # next-safe-action client
│   │   ├── formatters.ts            # date-fns / Intl date, number, percent
│   │   ├── money.ts                 # minor-unit currency helpers
│   │   ├── image-loader.ts          # basePath-aware Next image loader
│   │   ├── toast.tsx                # “under construction” helper
│   │   └── utils.ts                 # cn()
│   │
│   ├── services/
│   │   └── api-client.ts            # server-only fetch wrapper (API_BASE_URL)
│   │
│   ├── stores/
│   │   └── use-ui-store.ts          # sidebar, table density, theme
│   │
│   ├── env.ts                       # Zod-validated environment
│   └── ex.excalidraw                # Design scratch file
│
├── next.config.ts                   # basePath, static export, redirects, image loader
├── components.json                  # shadcn config
├── tsconfig.json                    # strict TS, @/* alias
├── eslint.config.mjs
├── package.json
├── .env.example
├── AGENTS.md / GEMINI.md / README.md
└── out/                             # Generated static build
```

---

## 8. Feature Modules

### 8.1 `auth`

| Layer | Files | Purpose |
| --- | --- | --- |
| Pages | `(auth)/login`, `(auth)/register` | Public auth screens |
| Shell | `auth-header`, `auth-footer`, `auth-showcase` | Split-screen layout: dark olive brand panel + form panel |
| Forms | `login-form`, `register-form` | `react-hook-form` + Zod, inline feedback |
| Session | `auth-guard`, `root-auth-redirect` | Client-side gate for the dashboard group |
| Schemas | `login.schema.ts`, `register.schema.ts` | Shared client/server validation |
| Actions | `login.action.ts`, `register.action.ts` | Currently return mock success payloads |

Auth flow:

```
/ ──► RootAuthRedirect ──► /dashboard (cookie or localStorage session)
                        └► /login

(dashboard)/layout.tsx ──► AuthGuard ──► session? render : replace('/login')
LoginForm ──► loginAction ──► setAuthSession (cookie 7/30 days + user in localStorage)
Sidebar logout ──► clearAuthSession ──► /login
```

### 8.2 `dashboard`

Widgets composed by `app/(dashboard)/dashboard/page.tsx`:

| Widget | File | Content |
| --- | --- | --- |
| Welcome banner | `dashboard-welcome.tsx` | Greeting, date, primary CTA |
| KPI cards | `dashboard-kpis.tsx` | 4 metrics with trends |
| Growth chart | `dashboard-growth-chart.tsx` | Recharts area/line |
| Status breakdown | `dashboard-status-breakdown.tsx` | Occupancy/property status donut or bars |
| Recent owners | `dashboard-recent-owners.tsx` | Compact table |
| Recent properties | `dashboard-recent-properties.tsx` | Compact list |
| Activity feed | `dashboard-activity-feed.tsx` | Timeline of events |

The page wraps KPI and chart blocks in `Suspense` with token-based skeletons.

### 8.3 `owners`

- **List page** — `OwnersPageContent` chooses between two compositions:
  normal: header → KPI cards → filters/advanced drawer → table → pagination;
  `?empty=true`: header → empty state.
- **Owner detail** — profile card with avatar, code, join date, contact, payment method;
  four KPI cards; quick actions; transferable balance; tabbed workspace:
  - Overview — operations summary
  - Properties — list + filter drawer
  - Bookings — KPI strip + filters + table (also reused as the global bookings list)
  - Billing — financial tab
  - Activity — filter drawer + timeline
- Types: `Owner`, `OwnerStatus`, `OwnerBookingItem`, KPI shapes.

### 8.4 `properties`

- **List** — header, filter bar, table, pagination.
- **Create** — `NewPropertyClientContent` → `AddPropertyForm` → `AddPropertySuccessView`.
- **Detail** — hero image + metrics; two-column body: architectural specs and location
  on one side, units and admin actions on the other; recent bookings table full width.
- **Activity** — audit timeline with summary, filters, diff details.

Domain types: `Property`, `PropertyDetail`, `PropertyUnitItem`, `PropertyBookingItem`,
`PropertyActivityEvent`, `PropertyActivitySummary`.

### 8.5 `units`

Newest module (currently untracked in git). A single list screen:

- Header with export and “add unit” actions.
- Quick filters + advanced filter drawer (property, status, type, floor, price, sort).
- Table with custom status icons (door, cleaning, maintenance, suite), owner/property
  context, nightly price, current booking, last update, and a row action dropdown.
- Filter state type: `UnitFilterState`; data: `initialUnits` mock array.

### 8.6 `bookings`

- **List** — reuses `OwnerBookingsTabView` so owner and global bookings stay consistent;
  `?empty=true` route shows `BookingsEmptyStateView`.
- **Create** — `NewBookingClientContent` → `AddBookingForm` → `AddBookingSuccessView`.
- **Detail** — `BookingDetailView` composes:
  - right column: stay schedule, assigned unit/property, financial settlement,
    WhatsApp automation;
  - left column: guest profile, smart lock PIN, activity timeline;
  - top: header + cancellation banner when status is `cancelled`.
- **Edit** — `EditBookingForm` with the booking code derived from the route.
- **Logs** — `BookingActivityLogView` and `BookingWhatsAppLogView`, reused by both
  nested (`[id]/...`) and standalone routes.
- **Modals** — cancel booking, change unit, extend stay.

Domain types: `BookingDetail` (guest, smart lock, stay, assigned unit, financial,
automation, activity), plus dedicated activity and WhatsApp message types.

### 8.7 `guests`

- `GuestDetailView` → profile header, verification badge, contact info, six metrics
  (bookings, rating, commitment, revenue), and a bookings table.
- `app/.../guests/page.tsx` renders the default guest as a design preview; `[id]` enriches
  the mock with the route ID.

---

## 9. Shared Layer

### `src/components/shared/`

| Component | Role |
| --- | --- |
| `sidebar.tsx` | Dual-state navigation (mini/expanded), active pill animation, badges, user card, logout |
| `topbar.tsx` | Global search, sidebar toggle, avatar/user/role, notification bell |
| `breadcrumb.tsx` | URL-derived breadcrumb with Arabic labels, dynamic IDs, JSON-LD |
| `dashboard-content.tsx` | Applies sidebar offset to the main column |
| `table-pagination.tsx` | Shared page navigation + page-size menu + “x of y” label |
| `action-dropdown.tsx` | Standard row action menu |
| `date-picker.tsx` | Calendar/date input |
| `table-date-cell.tsx` | Date + time stacked cell |
| `docking-bottom-bar.tsx` | Sticky bottom bar for long forms |
| `floating-confirmation-bar.tsx` | Confirmation/unsaved-changes bar |

### `src/components/ui/`

Only generated shadcn primitives (`button.tsx`, `sonner.tsx`). Treat as read-only; wrap
them for design changes.

---

## 10. Core Utilities, Services & State

| File | Responsibility |
| --- | --- |
| `src/env.ts` | Zod schema for `NODE_ENV`, `NEXT_PUBLIC_APP_URL`, `API_BASE_URL`; throws on invalid config |
| `src/services/api-client.ts` | `server-only` JSON fetch wrapper; joins `API_BASE_URL`, normalizes errors |
| `src/lib/auth-session.ts` | `isUserAuthenticated`, `getAuthUser`, `setAuthSession`, `clearAuthSession`; cookie `realestate_auth` + localStorage `realestate_auth_user` |
| `src/lib/safe-action.ts` | `actionClient = createSafeActionClient(...)` |
| `src/lib/formatters.ts` | `formatDate`, `formatDateTime`, `formatNumber`, `formatPercent` |
| `src/lib/money.ts` | `formatCurrency`, `toMinorUnits`, `toMajorUnits` — integer minor units |
| `src/lib/image-loader.ts` | Prefixes local images with `/Edaret_Amlak` |
| `src/lib/toast.tsx` | `showUnderConstructionToast(pageName)` |
| `src/lib/utils.ts` | `cn()` (clsx + tailwind-merge) |
| `src/stores/use-ui-store.ts` | `sidebarOpen`, `tableDensity`, `theme` + setters |

Environment keys (`.env.example`):

```
NODE_ENV=
NEXT_PUBLIC_APP_URL=
API_BASE_URL=
```

Only `NEXT_PUBLIC_*` may reach the client; `API_BASE_URL` is server-only.

---

## 11. Data & Mutation Flow

### Current (design-first phase)

```
page.tsx (server)
  └─ feature view (often "use client")
       └─ local state / useState
            └─ mock data modules (data/mock-*.ts)
```

- All screens render realistic mock data.
- Login/register actions return simulated success.
- Session is a client cookie plus localStorage record.
- No API calls are made yet; `api-client.ts` is prepared but unused.

### Intended (per project governance)

```
Server Component
  └─ src/services/*  ──► backend API (server-only, Zod-validated responses)
       └─ feature components

Client form
  └─ react-hook-form + Zod
       └─ next-safe-action Server Action
            ├─ re-validate with the same Zod schema
            ├─ authorize user / tenant inside the action
            ├─ call service
            └─ revalidatePath / revalidateTag
```

- Tables and filters must be URL-driven (`nuqs`) and server-sorted/paginated.
- Charts and KPI blocks stay server-rendered behind `Suspense`.
- Money is handled in minor units via `lib/money.ts` and displayed with `Intl.NumberFormat`.
- Mutations must invalidate caches and surface errors through `sonner`.

---

## 12. Build, Base Path & Deployment

`next.config.ts`:

- `basePath: "/Edaret_Amlak"` — every route, asset, and link is served under this prefix.
- `trailingSlash: true` — routes resolve as `/path/`.
- `output: "export"` when `NODE_ENV !== "development"` — produces a static `out/` folder.
- Dev-only redirects:
  - `/` → `/Edaret_Amlak/dashboard/` when the auth cookie exists, otherwise `/login/`.
  - `/favicon.ico` → base-path favicon.
- Custom image loader (`src/lib/image-loader.ts`) because the default optimizer is
  unavailable in static export.
- Turbopack rule wires `@tailwindcss/turbopack` for CSS.

`public/.htaccess` (copied to `out/`) handles Apache rewrites:

- serve real files/directories,
- resolve `route/index.html`,
- fall back to the root `index.html` for client-side navigation.

Commands:

```bash
npm run dev     # Next dev server, no static export
npm run build   # static export to out/
npm run start   # serve a production build
npm run lint    # eslint
```

Deployment target: upload the contents of `out/` to an Apache host at `/Edaret_Amlak/`
(the `.htaccess` file must ship with it).

---

## 13. Conventions & Guardrails

1. **Design first** — never invent layout, colors, typography, icons, or copy. If a screen
   has no design reference, stop and ask.
2. **Server by default** — `page.tsx` / `layout.tsx` remain server components; push
   `'use client'` down to the smallest interactive leaf.
3. **No client fetching for initial data** — fetch in server components or services.
4. **Feature-first** — new domain work goes in `src/features/<feature>/`
   (`components/`, `actions/`, `schemas/`, `types/`, `data/`).
5. **Shared over duplicated** — reuse `components/shared/*` (tables, pagination, bars)
   before creating variants.
6. **Tokens over literals** — consume brand tokens from `globals.css`; do not add new hex
   values inside components.
7. **RTL-safe spacing** — use logical properties only (`ms/me/ps/pe/start/end`).
8. **Money precision** — integers in minor units + `Intl.NumberFormat`; no float math.
9. **Validation twice** — client Zod + server-side re-validation in every action.
10. **Authorize every mutation** — never trust client IDs, roles, or tenant identifiers.
11. **Invalidate after writes** — `revalidatePath` / `revalidateTag`.
12. **Secrets stay server-side** — only `NEXT_PUBLIC_*` reaches the browser.
13. **Definition of done** — `npm run build` passes; stage only touched files; Conventional
    Commit message; never push secrets or `.env`.

---

## 14. Current Implementation Status

| Area | Status |
| --- | --- |
| Screens & visual system | Implemented for auth, dashboard, owners, properties, units, bookings, guests, activity/WhatsApp logs |
| Data layer | Mock modules only; `services/api-client.ts` not wired to screens |
| Auth | Client cookie/localStorage guard; `next-safe-action` not used yet; no server session |
| Mutations | Forms simulate submission; no persistence |
| Tables | TanStack tables with local filtering; URL state (`nuqs`) not yet applied |
| Chart / KPI streaming | Suspense boundaries in place; data is static |
| Sidebar destinations | `operations`, `team`, `billing`, `reports`, `settings`, `profile` are placeholders |
| Units module | Present in the working tree (currently untracked) |
| Design tokens | Defined in `globals.css`; several screens still use literal hex values |
| Deployment | Static export ready; Apache `.htaccess` included |

### Suggested next steps

1. Wire `src/services/` to the documented backend contract and build Zod response schemas.
2. Replace mock reads with server-component fetches, keeping the existing visual structure.
3. Move list filters/pagination to `nuqs` and server-side table state.
4. Wrap write flows in `next-safe-action` with dual validation, authorization, and revalidation.
5. Replace the client auth guard with a secure server session check.
6. Gradually migrate literal colors to `brand-*` tokens without changing the rendered design.

---

## 15. Related Documents

- `README.md` — setup and run instructions.
- `GEMINI.md` — full architecture, design-fidelity, API, and deployment governance rules.
- `AGENTS.md` — Next.js agent rules for this workspace.
- `components.json` — shadcn/ui configuration.
