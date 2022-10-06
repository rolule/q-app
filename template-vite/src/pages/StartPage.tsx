import { Button, Image, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { QLogoPath } from 'images';
import { changeAppLanguage } from 'utils/locales';

export const StartPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Image width="50px" src={QLogoPath} alt="logo" />
      <Text>{t('welcome')}</Text>
      <Button
        color="cyan"
        onClick={() => {
          void changeAppLanguage(i18n.language === 'de' ? 'en' : 'de');
        }}
      >
        Change Language
      </Button>
    </>
  );
};
