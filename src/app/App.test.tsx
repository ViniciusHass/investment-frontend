import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('foundation screen', () => {
  it('welcomes the user without presenting portfolio figures or requiring a backend', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /clearer view of your investment plan/i })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Foundation deliberately missing')
    expect(screen.queryByText(/\$|R\$|%|return|balance/i)).not.toBeInTheDocument()
  })
})
