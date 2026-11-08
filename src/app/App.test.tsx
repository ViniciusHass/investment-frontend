import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { FeedbackState } from '../shared/ui/FeedbackState'
import i18n, { changeDisplayLanguage, preferenceKey, readInitialLanguage } from '../shared/i18n/i18n'

function resetLocale() { changeDisplayLanguage('pt-BR'); window.history.replaceState({}, '', '/') }
afterEach(resetLocale)

describe('application shell', () => {
  it('renders localized home without financial figures or backend calls', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Seu planejamento de investimentos começa aqui.' })).toBeVisible()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText(/Carteira/)).toHaveAttribute('aria-disabled', 'true')
    expect(screen.queryByText(/R\$|\$|\d+%/)).not.toBeInTheDocument()
  })
  it('recovers from an unknown URL and keeps it during locale change', async () => {
    window.history.replaceState({}, '', '/unknown')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Não encontramos esta página.' })).toBeVisible()
    fireEvent.change(screen.getByRole('combobox', { name: 'Idioma' }), { target: { value: 'en' } })
    expect(screen.getByRole('heading', { level: 1, name: 'We could not find this page.' })).toBeVisible()
    expect(window.location.pathname).toBe('/unknown')
    fireEvent.click(screen.getByRole('link', { name: 'Return to home' }))
    expect(await screen.findByRole('heading', { name: 'Your investment planning starts here.' })).toBeVisible()
  })
  it('updates document language and title on an immediate switch', () => {
    render(<App />)
    fireEvent.change(screen.getByRole('combobox', { name: 'Idioma' }), { target: { value: 'en' } })
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe('Investment Planner')
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
  })
})

describe('language preference', () => {
  it('defaults safely and ignores unsupported values', () => {
    window.localStorage.setItem(preferenceKey, 'fr')
    expect(readInitialLanguage()).toBe('pt-BR')
  })
  it('continues switching when browser storage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    expect(() => changeDisplayLanguage('en')).not.toThrow()
    expect(i18n.language).toBe('en')
    vi.restoreAllMocks()
  })
  it('contains matching catalogs for every supported locale', async () => {
    const pt = (await import('../shared/i18n/locales/pt-BR')).default
    const en = (await import('../shared/i18n/locales/en')).default
    const flatten = (value: object, prefix = ''): string[] => Object.entries(value).flatMap(([key, child]) => typeof child === 'object' ? flatten(child, prefix ? `${prefix}.${key}` : key) : [prefix ? `${prefix}.${key}` : key])
    expect(flatten(pt).sort()).toEqual(flatten(en).sort())
  })
})

describe('feedback states', () => {
  it.each(['empty', 'loading', 'error', 'unavailable', 'stale'] as const)('has accessible semantics for %s', (kind) => {
    render(<FeedbackState kind={kind} />)
    expect(screen.getByRole(kind === 'error' ? 'alert' : 'status')).toBeVisible()
    expect(screen.getByRole('heading', { level: 2 })).toBeVisible()
  })
  it.each(['pt-BR', 'en'] as const)('renders distinct feedback text in %s', (locale) => {
    changeDisplayLanguage(locale)
    const messages = ['emptyTitle', 'loadingTitle', 'errorTitle', 'unavailableTitle', 'staleTitle'].map((key) => i18n.t(`state.${key}`))
    expect(new Set(messages).size).toBe(5)
    for (const kind of ['empty', 'loading', 'error', 'unavailable', 'stale'] as const) {
      const { unmount } = render(<FeedbackState kind={kind} />)
      expect(screen.getByRole(kind === 'error' ? 'alert' : 'status')).toHaveTextContent(i18n.t(`state.${kind}Title`))
      unmount()
    }
  })
  it('runs a supplied retry action by keyboard', async () => {
    const retry = vi.fn()
    const user = userEvent.setup()
    render(<FeedbackState kind="error" onRetry={retry} />)
    await user.tab()
    await user.keyboard('{Enter}')
    expect(retry).toHaveBeenCalledOnce()
  })
})

describe('storage read fallback', () => {
  it('uses the default when local storage cannot be read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    expect(readInitialLanguage()).toBe('pt-BR')
    vi.restoreAllMocks()
  })
  it('restores an explicitly saved supported language', () => {
    window.localStorage.setItem(preferenceKey, 'en')
    expect(readInitialLanguage()).toBe('en')
  })
})
