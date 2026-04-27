---
name: space-style-ppt
description: "Create beautifully designed .pptx presentations in a deep-space visual style — near-black navy backgrounds, electric blue accents, geometric sans typography, and a futuristic technical aesthetic. Use this skill any time the user wants a slide deck, pitch deck, presentation, or PowerPoint with a space, astronomy, tech, or sci-fi theme. Trigger on: 'make me slides', 'create a deck', 'build a presentation', 'PPT about X', 'PowerPoint for Y', 'generate slides', 'space theme', 'tech presentation', 'futuristic deck', '做PPT', '做幻灯片', '太空风格', or any request where visual slides are the output and a modern technical aesthetic is desired."
---

# Space Style PPT Skill

Create `.pptx` presentations in a deep-space design language: near-black navy backgrounds, electric blue accent moments, geometric sans-serif typography, and constellation-inspired decorative elements that feel like a mission control dashboard or a polished tech keynote.

Read [design-tokens.md](references/design-tokens.md) for the complete color, typography, and spacing specification before writing any slide code.

---

## Quick Mental Model

Every deck has two "environments" — both are dark, but at different depths:
- **DEEP slides** — space black background (`060B14`), maximum contrast, feels like outer space — for covers, section dividers, and conclusions
- **SPACE slides** — deep navy background (`0B1628`), slightly warmer and more readable — for content slides

Alternate intentionally: cover (DEEP), content (SPACE), section divider (DEEP), content (SPACE), conclusion (DEEP). This rhythm creates a sense of journeying through chapters, each divider slide like a warp jump between destinations.

---

## Workflow

### 1. Understand the Content

Before touching pptxgenjs, think through:
- What story does this deck tell? What is the mission?
- How many sections/chapters does the content have?
- Which slides deserve the dramatic DEEP treatment?
- Are there stats, quotes, or key data points that deserve a dedicated callout slide?

Plan the slide sequence. One idea per slide — resist the urge to cram.

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
- Backgrounds: `060B14` (DEEP / space black) or `0B1628` (SPACE / deep navy) — never pure black `000000`
- Primary heading font: `Trebuchet MS` — geometric, modern, cross-platform
- Body font: `Calibri` for readability
- Primary accent: `4D8EFF` (nebula blue) — use for accent bars, stat numbers, CTAs
- Secondary accent: `00CCEE` (cyan spark) — use very sparingly, one moment per deck maximum
- Body text on dark: `8BAFCC` moonbeam — never use pure white for body
- Heading text: `E4EEFF` starlight — very slightly blue-tinted white

### 4. Slide Layout Palette

Use layouts from the catalogue below. Pick the best fit per slide — don't repeat the same layout more than twice in a row.

#### COVER — Deep Space Hero
```
bg=060B14
Optional: 12–18 tiny star dots (white/light blue, 0.04"–0.08" circles) scattered across slide
Corner brackets: top-left and bottom-right, 3 thin blue rect pairs (nebulaBlue, 0.03" wide)
Hero title: Trebuchet MS 44pt, color=E4EEFF, centered, bold=false
Accent glow line: nebulaBlue rect, 4pt high, centered, width ~40% of slide, below title
Subtitle: Calibri 18pt, color=8BAFCC, centered
Meta (date/org): Calibri 12pt, color=4A6A85, bottom-center
```

#### SECTION DIVIDER — Stellar Break
```
bg=060B14
Full-width thin horizontal line: nebulaBlue, 1pt, at y~2.4 (acts as a visual horizon)
Section number: Trebuchet MS 60pt, color=4D8EFF, top-left x=0.6 y=0.5, bold=false
Section title: Trebuchet MS 36pt, color=E4EEFF, left-aligned, y~2.7
Description: Calibri 16pt, color=8BAFCC, left-aligned, y~3.8
Optional right-side decoration: 3–4 small blue dots (constellation pattern)
```

#### CONTENT — Two Column
```
bg=0B1628
Slide title: Trebuchet MS 28pt, color=E4EEFF, top-left
Accent bar: nebulaBlue rect, 3pt high, w=3.5", below title
Left col (55%): body text Calibri 15pt, color=8BAFCC, line spacing 1.45
Right col (42%): dark glass card (bg=122038), border 1pt borderGlow (2A4F72)
Key callout in right card: Trebuchet MS 34pt, color=4D8EFF (number or short phrase)
```

#### CONTENT — Single Column Prose
```
bg=0B1628
Title: Trebuchet MS 28pt, color=E4EEFF
Accent bar: nebulaBlue, 3pt high, w=3.5"
Body: Calibri 16pt, color=8BAFCC, generous line spacing (1.45)
Max 5 lines of text — split if more
Optional pull-quote: Trebuchet MS italic 20pt, color=4D8EFF, indented
```

