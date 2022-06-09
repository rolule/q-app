import { Center, ChakraProvider, Image, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import logo from './qlogo.svg';
import { theme } from '@theme';

export const App: FunctionComponent = () => (
  <ChakraProvider theme={theme}>
    <Center bgColor="grey" height="100%" flexDir="column">
      <Image width="50px" src={logo} alt="logo" />
      <Text>App</Text>
    </Center>
  </ChakraProvider>
);
