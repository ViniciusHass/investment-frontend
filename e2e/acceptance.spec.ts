import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const preferenceKey = 'investment-planner.display-language'

for (const locale of ['pt-BR', 'en'] as const) {
  for (const path of ['/', '/missing']) {
    test(`${locale} ${path} is accessible and fits the viewport`, async ({ page }, testInfo) => {
      await page.addInitScript(({ key, language }) => localStorage.setItem(key, language), { key: preferenceKey, language: locale })
      const externalRequests: string[] = []
      page.on('request', (request) => {
        if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') externalRequests.push(request.url())
      })
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('main')).toHaveCount(1)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
      expect(externalRequests).toEqual([])
      await page.screenshot({ path: testInfo.outputPath('shell.png'), fullPage: true })
    })
  }
}

test('keyboard skip link and recovery work on an unknown route', async ({ page }) => {
  await page.goto('/missing')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Voltar ao início' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'Início', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('corrupt preference falls back and blocked storage still permits switching', async ({ page }) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, 'unsupported')
    Storage.prototype.setItem = () => { throw new Error('Storage blocked') }
  }, preferenceKey)
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await page.getByRole('combobox').selectOption('en')
  await expect(page.getByRole('heading', { name: 'Your investment planning starts here.' })).toBeVisible()
})