#### QUOTE / HIGHLIGHT
```
bg=060B14 (or 0B1628 for a softer effect)
Large quotation mark shape: nebulaBlue, very large (~100pt Trebuchet MS)
Quote text: Trebuchet MS 22pt, color=E4EEFF, italic, centered
Attribution: Calibri 13pt, color=4A6A85, right-aligned
Optional: thin nebulaBlue horizontal rules above and below the quote block
```

#### STATS / DATA — Mission Control
```
bg=0B1628
Title: Trebuchet MS 28pt, color=E4EEFF
2–3 stat blocks in a row:
  - Top glow bar: 2pt nebulaBlue rect
  - Number: Trebuchet MS 52pt, color=4D8EFF, bold=false
  - Label: Calibri 14pt, color=8BAFCC
  - Thin vertical dividers between blocks: borderGlow (2A4F72), 1pt
```

#### FEATURE GRID — Dark Cards
```
bg=0B1628
Title: Trebuchet MS 28pt, color=E4EEFF
2–3 dark glass cards (bg=122038), border 1pt 2A4F72, rectRadius 0.08:
  - Small nebulaBlue filled circle icon area: 0.3"×0.3"
  - Card title: Trebuchet MS 18pt, color=E4EEFF
  - Card body: Calibri 14pt, color=8BAFCC, line spacing 1.4
```

#### CONCLUSION / CALL TO ACTION — Deep Space
```
bg=060B14
Corner brackets: all four corners
Main message: Trebuchet MS 36pt, color=E4EEFF, centered
Sub-message: Calibri 16pt, color=8BAFCC, centered
Thin full-width nebulaBlue line above CTA button
CTA button: fill=4D8EFF, text=E4EEFF, Calibri 14pt bold, rounded rect
Optional: small star dots scattered at edges
```

---

## pptxgenjs Code Patterns

### Presentation Setup
```js
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5" widescreen

pptx.defineSlideMaster({
  title: 'DEEP',
  background: { color: '060B14' },  // Space black — covers, dividers
});

pptx.defineSlideMaster({
  title: 'SPACE',
  background: { color: '0B1628' },  // Deep navy — content slides
});
```

### Geometric Heading (Trebuchet MS)
```js
slide.addText('Section Title', {
  x: 0.5, y: 0.38, w: 9, h: 0.8,
  fontSize: 28,
  fontFace: 'Trebuchet MS',
  color: 'E4EEFF',
  bold: false,
  lineSpacingMultiple: 1.2,
});
```

### Nebula Blue Accent Bar
```js
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 1.28, w: 3.5, h: 0.035,
  fill: { color: '4D8EFF' },
  line: { type: 'none' },
});
```

### Dark Glass Card with Glow Border
```js
slide.addShape(pptx.ShapeType.roundRect, {
  x: 7.2, y: 1.2, w: 5.6, h: 5.6,
  rectRadius: 0.08,
  fill: { color: '122038' },
  line: { color: '2A4F72', width: 1 },
});
```

### Body Text on Dark
```js
slide.addText('Supporting detail here', {
  x: 0.5, y: 1.8, w: 6.5, h: 4.0,
  fontSize: 15,
  fontFace: 'Calibri',
  color: '8BAFCC',       // Moonbeam — never pure white
  lineSpacingMultiple: 1.45,
  valign: 'top',
});
```

### Large Stat Number
```js
slide.addText('99.9%', {
  x: 1.0, y: 2.0, w: 3.2, h: 1.5,
  fontSize: 52,
  fontFace: 'Trebuchet MS',
  color: '4D8EFF',
  bold: false,
  align: 'center',
});
slide.addText('uptime SLA', {
  x: 1.0, y: 3.4, w: 3.2, h: 0.4,
  fontSize: 13,
  fontFace: 'Calibri',
  color: '8BAFCC',
  align: 'center',
});
```

### Corner Bracket Decoration
```js
// Top-left bracket — two thin rects forming an L
const bLen = 0.45, bThk = 0.03, bColor = '4D8EFF', bX = 0.28, bY = 0.22;
slide.addShape(pptx.ShapeType.rect, { x: bX, y: bY, w: bLen, h: bThk, fill: { color: bColor }, line: { type: 'none' } });
slide.addShape(pptx.ShapeType.rect, { x: bX, y: bY, w: bThk, h: bLen, fill: { color: bColor }, line: { type: 'none' } });
// Bottom-right bracket
const brX = 13.33 - bX - bLen, brY = 7.5 - bY - bLen;
slide.addShape(pptx.ShapeType.rect, { x: brX, y: brY + bLen - bThk, w: bLen, h: bThk, fill: { color: bColor }, line: { type: 'none' } });
slide.addShape(pptx.ShapeType.rect, { x: brX + bLen - bThk, y: brY, w: bThk, h: bLen, fill: { color: bColor }, line: { type: 'none' } });
```

