/**
 * Space Style PPT — Helper Utilities
 *
 * Reusable design-system functions for pptxgenjs.
 * Implements the Astro / Space / Star visual language:
 *   - Deep navy + space-black two-environment system
 *   - Electric blue (4D8EFF) as primary accent
 *   - Trebuchet MS geometric headings, Calibri body
 *   - Corner brackets, star fields, horizon lines
 *
 * Usage:
 *   const H = require('./scripts/helpers');
 *   const pptx = H.createPresentation();
 *   H.buildCoverSlide(pptx, 'Mission Title', 'Subtitle', 'Q2 2026 · Your Org');
 */

const PptxGenJS = require('pptxgenjs');

// ─── Design Tokens ────────────────────────────────────────────────────────────

const TOKENS = {
  color: {
    // Backgrounds
    spaceBlack:     '060B14',  // DEEP master — covers, dividers, CTA
    deepNavy:       '0B1628',  // SPACE master — content slides
    nebulaDark:     '122038',  // Card fills on SPACE slides
    cosmicSurface:  '0F1B30',  // Secondary card variant
    darkElevated:   '1A2F4A',  // Highlighted / featured card

    // Text
    starlight:      'E4EEFF',  // Primary headings — blue-tinted near-white
    moonbeam:       '8BAFCC',  // Body text on any dark slide
    cosmicGray:     '4A6A85',  // Captions, metadata
    dimStar:        '2A4055',  // Disabled / very subtle text
    paleStar:       'C8DCFF',  // Star dots, decorative elements

    // Accent
    nebulaBlue:     '4D8EFF',  // Primary accent — bars, stats, CTAs
    cyanSpark:      '00CCEE',  // Secondary — one standout per deck
    solarGold:      'FFA726',  // Tertiary warm — extreme rarity

    // Borders
    borderDeep:     '1A2E45',  // Barely-visible card borders
    borderGlow:     '2A4F72',  // Normal card borders
    borderAccent:   '4D8EFF',  // Emphasis borders (thin only)
  },
  font: {
    heading: 'Trebuchet MS',   // Geometric, modern, cross-platform
    body:    'Calibri',        // Clean, readable body & UI
    mono:    'Consolas',       // Code snippets, technical data
  },
  size: {
    hero:      46,
    section:   36,
    title:     28,
    sub:       22,
    card:      18,
    bodyLarge: 18,
    body:      15,
    small:     14,
    caption:   12,
    stat:      52,
    statLabel: 13,
    sectionNum: 60,
  },
  spacing: {
    margin:         0.50,
    titleTop:       0.38,
    accentBarGap:   0.08,   // gap from title bottom to accent bar top
    afterAccentBar: 0.22,   // gap from accent bar to first content
    betweenBlocks:  0.22,
    cardPad:        0.28,
    accentBarH:     0.035,
    accentBarW:     3.5,
    bracketLen:     0.45,
    bracketThk:     0.03,
    bracketInset:   0.28,
  },
};

// Preset constellation pattern — 15 star positions (deterministic, always looks natural)
const STAR_POSITIONS = [
  { x: 1.20, y: 0.58, r: 0.05 },
  { x: 3.72, y: 1.10, r: 0.04 },
  { x: 6.10, y: 0.38, r: 0.06 },
  { x: 9.40, y: 0.82, r: 0.04 },
  { x: 11.80, y: 0.48, r: 0.05 },
  { x: 0.72, y: 3.20, r: 0.04 },
  { x: 2.88, y: 5.38, r: 0.06 },
  { x: 5.52, y: 6.82, r: 0.05 },
  { x: 7.80, y: 5.92, r: 0.04 },
  { x: 10.22, y: 4.28, r: 0.07 },
  { x: 12.52, y: 2.72, r: 0.04 },
  { x: 4.38, y: 3.82, r: 0.05 },
  { x: 8.62, y: 1.88, r: 0.04 },
  { x: 11.12, y: 6.48, r: 0.06 },
  { x: 1.92, y: 6.22, r: 0.04 },
];

