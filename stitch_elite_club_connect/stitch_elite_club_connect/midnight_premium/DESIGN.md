---
name: Midnight Premium
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1c1b1e'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e5e1e5'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e1e5'
  inverse-on-surface: '#313033'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#fface8'
  on-secondary: '#5e0053'
  secondary-container: '#ff24e4'
  on-secondary-container: '#520049'
  tertiary: '#faf3ff'
  on-tertiary: '#3c0090'
  tertiary-container: '#e1d2ff'
  on-tertiary-container: '#7213ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffd7f0'
  secondary-fixed-dim: '#fface8'
  on-secondary-fixed: '#3a0033'
  on-secondary-fixed-variant: '#840076'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#131316'
  on-background: '#e5e1e5'
  surface-variant: '#353438'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system is engineered for an exclusive nightlife platform, targeting a high-end audience seeking curated, immersive experiences. The brand personality is sophisticated, nocturnal, and prestigious.

The visual direction combines **Glassmorphism** with **Minimalism**. It utilizes deep, multi-layered dark surfaces to create an atmospheric "midnight" depth, punctuated by vibrant neon light sources that mimic the glow of a premium lounge. High-contrast typography and generous whitespace ensure the interface remains luxurious rather than cluttered, evoking the feeling of a private VIP entrance.

## Colors
The palette is rooted in a "True Midnight" base—a near-black neutral with a subtle cool undertone to prevent visual flatness. 

- **Primary (Electric Blue):** Used for primary actions, active states, and high-priority highlights. It acts as the "neon sign" of the UI.
- **Secondary (Magenta):** Reserved for secondary accents, notifications, or specific category branding to provide a high-energy contrast.
- **Tertiary (Deep Violet):** Used for subtle gradients, hover states, and background glows to add chromatic depth.
- **Neutral (Midnight Black):** The foundation for all surfaces. Use varying opacities of white (5% to 12%) for glass overlays rather than solid grays.

## Typography
The typography strategy relies on the tension between the classic elegance of **Bodoni Moda** and the modern, clean functionality of **Plus Jakarta Sans**. 

Headlines should be expressive and high-contrast, utilizing the serif's dramatic strokes to convey luxury. Body text remains sans-serif for maximum readability against dark backgrounds. Labels use increased letter spacing and uppercase styling to mimic the refined look of high-end fashion editorial layouts.

## Layout & Spacing
The layout follows a **fluid grid** model with significant breathing room. 

- **Desktop:** A 12-column grid with wide 64px outer margins to center focus on content. 
- **Mobile:** A 4-column grid with 20px margins. 
- **Rhythm:** An 8px base unit drives all padding and margins. Use "Super-padding" (e.g., 80px or 120px) between major sections to maintain a gallery-like, premium feel. Content should never feel cramped; if in doubt, increase whitespace.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layers** rather than traditional shadows.

1.  **The Void (Base):** The darkest neutral color, representing the deepest background layer.
2.  **Frosted Glass (Surfaces):** Cards and containers use a semi-transparent background (White at 5-8% opacity) with a `backdrop-filter: blur(20px)`.
3.  **Luminescence:** High-elevation elements (like active buttons) feature a subtle "outer glow" using the Primary or Secondary color at very low opacity (15-20%) to simulate a neon light cast.
4.  **Stroke Definition:** Instead of shadows, use 1px semi-transparent borders (White at 10% opacity) to define the edges of glass elements against the dark background.

## Shapes
The design system utilizes **Rounded** geometry (8px base radius) to balance the sharp, high-contrast nature of the typography.

Buttons and high-interaction elements should feel smooth and premium. Larger cards use `rounded-xl` (24px) to create a soft, inviting container for high-quality event photography. Interactive states should feel "liquid"—smooth transitions between shapes or subtle expansions on hover.

## Components
- **Buttons:** Primary buttons use a solid gradient (Primary to Tertiary) with white text. Secondary buttons are "Ghost Glass"—transparent with a thin 1px primary border and backdrop blur.
- **Chips/Badges:** Use "Neon Outlines"—transparent backgrounds with high-saturation borders and caps-lock label typography.
- **Cards:** The most critical component. They must feature `backdrop-filter`, a 1px top-down inner highlight (white at 15%), and high-quality imagery with a subtle dark gradient overlay at the bottom to ensure text legibility.
- **Input Fields:** Minimalist. Only a bottom border that glows in the Primary color when focused.
- **Glass Navigation:** The top navigation bar is a fixed glass element with a heavy blur (40px) to create a beautiful color bleed as the user scrolls through vibrant content.
- **Immersive Carousels:** Use full-bleed images for event highlights with Bodoni Moda display type overlapping the imagery.