### Star Field (preset constellation pattern)
```js
// 15 predefined star positions — looks natural without randomness
const stars = [
  {x:1.2,y:0.6},{x:3.7,y:1.1},{x:6.1,y:0.4},{x:9.4,y:0.8},{x:11.8,y:0.5},
  {x:0.7,y:3.2},{x:2.9,y:5.4},{x:5.5,y:6.8},{x:7.8,y:5.9},{x:10.2,y:4.3},
  {x:12.5,y:2.7},{x:4.4,y:3.8},{x:8.6,y:1.9},{x:11.1,y:6.5},{x:1.9,y:6.2},
];
stars.forEach(s => {
  const r = [0.04,0.05,0.06,0.07][Math.floor(Math.abs(s.x*s.y) % 4)];
  slide.addShape(pptx.ShapeType.ellipse, {
    x: s.x, y: s.y, w: r, h: r,
    fill: { color: 'C8DCFF' },
    line: { type: 'none' },
  });
});
```

---

## Typography Rules

| Role | Font | Size | Color |
|------|------|------|-------|
| Slide title | Trebuchet MS | 28–32pt | `E4EEFF` |
| Cover/hero title | Trebuchet MS | 40–48pt | `E4EEFF` |
| Section number | Trebuchet MS | 56–64pt | `4D8EFF` |
| Sub-heading | Trebuchet MS | 22–24pt | `E4EEFF` |
| Card title | Trebuchet MS | 18–20pt | `E4EEFF` |
| Body / prose | Calibri | 15–16pt | `8BAFCC` |
| Caption / meta | Calibri | 12–13pt | `4A6A85` |
| Stat number | Trebuchet MS | 44–56pt | `4D8EFF` |
| Stat label | Calibri | 13–14pt | `8BAFCC` |
| Pull-quote | Trebuchet MS italic | 20pt | `4D8EFF` |
| CTA button text | Calibri bold | 14pt | `E4EEFF` |

**Never bold Trebuchet MS headings** — the geometry carries weight naturally at large sizes. Reserve bold for CTAs and small UI labels only.
**Never use pure white `FFFFFF`** — everything reads warmer and more spacious with the blue-tinted `E4EEFF` for headings and `8BAFCC` for body.
**Line spacing**: 1.4–1.5× for body, 1.1–1.2× for headings.

---

## Spacing & Margins

- Slide margins: minimum 0.5" on all sides
- Content area: x=0.5 to x=12.83, y=0.38 to y=7.1 (widescreen 13.33"×7.5")
- Gap between title and accent bar: ~0.08"
- Gap between accent bar and first content block: ~0.22"
- Gap between content sections: ~0.22"
- Card internal padding: ~0.28" on all sides
- Between stat blocks: 0.22" gap
- Corner bracket inset from edge: ~0.28"

---

## Visual Rules (Critical)

1. **DEEP/SPACE alternation**: Cover (DEEP) → content (SPACE) → divider (DEEP) → content (SPACE) → conclusion (DEEP). At minimum: cover and conclusion use DEEP; content slides use SPACE.
2. **Nebula blue is precious**: Use `4D8EFF` for accent bars, stat numbers, and CTAs. Do not use it for body text or fill every shape with it.
3. **Cyan is rarer than blue**: Use `00CCEE` for at most one special moment in the whole deck (a single key number or highlight). Do not use it on every slide.
4. **Every slide needs a structural anchor**: An accent bar, a stat number, a card shape, or a bracket decoration. No plain title + body text with no geometry.
5. **No pure gradients as backgrounds**: The depth comes from the palette and layered shapes, not CSS-style gradients (pptxgenjs linear fills are acceptable as a subtle overlay, but the background color should dominate).
6. **Stars are subtle**: If adding star dots, keep them small (0.04"–0.08") and sparse (10–18 per slide). They should read as atmosphere, not decoration.
7. **Accent bars go under titles**: Place a `4D8EFF` rect immediately below the title baseline as a separator. Width 3–4.5". Never underline the text directly.
8. **Brackets are optional but powerful**: Use corner brackets on DEEP slides (covers, dividers, CTA). Omit on SPACE content slides to let the content breathe.

---

## QA Checklist

After generating, always run these checks:

```bash
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 output.pdf slide
ls -1 "$PWD"/slide-*.jpg
```

Then verify each slide image:
- [ ] No text overflow beyond shape bounds
- [ ] No pure white text — all text uses `E4EEFF`, `8BAFCC`, or `4A6A85`
- [ ] No pure black backgrounds — should be `060B14` or `0B1628`
- [ ] Title/body size contrast is clear (28pt vs 15pt)
- [ ] At least one visual anchor per slide (accent bar, card, bracket, stat)
- [ ] Consistent 0.5" left margin across content slides
- [ ] Nebula blue appears on ≥60% of slides (accent bar alone counts)
- [ ] DEEP and SPACE alternation is visible — covers/dividers clearly darker than content