// ─── Presentation Factory ─────────────────────────────────────────────────────

/**
 * Create a new presentation with DEEP and SPACE slide masters.
 * @returns {PptxGenJS}
 */
function createPresentation() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33" × 7.5"

  // DEEP: space-black — covers, section dividers, CTA slides
  pptx.defineSlideMaster({
    title: 'DEEP',
    background: { color: TOKENS.color.spaceBlack },
  });

  // SPACE: deep navy — content slides
  pptx.defineSlideMaster({
    title: 'SPACE',
    background: { color: TOKENS.color.deepNavy },
  });

  return pptx;
}

// ─── Atomic Helpers ───────────────────────────────────────────────────────────

/**
 * Add a geometric heading (Trebuchet MS, un-bolded).
 * @param {Object} slide - pptxgenjs slide
 * @param {string} text
 * @param {Object} opts  - { x, y, w, h, size, color, align }
 */
function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x:    opts.x     ?? TOKENS.spacing.margin,
    y:    opts.y     ?? TOKENS.spacing.titleTop,
    w:    opts.w     ?? 12.0,
    h:    opts.h     ?? 0.78,
    fontSize:            opts.size  ?? TOKENS.size.title,
    fontFace:            TOKENS.font.heading,
    color:               opts.color ?? TOKENS.color.starlight,
    bold:                false,
    lineSpacingMultiple: 1.15,
    align:               opts.align ?? 'left',
  });
}

/**
 * Add a nebula-blue horizontal accent bar.
 * Place immediately after a title (titleY + titleH + 0.08).
 * @param {Object} slide
 * @param {Object} opts - { x, y, w }
 */
function addAccentBar(slide, opts = {}) {
  const titleH = opts.titleH ?? 0.78;
  const titleY = opts.titleY ?? TOKENS.spacing.titleTop;
  slide.addShape('rect', {
    x:    opts.x ?? TOKENS.spacing.margin,
    y:    opts.y ?? (titleY + titleH + TOKENS.spacing.accentBarGap),
    w:    opts.w ?? TOKENS.spacing.accentBarW,
    h:    TOKENS.spacing.accentBarH,
    fill: { color: TOKENS.color.nebulaBlue },
    line: { type: 'none' },
  });
}

/**
 * Add body text in Calibri / moonbeam.
 * @param {Object} slide
 * @param {string} text  - use \n for line breaks
 * @param {Object} opts  - { x, y, w, h, size, color }
 */
function addBodyText(slide, text, opts = {}) {
  slide.addText(text, {
    x:    opts.x    ?? TOKENS.spacing.margin,
    y:    opts.y    ?? 1.72,
    w:    opts.w    ?? 11.8,
    h:    opts.h    ?? 4.5,
    fontSize:            opts.size  ?? TOKENS.size.body,
    fontFace:            TOKENS.font.body,
    color:               opts.color ?? TOKENS.color.moonbeam,
    lineSpacingMultiple: 1.45,
    valign: 'top',
  });
}

/**
 * Add a caption / metadata line.
 * @param {Object} slide
 * @param {string} text
 * @param {Object} opts  - { x, y, w, align, color }
 */
function addCaption(slide, text, opts = {}) {
  slide.addText(text, {
    x:        opts.x     ?? TOKENS.spacing.margin,
    y:        opts.y     ?? 6.92,
    w:        opts.w     ?? 12.3,
    h:        0.35,
    fontSize: TOKENS.size.caption,
    fontFace: TOKENS.font.body,
    color:    opts.color ?? TOKENS.color.cosmicGray,
    align:    opts.align ?? 'left',
  });
}

/**
 * Add a dark glass card (primary card type for SPACE slides).
 * @param {Object} slide
 * @param {Object} opts  - { x, y, w, h, elevated }
 */
