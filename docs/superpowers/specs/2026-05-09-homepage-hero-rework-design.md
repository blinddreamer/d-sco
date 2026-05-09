# Homepage Hero Rework

**Date:** 2026-05-09

## Goal

Center "DEEP SPACE COALITION" as large, dominant text on the homepage — inspired by the Arctic Monkeys site. Remove the slogan and Apply Now button. No other pages or shared CSS consumers are affected.

## Constraints

- `styles.css` is shared: served from `d-sco.rocks` and consumed by `leaderboard.d-sco.rocks` (caddock_coins project), the news page, and any future pages. Global changes to `.content h1` would break those consumers.
- The existing glitch effect (`::before` / `::after` pseudo-elements via `content: attr(data-text)`) must be preserved unchanged.

## Changes

### `index.html` — remove two elements from `#page-home`

Remove the `<h3>` (slogan "...we totally meant to feed.") and the `<div class="hero-actions">` (Apply Now button). The `<h1>` stays exactly as-is, including `data-text`.

### `styles.css` — scoped overrides only

Add two rule blocks that target `#page-home` specifically, leaving `.content` and `.content h1` untouched:

```css
#page-home {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

#page-home h1 {
  font-size: clamp(3rem, 11vw, 9rem);
  margin: 0;
}
```

Add a mobile override inside the existing `@media (max-width: 720px)` block to prevent the generic `.content` mobile rule (`left: 20px; top: 30%`) from overriding the centered position:

```css
@media (max-width: 720px) {
  #page-home {
    left: 50%;
    top: 50%;
    max-width: calc(100vw - 40px);
  }
}
```

## Layout

- Title: two-line natural wrap ("DEEP SPACE" / "COALITION") driven by font-size and container width — no `<br>` or `data-text` changes needed.
- Glitch: pseudo-elements share the same width constraint as the h1, so they wrap identically. No changes to glitch keyframes or selectors.
- All other elements (navbar, corp stats, footer, background, loader, easter egg) remain unchanged.

## Out of Scope

- News page h1 — unchanged
- Leaderboard h1 — unchanged (local overrides in caddock_coins already handle `.content` positioning)
- Any other CSS rule not listed above
