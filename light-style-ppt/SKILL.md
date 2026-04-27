---
name: light-style-ppt
description: "Create beautifully designed .pptx presentations in a warm editorial visual style — parchment tones, terracotta accents, serif typography, and magazine-grade layouts. Use this skill any time the user wants a slide deck, pitch deck, presentation, or PowerPoint. Trigger on: 'make me slides', 'create a deck', 'build a presentation', 'PPT about X', 'PowerPoint for Y', 'generate slides', '做PPT', '做幻灯片', '生成演示文稿', or any request where visual slides are the output. If the user mentions a topic, report, proposal, or meeting prep that needs visual output — this skill almost certainly applies. Prefer this skill over generic PPTX generation whenever you want the result to look polished and intentional."
---

# Claude Style PPT Skill

Create `.pptx` presentations that embody the Claude/Anthropic design language: warm parchment surfaces, terracotta brand moments, editorial serif/sans hierarchy, and a chapter-like dark/light alternation that feels like a well-designed magazine.

Read [design-tokens.md](references/design-tokens.md) for the complete color, typography, and spacing specification before writing any slide code.

---

## Quick Mental Model

Every deck has two "environments":
- **Light slides** — parchment background (`F5F4ED`), near-black text, ivory cards — feels like reading a high-quality document
- **Dark slides** — near-black background (`141413`), warm silver text — punctuates transitions and conclusions like a chapter break

Alternate intentionally: cover (dark or light), content (light), section divider (dark), content (light), conclusion (dark). This rhythm is what makes the deck feel authored, not generated.

---

## Workflow

### 1. Understand the Content

Before touching pptxgenjs, think through:
- What story does this deck tell? What's the one-sentence takeaway?
- How many sections/chapters does the content have?
- Which slides deserve a dark "chapter break" treatment?
- Are there stats, quotes, or key moments that deserve a dedicated callout slide?

Plan the slide sequence. Estimate 1 slide per major point — resist the urge to cram.

### 2. Set Up pptxgenjs

```bash
npm install -g pptxgenjs
```

Use Node.js to generate the deck. Write a single `build.js` script and run it:

```bash
node build.js
```

### 3. Apply the Design System

**Always read [design-tokens.md](references/design-tokens.md) first.** It contains exact hex values, font names, sizes, and pptxgenjs property names.

Key rules at a glance:
- Backgrounds: `F5F4ED` (light) or `141413` (dark) — never pure white
- Primary heading font: `Georgia` (Anthropic Serif substitute), weight 500 equivalent = `bold: false` at large size
- Body font: `Calibri` for UI/body text
- Brand accent: `C96442` (terracotta) — use sparingly for CTAs, dividers, key numbers
- Warm silver `B0AEA5` for body text on dark slides
- Ring shadows don't translate to PPTX — use thin border lines (`E8E6DC` on light, `30302E` on dark) instead

### 4. Slide Layout Palette

Use layouts from the catalogue below. Pick the best fit per slide — don't repeat the same layout more than twice in a row.

#### COVER — Dark or Light Hero
```
Dark variant:  bg=141413, title Georgia 44pt color=FAF9F5, subtitle Calibri 18pt color=B0AEA5
Light variant: bg=F5F4ED, title Georgia 44pt color=141413, subtitle Calibri 18pt color=5E5D59
Accent: a 3pt horizontal rule in C96442 beneath the title, width ~40% of slide
Optional: company/date in Stone Gray (87867F) at bottom-left, 12pt Calibri
```

#### SECTION DIVIDER — Dark Chapter Break
```
bg=141413
Large section number or icon: C96442, Georgia, 60pt (optional)
Section title: Georgia 36pt, color=FAF9F5, left-aligned, vertically centered
Subtitle/description: Calibri 16pt, color=B0AEA5
Left accent bar: 6pt wide rectangle in C96442, full slide height, x=0
```

#### CONTENT — Two Column
```
bg=F5F4ED
Slide title: Georgia 28pt, color=141413, top-left
Left col (60%): body text Calibri 15pt, color=5E5D59, line spacing 1.4
Right col (38%): ivory card (FAF9F5), border 1pt E8E6DC, radius approx via shape
Key stat or callout in right card: Georgia 36pt, color=C96442
```

#### CONTENT — Single Column Prose
```
bg=F5F4ED
Title: Georgia 28pt, color=141413
Body: Calibri 16pt, color=5E5D59, generous line spacing (multiply 1.4)
Max 5 lines of text — if more, split across slides
Optional pull-quote: Georgia italic 20pt, color=C96442, indented
```

