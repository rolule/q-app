import { FunctionComponent, useMemo } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import * as pages from 'pages';
import { Page } from 'types/page';

export const RootRouter: FunctionComponent = () => (
  <BrowserRouter>
    <QRoutes />
  </BrowserRouter>
);

type EnhancedRouteObject = RouteObject & { noGlobPath: string };

const getPageParentPath = (
  page: Page,
  pageStack: Page[] = [],
): EnhancedRouteObject => {
  const { parent, Component } = page;

  if (!parent) {
    return {
      element: <Component />,
      path: page.path.join('/'),
      noGlobPath: page.path.join('/'),
    };
  }

  const parentRoute = getPageParentPath(parent, [...pageStack, page]);

  return {
    ...parentRoute,
    children: [{ path: page.path.join('/'), element: <Component /> }],
  };
};

const resolveMainRoutes = () => {
  const noParentPages = [];
  const parentPages = [];
  for (const page of Object.values(pages)) {
    if (page.parent) {
      parentPages.push(page);
    } else {
      noParentPages.push(page);
    }
  }

  const noParentRoutes = noParentPages.map((p) => getPageParentPath(p));

  const routeTree: Record<string, EnhancedRouteObject> = {};
  noParentRoutes.forEach((r) => {
    routeTree[r.noGlobPath] = r;
  });

  const parentRoutes = parentPages.map((p) => getPageParentPath(p));

  parentRoutes.forEach((r) => {
    if (r.noGlobPath in routeTree) {
      routeTree[r.noGlobPath].children = [
        ...(routeTree[r.noGlobPath].children ?? []),
        ...(r.children ?? []),
      ];
    }
  });

  return Object.values(routeTree);
};

const QRoutes: FunctionComponent = () => {
  const routes = useMemo(() => resolveMainRoutes(), []);

  const RoutesElement = useRoutes(routes);

  return RoutesElement;
};
