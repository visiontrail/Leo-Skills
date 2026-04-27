# Claude Design Tokens — PPTX Reference

Complete token set extracted from the Anthropic/Claude design system for use in pptxgenjs slide generation.

---

## Color Tokens

### Backgrounds (slide fill)
| Token | Hex | Usage |
|-------|-----|-------|
| Parchment | `F5F4ED` | Primary light slide background — the emotional foundation |
| Ivory | `FAF9F5` | Card fills, elevated containers on light slides |
| Near Black | `141413` | Dark slide background, dramatic sections |
| Dark Surface | `30302E` | Secondary dark containers, nav-like elements |

### Text Colors
| Token | Hex | Use on Light | Use on Dark |
|-------|-----|-------------|-------------|
| Near Black | `141413` | Primary text | — |
| Olive Gray | `5E5D59` | Body, secondary text | — |
| Stone Gray | `87867F` | Caption, metadata, tertiary | Caption on dark |
| Warm Silver | `B0AEA5` | — | Body text on dark (never use white) |
| Ivory | `FAF9F5` | — | Headlines on dark |
| Dark Warm | `3D3D3A` | Emphasized secondary | — |

### Brand & Accent
| Token | Hex | Usage |
|-------|-----|-------|
| Terracotta | `C96442` | Primary CTA, stat numbers, accent bars — use sparingly |
| Coral Accent | `D97757` | Lighter variant for secondary brand moments |

### Borders & Lines
| Token | Hex | Usage |
|-------|-----|-------|
| Border Cream | `F0EEE6` | Subtle card borders on light |
| Border Warm | `E8E6DC` | Prominent borders, section separators on light |
| Border Dark | `30302E` | Borders on dark slides |

---

## Typography Tokens

### Font Families (pptxgenjs `fontFace`)
| Role | fontFace value | Notes |
|------|---------------|-------|
| Serif / Headlines | `Georgia` | Substitute for Anthropic Serif. Weight = normal (bold: false) |
| Sans / Body & UI | `Calibri` | Substitute for Anthropic Sans |
| Code (rare) | `Consolas` | Monospace, only for code slides |

**Critical**: Never set `bold: true` on Georgia headings. The font provides natural gravitas at weight 400 — bolding looks wrong.

### Size Scale (pptxgenjs `fontSize` in pt)
| Role | Size | fontFace | Typical color (light bg) |
|------|------|----------|-------------------------|
| Hero / Cover title | 44–48 | Georgia | `141413` or `FAF9F5` |
| Section title | 36 | Georgia | `141413` or `FAF9F5` |
| Slide title | 28–32 | Georgia | `141413` |
| Sub-heading | 22–24 | Georgia | `141413` |
| Card title | 18–20 | Georgia | `141413` |
| Body large | 18 | Calibri | `5E5D59` |
| Body standard | 15–16 | Calibri | `5E5D59` |
| Caption / meta | 12–13 | Calibri | `87867F` |
| Label / badge | 11 | Calibri | `87867F` |
| Stat number | 44–56 | Georgia | `C96442` |
| Stat label | 13–14 | Calibri | `5E5D59` |

### Line Spacing (pptxgenjs `lineSpacingMultiple`)
| Context | Value |
|---------|-------|
| Body / prose | `1.4` – `1.5` |
| Headings | `1.1` – `1.2` |
| Captions | `1.3` |

---

## Spacing System

Base unit: 8px ≈ 0.083" in PPTX units.

| Role | Value (inches) |
|------|---------------|
| Slide margin (all sides) | `0.5` min |
| Title top position | `0.35` – `0.45` |
| Title-to-content gap | `0.25` – `0.35` |
| Between content blocks | `0.2` – `0.3` |
| Card internal padding | `0.25` |
| Between stat blocks | `0.2` |

### Widescreen Content Area (13.33" × 7.5")
- Safe x range: `0.5` to `12.83`
- Safe y range: `0.35` to `7.1`
- Two-column split: left col `w=7.5`, right col `w=4.8`, gap `0.2`
- Three-col stats: each `w=3.6`, gaps `0.25`

---

## Shape Tokens

### Terracotta Accent Bar (horizontal rule under title)
```js
{
  x: 0.5, y: [title_y + title_h + 0.08], w: 3.5, h: 0.04,
  fill: { color: 'C96442' },
  line: { type: 'none' }
}
```

### Left Section Divider Bar (vertical, full height)
```js
{
  x: 0, y: 0, w: 0.08, h: 7.5,
  fill: { color: 'C96442' },
  line: { type: 'none' }
}
```

### Ivory Card with Warm Border
```js
{
  shape: pptx.ShapeType.roundRect,
  rectRadius: 0.08,  // ~8px radius
  fill: { color: 'FAF9F5' },
  line: { color: 'E8E6DC', width: 1 }
}
```

### Dark Card on Dark Slide
```js
{
  fill: { color: '30302E' },
  line: { color: '30302E', width: 1 }
}
```

### CTA Button Shape
```js
{
  shape: pptx.ShapeType.roundRect,
  rectRadius: 0.12,
  fill: { color: 'C96442' },
  line: { type: 'none' }
}
// with text overlay: color='FAF9F5', fontFace='Calibri', bold=true, fontSize=14
```

---

## Do / Don't Quick Reference

| Do | Don't |
|----|-------|
| Use `F5F4ED` parchment for light backgrounds | Use `FFFFFF` pure white as background |
| Use `B0AEA5` warm silver for dark-slide body text | Use `FFFFFF` white for body text on dark |
| `Georgia` bold:false for all headings | `bold:true` on Georgia |
| Reserve `C96442` for 2–3 key moments per slide | Use terracotta for body text or decorative fill everywhere |
| Alternate dark/light slides for chapter rhythm | Use only light slides throughout |
| Use `lineSpacingMultiple:1.4` for body text | Tight single-spacing on body text |
| Use thin warm borders (`E8E6DC`, 1pt) for cards | Heavy drop shadows (unsupported in PPTX anyway) |
| Use `87867F` stone gray for captions | Cool blue-gray for any neutral text |
| Accent bars as `C96442` thin rects below titles | Underlines on heading text |