#### QUOTE / HIGHLIGHT
```
bg=F5F4ED (or 141413 for dramatic effect)
Large quotation mark shape: C96442, very large (~120pt)
Quote text: Georgia 22pt, color=141413 (or FAF9F5 on dark), italic, centered
Attribution: Calibri 13pt, color=87867F, right-aligned
```

#### STATS / DATA
```
bg=F5F4ED
Title: Georgia 28pt, color=141413
2–3 stat blocks in a row:
  - Number: Georgia 52pt, color=C96442
  - Label: Calibri 14pt, color=5E5D59
  - Thin top border: 2pt C96442
Separate stat blocks with thin vertical lines (E8E6DC)
```

#### FEATURE GRID — Cards
```
bg=F5F4ED
Title: Georgia 28pt, color=141413
2–3 ivory cards (FAF9F5) with 1pt border E8E6DC:
  - Icon area (optional): small C96442 filled circle, 24x24pt
  - Card title: Georgia 18pt, color=141413
  - Card body: Calibri 14pt, color=5E5D59
Cards have 8pt corner radius approximated via pptxgenjs `rectRadius`
```

#### CONCLUSION / CALL TO ACTION — Dark
```
bg=141413
Main message: Georgia 36pt, color=FAF9F5, centered
Sub-message: Calibri 16pt, color=B0AEA5, centered
CTA button shape: fill=C96442, text=FAF9F5, Calibri 14pt bold, rounded rect
Optional: subtle warm border rect around the CTA area (30302E)
```

---

## pptxgenjs Code Patterns

### Presentation Setup
```js
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5" widescreen

// Slide master — light theme
pptx.defineSlideMaster({
  title: 'LIGHT',
  background: { color: 'F5F4ED' },
});

// Slide master — dark theme
pptx.defineSlideMaster({
  title: 'DARK',
  background: { color: '141413' },
});
```

### Georgia Serif Heading
```js
slide.addText('Section Title', {
  x: 0.5, y: 0.4, w: 9, h: 0.8,
  fontSize: 28,
  fontFace: 'Georgia',
  color: '141413',
  bold: false,           // Georgia at weight 500 = not bold
  lineSpacingMultiple: 1.2,
});
```

### Terracotta Accent Rule
```js
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 1.35, w: 4.5, h: 0.04,
  fill: { color: 'C96442' },
  line: { type: 'none' },
});
```

### Ivory Card with Border
```js
slide.addShape(pptx.ShapeType.roundRect, {
  x: 6.8, y: 1.2, w: 5.8, h: 5.6,
  rectRadius: 0.1,
  fill: { color: 'FAF9F5' },
  line: { color: 'E8E6DC', width: 1 },
});
```

### Body Text on Dark
```js
slide.addText('Supporting detail here', {
  x: 0.6, y: 2.0, w: 8, h: 3,
  fontSize: 16,
  fontFace: 'Calibri',
  color: 'B0AEA5',        // Warm Silver — never pure white on dark
  lineSpacingMultiple: 1.5,
});
```

### Large Stat Number
```js
slide.addText('87%', {
  x: 1.0, y: 2.2, w: 3, h: 1.5,
  fontSize: 52,
  fontFace: 'Georgia',
  color: 'C96442',
  bold: false,
  align: 'center',
});
slide.addText('retention rate', {
  x: 1.0, y: 3.6, w: 3, h: 0.4,
  fontSize: 13,
  fontFace: 'Calibri',
  color: '5E5D59',
  align: 'center',
});
```

---

## Typography Rules

| Role | Font | Size | Color (light bg) | Color (dark bg) |
|------|------|------|-----------------|-----------------|
| Slide title | Georgia | 28–36pt | `141413` | `FAF9F5` |
| Cover/hero title | Georgia | 40–48pt | `141413` | `FAF9F5` |
| Section number | Georgia | 56–64pt | `C96442` | `C96442` |
| Body / prose | Calibri | 15–16pt | `5E5D59` | `B0AEA5` |
| Caption / meta | Calibri | 12–13pt | `87867F` | `87867F` |
| Stat number | Georgia | 44–56pt | `C96442` | `C96442` |
| Card title | Georgia | 18–20pt | `141413` | — |
| Card body | Calibri | 14pt | `5E5D59` | — |
| CTA button text | Calibri bold | 14pt | `FAF9F5` | `FAF9F5` |

