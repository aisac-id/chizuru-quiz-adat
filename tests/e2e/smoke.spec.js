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
  await expect(page.locator('#qimg')).toHaveAttribute('src', /assets\/.+\.jpg/);
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