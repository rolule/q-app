import { Image, Text } from '@chakra-ui/react';
import { QLink } from 'components';
import { QLogoPath } from 'images';
import { Page } from 'types/page';
import { itemsDetailPage } from 'pages/ItemsDetailPage';
import { itemsPage } from 'pages/ItemsPage';
import { FunctionComponent } from 'react';
import { resolveRoute } from 'utils/routes';

const StartPage: FunctionComponent = () => (
  <>
    <Image width="50px" src={QLogoPath} alt="logo" />
    <Text>App</Text>
    <QLink to={resolveRoute(itemsPage)}>To Items</QLink>
    <QLink to={resolveRoute(itemsDetailPage, { id: '1' })}>
      To Items-Detail
    </QLink>
  </>
);

export const startPage: Page = {
  path: ['/'],
  Component: StartPage,
};
