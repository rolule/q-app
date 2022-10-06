import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RootRouter } from 'RootRouter';
import { DefaultLayout } from 'components';
import { customTheme } from 'theme';
import 'locales/setupI18next';

const root = document.getElementById('root');

if (!root) throw new Error('The root container could not be found');

createRoot(root).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <DefaultLayout>
        <RootRouter />
      </DefaultLayout>
    </ChakraProvider>
  </StrictMode>,
);
