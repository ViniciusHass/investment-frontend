import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home supports keyboard language switching and has no axe violations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('combobox', { name: 'Idioma' })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('Investment Planner')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('unknown route recovers and has no axe violations', async ({ page }) => {
  await page.goto('/missing')
  await expect(page.getByRole('heading', { name: 'Não encontramos esta página.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

