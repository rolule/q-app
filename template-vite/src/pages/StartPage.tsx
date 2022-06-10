import { Image, Text } from '@chakra-ui/react';
import { QLogoPath } from 'images';

export const StartPage: IPage = () => (
  <>
    <Image width="50px" src={QLogoPath} alt="logo" />
    <Text>App</Text>
  </>
);

StartPage.path = '/';
