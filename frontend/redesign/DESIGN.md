---
name: Academic Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#45464d'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built on a foundation of **Institutional Minimalism**. It targets a diverse academic community—students, faculty, and administrators—requiring a UI that balances high-density information with clarity and ease of navigation. 

The aesthetic is characterized by:
- **Quiet Authority:** A departure from typical "loud" marketing sites in favor of a functional, tool-like interface.
- **Structured Clarity:** Heavy reliance on white space and precise alignment rather than decorative elements.
- **Tech-Forward Professionalism:** Utilizing modern sans-serif typography and a restricted color palette to evoke the feeling of a sophisticated research environment.
- **Reduced Cognitive Load:** Elimination of unnecessary shadows, gradients, and secondary labels to focus the user's attention on primary tasks and data.

## Colors

The color strategy uses a "Deep Ink" approach to provide maximum contrast without the harshness of pure black.

- **Primary (#0F172A):** A deep navy blue used for navigation bars, primary headings, and critical action buttons. It represents the "Institutional" anchor of the design.
- **Secondary (#F8FAFC):** A crisp, cool-toned white used for page backgrounds and surface areas to maintain a fresh, airy feel.
- **Tertiary (#64748B):** A subtle slate gray reserved for secondary text, icons, and borders. It ensures that non-essential information recedes visually.
- **Neutral (#1E293B):** Used for body text to ensure high legibility while remaining softer than absolute black.

## Typography

This design system utilizes **Inter** exclusively to leverage its systematic, utilitarian nature. The scale is built on a tight ratio to prevent dramatic shifts in visual hierarchy, favoring subtle weight changes over massive size differences.

- **Weight as Hierarchy:** Use Semibold (600) for headlines and Medium (500) for UI labels. Bold (700) is reserved only for the largest display sizes.
- **Tight Leading:** Headlines feature slightly tighter line heights to maintain a compact, "news-like" density.
- **Uppercase Labels:** The `label-sm` style uses uppercase with slight tracking for metadata and categories to distinguish them from body copy.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The main content container is capped at 1280px to ensure line lengths remain readable on ultra-wide monitors.

- **Grid:** A 12-column grid is used for desktop, collapsing to 4 columns for mobile.
- **Rhythm:** An 8pt linear scale governs all margins and padding. 
- **Density:** High-density layouts are preferred for data-heavy views (e.g., course catalogs, grade lists), using `sm` (8px) and `md` (16px) spacing. Marketing or landing pages utilize `xl` (40px) and `2xl` (64px) sections to breathe.
- **Margins:** Desktop views maintain a 24px outer margin, which reduces to 16px on mobile devices.

## Elevation & Depth

This design system rejects heavy shadows in favor of **Tonal Layering** and **Structural Outlines**.

- **Surfaces:** Depth is created by placing white "cards" or "panels" on a `secondary` (#F8FAFC) background.
- **Borders:** Instead of shadows, use 1px solid borders in a lightened version of the tertiary color (#E2E8F0). This creates a crisp, architectural feel.
- **Hover States:** Interactive elements should not lift (no shadow increase). Instead, they should shift in background tone (e.g., from White to a very light Gray) or add a primary-colored accent border.
- **Modals:** Only use shadows for high-importance overlays (Modals/Popovers). These should be ultra-diffused: `0px 10px 25px rgba(15, 23, 42, 0.08)`.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a subtle modern touch without feeling "bubbly" or overly casual.

- **Components:** Buttons, input fields, and small chips use a 4px (0.25rem) radius.
- **Large Elements:** Cards and containers use an 8px (0.5rem) radius (`rounded-lg`) to maintain a clean corner profile.
- **Exceptions:** Search bars can occasionally use a pill shape to denote a distinct functional "type" of interaction, but this should be used sparingly.

## Components

- **Buttons:** Primary buttons use the Deep Navy (#0F172A) background with White text. Secondary buttons use a Slate (#64748B) outline with no fill. Transitions should be instant or very fast (150ms).
- **Cards:** White backgrounds, 1px light gray borders, no shadows. Card headers should use a subtle 4px bottom padding to separate titles from content.
- **Input Fields:** Use a 1px border. Focus states are indicated by a 2px Deep Navy border—avoid "glow" effects.
- **Chips/Badges:** Small, rectangular tags with a light gray background and slate text. Use for status indicators (e.g., "In Progress," "Enrolled").
- **Lists:** Clean, horizontal rows separated by 1px dividers. High vertical padding (16px) to ensure touch-friendliness and visual "scan-ability."
- **Navigation:** A vertical sidebar for desktop with icons and labels in Slate, turning Deep Navy on active states. Mobile uses a simple top bar with a "breadcrumb" style title.