function addGlassCard(slide, opts = {}) {
  const elevated = opts.elevated || false;
  slide.addShape('roundRect', {
    x:          opts.x ?? 7.2,
    y:          opts.y ?? 1.1,
    w:          opts.w ?? 5.6,
    h:          opts.h ?? 5.6,
    rectRadius: 0.08,
    fill:       { color: elevated ? TOKENS.color.darkElevated : TOKENS.color.nebulaDark },
    line:       { color: elevated ? TOKENS.color.borderAccent : TOKENS.color.borderGlow, width: 1 },
  });
}

/**
 * Add an icon accent dot (small nebulaBlue circle, for card headers).
 * @param {Object} slide
 * @param {Object} opts  - { x, y, r }
 */
function addIconDot(slide, opts = {}) {
  const r = opts.r ?? 0.28;
  slide.addShape('ellipse', {
    x:    opts.x ?? 0.5,
    y:    opts.y ?? 0.5,
    w:    r,
    h:    r,
    fill: { color: TOKENS.color.nebulaBlue },
    line: { type: 'none' },
  });
}

/**
 * Add a stat block: glow top-bar + large number + label.
 * @param {Object} slide
 * @param {string} number  - e.g. "99.9%"
 * @param {string} label   - e.g. "uptime SLA"
 * @param {Object} opts    - { x, y, w }
 */
function addStatBlock(slide, number, label, opts = {}) {
  const x = opts.x ?? TOKENS.spacing.margin;
  const y = opts.y ?? 2.0;
  const w = opts.w ?? 3.7;

  // Top glow bar
  slide.addShape('rect', {
    x, y, w, h: 0.038,
    fill: { color: TOKENS.color.nebulaBlue },
    line: { type: 'none' },
  });

  // Number
  slide.addText(number, {
    x, y: y + 0.14, w, h: 1.5,
    fontSize:  TOKENS.size.stat,
    fontFace:  TOKENS.font.heading,
    color:     TOKENS.color.nebulaBlue,
    bold:      false,
    align:     'center',
    valign:    'middle',
  });

  // Label
  slide.addText(label, {
    x, y: y + 1.68, w, h: 0.42,
    fontSize:  TOKENS.size.statLabel,
    fontFace:  TOKENS.font.body,
    color:     TOKENS.color.moonbeam,
    align:     'center',
  });
}

/**
 * Add a full-width horizon line (nebulaBlue, thin) for section dividers.
 * @param {Object} slide
 * @param {Object} opts  - { y }
 */
function addHorizonLine(slide, opts = {}) {
  slide.addShape('rect', {
    x:    TOKENS.spacing.margin,
    y:    opts.y ?? 2.4,
    w:    12.33,
    h:    0.022,
    fill: { color: TOKENS.color.nebulaBlue },
    line: { type: 'none' },
  });
}

/**
 * Add corner brackets (L-shaped, nebulaBlue) at top-left and bottom-right.
 * Typical for DEEP slides (covers, dividers, CTA).
 * @param {Object} slide
 * @param {Object} opts  - { len, thk, inset, color }
 */
function addCornerBrackets(slide, opts = {}) {
  const len   = opts.len   ?? TOKENS.spacing.bracketLen;
  const thk   = opts.thk   ?? TOKENS.spacing.bracketThk;
  const inset = opts.inset ?? TOKENS.spacing.bracketInset;
  const color = opts.color ?? TOKENS.color.nebulaBlue;

  // Top-left
  slide.addShape('rect', { x: inset,             y: inset,             w: len, h: thk, fill: { color }, line: { type: 'none' } });
  slide.addShape('rect', { x: inset,             y: inset,             w: thk, h: len, fill: { color }, line: { type: 'none' } });

  // Top-right
  slide.addShape('rect', { x: 13.33 - inset - len, y: inset,           w: len, h: thk, fill: { color }, line: { type: 'none' } });
  slide.addShape('rect', { x: 13.33 - inset - thk, y: inset,           w: thk, h: len, fill: { color }, line: { type: 'none' } });

  // Bottom-left
  slide.addShape('rect', { x: inset,             y: 7.5 - inset - thk,       w: len, h: thk, fill: { color }, line: { type: 'none' } });
  slide.addShape('rect', { x: inset,             y: 7.5 - inset - len,       w: thk, h: len, fill: { color }, line: { type: 'none' } });

  // Bottom-right
  slide.addShape('rect', { x: 13.33 - inset - len, y: 7.5 - inset - thk, w: len, h: thk, fill: { color }, line: { type: 'none' } });
  slide.addShape('rect', { x: 13.33 - inset - thk, y: 7.5 - inset - len, w: thk, h: len, fill: { color }, line: { type: 'none' } });
}

