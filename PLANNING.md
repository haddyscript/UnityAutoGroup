# Unity Auto Group — Website v1 Implementation Plan

Companion plan to `v1-plan.md`. Planning only — no implementation yet.

---

## 1. Recommended Folder Structure

```
src/
  main.tsx
  App.tsx
  router.tsx
  index.css                # Tailwind entry

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
      StickyBookingBar.tsx   # persistent Shop/Mobile CTA on scroll

    home/
      Hero.tsx
      ServiceSelector.tsx     # Shop vs Mobile choice
      ServicesOverview.tsx
      WhyChooseUs.tsx
      HowItWorks.tsx
      ShopServiceSection.tsx
      MobileServiceSection.tsx
      AboutSection.tsx
      FinalCTA.tsx

    shared/
      Button.tsx
      ScheduleButton.tsx       # reads scheduling config by type
      SectionHeading.tsx
      Card.tsx
      ServiceCard.tsx
      Container.tsx

  data/
    config.ts                 # scheduling.shop / scheduling.mobile
    services.ts                # service catalog (data, not JSX)
    nav.ts

  hooks/
    useScrollReveal.ts         # thin GSAP/ScrollTrigger wrapper, only if needed

  lib/
    utils.ts

  assets/
    images/
    icons/

public/
  favicon, robots.txt, sitemap.xml (generated later)
```

Rationale: pages stay thin (compose section components); all reusable UI lives in `shared/`; nothing business-specific is hardcoded into components — it flows in from `data/`.

---

## 2. Page Structure (Routes)

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Full customer journey, all homepage sections |
| Services | `/services` | Full service catalog, links into Shop/Mobile pages |
| Shop Service | `/shop-service` | Deep dive + scheduling CTA (shop URL pending) |
| Mobile Service | `/mobile-service` | Deep dive + scheduling CTA (mobile URL available) |
| About | `/about` | Company info |
| Contact | `/contact` | Contact info/form |

**Assumption:** flat top-level routes (not nested under `/services/shop`) for shorter URLs and equal SEO weight for both service types, matching the brief's emphasis that both options be "highly visible throughout the site." Flagged as a confirm-with-client item below.

---

## 3. Homepage Section Structure

In the order specified:

1. **Hero** — value prop + primary dual CTA (Book Shop / Book Mobile)
2. **Shop vs Mobile Service selection** — the core decision UI, large touch targets
3. **Services** — summary grid pulling from `data/services.ts`, "View all" → `/services`
4. **Why Choose Unity Auto Group** — trust/differentiators
5. **How It Works** — 3–4 step process, likely split shop vs mobile flow
6. **Shop Service** — summary + CTA → `/shop-service`
7. **Mobile Service** — summary + CTA → `/mobile-service`
8. **About** — condensed teaser → `/about`
9. **Final CTA** — last chance dual booking prompt
10. **Footer** — nav, contact info placeholders, scheduling links, legal

---

## 4. Component Architecture

- **Layout shell**: `Layout.tsx` wraps every page with `Header` + `Footer` + optional `StickyBookingBar` (mobile viewport especially, since booking is the core conversion action).
- **Section components** are self-contained, take no/minimal props, and pull their own data from `data/`.
- **`ScheduleButton`** is the single component that ever renders a booking link. It takes a `type: "shop" | "mobile"` prop, reads the URL from `data/config.ts`, and handles the not-yet-available state (e.g., disabled/"Coming soon" or fallback to phone/contact) for Shop until the client provides the URL.
- **`ServiceCard`** renders one entry from `services.ts`; used on Home, `/services`, and possibly Shop/Mobile pages filtered by category.
- No service copy, scheduling URLs, or business details are hardcoded directly into JSX anywhere — everything routes through `data/`.

---

## 5. Scheduling / Data Architecture

```ts
// src/data/config.ts
export const scheduling = {
  shop: {
    url: null,          // PENDING — client has not provided this yet
    available: false,
  },
  mobile: {
    url: "<mobile-scheduling-url>", // to be filled in when provided
    available: true,
  },
} as const;
```

