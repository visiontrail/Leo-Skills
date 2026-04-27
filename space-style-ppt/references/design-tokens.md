# Space Style Design Tokens — PPTX Reference

Complete token set for the Space / Astro design system, intended for pptxgenjs slide generation.

---

## Color Tokens

### Backgrounds (slide fill)

| Token | Hex | Usage |
|-------|-----|-------|
| Space Black | `060B14` | DEEP master — covers, section dividers, dramatic CTA slides |
| Deep Navy | `0B1628` | SPACE master — all content slides |
| Nebula Dark | `122038` | Card fills, elevated containers on SPACE slides |
| Cosmic Surface | `0F1B30` | Secondary card variant, inner containers |
| Dark Elevated | `1A2F4A` | Hover-like / highlighted card variant (use sparingly) |

### Text Colors

| Token | Hex | Use on DEEP | Use on SPACE |
|-------|-----|-------------|--------------|
| Starlight | `E4EEFF` | Primary headings | Primary headings |
| Moonbeam | `8BAFCC` | Body text | Body text |
| Cosmic Gray | `4A6A85` | Captions, metadata | Captions, metadata |
| Dim Star | `2A4055` | Disabled / very subtle | Disabled / very subtle |
| Pale Blue | `C8DCFF` | Star dots, decorative | Star dots, decorative |

> **Rule**: Never use pure `FFFFFF` for any text. `E4EEFF` (starlight) is the brightest text color allowed. Never use pure `000000` as a background.

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Nebula Blue | `4D8EFF` | Primary accent — accent bars, stat numbers, CTA fills, icon dots |
| Cyan Spark | `00CCEE` | Secondary accent — one special highlight moment per deck max |
| Solar Gold | `FFA726` | Tertiary warm accent — only for contrast callouts, rarely used |

> **Rule**: `4D8EFF` nebula blue is the brand heart of every slide. `00CCEE` and `FFA726` are satellites — they orbit once per deck, never dominate.

### Borders & Lines

| Token | Hex | Usage |
|-------|-----|-------|
| Border Deep | `1A2E45` | Subtle card borders — barely visible, structural |
| Border Glow | `2A4F72` | Normal card borders — visible but not distracting |
| Border Accent | `4D8EFF` | Neon-style borders — thin (1pt max), used for emphasis |
| Horizon Line | `4D8EFF` | Full-width thin line on divider slides (opacity implied by thinness) |

---

## Typography Tokens

### Font Families (pptxgenjs `fontFace`)

| Role | fontFace value | Notes |
|------|---------------|-------|
| Geometric / Headlines | `Trebuchet MS` | Cross-platform, geometric, modern. Do NOT bold at large sizes. |
| Sans / Body & UI | `Calibri` | High readability at small sizes |
| Code / Data | `Consolas` | Monospace, for code snippets or technical data tables |

**Critical**: Trebuchet MS headings should have `bold: false` at 22pt and above. The geometric letterforms already carry weight. Use `bold: true` only for 14pt-and-under labels (like CTA button text).

### Size Scale (pptxgenjs `fontSize` in pt)

| Role | Size | fontFace | Color |
|------|------|----------|-------|
| Hero / Cover title | 44–48 | Trebuchet MS | `E4EEFF` |
| Section title | 36 | Trebuchet MS | `E4EEFF` |
| Slide title | 28–32 | Trebuchet MS | `E4EEFF` |
| Sub-heading | 22–24 | Trebuchet MS | `E4EEFF` |
| Card title | 18–20 | Trebuchet MS | `E4EEFF` |
| Body large | 18 | Calibri | `8BAFCC` |
| Body standard | 15–16 | Calibri | `8BAFCC` |
| Caption / meta | 12–13 | Calibri | `4A6A85` |
| Stat number | 44–56 | Trebuchet MS | `4D8EFF` |
| Stat label | 13–14 | Calibri | `8BAFCC` |
| Pull-quote | 20 italic | Trebuchet MS | `4D8EFF` |
| CTA button | 14 bold | Calibri | `E4EEFF` |
| Section number | 56–64 | Trebuchet MS | `4D8EFF` |

### Line Spacing (pptxgenjs `lineSpacingMultiple`)

| Context | Value |
|---------|-------|
| Body / prose | `1.45` |
| Headings | `1.1` – `1.2` |
| Captions | `1.3` |

---

## Spacing System

Base unit: 8px ≈ 0.083" in PPTX units.

