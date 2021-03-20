import I18n, {getLanguages} from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import {I18nManager, I18nManagerStatic, AsyncStorage} from 'react-native';

I18n.fallbacks = true;

I18n.translations = {
  ar,
  en,
};

let activeLang = 'ar';

let defineLange = async () => {
  AsyncStorage.getItem('Lang').then((lang) => {
    I18n.locale = lang || 'ar-EG';
    if (lang === 'ar-EG') {
      activeLang = 'ar';
    } else {
      activeLang = 'en';
    }
  });
};
defineLange();
export const getActiveLang = () => {
  return activeLang;
};

console.log(
  'RTL : ',
  I18nManager.isRTL,
  I18nManager.getConstants(),
  getLanguages(),
);
getLanguages().then((langs) => {
  console.log('Langs : ', langs);
});

export default I18n;
