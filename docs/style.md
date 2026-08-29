# Design System & Style Guidelines

This file serves as the Single Source of Truth for all styling and design elements across the Winbarg Homes website. It must be strictly followed when creating new components or pages.

## Typography
- **Primary Font:** 'Plus Jakarta Sans', sans-serif
- **Weights:**
  - Normal: 400
  - Medium: 500
  - Bold: 700
  - Black/Extra-Bold: 800, 900

## Colors
The project relies on a Slate-based color palette with a deep brand blue.

- **Brand Primary:** `#1A3D7C` (Deep Blue - used for icons, CTA buttons, highlighted text)
- **Primary Text:** `#0F172A` (Slate 900 - used for primary headings and strong emphasis)
- **Secondary Text:** `#475569` (Slate 600 - used for body copy and descriptions)
- **Muted Text:** `#64748B` (Slate 500 - used for captions and less important details)
- **Subtle / Border:** `#F1F5F9` (Slate 100 - used for borders and subtle dividers)
- **Backgrounds:**
  - Base: `#FFFFFF` (White)
  - Off-white/Section: `#F8FAFC` (Slate 50 - used for alternating section backgrounds)
  - Overlay: `rgba(26, 61, 124, 0.1)` (Transparent brand blue for active states or overlays)

## Border Radius & Shadows
- **Card Radius:** `24px` (`rounded-3xl`)
- **Card Shadow:** `0px 1px 2px rgba(0, 0, 0, 0.05)` (`shadow-sm` or custom)
- **Overlay Radius:** `24px` (`rounded-3xl` for image overlays or icon containers)

## Spacing & Layout
- **Containers:** Max width `1280px` (`max-w-screen-xl`), with horizontal padding (e.g., `px-4` to `px-8`).
- **Section Spacing:** Generous padding around sections, often `py-24` (96px).
- **Flex Layouts:** Flexbox is predominantly used for aligning elements. Gaps typically range from `gap-4` (16px) to `gap-8` (32px) and up to `gap-16` (64px) for major sections.

## Animations
- **Framer Motion:** Use only subtle animations.
  - Fade-ins for sections scrolling into view.
  - Staggered reveals for grid items (like cards).
  - Hover effects on cards (slight lift or shadow increase).