/**
 * Add a preset star field (15 small circles, deterministic positions).
 * Use on DEEP slides for atmospheric depth. Omit on SPACE content slides.
 * @param {Object} slide
 * @param {Object} opts  - { subset: number } to use only first N stars (default: all 15)
 */
function addStarField(slide, opts = {}) {
  const count = opts.subset ?? STAR_POSITIONS.length;
  STAR_POSITIONS.slice(0, count).forEach(s => {
    slide.addShape('ellipse', {
      x:    s.x,
      y:    s.y,
      w:    s.r,
      h:    s.r,
      fill: { color: TOKENS.color.paleStar },
      line: { type: 'none' },
    });
  });
}

/**
 * Add a CTA button shape with centered text.
 * @param {Object} slide
 * @param {string} text
 * @param {Object} opts  - { x, y, w, h }
 */
function addCTAButton(slide, text, opts = {}) {
  const x = opts.x ?? 4.92;
  const y = opts.y ?? 5.5;
  const w = opts.w ?? 3.5;
  const h = opts.h ?? 0.68;

  slide.addShape('roundRect', {
    x, y, w, h,
    rectRadius: 0.10,
    fill:       { color: TOKENS.color.nebulaBlue },
    line:       { type: 'none' },
  });

  slide.addText(text, {
    x, y, w, h,
    fontSize:  14,
    fontFace:  TOKENS.font.body,
    color:     TOKENS.color.starlight,
    bold:      true,
    align:     'center',
    valign:    'middle',
  });
}

// ─── Slide Builders ───────────────────────────────────────────────────────────

/**
 * Build a COVER slide (DEEP background).
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {string} meta      - e.g. "Q2 2026 · Your Org"
 * @param {Object} opts      - { stars: true, brackets: true }
 */
function buildCoverSlide(pptx, title, subtitle, meta = '', opts = {}) {
  const slide = pptx.addSlide({ masterName: 'DEEP' });

  if (opts.stars !== false) addStarField(slide, { subset: 12 });
  if (opts.brackets !== false) addCornerBrackets(slide);

  slide.addText(title, {
    x: 0.8, y: 2.0, w: 11.7, h: 1.5,
    fontSize:  46,
    fontFace:  TOKENS.font.heading,
    color:     TOKENS.color.starlight,
    bold:      false,
    align:     'center',
    lineSpacingMultiple: 1.15,
  });

  // Glow line centered below title
  slide.addShape('rect', {
    x: 4.4, y: 3.65, w: 4.5, h: 0.038,
    fill: { color: TOKENS.color.nebulaBlue },
    line: { type: 'none' },
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8, y: 3.9, w: 11.7, h: 0.7,
      fontSize:  18,
      fontFace:  TOKENS.font.body,
      color:     TOKENS.color.moonbeam,
      align:     'center',
    });
  }

  if (meta) {
    addCaption(slide, meta, { align: 'center', y: 6.75, w: 13.33, x: 0 });
  }

  return slide;
}

/**
 * Build a SECTION DIVIDER slide (DEEP background).
 * @param {Object} pptx
 * @param {string|number} sectionNumber  - e.g. 1 or "01" (pass null to omit)
 * @param {string} title
 * @param {string} description
 * @param {Object} opts      - { stars: true }
 */
