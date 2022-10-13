import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootRouter } from 'RootRouter'
import { ErrorBoundary } from 'components'
import { customTheme } from 'theme'
import 'locales/setupI18next'

const root = document.getElementById('root')

if (!root) {
  throw new Error('The root container could not be found')
}

// start mock service worker for local development
// see https://mswjs.io/
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')

  worker.printHandlers()
  void worker.start({ onUnhandledRequest: 'bypass' })
}

const queryClient = new QueryClient()

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <ChakraProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <RootRouter />
        </QueryClientProvider>
      </ChakraProvider>
    </ErrorBoundary>
  </StrictMode>,
)
