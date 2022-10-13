/**
 * Determines, if a given URL is not belonging to this SPA
 * @param url string
 * @returns boolean
 */
export const isExternalUrl = (url: string) => {
  try {
    // TODO: Adapt this for SSR
    return new URL(url).host !== window.location.host
  } catch {
    // if it is an invalid URL, it is probably not external
    return false
  }
}