function buildSectionSlide(pptx, sectionNumber, title, description = '', opts = {}) {
  const slide = pptx.addSlide({ masterName: 'DEEP' });

  if (opts.stars !== false) addStarField(slide, { subset: 8 });

  addHorizonLine(slide, { y: 2.42 });

  if (sectionNumber !== null && sectionNumber !== undefined) {
    const numStr = typeof sectionNumber === 'number'
      ? sectionNumber.toString().padStart(2, '0')
      : String(sectionNumber);

    slide.addText(numStr, {
      x: 0.6, y: 0.45, w: 3.2, h: 1.5,
      fontSize:  TOKENS.size.sectionNum,
      fontFace:  TOKENS.font.heading,
      color:     TOKENS.color.nebulaBlue,
      bold:      false,
    });
  }

  const titleY = sectionNumber !== null ? 2.65 : 2.8;
  slide.addText(title, {
    x: 0.6, y: titleY, w: 11.5, h: 1.2,
    fontSize:  TOKENS.size.section,
    fontFace:  TOKENS.font.heading,
    color:     TOKENS.color.starlight,
    bold:      false,
    lineSpacingMultiple: 1.15,
  });

  if (description) {
    slide.addText(description, {
      x: 0.6, y: titleY + 1.35, w: 10.2, h: 1.0,
      fontSize:  16,
      fontFace:  TOKENS.font.body,
      color:     TOKENS.color.moonbeam,
      lineSpacingMultiple: 1.45,
    });
  }

  return slide;
}

/**
 * Build a two-column content slide (SPACE background).
 * @param {Object} pptx
 * @param {string} title
 * @param {string} bodyText        - left column prose
 * @param {string} calloutNumber   - large number/phrase for right card
 * @param {string} calloutLabel    - label below right callout
 */
function buildTwoColumnSlide(pptx, title, bodyText, calloutNumber = '', calloutLabel = '') {
  const slide = pptx.addSlide({ masterName: 'SPACE' });

  addTitle(slide, title);
  addAccentBar(slide);

  addBodyText(slide, bodyText, {
    x: TOKENS.spacing.margin,
    y: 1.72,
    w: 7.0,
    h: 5.0,
  });

  // Right glass card
  addGlassCard(slide, { x: 7.3, y: 1.1, w: 5.5, h: 5.7 });

  if (calloutNumber) {
    slide.addText(calloutNumber, {
      x: 7.3, y: 2.5, w: 5.5, h: 1.5,
      fontSize:  TOKENS.size.stat,
      fontFace:  TOKENS.font.heading,
      color:     TOKENS.color.nebulaBlue,
      bold:      false,
      align:     'center',
      valign:    'middle',
    });
  }

  if (calloutLabel) {
    slide.addText(calloutLabel, {
      x: 7.3, y: 4.1, w: 5.5, h: 0.5,
      fontSize:  TOKENS.size.statLabel,
      fontFace:  TOKENS.font.body,
      color:     TOKENS.color.moonbeam,
      align:     'center',
    });
  }

  return slide;
}

/**
 * Build a three-stat data slide (SPACE background).
 * @param {Object} pptx
 * @param {string} title
 * @param {Array}  stats  - [ { number, label }, { number, label }, ... ] (2 or 3)
 */
function buildStatsSlide(pptx, title, stats = []) {
  const slide = pptx.addSlide({ masterName: 'SPACE' });

  addTitle(slide, title);
  addAccentBar(slide);

  const count = Math.min(stats.length, 3);
  const totalW = 12.33;
  const colW   = 3.7;
  const gap    = count === 3 ? (totalW - colW * 3) / 2 : (totalW - colW * count) / (count + 1);
  const startX = count === 3 ? TOKENS.spacing.margin : (13.33 - colW * count - gap * (count - 1)) / 2;

  stats.slice(0, 3).forEach((stat, i) => {
    const x = startX + i * (colW + gap);
    addStatBlock(slide, stat.number, stat.label, { x, y: 2.2, w: colW });

    // Vertical divider between stat blocks
    if (i < count - 1) {
      slide.addShape('rect', {
        x: x + colW + gap / 2 - 0.01,
        y: 2.2, w: 0.02, h: 2.2,
        fill: { color: TOKENS.color.borderGlow },
        line: { type: 'none' },
      });
    }
  });

  return slide;
}

