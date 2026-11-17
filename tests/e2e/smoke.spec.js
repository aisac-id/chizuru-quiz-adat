import { test, expect } from '@playwright/test';

test('start screen shows title and start button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#scr-start')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mulai Quiz' })).toBeVisible();
});

test('quiz flow: answer one question, then advance', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Mulai Quiz' }).click();
  await expect(page.locator('#scr-quiz')).toBeVisible();
  const options = page.locator('#opts button');
  await expect(options).toHaveCount(4);
  await expect(page.locator('#qimg')).toHaveAttribute('src', /assets\/.+\.(jpg|jpeg|png|webp|avif)/);
  await expect.poll(() => page.locator('#qimg').evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  await options.first().click();
  await expect(page.locator('#qtext')).toContainText(/Benar!|Kurang tepat!/);
  await expect(page.locator('#btn-next')).toBeVisible();
  await page.locator('#btn-next').click();
  await expect(page.locator('#qno')).toHaveText('2');
});

test('no page errors while playing one question', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Mulai Quiz' }).click();
  await page.locator('#opts button').first().click();
  await page.locator('#btn-next').click();
  expect(errors).toEqual([]);
});

test('full session: last question transitions to end screen with score and record', async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto('/');
  await page.getByRole('button', { name: 'Mulai Quiz' }).click();
  const statsText = await page.locator('.stats').innerText();
  const total = Number(statsText.match(/\/\s*(\d+)/)[1]);
  expect(total).toBeGreaterThan(0);
  let correct = 0;
  for (let i = 0; i < total; i++) {
    await expect(page.locator('#qno')).toHaveText(String(i + 1));
    const option = page.locator('#opts button').first();
    await option.click();
    if (await option.evaluate((b) => b.classList.contains('ok'))) correct++;
    await page.locator('#btn-next').click();
  }
  await expect(page.locator('#scr-end')).toBeVisible();
  await expect(page.locator('#end-score')).toHaveText(`Skor akhir: ${correct} / ${total}`);
  const best = await page.evaluate(() => localStorage.getItem('cq_best'));
  expect(best).not.toBeNull();
  expect(Number(best)).toBe(correct);
});
