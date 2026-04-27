/**
 * Claude Style PPT — Helper Utilities
 *
 * Reusable design-system functions for pptxgenjs.
 * Import these in your build.js to avoid re-implementing common patterns.
 *
 * Usage:
 *   const { TOKENS, addTitle, addAccentBar, addBodyText, addIvoryCard, addStatBlock } = require('./scripts/helpers');
 *   const pptx = require('./scripts/helpers').createPresentation();
 */

const PptxGenJS = require('pptxgenjs');

// ─── Design Tokens ───────────────────────────────────────────────────────────

const TOKENS = {
  color: {
    parchment:    'F5F4ED',
    ivory:        'FAF9F5',
    nearBlack:    '141413',
    darkSurface:  '30302E',
    terracotta:   'C96442',
    coralAccent:  'D97757',
    oliveGray:    '5E5D59',
    stoneGray:    '87867F',
    warmSilver:   'B0AEA5',
    borderCream:  'F0EEE6',
    borderWarm:   'E8E6DC',
    borderDark:   '30302E',
  },
  font: {
    serif: 'Georgia',
    sans:  'Calibri',
    mono:  'Consolas',
  },
  size: {
    hero:    44,
    section: 36,
    title:   28,
    sub:     22,
    card:    18,
    body:    16,
    small:   14,
    caption: 12,
    stat:    52,
    statLabel: 13,
  },
  spacing: {
    margin:        0.5,
    titleTop:      0.38,
    afterTitle:    0.30,
    betweenBlocks: 0.22,
    cardPad:       0.25,
    accentBarH:    0.045,
    accentBarW:    3.5,
  },
};

// ─── Presentation Factory ────────────────────────────────────────────────────

function createPresentation() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

  pptx.defineSlideMaster({
    title: 'LIGHT',
    background: { color: TOKENS.color.parchment },
  });

  pptx.defineSlideMaster({
    title: 'DARK',
    background: { color: TOKENS.color.nearBlack },
  });

  return pptx;
}

// ─── Slide Helpers ───────────────────────────────────────────────────────────

/**
 * Add a serif slide title (Georgia, weight 500 equivalent).
 * @param {Object} slide - pptxgenjs slide
 * @param {string} text
 * @param {Object} opts - overrides: { x, y, w, h, color, size }
 */
function addTitle(slide, text, opts = {}) {
  const isDark = opts.dark || false;
  slide.addText(text, {
    x:    opts.x    ?? TOKENS.spacing.margin,
    y:    opts.y    ?? TOKENS.spacing.titleTop,
    w:    opts.w    ?? 12.0,
    h:    opts.h    ?? 0.75,
    fontSize:     opts.size  ?? TOKENS.size.title,
    fontFace:     TOKENS.font.serif,
    color:        opts.color ?? (isDark ? TOKENS.color.ivory : TOKENS.color.nearBlack),
    bold:         false,
    lineSpacingMultiple: 1.15,
  });
}

/**
 * Add a terracotta horizontal accent bar.
 * Place immediately after a title.
 * @param {Object} slide
 * @param {Object} opts - overrides: { x, y, w }
 */
function addAccentBar(slide, opts = {}) {
  slide.addShape('rect', {
    x:    opts.x ?? TOKENS.spacing.margin,
    y:    opts.y ?? (TOKENS.spacing.titleTop + 0.75 + 0.08),
    w:    opts.w ?? TOKENS.spacing.accentBarW,
    h:    TOKENS.spacing.accentBarH,
    fill: { color: TOKENS.color.terracotta },
    line: { type: 'none' },
  });
}

/**
 * Add body text in Calibri with warm olive gray.
 * @param {Object} slide
 * @param {string} text - use \n for line breaks
 * @param {Object} opts - overrides: { x, y, w, h, color, size, dark }
 */
function addBodyText(slide, text, opts = {}) {
  const isDark = opts.dark || false;
  slide.addText(text, {
    x:    opts.x    ?? TOKENS.spacing.margin,
    y:    opts.y    ?? 1.7,
    w:    opts.w    ?? 11.8,
    h:    opts.h    ?? 4.5,
    fontSize:     opts.size  ?? TOKENS.size.body,
    fontFace:     TOKENS.font.sans,
    color:        opts.color ?? (isDark ? TOKENS.color.warmSilver : TOKENS.color.oliveGray),
    lineSpacingMultiple: 1.45,
    valign: 'top',
  });
}

/**
 * Add a caption / metadata line.
 */
function addCaption(slide, text, opts = {}) {
  slide.addText(text, {
    x:        opts.x ?? TOKENS.spacing.margin,
    y:        opts.y ?? 6.9,
    w:        opts.w ?? 12,
    h:        0.35,
    fontSize: TOKENS.size.caption,
    fontFace: TOKENS.font.sans,
    color:    opts.color ?? TOKENS.color.stoneGray,
    align:    opts.align ?? 'left',
  });
}

/**
 * Add an ivory card container (rounded rect with warm border).
 * @param {Object} slide
 * @param {Object} opts - { x, y, w, h }
 */
function addIvoryCard(slide, opts = {}) {
  slide.addShape('roundRect', {
    x:          opts.x ?? 7.0,
    y:          opts.y ?? 1.0,
    w:          opts.w ?? 5.8,
    h:          opts.h ?? 5.8,
    rectRadius: 0.08,
    fill:       { color: TOKENS.color.ivory },
    line:       { color: TOKENS.color.borderWarm, width: 1 },
  });
}

/**
 * Add a dark card (for dark slides).
 */
