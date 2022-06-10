import { Center } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';

interface IDefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = ({
  children,
}) => (
  <Center bgColor="grey" height="100%" flexDir="column">
    {children}
  </Center>
);
