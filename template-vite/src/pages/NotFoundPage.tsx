import { Text } from '@chakra-ui/react';
import { QLink } from 'components';
import { StartPage } from 'pages/StartPage';

export const NotFoundPage: IPage = () => (
  <>
    <Text>This page could not be found</Text>
    <QLink to={StartPage.path}>To start page</QLink>
  </>
);

NotFoundPage.path = '*';
