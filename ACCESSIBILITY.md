# Accessibility (sci-fi-crawl)

Target: **WCAG 2.2 Level AA**.

## Automated testing

Automated accessibility scanning uses [Playwright](https://playwright.dev/) +
[`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm).

```bash
npm run test:e2e            # boots `next dev` and runs the axe scans + keyboard test
npx playwright test --ui    # interactive runner
```

Specs live in [`e2e/`](./e2e). They scan the WCAG A/AA tag set
(`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`) across: the initial view, the settings
dialog, and the "playing" state after the controls are revealed by keyboard. They also
include a **keyboard regression test** for the defect described below.

> First run downloads the Chromium browser: `npx playwright install chromium`.

axe catches roughly 30–40% of WCAG issues. The manual plan below covers the rest.

## Manual test plan (the part axe can't automate)

1. **Keyboard only (no mouse).** Load the page, press `Tab` repeatedly: focus should move
   through Mute → Volume → Settings → Copy Link → Full Screen → Replay → Play → Skip → Seek
   slider, each with a visible focus ring. Press Play, wait for the controls to fade, then
   press `Tab` — the controls must reappear and be operable. Operate the volume and seek
   sliders with arrow keys. Open/close the Settings dialog with the keyboard; confirm focus
   is trapped inside it and returns to the Settings button on close (`Esc` closes it).
2. **Screen reader** (NVDA on Windows / VoiceOver on macOS): confirm every control announces
   a meaningful name, the starfield/logo are silent, and the dialog is announced as a dialog.
3. **Zoom / reflow:** 200% and 400% browser zoom — controls remain usable, nothing clipped.
4. **Contrast:** spot-check the yellow crawl text (`#c5942d`) on black — passes AA for large
   text; verify control icons and tooltips.
5. **`prefers-reduced-motion`:** enable it at the OS level and confirm the experience is at
   least navigable.
