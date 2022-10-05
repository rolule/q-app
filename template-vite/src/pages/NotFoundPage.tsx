import { Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { QLink } from 'components';
import { startPage } from 'pages/StartPage';
import { Page } from 'types/page';
import { resolveRoute } from 'utils/routes';

const NotFoundPage: FunctionComponent = () => (
  <>
    <Text>This page could not be found</Text>
    <QLink to={resolveRoute(startPage)}>To start page</QLink>
  </>
);

export const notFoundPage: Page = {
  path: ['*'],
  Component: NotFoundPage,
};
