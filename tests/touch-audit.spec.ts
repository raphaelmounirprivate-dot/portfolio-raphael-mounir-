import { test, expect } from '@playwright/test';

test('tactile : planète, défilement et commandes du CV accessibles', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'Contrôle réservé aux écrans tactiles.');
  await page.goto('/#a-propos');
  const planet = page.getByRole('button', { name: 'Découvrir mon CV' });
  await planet.scrollIntoViewIfNeeded();
  const rect = (await planet.boundingBox())!;
  const session = await page.context().newCDPSession(page);
  const x = Math.round(rect.x + rect.width / 2), y = Math.round(rect.y + rect.height / 2);
  const before = await page.evaluate(() => scrollY);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let step = 1; step <= 5; step++) await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - step * 15 }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).not.toBe(before);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  // Attendre la fin de l’inertie tactile avant le geste suivant.
  await page.evaluate(async () => {
    let stable = 0, previous = scrollY;
    while (stable < 8) {
      await new Promise(requestAnimationFrame);
      stable = Math.abs(scrollY - previous) < 1 ? stable + 1 : 0;
      previous = scrollY;
    }
  });
  await planet.scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollTo({ top: scrollY, behavior: 'instant' }));
  await planet.tap();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (const control of [dialog.getByRole('button', { name: 'Fermer', exact: true }), dialog.getByRole('link')]) {
    const box = (await control.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(testInfo.project.use.viewport!.width);
  }
  await page.screenshot({ path: `.local/touch-cv-${testInfo.project.name}.png`, animations: 'disabled' });
  await dialog.getByRole('button', { name: 'Fermer', exact: true }).tap();
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('petit GSM : le CV reste utilisable à 320 pixels et texte agrandi', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/#a-propos');
  await page.addStyleTag({ content: 'html{font-size:125%}' });
  await page.getByRole('button', { name: 'Découvrir mon CV' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole('button', { name: 'Fermer', exact: true });
  await expect(close).toBeInViewport();
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await close.click();
});
