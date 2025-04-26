import { Locator, Page, expect, test } from '@playwright/test';

export async function validateLinksFromLocator(locator: Locator, page: Page): Promise<void> {
  const baseUrl = page.url();
  const links = await locator.getByRole("link").all();
  const allLinkHrefs = await Promise.all(
    links.map((link) => link.getAttribute("href"))
  );

  const validLinks = allLinkHrefs.reduce((acc, href) => {
    expect.soft(href, "link has no proper href").not.toBeFalsy();
    if (href && !href.startsWith("mailto:") && !href.startsWith("#")) {
      acc.add(new URL(href, baseUrl).href);
    }
    return acc;
  }, new Set<string>());

  // Run all checks in parallel with Promise.all
  await Promise.all(
    Array.from(validLinks).map((url) =>
      test.step(`Checking link: ${url}`, async () => {
        try {
          const response = await page.request.get(url);
          expect.soft(response.ok(), `${url} has no green status code`).toBeTruthy();
        } catch (error) {
          expect.soft(null, `${url} failed to fetch`).toBeTruthy();
        }
      })
    )
  );
}