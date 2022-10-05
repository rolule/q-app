import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { itemsPage } from 'pages/ItemsPage';

// import { Page } from 'types/page';

const ItemsDetailPage: FunctionComponent = () => {
  const { id } = useParams();

  return <Box color="white">Detail Page {id}</Box>;
};

export const itemsDetailPage = {
  path: [':id'] as const,
  Component: ItemsDetailPage,
  parent: itemsPage,
}; /* satisfies Page */
/* this should work when Typescript 4.9 is out */
