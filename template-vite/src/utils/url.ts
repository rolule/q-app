export const isExternalUrl = (url: string) => {
  try {
    // TODO: Adapt this for SSR
    return new URL(url).host !== window.location.host;
  } catch (error) {
    // if it is an invalid URL, it is probably not external
    return false;
  }
};
