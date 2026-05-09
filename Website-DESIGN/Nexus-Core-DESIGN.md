---
version: "alpha"
name: "Nexus Core"
description: "Nexus Core Pricing Section is designed for comparing plans and supporting conversion decisions. Key features include plan comparison blocks and conversion-oriented actions. It is suitable for subscription pricing pages and plan comparison experiences."
colors:
  primary: "#A3B1C6"
  secondary: "#0F172A"
  tertiary: "#B1A5CE"
  neutral: "#F4F7FA"
  background: "#F4F7FA"
  surface: "#F4F7FA"
  text-primary: "#FFFFFF"
  text-secondary: "#F4F7FA"
  border: "#FFFFFF"
  accent: "#A3B1C6"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "96px"
    fontWeight: 600
    lineHeight: "96px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "6px"
  sm: "6px"
  md: "8px"
  lg: "14px"
  xl: "16px"
  gap: "4px"
  section-padding: "24px"
components:
  button-primary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "14px"
  button-secondary:
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "8px"
  button-link:
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "0px"
---

## Overview

- **Composition cues:**
  - Layout: Flex
  - Content Width: Bounded
  - Framing: Glassy
  - Grid: Minimal

## Colors

The color system uses dark mode with #A3B1C6 as the main accent and #F4F7FA as the neutral foundation.

- **Primary (#A3B1C6):** Main accent and emphasis color.
- **Secondary (#0F172A):** Supporting accent for secondary emphasis.
- **Tertiary (#B1A5CE):** Reserved accent for supporting contrast moments.
- **Neutral (#F4F7FA):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #F4F7FA; Surface: #F4F7FA; Text Primary: #FFFFFF; Text Secondary: #F4F7FA; Border: #FFFFFF; Accent: #A3B1C6

## Typography

Typography relies on Inter across display, body, and utility text.

- **Display (`display-lg`):** Inter, 96px, weight 600, line-height 96px, letter-spacing -0.025em.
- **Body (`body-md`):** Inter, 14px, weight 400, line-height 20px.
- **Labels (`label-md`):** Inter, 14px, weight 500, line-height 20px.

## Layout

Layout follows a flex composition with reusable spacing tokens. Preserve the flex, bounded structural frame before changing ornament or component styling. Use 6px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a flex / bounded composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Flex
- **Content width:** Bounded
- **Base unit:** 6px
- **Scale:** 6px, 8px, 14px, 16px, 20px, 24px, 32px, 40px
- **Section padding:** 24px
- **Gaps:** 4px, 8px, 16px, 32px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF
- **Blur:** 4px, 12px

## Shapes

Shapes rely on a tight radius system anchored by 9999px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles.

### Buttons
- **Primary:** background #F4F7FA, text #0F172A, radius 9999px, padding 14px, border 0px solid rgb(229, 231, 235).
- **Secondary:** text #FFFFFF, radius 9999px, padding 8px, border 1px solid rgba(255, 255, 255, 0.2).
- **Links:** text #FFFFFF, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 6px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected minimal motion intensity without a deliberate reason.

## Motion

Motion stays restrained and interface-led across text, layout, and scroll transitions. Timing clusters around 150ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes.

**Motion Level:** minimal

**Durations:** 150ms

**Easings:** ease, cubic-bezier(0.4, 0, 0.2, 1)

**Hover Patterns:** text, color

## WebGL

Reconstruct the graphics as a full-bleed background field using webgl, custom shaders. The effect should read as technical, meditative, and atmospheric: dot-matrix particle field with black and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** WebGL, custom shaders

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, Shader gradients, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- WebGL Background Canvas -->
      <canvas id="webgl-canvas" class="absolute inset-0 z-0 w-full h-full pointer-events-none"></canvas>

      <!-- Main Content Container -->
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      const canvas = document.getElementById('webgl-canvas');
      const gl = canvas.getContext('webgl');

      if (gl) {
          const program = gl.createProgram();

          const compileShader = (source, type) => {
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      const canvas = document.getElementById('webgl-canvas');
      const gl = canvas.getContext('webgl');

      if (gl) {
          const program = gl.createProgram();
      ```
