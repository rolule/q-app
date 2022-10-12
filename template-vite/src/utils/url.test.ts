import urlJoin from 'url-join'
import { isExternalUrl } from 'utils/url'

// @vitest-environment jsdom

describe('isExternalUrl', () => {
  it('detects valid external url', () => {
    const externalUrl = 'https://google.com'

    expect(isExternalUrl(externalUrl)).toBe(true)
  })

  it('detects valid internal url', () => {
    const internalUrl = urlJoin(window.location.href, 'start')

    expect(isExternalUrl(internalUrl)).toBe(false)
  })

  it('detects invalid url as internal', () => {
    const invalidUrl = 'google.de'

    expect(isExternalUrl(invalidUrl)).toBe(false)
  })
})