| Role | Value (inches) |
|------|---------------|
| Slide margin (all sides) | `0.5` min |
| Title top position | `0.38` – `0.45` |
| Accent bar gap below title | `0.08` |
| Accent bar to first content | `0.22` |
| Between content blocks | `0.20` – `0.28` |
| Card internal padding | `0.28` |
| Between stat blocks | `0.22` |
| Corner bracket inset | `0.28` |

### Widescreen Content Area (13.33" × 7.5")
- Safe x range: `0.5` to `12.83`
- Safe y range: `0.38` to `7.1`
- Two-column split: left col `w=7.2`, right col `w=5.6`, gap `0.2`
- Three-col stats: each `w=3.7`, gaps `0.22`

---

## Shape Tokens

### Nebula Blue Accent Bar (horizontal rule under title)
```js
{
  shape: 'rect',
  x: 0.5,
  y: titleY + titleH + 0.08,
  w: 3.5,
  h: 0.035,
  fill: { color: '4D8EFF' },
  line: { type: 'none' }
}
```

### Horizon Line (full-width section divider)
```js
{
  shape: 'rect',
  x: 0.5, y: 2.4, w: 12.33, h: 0.02,
  fill: { color: '4D8EFF' },
  line: { type: 'none' }
}
```

### Dark Glass Card (primary card type)
```js
{
  shape: 'roundRect',
  rectRadius: 0.08,
  fill: { color: '122038' },
  line: { color: '2A4F72', width: 1 }
}
```

### Elevated Dark Card (slightly brighter)
```js
{
  shape: 'roundRect',
  rectRadius: 0.08,
  fill: { color: '1A2F4A' },
  line: { color: '4D8EFF', width: 1 }
}
```

### CTA Button Shape
```js
{
  shape: 'roundRect',
  rectRadius: 0.10,
  fill: { color: '4D8EFF' },
  line: { type: 'none' }
}
// with text overlay: color='E4EEFF', fontFace='Calibri', bold=true, fontSize=14
```

### Corner Bracket — Top Left
```js
const bLen = 0.45, bThk = 0.03, bX = 0.28, bY = 0.22;
// Horizontal arm
{ shape:'rect', x:bX, y:bY, w:bLen, h:bThk, fill:{color:'4D8EFF'}, line:{type:'none'} }
// Vertical arm
{ shape:'rect', x:bX, y:bY, w:bThk, h:bLen, fill:{color:'4D8EFF'}, line:{type:'none'} }
```

### Corner Bracket — Bottom Right
```js
const brX = 13.33 - bX - bLen, brY = 7.5 - bY - bLen;
// Horizontal arm
{ shape:'rect', x:brX, y:brY+bLen-bThk, w:bLen, h:bThk, fill:{color:'4D8EFF'}, line:{type:'none'} }
// Vertical arm
{ shape:'rect', x:brX+bLen-bThk, y:brY, w:bThk, h:bLen, fill:{color:'4D8EFF'}, line:{type:'none'} }
```

### Star Dot (small decorative circle)
```js
// Size varies: r = 0.04 (tiny) to 0.08 (small)
{
  shape: 'ellipse',
  x: starX, y: starY, w: r, h: r,
  fill: { color: 'C8DCFF' },
  line: { type: 'none' }
}
```

### Icon Dot (card accent, nebulaBlue filled circle)
```js
{
  shape: 'ellipse',
  x: cardX + 0.28, y: cardY + 0.28, w: 0.28, h: 0.28,
  fill: { color: '4D8EFF' },
  line: { type: 'none' }
}
```

---

## Do / Don't Quick Reference

| Do | Don't |
|----|-------|
| Use `060B14` for DEEP slides, `0B1628` for SPACE | Use `000000` pure black or `FFFFFF` pure white as background |
| Use `E4EEFF` starlight for headings | Use `FFFFFF` pure white for any text |
| Use `8BAFCC` moonbeam for body text | Use cool blue-gray without warm undertone |
| `Trebuchet MS` with `bold:false` for headings ≥22pt | `bold:true` on large Trebuchet MS headings |
| Reserve `4D8EFF` for 2–3 key visual moments per slide | Fill every element with nebula blue |
| `00CCEE` cyan for one standout moment per deck | Use cyan on every divider slide |
| Alternate DEEP/SPACE slides for narrative rhythm | Use only one environment throughout |
| `lineSpacingMultiple:1.45` for body text | Tight single-spacing on body |
| Corner brackets on DEEP slides (covers, dividers) | Corner brackets on every SPACE content slide |
| Star dots: 10–18 per DEEP slide, keep small | Dense star fields that compete with content |
| Thin `2A4F72` or `4D8EFF` borders for cards | Heavy drop shadows (unsupported in PPTX) |
