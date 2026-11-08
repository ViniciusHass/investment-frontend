import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FeedbackState } from './FeedbackState'
import i18n, { changeDisplayLanguage } from '../i18n/i18n'

afterEach(() => changeDisplayLanguage('pt-BR'))

describe.each(['pt-BR', 'en'] as const)('feedback behavior in %s', (locale) => {
  it.each(['empty', 'loading', 'error', 'unavailable', 'stale'] as const)('announces %s with translated text', (kind) => {
    changeDisplayLanguage(locale)
    render(<FeedbackState kind={kind} />)
    const state = screen.getByRole(kind === 'error' ? 'alert' : 'status')
    expect(state).toHaveTextContent(i18n.t(`state.${kind}Title`))
    expect(state).toHaveTextContent(i18n.t(`state.${kind}Message`))
    expect(state).not.toHaveAttribute('aria-busy', 'true')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('activates the translated retry exactly once with Enter', async () => {
    changeDisplayLanguage(locale)
    const onRetry = vi.fn()
    const user = userEvent.setup()
    render(<FeedbackState kind="error" onRetry={onRetry} />)
    await user.tab()
    expect(screen.getByRole('button', { name: i18n.t('state.retry') })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
