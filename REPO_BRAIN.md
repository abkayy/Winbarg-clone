# REPO_BRAIN.md

> AI Context File — Auto-generated. Update after every structural change to the repo.
> Last updated: 2026-05-21 | Generator: Antigravity

---

## 1. Project Identity

- **Name:** Winbarg-Homes
- **Purpose:** A modern, production-grade construction and real estate company website. Includes a public portfolio, services listing, blog, and an admin dashboard for content management.
- **Type:** Full-stack web application
- **Status:** Active development (Bootstrap Phase)
- **Primary language:** TypeScript
- **Runtime / Platform:** Node.js / Vercel (Next.js)

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| Framework | Next.js 15 (App Router) |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Storage | Firebase Storage |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Animations | Framer Motion |
| Forms | react-hook-form + zod |
| Markdown Editor | MDXEditor |
| Markdown Rendering | react-markdown |
| Icons | lucide-react |

---

## 3. Repository Layout

```text
/
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable React components
│   │   ├── ui/             # shadcn/ui foundational components
│   │   ├── shared/         # Shared global components
│   │   ├── layouts/        # Layout wrappers (Navbar, Footer, AdminSidebar)
│   │   └── ...             # Feature specific components
│   ├── lib/                # Utility functions and library configs
│   ├── config/             # Constants and settings
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Firebase data fetching and business logic (blogService, teamService, etc)
│   ├── types/              # TypeScript interfaces and types (index.ts)
│   ├── utils/              # Helper functions (e.g., imageOptimization)
│   └── styles/             # Global CSS and Tailwind directives
├── docs/                   # Documentation (style.md, content-guidelines.md)
├── figma/                  # Figma design PNG exports
├── public/                 # Static assets
└── REPO_BRAIN.md           # This file
```

---

## 4. Architecture Overview

The application follows a modern serverless architecture using Next.js App Router with Firebase acting as the Backend-as-a-Service (BaaS).

```text
[Client] → [Next.js App Router] 
                 ↓
      [Firebase Services]
     /         |         \
[Auth]    [Firestore]  [Storage]
```

**Key Architectural Decisions:**
- **App Router:** Utilizes React Server Components (RSC) where appropriate for performance, moving data fetching to the server where possible.
- **Firebase Service Layer:** All database interactions must be abstracted into the `src/services/` directory. Do not run direct Firestore queries inside React components.
- **UI Abstraction:** All raw UI elements (buttons, inputs) go through `shadcn/ui` components located in `src/components/ui/`.
- **Admin Dashboard:** Exists as a protected route (`/admin/dashboard`) within the same Next.js project.

---

## 5. Key Files Index

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout — uses SiteShell to conditionally render Navbar/Footer. |
| `src/app/page.tsx` | Public facing Homepage. |
| `src/app/admin/layout.tsx` | Protected Admin dashboard layout with sidebar. |
| `src/app/admin/blogs/[id]/page.tsx` | Edit existing blog posts from the admin dashboard. |
| `src/app/admin/projects/[id]/page.tsx` | Edit existing projects from the admin dashboard. |
| `src/app/admin/team/[id]/page.tsx` | Edit existing team members from the admin dashboard. |
| `src/components/layouts/SiteShell.tsx` | Client wrapper that hides Navbar/Footer on `/admin` routes. |
| `src/components/shared/LogoLoader.tsx` | Branded loading spinner using company logo with Framer/Tailwind animation. |
| `src/middleware.ts` | Edge middleware protecting `/admin` routes using cookie auth check. |
| `src/lib/firebase.ts` | Firebase initialization and export of app, db, auth, and storage. |
| `src/services/blogService.ts` | Firestore service for blog CRUD and lookup by slug/id. |
| `src/services/subscriberService.ts` | Firestore service for newsletter subscriber create, list, delete. |
| `src/services/teamService.ts` | Firestore service for team member create, list, update, delete, and lookup by id. |
| `src/services/settingsService.ts` | Firestore service for getting and updating global site configuration (e.g. site_stats). |
| `src/utils/imageOptimization.ts` | Client-side image compression util before Firebase Storage upload. |
| `firestore.rules` | Firebase Firestore security rules for deployed collections. |
| `storage.rules` | Firebase Storage security rules for public asset reads and authenticated uploads. |
| `src/components/shared/BlogForm.tsx` | Polished, reusable admin blog form with grouped sections, cover-image upload (16:9 crop → Firebase Storage), MDXEditor, and toggle switches. |
| `src/components/shared/MarkdownEditor.tsx` | Client-only MDXEditor wrapper (dynamic import, ssr:false) with curated toolbar. |
| `src/components/shared/ShareButton.tsx` | Client island for share button — navigator.share() with clipboard fallback + copied toast state. |
| `docs/style.md` | Single source of truth for the project's design system (colors, typography). |

