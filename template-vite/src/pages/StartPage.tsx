import { Image, Text } from '@chakra-ui/react';
import { QLogoPath } from 'images';
import { DetailPage } from 'pages/DetailPage';
import { Route, Routes } from 'react-router-dom';

export const StartPage: IPage = () => (
  <>
    <Image width="50px" src={QLogoPath} alt="logo" />
    <Text>App</Text>

    <Routes>
      <Route path=":element" element={<DetailPage />} />
    </Routes>
  </>
);

StartPage.path = '/';
