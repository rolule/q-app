import { render, screen } from '@testing-library/react'
import { default as userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QLink } from 'components/QLink'

// @vitest-environment jsdom

describe('Qlink', () => {
  it('should reseolve relative urls internally', async () => {
    render(
      <BrowserRouter>
        <QLink data-testid="mylink" to="login">
          Click here
        </QLink>
      </BrowserRouter>,
    )

    const myLink = screen.getByTestId('mylink')

    await userEvent.click(myLink)
    expect(window.location.pathname).toBe('/login')
    expect(myLink).toBeInTheDocument()
    expect(myLink).toBeVisible()
    expect(myLink).not.toBeDisabled()
  })
})
