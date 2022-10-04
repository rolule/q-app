import { Image, Text } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { QLogoPath } from 'images';
import { DetailPage } from 'pages/DetailPage';

export const StartPage: IPage = () => (
  <>
    <Image width="50px" src={QLogoPath} alt="logo" />
    <Text>App</Text>

    <Routes>
      <Route path="id/:element" element={<DetailPage />} />
    </Routes>
  </>
);

StartPage.path = '/';
