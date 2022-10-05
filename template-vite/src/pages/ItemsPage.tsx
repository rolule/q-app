import { Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { QLink } from 'components';
import { Page } from 'types/page';
import { itemsDetailPage } from 'pages/ItemsDetailPage';
import { startPage } from 'pages/StartPage';
import { resolveRoute } from 'utils/routes';

const ItemsPage: FunctionComponent = () => {
  const { id } = useParams();
  const idNumber = parseInt(id ?? '1', 10);
  const prevPage = idNumber - 1;
  const nextPage = idNumber + 1;

  return (
    <>
      <QLink to={resolveRoute(startPage)}>Back</QLink>
      <Text>Items</Text>
      <Outlet />

      {prevPage !== 0 && (
        <QLink to={resolveRoute(itemsDetailPage, { id: `${prevPage}` })}>
          To Page {prevPage}
        </QLink>
      )}
      <QLink to={resolveRoute(itemsDetailPage, { id: `${nextPage}` })}>
        To Page {nextPage}
      </QLink>
    </>
  );
};

export const itemsPage: Page = {
  path: ['items'],
  Component: ItemsPage,
};
