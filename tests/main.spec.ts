import { test, expect, type Page, type FullProject } from '@playwright/test';

function isMobile(project: FullProject) {
  const width = project.use?.viewport?.width;
  return width && width < 1024;
}

function expectMainHeading(page: Page, text: string) {
  const mainHeading = page.getByRole('heading', { level: 1 });
  return expect(mainHeading).toHaveText(text);
}

test('open home page', async ({ page }) => {
  await page.goto('/');
  await expectMainHeading(page, 'Scoutkåren Munksnäs Spejarna');
});

test('open page in sidebar', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Vargungar' }).click();
  await expectMainHeading(page, 'Vargungar');
});

test('open old post', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Visa alla nyheter' }).click();
  await page.getByRole('link', { name: 'Ny hemsida' }).click();
  await expectMainHeading(page, 'Ny hemsida');
});

test('open page in menu', async ({ page }, { project }) => {
  await page.goto('/');
  if (isMobile(project)) {
    await page.getByRole('button', { name: 'Meny' }).click();
  }
  await page.getByRole('link', { name: 'Kåren', exact: true }).click();
  await expectMainHeading(page, 'Kåren');
});

test('open contact page', async ({ page }) => {
  await page.goto('/kontakt');
  const element = page.getByText('Ivar Vuori');
  await expect(element).toBeVisible();
});

test('get reference number', async ({ page }) => {
  await page.goto('/referensnummer');
  await page.getByLabel('Namn').fill('Joakim Gunst');
  await page.getByRole('button', { name: 'Sök' }).click();
  const result = page.getByText('Ditt referensnummer är 1119');
  await expect(result).toBeVisible();
});

test('open join form', async ({ page }) => {
  await page.goto('/bli-medlem');
  await page.getByRole('link', { name: 'ansökningsblanketten' }).click();
  const element = page.getByText('Partioon liittyminen');
  await expect(element).toBeVisible();
});

test('open calendar', async ({ page }) => {
  await page.goto('/kalender');
  const iframe = page.locator('iframe').contentFrame();
  const formatter = new Intl.DateTimeFormat('sv', { month: 'long', year: 'numeric' });
  const monthYear = formatter.format(new Date());
  const element = iframe.getByText(monthYear).first();
  await expect(element).toBeVisible();
});
