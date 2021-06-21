import I18n, {getLanguages} from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import {I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ar,
};

let activeLang = 'en';

let defineLange = async () => {
  await AsyncStorage.getItem('locale').then((locale) => {
    // console.log('Stored Locale : ', locale);
    I18n.locale = locale || 'en-US';
    if (locale === 'ar-EG') {
      activeLang = 'ar';
    } else {
      activeLang = 'en';
    }
  });
};
// defineLange();

export const setActiveLang = (lang) => {
  let locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  activeLang = lang;
  I18n.locale = locale;
  AsyncStorage.setItem('locale', locale);
};

export const getActiveLang = () => {
  return activeLang;
};

// console.log(
//   'RTL : ',
//   I18nManager.isRTL,
//   I18nManager.getConstants(),
//   getActiveLang(),
// );
getLanguages().then((langs) => {
  // console.log('Langs : ', langs);
});

export default I18n;
