# Unity Auto Group — Website Planning

We are building the **first website for Unity Auto Group**, an **automotive repair business**.

They now have two service options:

1. **Shop Service** — Customers bring their vehicle to Unity Auto Group's physical repair shop.
2. **Mobile Service** — Unity Auto Group travels to the customer's location for mobile repairs.

There will be **two separate scheduling links**:

* Shop Service — URL is still pending from the client.
* Mobile Service — URL is already available.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React
* GSAP/ScrollTrigger only where useful
* Deployment: Hostinger

## Important

**Planning only. Do NOT start coding yet.**

First analyze the project and create a concise implementation plan.

## Website Pages

Plan for:

* Home
* Services
* Shop Service
* Mobile Service
* About
* Contact

## Homepage Focus

The main customer journey should be:

**Need auto repair → Choose Shop or Mobile → Schedule**

The homepage should include:

1. Hero
2. Shop vs Mobile Service selection
3. Services
4. Why Choose Unity Auto Group
5. How It Works
6. Shop Service
7. Mobile Service
8. About
9. Final CTA
10. Footer

The **Shop Service** and **Mobile Service** options should be highly visible throughout the website.

## Architecture

Recommend a clean React structure with reusable components.

We should have centralized configuration for:

```ts
scheduling.shop
scheduling.mobile
```

so the pending Shop scheduling URL can be added later in one place.

Services should also be structured as data rather than duplicated directly inside components.

## Design Direction

Aim for:

* Modern automotive
* Professional repair shop
* Premium but simple
* Strong typography
* High-quality automotive imagery
* Subtle animations
* Mobile-first
* Fast loading

Avoid excessive animations, unnecessary libraries, and over-engineering.

## Planning Output

Give me:

1. Recommended folder structure
2. Page structure
3. Homepage section structure
4. Component architecture
5. Scheduling/data architecture
6. Design direction
7. Responsive strategy
8. SEO/performance basics
9. Client information we still need
10. Development phases
11. Definition of Done
12. Important questions/unknowns

Do **not** invent business information, services, addresses, or URLs.

Clearly separate **confirmed requirements**, **assumptions**, and **information still needed from the client**.

### Final Step

End with a short recommendation for what we should build first after the plan is approved.

**Do not start implementation yet.**
