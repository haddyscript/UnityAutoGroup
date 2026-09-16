# Unity Auto Group — Website v1 Implementation Plan

Companion plan to `v1-plan.md` and `Unity_Auto_Group_Website_Development_Instructions.md`. Planning only — no page-content implementation yet (tech-stack scaffolding has been completed separately).

## SCOPE UPDATE (supersedes parts of `v1-plan.md`)

`Unity_Auto_Group_Website_Development_Instructions.md` is the newer, more authoritative brief and changes the shape of this project in a few important ways:

| Area | Original (`v1-plan.md`) | Updated (Instructions doc) |
|---|---|---|
| Domain | Not specified | **AutoRepairNearHere.com** |
| Brand colors | Undetermined placeholder | **Green • Black • Gray (approved)** |
| Core conversion action | Click a scheduling link → external booking page | **In-site quote flow**: enter vehicle → select repair → Epicor-powered parts/labor lookup → auto-generated estimate → submit service request → Unity Auto Group staff follows up to schedule |
| Design reference | None named | **FixMyCar.io** (UX/workflow reference only — not to be copied) |
| Third-party integration | None | **Epicor** (Jeff has an active account) for vehicle ID, parts, labor, and quote generation |
| Shop vs. Mobile | Two scheduling links (shop pending, mobile available) | Confirmed both presences must still be represented; the note added ([[shop-mobile-note]]-equivalent) confirms this explicitly — see `Unity_Auto_Group_Website_Development_Instructions.md` |

**What carries over unchanged:** React/TypeScript/Vite/Tailwind/React Router/Lucide/GSAP tech stack, mobile-first requirement, "avoid over-engineering," clean data-driven architecture, deployment target (Hostinger, with a caveat below).

**New architectural implication (flag for client/FaithStack discussion):** a real Epicor integration almost certainly requires a **backend/API layer** — Epicor credentials cannot be called securely from client-side code, and quote/lead delivery to Unity Auto Group needs a server-side step (email, webhook, or CRM). Static hosting on Hostinger alone may not be sufficient; this needs to be confirmed (see open questions).

---

## 1. Recommended Folder Structure

```
src/
  main.tsx
  App.tsx
  router.tsx
  index.css                 # Tailwind entry

  pages/
    Home.tsx
    Services.tsx
    ShopService.tsx
    MobileService.tsx
    About.tsx
    Contact.tsx
    NotFound.tsx

  components/
    layout/
      Header.tsx
      Footer.tsx
      Layout.tsx
      MobileNav.tsx
      StickyQuoteBar.tsx      # persistent "Get a Quote" CTA on scroll

    home/
      Hero.tsx
      QuoteEntry.tsx           # vehicle + repair entry, FixMyCar.io-style
      ServicesOverview.tsx
      WhyChooseUs.tsx
      HowItWorks.tsx
      ShopServiceSection.tsx
      MobileServiceSection.tsx
      AboutSection.tsx
      TestimonialsSection.tsx
      FAQSection.tsx
      FinalCTA.tsx

    quote/
      VehicleSelector.tsx      # year/make/model (or VIN) entry
      RepairSelector.tsx       # service/repair type picker
      FulfillmentSelector.tsx  # Shop vs. Mobile choice for this request
      EstimateResult.tsx       # parts + labor + total, from Epicor
      ServiceRequestForm.tsx   # customer contact info + submit

    shared/
      Button.tsx
      SectionHeading.tsx
      Card.tsx
      ServiceCard.tsx
      Container.tsx

  data/
    config.ts                  # site-level config (see §5)
    services.ts                 # service catalog (data, not JSX)
    nav.ts

  integrations/
    epicor/
      client.ts                 # thin wrapper around backend Epicor proxy endpoints
      types.ts                  # vehicle, repair, parts, labor, quote types

  hooks/
    useScrollReveal.ts          # thin GSAP/ScrollTrigger wrapper, only if needed
    useQuoteFlow.ts             # local state machine for the multi-step quote wizard

  lib/
    utils.ts

  assets/
    images/
    icons/

public/
  favicon, robots.txt, sitemap.xml (generated later)
```

Rationale unchanged from before: pages stay thin, all reusable UI in `shared/`/`quote/`, nothing business-specific hardcoded into components. New `integrations/epicor/` isolates all third-party API shape from the rest of the app — the frontend never talks to Epicor directly, only to our own backend proxy.

