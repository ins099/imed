import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import az from './az';
import ru from './ru';

const resources = {
  en,
  az,
  ru,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    // Set the default namespace
    defaultNS: 'all',
    fallbackLng: 'en',
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;