```ts
// src/data/services.ts
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

This gives one place to drop in the real Shop URL later, and one place to edit the service catalog without touching components.

---

## 6. Design Direction

Confirmed constraints from the brief: modern automotive, professional, premium-but-simple, strong typography, high-quality automotive imagery, subtle animation, mobile-first, fast loading, no over-engineering.

Proposed (assumptions, not final until client/brand input exists):
- Neutral dark/charcoal base with a single accent color (exact palette TBD — no brand colors confirmed yet)
- One display/heading font + one body font, both loaded via standard web font practices
- Real automotive photography where possible; avoid generic stock-looking clip art
- GSAP/ScrollTrigger reserved for a handful of moments (hero entrance, section reveals) — not used pervasively
- Lucide React for all iconography (consistent stroke weight, no mixed icon sets)

---

## 7. Responsive Strategy

- Mobile-first Tailwind breakpoints (`sm/md/lg/xl`), designed at mobile width first, then scaled up
- Sticky/floating dual booking CTA on mobile (since scheduling is the primary conversion action and shouldn't require scrolling back to a section)
- Nav collapses to a mobile menu; Shop/Mobile CTAs remain visible even when menu is closed
- Touch targets sized for mobile tapping (buttons, service selector cards)
- Images responsive via `srcset`/Vite asset handling, no fixed pixel-width layouts

---

## 8. SEO / Performance Basics

- Per-page `<title>` and meta description (Home, Services, Shop Service, Mobile Service, About, Contact each distinct)
- Semantic HTML (single `h1` per page, proper heading hierarchy, `nav`/`main`/`footer` landmarks)
- `alt` text on all imagery (pending real photos/copy)
- `sitemap.xml` and `robots.txt` once routes are final
- Open Graph / Twitter card tags for shareability
- Lazy-load below-the-fold images; serve modern formats (WebP/AVIF) once real imagery is provided
- Vite production build defaults (code splitting per route via `React.lazy` if bundle size warrants it)
- Avoid layout shift from booking widgets/iframes if the scheduling links turn out to be embeds rather than redirects (unknown — see below)

---

## 9. Client Information Still Needed

- **Shop Service scheduling URL** (explicitly pending)
- Confirmed **Mobile Service scheduling URL** (stated as "already available" but not yet supplied to this session — needs to be provided before wiring `config.ts`)
- Physical shop address, hours, phone, email
- Full, confirmed list of services offered (shop vs mobile vs both) and any pricing to display
- Mobile service area / radius or zip codes covered
- Logo and brand assets (colors, fonts, if any brand guide exists)
- Real photography (shop, technicians, vehicles) — do not use invented/generic content long-term
- Business bio / About content, years in business, certifications, warranties
- Social media links, reviews/testimonials, licensing or insurance info if they want it displayed
- Preferred contact method(s) for the Contact page (form vs phone/email only)
- Whether the "scheduling link" is an external redirect or something to embed (iframe) — affects component design in `ScheduleButton`
- Confirmation on the proposed flat URL structure (`/shop-service`, `/mobile-service`) vs. nested alternative

---

## 10. Development Phases

1. **Phase 0 — Scaffold**: Vite + React + TS project init, Tailwind config, ESLint/Prettier, folder structure, routing skeleton, empty pages
2. **Phase 1 — Shell**: Header, Footer, Layout, nav, mobile menu, sticky booking bar (no real links yet)
3. **Phase 2 — Homepage**: build all 10 sections with placeholder copy/imagery, wired to `data/` layer
4. **Phase 3 — Sub-pages**: Services, Shop Service, Mobile Service, About, Contact
5. **Phase 4 — Scheduling wiring**: finalize `scheduling.shop` / `scheduling.mobile` once URLs confirmed; implement `ScheduleButton` states
6. **Phase 5 — Animation/polish pass**: GSAP/ScrollTrigger only where it earns its place
7. **Phase 6 — SEO/performance pass**: meta tags, sitemap, image optimization, Lighthouse pass
8. **Phase 7 — Content swap-in & QA**: replace placeholders with real client content/imagery, cross-browser/device check, then deploy to Hostinger

---

## 11. Definition of Done (v1)

- All 6 pages implemented, responsive from mobile → desktop, no horizontal scroll/layout breaks
- Shop and Mobile Service options visible and reachable from every major page (nav, homepage, footer at minimum)
- Scheduling links driven entirely from `data/config.ts` — zero hardcoded URLs in components
- Services rendered from `data/services.ts` — zero duplicated service copy across pages
- No console errors/warnings in production build
- Reasonable Lighthouse scores (performance/accessibility/SEO) on the built site — exact target TBD
- Basic accessibility: alt text present, sufficient color contrast, keyboard-navigable nav and CTAs
- Successfully builds and deploys to Hostinger from a clean checkout

---

## 12. Important Questions / Unknowns

- Is the Mobile Service scheduling URL going to be provided to this project, and if so when? (Brief says it's "available" but it hasn't been shared yet.)
- Are the Shop Service and Mobile Service **pages** meant to have distinct long-form content, or largely mirror their homepage sections with a booking focus?
- Should Shop Service show a functional placeholder (e.g., "Call to schedule" / contact fallback) while its URL is pending, or stay visually present but non-clickable?
- Any existing domain already pointed at Hostinger, or is DNS/hosting setup also part of this engagement?
- Is a contact form required (needing a form backend/email service), or is Contact page just static info?
- Any requirement for multi-location support in the future, or is this a single shop location indefinitely?

---

## Recommendation: What to Build First

Once this plan is approved, start with **Phase 0 (scaffold) + Phase 1 (shell: Header/Footer/Layout/routing)** before touching homepage sections. This locks in the folder structure, the `data/config.ts` scheduling pattern, and navigation — the foundation everything else (including the still-pending Shop URL) plugs into — without requiring any of the outstanding client content yet.
