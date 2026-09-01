# News Channel Aggregate

A small personal project that displays live news channels inside a retro "device" frame — a TV on wider screens, an iPod on narrow ones — with a clickable channel list to switch what's playing.

Built for personal use, shared with friends. Not intended for public/mass distribution.

## How it works

- `index.html` — page structure: device image, video iframe, and channel list ("remote").
- `style.css` — all layout and responsive behavior.
- `assets/` — device images (TV, iPod) referenced by the `<picture>` element.

### Responsive device switching

A `<picture>` element swaps the device image based on viewport width (breakpoint: `545px`):

- **≤ 545px** — iPod SVG
- **> 545px** — TV image

### Screen overlay technique

The video iframe (`.screen-box`) is absolutely positioned inside `.device`, which is set to `position: relative` and shrink-wrapped (`inline-block`) so its box always matches the rendered image's exact dimensions. This means the screen cutout tracks the image proportionally as it scales, using percentage-based `top`/`left`/`width` plus a fixed `aspect-ratio` per breakpoint.

The device image itself sits in front of the iframe (`z-index: 2` vs `z-index: 1`) so its bezel visually frames the video, with `pointer-events: none` on the image so clicks still pass through to the iframe underneath.

## Known limitations

- **Some sites can't be embedded directly.** Sites like BBC and Al Jazeera send an `X-Frame-Options: sameorigin` header, which blocks browsers from displaying them in an iframe on another domain. There's no client-side fix for this — options being considered:
  - Point to a YouTube video/livestream from the same outlet instead (used for most channels currently).
  - Build a small server-side proxy that fetches the page, strips the blocking headers, and rewrites relative URLs — more setup, and not yet implemented.
- **Region-locked YouTube videos** may fail to play for some visitors depending on their location; there's currently no fallback UI for this (planned: detect via the YouTube IFrame Player API and show a "watch on YouTube" link instead).
- **Autoplay** requires the video to be muted in most browsers — unmuted autoplay is blocked by browser policy.

## Tuning notes

If you swap in a different device image:

1. Update the `<picture>` breakpoint in `index.html` to match the desired switch point.
2. Update the matching `@media` breakpoint in `style.css` (must stay in sync with the HTML breakpoint).
3. Re-tune `.screen-box`'s `top` / `left` / `width` / `aspect-ratio` to match where the screen cutout sits in the new image — easiest done by temporarily giving `.screen-box` a visible border and nudging values until it lines up.