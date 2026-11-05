import { test, expect } from '@playwright/test';

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`la Terre tourne dès le DOM avant son script : ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.route('**/terre-cv.js', route => route.fulfill({ contentType: 'application/javascript', body: '' }));
    await page.goto('/#a-propos');
    const earth = page.locator('#terre-cv');
    await earth.scrollIntoViewIfNeeded();
    const initial = await earth.evaluate(el => getComputedStyle(el, '::before').backgroundPositionX);
    expect(await earth.evaluate(el => getComputedStyle(el, '::before').animationName)).toBe('tcv-earth-turn');
    await expect.poll(() => earth.evaluate(el => getComputedStyle(el, '::before').backgroundPositionX)).not.toBe(initial);
    expect(await earth.evaluate(el => getComputedStyle(el, '::before').animationDuration)).toBe(reducedMotion === 'reduce' ? '360s' : '180s');
  });
}

test('la Terre ouvre le CV, permet le téléchargement et rend le focus', async ({ page }) => {
  await page.goto('/#a-propos');
  const planet = page.getByRole('button', { name: 'Découvrir mon CV' });
  await planet.scrollIntoViewIfNeeded();
  await expect(planet).toBeVisible();
  await planet.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Fermer', exact: true })).toBeFocused();
  const image = dialog.locator('img');
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  const download = dialog.getByRole('link', { name: 'Télécharger mon CV (PDF)' });
  const response = await page.request.get((await download.getAttribute('href'))!);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(planet).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Fermer', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('le CV reste accessible si le CDN 3D est indisponible', async ({ page }) => {
  await page.route('https://cdn.jsdelivr.net/**', route => route.abort());
  await page.goto('/#a-propos');
  await page.getByRole('button', { name: 'Découvrir mon CV' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#terre-cv')).toHaveAttribute('data-renderer', 'fallback');
  await page.keyboard.press('Escape');
  const fallback = page.locator('.tcv-fallback');
  const initial = await fallback.evaluate(el => getComputedStyle(el).backgroundPositionX);
  await expect.poll(() => fallback.evaluate(el => getComputedStyle(el).backgroundPositionX)).not.toBe(initial);
});
