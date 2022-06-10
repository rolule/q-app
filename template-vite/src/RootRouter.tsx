import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { pages } from 'pages';

export const RootRouter: FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      {Object.entries(pages).map(([name, Page]) => (
        <Route key={name} path={Page.path} element={<Page />} />
      ))}
    </Routes>
  </BrowserRouter>
);