**Fix text overflow first** — it's always the most visible defect.

---

## Tone & Content Guidance

When writing slide text for a space/tech theme:
- **Titles are mission statements**: "Latency dropped 4× after the refactor" beats "Performance Improvements"
- **Numbers are stars**: Give a single large stat maximum real estate — a "4×" at 52pt Trebuchet MS is worth ten bullet points
- **Jargon is fine, but precision matters**: "99.97% uptime" beats "high availability"
- **Section dividers carry the narrative**: They are chapter titles, not just section headers — write them as short, bold declarations
- **DEEP slides earn their drama**: Keep covers and dividers to one idea; let the SPACE content slides do the heavy lifting

---

## Full Example (5-slide deck skeleton)

```js
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

pptx.defineSlideMaster({ title: 'DEEP',  background: { color: '060B14' } });
pptx.defineSlideMaster({ title: 'SPACE', background: { color: '0B1628' } });

// Slide 1: Cover (DEEP)
const s1 = pptx.addSlide({ masterName: 'DEEP' });
s1.addText('Galaxy-Scale Infrastructure', {
  x:0.8, y:2.1, w:11.7, h:1.4,
  fontSize:44, fontFace:'Trebuchet MS', color:'E4EEFF', bold:false, align:'center',
});
s1.addShape(pptx.ShapeType.rect, { x:4.4, y:3.7, w:4.5, h:0.04, fill:{color:'4D8EFF'}, line:{type:'none'} });
s1.addText('Engineering All-Hands · Q2 2026', {
  x:0.8, y:3.95, w:11.7, h:0.5, fontSize:14, fontFace:'Calibri', color:'8BAFCC', align:'center',
});
// Corner brackets top-left + bottom-right omitted for brevity — see addCornerBrackets() in helpers.js

// Slide 2: Content — Two Column (SPACE)
const s2 = pptx.addSlide({ masterName: 'SPACE' });
s2.addText('The Scale Challenge', {
  x:0.5, y:0.38, w:9, h:0.75, fontSize:28, fontFace:'Trebuchet MS', color:'E4EEFF', bold:false,
});
s2.addShape(pptx.ShapeType.rect, { x:0.5, y:1.2, w:3.5, h:0.035, fill:{color:'4D8EFF'}, line:{type:'none'} });
// ... body text left + right glass card

// Slide 3: Stats — Mission Control (SPACE)
const s3 = pptx.addSlide({ masterName: 'SPACE' });
// ... three stat blocks in a row

// Slide 4: Section Divider (DEEP)
const s4 = pptx.addSlide({ masterName: 'DEEP' });
s4.addShape(pptx.ShapeType.rect, { x:0.5, y:2.4, w:12.33, h:0.02, fill:{color:'4D8EFF'}, line:{type:'none'} });
s4.addText('02', { x:0.6, y:0.5, w:3, h:1.4, fontSize:60, fontFace:'Trebuchet MS', color:'4D8EFF', bold:false });
s4.addText('The Architecture', { x:0.6, y:2.7, w:11, h:1.1, fontSize:36, fontFace:'Trebuchet MS', color:'E4EEFF', bold:false });
s4.addText('How we re-engineered the core pipeline for 10× throughput.', {
  x:0.6, y:3.95, w:10, h:0.9, fontSize:16, fontFace:'Calibri', color:'8BAFCC',
});

// Slide 5: Conclusion CTA (DEEP)
const s5 = pptx.addSlide({ masterName: 'DEEP' });
s5.addText('Ship it to the stars.', {
  x:0.8, y:2.0, w:11.7, h:1.3, fontSize:40, fontFace:'Trebuchet MS', color:'E4EEFF', bold:false, align:'center',
});
s5.addText('Next milestone: Beta launch April 30', {
  x:0.8, y:3.5, w:11.7, h:0.6, fontSize:18, fontFace:'Calibri', color:'8BAFCC', align:'center',
});
s5.addShape(pptx.ShapeType.roundRect, { x:4.9, y:4.6, w:3.5, h:0.7, rectRadius:0.10, fill:{color:'4D8EFF'}, line:{type:'none'} });
s5.addText('View Roadmap', { x:4.9, y:4.6, w:3.5, h:0.7, fontSize:14, fontFace:'Calibri', color:'E4EEFF', bold:true, align:'center', valign:'middle' });

pptx.writeFile({ fileName: 'output.pptx' });
```

---

## Delivering the File

Save the `.pptx` to the workspace folder. Provide a direct link so the user can open it immediately.
