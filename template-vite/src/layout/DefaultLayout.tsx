import { Center } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout: FunctionComponent = () => (
  <Center bgColor="grey" height="100%" flexDir="column">
    <Outlet />
  </Center>
);
