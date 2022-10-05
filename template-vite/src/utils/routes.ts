import urlJoin from 'url-join';
import { Page } from 'types/page';

type RoutePathSegments<T extends Page['path']> = T extends Page['path']
  ? T[number]
  : never;

type RouteOptionMap<T> = T extends `:${infer K}`
  ? {
      [E in K]: string;
    }
  : Record<string, string>;

type RouteVariableOptions<T extends Page['path']> = RouteOptionMap<
  RoutePathSegments<T>
>;

export const resolveRoute = <T extends Page>(
  page: T,
  options: RouteVariableOptions<T['path']> = {} as RouteVariableOptions<[]>,
): string => {
  const result = page.path.map((p) => {
    const variablePath = p.match(/^:(?<match>[a-zA-Z_-]+)$/)?.groups?.match;

    if (variablePath) {
      if (!options || !options[variablePath]) {
        throw new Error(
          `Tried navigating to ${page.path.join(
            '/',
          )} without replacing :${variablePath}`,
        );
      }

      return options[variablePath];
    }

    return p;
  });

  const resultPath = result.join('/');

  // resolve parent path recursively and add this path to the end
  if (page.parent) {
    const parentPath = resolveRoute(page.parent);

    return urlJoin('/', parentPath, resultPath);
  }

  return resultPath;
};
