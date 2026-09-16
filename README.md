# Unity Auto Group — Website

The official website for **Unity Auto Group** ([AutoRepairNearHere.com](https://autorepairnearhere.com)), an automotive repair business offering both **in-shop repair service** and **mobile repair service** (technicians travel to the customer).

The site guides customers through a simple journey — enter vehicle and repair information, get an estimated quote, and submit a service request — before Unity Auto Group follows up to confirm parts and schedule the repair at the shop or on-site.

## Project Status

🚧 **In active planning / early development.** See [`PLANNING.md`](./PLANNING.md) for the full implementation plan and [`Unity_Auto_Group_Website_Development_Instructions.md`](./Unity_Auto_Group_Website_Development_Instructions.md) for the client-authorized project brief.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) for icons
- [GSAP](https://gsap.com/) / ScrollTrigger, used sparingly for scroll-based animation
- Deployment target: [Hostinger](https://www.hostinger.com/)

## Brand

- **Domain:** AutoRepairNearHere.com
- **Approved colors:** Green • Black • Gray
- **Design/UX reference:** [FixMyCar.io](https://fixmycar.io) — used strictly as a workflow and simplicity reference, not to be copied

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

The app runs locally at `http://localhost:5173` by default.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server with hot reload |
| `npm run build` | Type-check and build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint against the codebase |

## Project Structure

```
src/
  pages/          # Route-level pages (Home, Services, Shop Service, Mobile Service, About, Contact)
  components/     # Reusable UI, organized by feature area
  data/           # Site configuration and content data (services, scheduling, etc.)
  integrations/   # Third-party integrations (e.g. Epicor)
  hooks/          # Shared React hooks
  lib/            # Utility functions
  assets/         # Images and static assets
```

See [`PLANNING.md`](./PLANNING.md) for the full architecture rationale.

## Documentation

- [`PLANNING.md`](./PLANNING.md) — implementation plan: architecture, pages, data model, phases, and open questions
- [`Unity_Auto_Group_Website_Development_Instructions.md`](./Unity_Auto_Group_Website_Development_Instructions.md) — client-authorized project brief and development direction
- [`v1-plan.md`](./v1-plan.md) — original planning brief