/**
 * Build a feature-grid card slide (SPACE background).
 * @param {Object} pptx
 * @param {string} title
 * @param {Array}  features - [ { title, body }, ... ] (2 or 3 items)
 */
function buildFeatureGridSlide(pptx, title, features = []) {
  const slide = pptx.addSlide({ masterName: 'SPACE' });

  addTitle(slide, title);
  addAccentBar(slide);

  const count = Math.min(features.length, 3);
  const cardW = count === 2 ? 5.9 : 3.8;
  const cardH = 4.5;
  const cardY = 1.75;
  const gap   = count === 2 ? 0.5 : 0.3;
  const startX = (13.33 - cardW * count - gap * (count - 1)) / 2;

  features.slice(0, 3).forEach((feat, i) => {
    const x = startX + i * (cardW + gap);

    addGlassCard(slide, { x, y: cardY, w: cardW, h: cardH });
    addIconDot(slide, { x: x + 0.28, y: cardY + 0.30, r: 0.26 });

    slide.addText(feat.title, {
      x: x + 0.28, y: cardY + 0.72, w: cardW - 0.56, h: 0.55,
      fontSize:  TOKENS.size.card,
      fontFace:  TOKENS.font.heading,
      color:     TOKENS.color.starlight,
      bold:      false,
    });

    slide.addText(feat.body, {
      x: x + 0.28, y: cardY + 1.35, w: cardW - 0.56, h: cardH - 1.65,
      fontSize:  14,
      fontFace:  TOKENS.font.body,
      color:     TOKENS.color.moonbeam,
      lineSpacingMultiple: 1.4,
      valign: 'top',
    });
  });

  return slide;
}

/**
 * Build a conclusion / CTA slide (DEEP background).
 * @param {Object} pptx
 * @param {string} mainMessage
 * @param {string} subMessage
 * @param {string} ctaLabel      - button text (pass '' to omit)
 * @param {Object} opts          - { stars: true, brackets: true }
 */
function buildConclusionSlide(pptx, mainMessage, subMessage = '', ctaLabel = '', opts = {}) {
  const slide = pptx.addSlide({ masterName: 'DEEP' });

  if (opts.stars !== false) addStarField(slide, { subset: 10 });
  if (opts.brackets !== false) addCornerBrackets(slide);

  slide.addText(mainMessage, {
    x: 0.8, y: 1.8, w: 11.7, h: 1.5,
    fontSize:  TOKENS.size.section,
    fontFace:  TOKENS.font.heading,
    color:     TOKENS.color.starlight,
    bold:      false,
    align:     'center',
    lineSpacingMultiple: 1.2,
  });

  if (subMessage) {
    slide.addText(subMessage, {
      x: 0.8, y: 3.5, w: 11.7, h: 0.7,
      fontSize:  18,
      fontFace:  TOKENS.font.body,
      color:     TOKENS.color.moonbeam,
      align:     'center',
    });
  }

  if (ctaLabel) {
    // Thin horizon line above CTA
    slide.addShape('rect', {
      x: 4.4, y: 4.65, w: 4.5, h: 0.022,
      fill: { color: TOKENS.color.nebulaBlue },
      line: { type: 'none' },
    });
    addCTAButton(slide, ctaLabel, { x: 4.92, y: 4.95, w: 3.5, h: 0.68 });
  }

  return slide;
}

// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  TOKENS,
  STAR_POSITIONS,
  createPresentation,

  // Atomic
  addTitle,
  addAccentBar,
  addBodyText,
  addCaption,
  addGlassCard,
  addIconDot,
  addStatBlock,
  addHorizonLine,
  addCornerBrackets,
  addStarField,
  addCTAButton,

  // Slide builders
  buildCoverSlide,
  buildSectionSlide,
  buildTwoColumnSlide,
  buildStatsSlide,
  buildFeatureGridSlide,
  buildConclusionSlide,
};
