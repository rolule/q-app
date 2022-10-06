import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage, StartPage, DetailPage } from 'pages';

export const RootRouter: FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartPage />}>
        <Route path="detail" element={<DetailPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