---

## 6. Domain Model / Data Schema

- **projects:** Construction portfolio projects (`id`, `title`, `category`, `location`, `description`, `keyChallenges`, `sustainableFeatures`, `images`, `featuredImage`, `featured`, `completionDate`, `client`).
- **blogs:** Blog posts (`id`, `title`, `slug`, `excerpt`, `content`, `author`, `date`, `readTime`, `category`, `coverImage`, `featured`, `published`).
- **team:** Team members (`id`, `name`, `role`, `bio`, `experience`, `projects`, `status`, `professionalBiography`, `coreExpertise`, `linkedinUrl`, `imageUrl`, `order`).
- **messages:** Contact form submissions (`id`, `fullName`, `email`, `projectType`, `budget`, `messageDetails`, `read`, `createdAt`).
- **subscribers:** Newsletter subscribers (`id`, `email`, `createdAt`).
- **settings:** Global site configuration (`id` e.g. `site_stats`, arbitrary configuration fields depending on document).
- **admins:** Authorized users for the dashboard (Managed via Firebase Auth).

---

## 7. API / Interface Surface
Using Firebase SDK directly on the client and server. No explicit REST endpoints defined, relying instead on Firestore collections.

---

## 8. Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Add Firebase config variables to .env.local

# 3. Run in development mode
npm run dev
```

Default dev server: `http://localhost:3000`

---

## 9. Coding Conventions

- **Component Structure:** Function components with `const` and arrow functions.
- **Styling:** Use Tailwind CSS utility classes via the `cn()` utility (clsx + tailwind-merge) for conditionally joining class names.
- **Services:** All Firebase interactions go in `src/services/`.
- **Forms:** Always use `react-hook-form` paired with `zod` schema validation.
- **Images:** Use Next.js `<Image>` component for optimization. Use lazy loading and blur placeholders for user-uploaded project/blog images.

---

## 10. Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Yes | — | Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Yes | — | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Yes | — | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Yes | — | Firebase Storage Bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Yes | — | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Yes | — | Firebase App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | No | — | Firebase Measurement ID |

---

## 11. External Dependencies & Integrations

| Service | Purpose |
|---------|---------|
| Firebase | Auth, Firestore, Storage |
| Framer Motion | Animations |
| shadcn/ui | UI Component Library |

---

## 12. Gotchas & Known Quirks

- The `/admin` routes require Firebase Auth. Do not rely solely on client-side routing protection; ensure sensitive Firestore data is protected via Firebase Security Rules.
- Tailwind v4 is being used. Be aware of the configuration format differences compared to v3 (if applicable, depending on Next.js setup).

---

## 13. Agent Behaviour Rules

1. **Always read this file first** before exploring the codebase in a new session.
2. **Never query the database directly** from route files — use the service layer (`src/services/`).
3. **Update this file** at the end of any session where you add structural changes.
4. **Follow the established Design System** (`docs/style.md`).

---

## 14. Change Log

| Date       | Agent             | Change Summary                                      |
|------------|-------------------|-----------------------------------------------------|
| 2026-05-21 | Antigravity       | Initial REPO_BRAIN.md generated.                    |
| 2026-05-27 | Antigravity       | Integrated Firebase, built `/admin` dashboard, dynamic frontend fetch, and SEO. |
| 2026-05-27 | Antigravity       | Added SiteShell to isolate admin layout from public Navbar/Footer; fixed sidebar overflow; added `/team/[id]` detail page. |
| 2026-05-28 | Antigravity       | Added `/properties/[id]` detail page; updated team admin to support image file uploads; fixed image optimization freeze. |
| 2026-05-28 | Antigravity       | Fixed `/properties/[slug]` routing conflict; installed SWR; added LogoLoader; added subscriber module + `/admin/subscribers`; wired up Footer newsletter form to Firestore. |
| 2026-05-28 | Antigravity       | Added missing admin edit routes for blogs, projects, and team; introduced checked-in Firestore rules. |
| 2026-05-28 | Antigravity       | Regenerated Firestore and Storage rules to match current public/admin Firestore collections and upload prefixes. |
| 2026-05-28 | Antigravity       | Relaxed blog read rules and fixed admin messages/team TS issues after public blog permission-denied reports. |
| 2026-06-04 | Codex             | Added responsive mobile refinements plus team/project metadata fields, and wired public detail pages to render Firestore-backed expertise and project highlights. |
| 2026-06-10 | Antigravity       | Blog module overhaul: polished admin form (BlogForm + MarkdownEditor + cover upload with 16:9 crop), wired search + skeleton + newsletter on public listing, and share button + author gradient avatar + code block rendering on detail page. |
| 2026-06-18 | Antigravity       | Added `settings` Firestore collection for global config. Wired `site_stats` document to an admin settings page to make About page stats dynamically editable. |
