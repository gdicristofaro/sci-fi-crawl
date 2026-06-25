import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// WCAG 2.2 Level AA (plus the earlier A/AA baselines axe maps onto these tags).
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page, context?: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations, formatViolations(results.violations, context)).toEqual([]);
}

function formatViolations(
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
  context?: string
) {
  if (violations.length === 0) return "no violations";
  const header = context ? `axe violations (${context}):` : "axe violations:";
  return [
    header,
    ...violations.map((v) => `  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`),
  ].join("\n");
}

test.describe("sci-fi-crawl accessibility", () => {
  test("initial view (controls visible) has no axe violations", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("button", { name: "play", exact: true })).toBeVisible();
    await expectNoViolations(page, "initial view");
  });

  test("settings dialog has no axe violations", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "settings" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expectNoViolations(page, "settings dialog");
  });

  // Regression test for the keyboard-accessibility defect: once the crawl is playing the
  // control panel hides, and previously every control was removed from the tab order
  // (visibility:hidden) with no keyboard way to bring them back. Tabbing must now focus a
  // control and reveal it.
  test("controls are reachable by keyboard while the crawl is playing", async ({ page }) => {
    await page.goto("./");

    // Start playback; the panel hides itself (showPanel -> false).
    await page.getByRole("button", { name: "play", exact: true }).click();
    await expect(page.locator("#control-panel")).toHaveClass(/hide/);

    // A keyboard user presses Tab -> a control must receive focus...
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveAttribute("aria-label", /.+/);

    // ...and the focused control must be visible (opacity restored via :focus-visible),
    // not stuck at opacity 0.
    const opacity = await focused.evaluate(
      (el) => getComputedStyle(el.closest(".control-panel > *") ?? el).opacity
    );
    expect(Number(opacity)).toBeGreaterThan(0);

    await expectNoViolations(page, "playing + keyboard-revealed controls");
  });
});
