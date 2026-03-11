import { expect, test } from '@playwright/test';
// test  3
test('loads page and retrieves dog image successfully', async ({ page }) => {
  const apiResponsePromise = page.waitForResponse(
    (response) => response.url().includes('/api/dogs/random') && response.request().method() === 'GET',
  );

  await page.goto('http://localhost:5173');
  await apiResponsePromise;

  const dogImage = page.locator('img.dog-image');
  await expect(dogImage).toHaveAttribute('src', /^https:\/\//);
});
// test  4, if button is clicked and dog image retrieved
test('clicking button retrieves another dog image successfully', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.waitForResponse(
    (response) => response.url().includes('/api/dogs/random') && response.request().method() === 'GET',
  );

  const apiResponsePromise = page.waitForResponse(
    (response) => response.url().includes('/api/dogs/random') && response.request().method() === 'GET',
  );

  await page.getByRole('button', { name: 'Get Another Dog' }).click();
  await apiResponsePromise;

  const dogImage = page.locator('img.dog-image');
  await expect(dogImage).toHaveAttribute('src', /^https:\/\//);
});
// test  5, if API call fails, error element should be visible
test('shows visible error element when API call fails', async ({ page }) => {
  await page.route('**/api/dogs/random', async (route) => {
    await route.abort();
  });

  await page.goto('http://localhost:5173');

  const errorElement = page.locator('.error').filter({ hasText: /error/i });
  await expect(errorElement).toBeVisible();
});