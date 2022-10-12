export class FetchError extends Error {}

/**
 * Small wrapper that targets the API route and throws if requests fail
 * @param path the path under the api route
 * @param init request parameters
 * @returns the result of fetch
 */
export const apiRequest = async (path: string, init?: RequestInit) => {
  try {
    return await fetch(`/api/${path}`, init);
  } catch (error) {
    throw new FetchError('Error while fetching');
  }
};

/**
 * Fetches from the API route under the given path and parses the result to JSON
 * `WARNING`: does not add `Content-Type: application/json` header
 * @param path the path under the api route
 * @param init request parameters
 * @returns ReturnType
 */
export const jsonRequest = async <TReturnType>(
  path: string,
  init?: RequestInit,
) => {
  const r = await apiRequest(path, init);

  if (r.status === 200) {
    return (await r.json()) as TReturnType;
  }

  const error = await r.text();

  throw new FetchError(error);
};

/**
 * Fetches from the API route under the given path and returns the result as text
 * `WARNING`: does not add `Content-Type: text/plain` header
 * @param path the path under the api route
 * @param init request parameters
 * @returns string of return value
 */
export const textRequest = async (path: string, init?: RequestInit) => {
  const r = await apiRequest(path, init);

  if (r.status === 200) {
    return r.text();
  }

  throw new FetchError(await r.text());
};