**Never use bold on Georgia** — weight 500 is the ceiling. The font already has gravitas.  
**Never use cool grays** — every muted color has a warm (yellow-brown) undertone.  
**Line spacing**: 1.4–1.5× for body, 1.1–1.2× for headings.

---

## Spacing & Margins

- Slide margins: minimum 0.5" on all sides
- Content area: x=0.5 to x=12.83, y=0.4 to y=7.1 (widescreen 13.33"×7.5")
- Gap between title and first content block: ~0.3"
- Gap between content sections: ~0.25"
- Card internal padding: ~0.25" on all sides
- Between stat blocks: 0.2" gap

---

## Visual Rules (Critical)

1. **Dark/light alternation**: Cover → light content → dark divider → light content → dark conclusion. At minimum: cover and conclusion differ from content slides.
2. **Terracotta is precious**: Use `C96442` for at most 2–3 elements per slide — accent rule, stat number, or CTA. Not for body text.
3. **Every slide needs visual weight**: A large stat, an accent bar, a card shape, or a bold Georgia number. No plain title + bullets.
4. **Accent bars over underlines**: Place a 3–4pt wide `C96442` rectangle beside or below key headings instead of text underlines.
5. **No gradient backgrounds**: The warmth comes from the palette, not gradients.
6. **Illustrations welcome**: If the content calls for an icon or placeholder, describe it as a simple terracotta-filled circle or square — the organic warmth comes from color, not complex shapes.

---

## QA Checklist

After generating, always run these checks:

```bash
# Convert to images for visual inspection
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 output.pdf slide
ls -1 "$PWD"/slide-*.jpg
```

Then verify each slide image:
- [ ] No text overflow beyond shape bounds
- [ ] No cool grays — all text should be warm-toned
- [ ] Title/body size contrast is clear (28pt vs 15pt)
- [ ] Dark slides use `B0AEA5` warm silver, never pure white `FFFFFF`
- [ ] At least one visual element per slide beyond text (shape, rule, card border)
- [ ] Consistent left margin across all slides (~0.5")
- [ ] Terracotta accent appears on ≥50% of slides (continuity of brand)

**Fix text overflow first** — it's always the most visible defect.

---

## Tone & Content Guidance

When writing slide text:
- **Titles are claims, not labels**: "Revenue grew 3× after the pivot" beats "Revenue Growth"
- **One idea per slide**: If you have 3 points, make 3 slides
- **Body text supports, doesn't repeat**: The title states the point; the body adds evidence or nuance
- **Numbers deserve space**: A single "87%" at 52pt Georgia beats a bullet list of metrics
- **Dark slides earn their drama**: Section dividers should contain just a title and optional one-liner — resist the urge to fill them

---

## Full Example (5-slide deck skeleton)

```js
// Slide 1: Cover (dark)
const s1 = pptx.addSlide({ masterName: 'DARK' });
s1.addText('AI-Native HR Analytics', { x:1, y:2.5, w:11, h:1.2, fontSize:44, fontFace:'Georgia', color:'FAF9F5', bold:false, align:'center' });
s1.addShape(pptx.ShapeType.rect, { x:4.5, y:3.9, w:4.3, h:0.05, fill:{color:'C96442'}, line:{type:'none'} });
s1.addText('Q2 2026 · SmartHRBI', { x:1, y:4.2, w:11, h:0.4, fontSize:13, fontFace:'Calibri', color:'87867F', align:'center' });

// Slide 2: Content — two column (light)
const s2 = pptx.addSlide({ masterName: 'LIGHT' });
s2.addText('The Challenge', { x:0.5, y:0.35, w:8, h:0.7, fontSize:28, fontFace:'Georgia', color:'141413' });
s2.addShape(pptx.ShapeType.rect, { x:0.5, y:1.1, w:3.0, h:0.04, fill:{color:'C96442'}, line:{type:'none'} });
// ... body text and right card

// Slide 3: Stats (light)
const s3 = pptx.addSlide({ masterName: 'LIGHT' });
// ... three stat blocks

// Slide 4: Section divider (dark)
const s4 = pptx.addSlide({ masterName: 'DARK' });
// ... left accent bar + centered title

// Slide 5: Conclusion CTA (dark)
const s5 = pptx.addSlide({ masterName: 'DARK' });
// ... centered hero message + CTA button

pptx.writeFile({ fileName: 'output.pptx' });
```

---

## Delivering the File

Save the `.pptx` to the workspace folder. Provide a direct link so the user can open it immediately.