---

## 2. Page Structure (Routes)

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Full customer journey: hero → quote entry → services → trust → how it works → shop/mobile → about → FAQ → final CTA |
| Services | `/services` | Full service catalog, links into Shop/Mobile pages and into the quote flow |
| Shop Service | `/shop-service` | Shop-specific content + "Get a Quote" (fulfillment pre-set to Shop) |
| Mobile Service | `/mobile-service` | Mobile-specific content + "Get a Quote" (fulfillment pre-set to Mobile) |
| About | `/about` | Company info |
| Contact | `/contact` | Contact info/form |

**Assumption carried over:** flat top-level routes for both Shop and Mobile for equal visibility/SEO weight. The quote flow itself is treated as a homepage-embedded interactive component rather than a standalone route in this plan — confirm with client whether a dedicated `/get-a-quote` route (deep-linkable, matching FixMyCar.io's pattern) is preferred instead.

---

## 3. Homepage Section Structure

Updated order, reflecting the new Epicor-driven quote journey while keeping every section from the original brief:

1. **Hero** — value prop + immediate "Get a Quote" CTA (FixMyCar.io-style directness)
2. **Quote Entry / Shop vs Mobile selection** — vehicle + repair entry, with fulfillment choice (Shop or Mobile) as part of the flow
3. **Services** — summary grid pulling from `data/services.ts`, "View all" → `/services`
4. **Why Choose Unity Auto Group** — trust/differentiators
5. **How It Works** — step-by-step explanation of the quote → schedule → repair journey (steps 1–13 from the Customer Workflow, condensed)
6. **Shop Service** — summary + CTA → `/shop-service`
7. **Mobile Service** — summary + CTA → `/mobile-service`
8. **About** — condensed teaser → `/about`
9. **Testimonials/Reviews** — credibility section (new, per Core Features list)
10. **FAQ** — frequently asked questions (new, per Core Features list)
11. **Final CTA** — last-chance "Get a Quote" prompt
12. **Footer** — nav, contact info placeholders, warranty/service-area info, legal

---

## 4. Component Architecture

- **Layout shell**: `Layout.tsx` wraps every page with `Header` + `Footer` + `StickyQuoteBar` (mobile especially — the quote flow is now the primary conversion action).
- **Quote flow (`components/quote/`)**: a short wizard — `VehicleSelector` → `RepairSelector` → (Epicor lookup) → `EstimateResult` → `FulfillmentSelector` (Shop/Mobile) → `ServiceRequestForm` → confirmation. Driven by `useQuoteFlow.ts` as a simple local state machine; no page reload between steps.
- **`integrations/epicor/client.ts`** is the *only* place that knows about Epicor's API shape. It calls our own backend endpoints (not Epicor directly), and the rest of the app only ever imports typed functions like `lookupVehicle()`, `getRepairOptions()`, `getEstimate()`.
- **`ServiceCard`** renders one entry from `services.ts`; used on Home, `/services`, and Shop/Mobile pages filtered by category.
- Marketing sections for Shop and Mobile (`ShopServiceSection`, `MobileServiceSection`) remain separate from the quote flow's `FulfillmentSelector` — one sells the presence, the other captures the customer's choice for a specific request.

---

## 5. Data / Integration Architecture

```ts
// src/data/config.ts
export const site = {
  domain: "AutoRepairNearHere.com",
  brand: {
    colors: { green: "#___", black: "#000000", gray: "#___" }, // exact hex values pending brand asset from client
  },
};

// Legacy fast-path booking links, carried over from v1-plan.md.
// STATUS UNCONFIRMED: the new Epicor quote flow may replace the need for
// direct scheduling links entirely (staff schedules after reviewing the
// service request). Keep this until confirmed with the client either way.
export const scheduling = {
  shop: { url: null, available: false },
  mobile: { url: null, available: false },
};
```

```ts
// src/integrations/epicor/types.ts
export interface Vehicle {
  year: number;
  make: string;
  model: string;
  vin?: string;
}

export interface RepairOption {
  id: string;
  label: string;
  category: "shop" | "mobile" | "both";
}

export interface EstimateLineItem {
  type: "part" | "labor";
  description: string;
  price: number;
  availability?: string;
}

export interface Estimate {
  vehicle: Vehicle;
  repair: RepairOption;
  lineItems: EstimateLineItem[];
  total: number;
}

export interface ServiceRequest {
  estimate: Estimate;
  fulfillment: "shop" | "mobile";
  customer: { name: string; phone: string; email: string; address?: string };
}
```

```ts
// src/data/services.ts (unchanged pattern, now also feeds RepairSelector)
export type ServiceCategory = "shop" | "mobile" | "both";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon?: string; // lucide-react icon name
}

export const services: Service[] = [
  // populated once client confirms actual service list
];
```

**Backend responsibilities (new — not yet scaffolded):**
- Proxy endpoint(s) that hold Epicor credentials server-side and expose `lookupVehicle`, `getRepairOptions`, `getEstimate`
- Endpoint to receive a submitted `ServiceRequest` and deliver it to Unity Auto Group (email/webhook/CRM — destination TBD)
- Where this backend lives (Hostinger Node support, or a separate serverless host) is an open question — see §12.

---

## 6. Design Direction

Confirmed constraints (from both documents): modern automotive, professional, premium-but-simple, strong typography, high-quality automotive imagery, subtle animation, mobile-first, fast loading, no over-engineering.

**Newly confirmed:**
- **Brand palette: Green (primary/accent), Black (strength/contrast/nav/headings), Gray (supporting neutral)** — exact hex values still needed from client/brand assets
- **FixMyCar.io** is the explicit UX/workflow reference for: homepage structure, "Get a Quote" directness, vehicle/repair selection simplicity, how-it-works clarity, trust sections, mobile-friendliness — visual design must NOT copy it, only the customer-experience pattern
- Lucide React for all iconography (consistent stroke weight, no mixed icon sets)
- GSAP/ScrollTrigger reserved for a handful of moments (hero entrance, section reveals, quote-step transitions) — not used pervasively

---

## 7. Responsive Strategy

- Mobile-first Tailwind breakpoints, designed at mobile width first
- The quote wizard (`quote/`) is the primary mobile interaction — single-column, one step visible at a time, large touch targets, minimal typing (dropdowns/selects over free text where Epicor data allows)
- `StickyQuoteBar` keeps "Get a Quote" reachable at all times on mobile
- Nav collapses to a mobile menu; quote CTA remains visible even when menu is closed
- Images responsive via `srcset`/Vite asset handling

---

## 8. SEO / Performance Basics

- Per-page `<title>`/meta description for all six pages
- Semantic HTML, single `h1` per page, proper landmarks
- `alt` text on all imagery (pending real photos/copy)
- `sitemap.xml` / `robots.txt` once routes are final
- Open Graph / Twitter card tags
- Lazy-load below-the-fold images; modern formats (WebP/AVIF) once real imagery is provided
- The quote flow (client-side wizard + backend calls) doesn't need to be SSR'd, but marketing pages should stay static/fast — avoid blocking page load on Epicor availability
- Graceful degradation if Epicor is slow/unavailable (loading states, timeout messaging) — needed given real third-party API latency

---

## 9. Client Information Still Needed

**Carried over from before:**
- Physical shop address, hours, phone, email
- Confirmed service catalog (shop vs. mobile vs. both)
- Mobile service area / radius or zip codes covered
- Logo and full brand asset kit (exact green/black/gray hex values, fonts)
- Real photography (shop, technicians, vehicles)
- About content, years in business, certifications, warranty details
- Social links, testimonials/reviews content, FAQ content
- Preferred Contact-page format (form vs. phone/email only)

**New, driven by the updated instructions doc:**
- **Epicor API access details**: credentials, sandbox vs. production environment, which data Jeff's account is entitled to (vehicle ID, parts catalog, labor guide, pricing, availability) and any usage/rate limits
- **Lead/quote delivery destination**: where should a submitted service request go — email inbox, CRM, SMS, an internal dashboard?
- **Hosting decision**: does Hostinger's plan support a Node/serverless backend, or does the Epicor proxy + lead delivery need to live on a separate host (e.g., a small Node service or serverless functions)?
- **Status of the legacy scheduling links** from `v1-plan.md`: are they still needed as a fast-path booking option, or fully replaced by the quote/service-request flow?
- **Legal/liability language** for auto-generated estimates (e.g., "final pricing confirmed by technician") — likely required since prices come from a third-party data source
- Confirmation on the proposed flat URL structure (`/shop-service`, `/mobile-service`) vs. a nested alternative, and whether a dedicated `/get-a-quote` route is wanted

---

## 10. Development Phases

1. **Phase 0 — Scaffold** *(complete)*: Vite + React + TS, Tailwind, React Router, Lucide, GSAP installed and verified building/running
2. **Phase 1 — Shell**: Header, Footer, Layout, nav, mobile menu, `StickyQuoteBar` (no real links/data yet)
3. **Phase 1.5 — Epicor feasibility spike**: confirm API access, data shape, and hosting approach for the backend proxy *before* building the quote wizard against assumptions
4. **Phase 2 — Homepage**: build all sections with placeholder copy/imagery, wired to `data/`
5. **Phase 3 — Sub-pages**: Services, Shop Service, Mobile Service, About, Contact
6. **Phase 4 — Quote flow**: `VehicleSelector` → `RepairSelector` → `EstimateResult` → `FulfillmentSelector` → `ServiceRequestForm`, wired to the (by-then-confirmed) Epicor backend proxy
7. **Phase 5 — Lead delivery**: wire submitted service requests to whatever destination the client confirms (email/CRM/webhook)
8. **Phase 6 — Animation/polish pass**: GSAP/ScrollTrigger only where it earns its place
9. **Phase 7 — SEO/performance pass**: meta tags, sitemap, image optimization, Lighthouse pass
10. **Phase 8 — Content swap-in & QA**: replace placeholders with real client content/imagery, cross-browser/device check, deploy

---

## 11. Definition of Done (v1)

- All 6 pages implemented, responsive from mobile → desktop, no layout breaks
- Shop and Mobile Service both visible and reachable from every major page (nav, homepage, footer at minimum)
- Quote flow functional end-to-end against Epicor (at least in a sandbox/staging environment): vehicle entry → repair selection → estimate → service request submission
- Submitted service requests reliably reach Unity Auto Group via the confirmed delivery method
- Services rendered from `data/services.ts` — zero duplicated service copy across pages
- Green/Black/Gray brand palette applied consistently, matching client-approved hex values
- No console errors/warnings in production build
- Reasonable Lighthouse scores (performance/accessibility/SEO)
- Basic accessibility: alt text, contrast, keyboard-navigable nav/CTAs/quote wizard
- Successfully builds and deploys from a clean checkout to the confirmed hosting setup (Hostinger + backend, wherever that ends up living)

---

## 12. Important Questions / Unknowns

- **Hosting/backend**: can Hostinger run the Epicor proxy + lead-delivery backend, or is a second host needed? This affects the deployment story materially and should be resolved early (Phase 1.5).
- **Epicor scope**: exactly which endpoints/data Jeff's account can access, and what the real request/response shapes look like — needed before the quote wizard's data model can be finalized.
- Are the legacy Shop/Mobile **scheduling links** from `v1-plan.md` still part of the plan (e.g., as a fast-path alongside the quote flow), or fully superseded by the new service-request workflow?
- Is a dedicated `/get-a-quote` route wanted (deep-linkable, shareable), or is the quote wizard purely a homepage-embedded interaction?
- Where does the "Fulfillment: Shop or Mobile" choice belong in the flow — before the quote (affects labor pricing/availability?) or after (pure preference)?
- Is a contact form required (needing a form backend/email service), or is the Contact page static info only?
- What's the process/SLA once Unity Auto Group receives a service request — is there an internal tool needed, or is email/CRM sufficient for v1?
- Any requirement for multi-location support in the future, or is this a single shop location indefinitely?

---

## Recommendation: What to Build Next

With the tech stack already scaffolded, the highest-value next step is **Phase 1.5 — the Epicor feasibility spike**, run in parallel with or just before **Phase 1 (layout shell)**. The Epicor integration and its hosting requirements are the biggest unknowns in this project and will shape the data model, the quote wizard's UX, and the deployment approach — better to surface any surprises there now than after the homepage and quote components are already built against assumptions. The layout shell (Header/Footer/routing) can proceed in parallel since it's largely integration-agnostic.
