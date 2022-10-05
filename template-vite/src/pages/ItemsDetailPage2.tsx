import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { itemsPage } from 'pages/ItemsPage';
import { Page } from 'types/page';

const ItemsDetailPage2: FunctionComponent = () => {
  const { id } = useParams();

  return <Box color="white">Detail Page {id}</Box>;
};

export const itemsDetailPage2: Page = {
  path: ['v2', ':id'] as const,
  Component: ItemsDetailPage2,
  parent: itemsPage,
};
