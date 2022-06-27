import { StartPage } from 'pages/StartPage';
import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const RootRouter: FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${StartPage.path}*`} element={<StartPage />} />
    </Routes>
  </BrowserRouter>
);