function addDarkCard(slide, opts = {}) {
  slide.addShape('roundRect', {
    x:          opts.x ?? 7.0,
    y:          opts.y ?? 1.0,
    w:          opts.w ?? 5.8,
    h:          opts.h ?? 5.8,
    rectRadius: 0.08,
    fill:       { color: TOKENS.color.darkSurface },
    line:       { color: TOKENS.color.borderDark, width: 1 },
  });
}

/**
 * Add a stat block: large number + label.
 * @param {Object} slide
 * @param {string} number - e.g. "87%"
 * @param {string} label  - e.g. "retention rate"
 * @param {Object} opts   - { x, y, w }
 */
function addStatBlock(slide, number, label, opts = {}) {
  const x = opts.x ?? TOKENS.spacing.margin;
  const y = opts.y ?? 2.0;
  const w = opts.w ?? 3.5;

  // Top terracotta rule
  slide.addShape('rect', {
    x, y, w, h: 0.04,
    fill: { color: TOKENS.color.terracotta },
    line: { type: 'none' },
  });

  // Number
  slide.addText(number, {
    x, y: y + 0.15, w, h: 1.4,
    fontSize:  TOKENS.size.stat,
    fontFace:  TOKENS.font.serif,
    color:     TOKENS.color.terracotta,
    bold:      false,
    align:     'center',
    valign:    'middle',
  });

  // Label
  slide.addText(label, {
    x, y: y + 1.6, w, h: 0.4,
    fontSize:  TOKENS.size.statLabel,
    fontFace:  TOKENS.font.sans,
    color:     opts.dark ? TOKENS.color.warmSilver : TOKENS.color.oliveGray,
    align:     'center',
  });
}

/**
 * Add the left-side section divider bar (full height, terracotta).
 */
function addSectionBar(slide) {
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.09, h: 7.5,
    fill: { color: TOKENS.color.terracotta },
    line: { type: 'none' },
  });
}

/**
 * Add a CTA button shape with centered text.
 */
function addCTAButton(slide, text, opts = {}) {
  const x = opts.x ?? 4.5;
  const y = opts.y ?? 5.5;
  const w = opts.w ?? 4.3;
  const h = opts.h ?? 0.65;

  slide.addShape('roundRect', {
    x, y, w, h,
    rectRadius: 0.10,
    fill:       { color: TOKENS.color.terracotta },
    line:       { type: 'none' },
  });

  slide.addText(text, {
    x, y, w, h,
    fontSize:  14,
    fontFace:  TOKENS.font.sans,
    color:     TOKENS.color.ivory,
    bold:      true,
    align:     'center',
    valign:    'middle',
  });
}

// ─── Slide Builders ──────────────────────────────────────────────────────────

/**
 * Build a COVER slide.
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {string} meta      - e.g. "Q2 2026 · SmartHRBI"
 * @param {boolean} dark     - true = dark bg (default), false = parchment
 */
function buildCoverSlide(pptx, title, subtitle, meta = '', dark = true) {
  const slide = pptx.addSlide({ masterName: dark ? 'DARK' : 'LIGHT' });

  slide.addText(title, {
    x: 0.8, y: 2.2, w: 11.7, h: 1.5,
    fontSize:  44,
    fontFace:  TOKENS.font.serif,
    color:     dark ? TOKENS.color.ivory : TOKENS.color.nearBlack,
    bold:      false,
    align:     'center',
    lineSpacingMultiple: 1.15,
  });

  // Terracotta rule centered
  slide.addShape('rect', {
    x: 4.4, y: 3.85, w: 4.5, h: 0.05,
    fill: { color: TOKENS.color.terracotta },
    line: { type: 'none' },
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8, y: 4.1, w: 11.7, h: 0.7,
      fontSize:  18,
      fontFace:  TOKENS.font.sans,
      color:     dark ? TOKENS.color.warmSilver : TOKENS.color.oliveGray,
      align:     'center',
    });
  }

  if (meta) {
    addCaption(slide, meta, { align: 'center', y: 6.7, w: 13.33, x: 0 });
  }

  return slide;
}

/**
 * Build a SECTION DIVIDER slide (dark, with left bar and centered title).
 */
function buildSectionSlide(pptx, sectionNumber, title, description = '') {
  const slide = pptx.addSlide({ masterName: 'DARK' });
  addSectionBar(slide);

  if (sectionNumber) {
    slide.addText(sectionNumber.toString().padStart(2, '0'), {
      x: 0.6, y: 1.2, w: 3, h: 1.4,
      fontSize:  60,
      fontFace:  TOKENS.font.serif,
      color:     TOKENS.color.terracotta,
      bold:      false,
    });
  }

  slide.addText(title, {
    x: 0.6, y: sectionNumber ? 2.7 : 2.8, w: 11.5, h: 1.2,
    fontSize:  36,
    fontFace:  TOKENS.font.serif,
    color:     TOKENS.color.ivory,
    bold:      false,
    lineSpacingMultiple: 1.2,
  });

  if (description) {
    slide.addText(description, {
      x: 0.6, y: 4.1, w: 10, h: 1.0,
      fontSize:  16,
      fontFace:  TOKENS.font.sans,
      color:     TOKENS.color.warmSilver,
      lineSpacingMultiple: 1.45,
    });
  }

  return slide;
}

// ─── Exports ─────────────────────────────────────────────────────────────────

module.exports = {
  TOKENS,
  createPresentation,
  addTitle,
  addAccentBar,
  addBodyText,
  addCaption,
  addIvoryCard,
  addDarkCard,
  addStatBlock,
  addSectionBar,
  addCTAButton,
  buildCoverSlide,
  buildSectionSlide,
};
