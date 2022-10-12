import { Spinner } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from 'layout'
import { NotFoundPage } from 'pages'

// lazy imports for code splitting
// see https://reactjs.org/docs/code-splitting.html
const StartPage = lazy(async () => import('./pages/StartPage'))
const LoginPage = lazy(async () => import('./pages/LoginPage'))

export const RootRouter: FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          element={
            <Suspense fallback={<Spinner color="orange" />}>
              <Outlet />
            </Suspense>
          }
        >
          <Route path="/" element={<StartPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
