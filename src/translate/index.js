import I18n, {getLanguages} from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import {I18nManager, I18nManagerStatic} from 'react-native';

I18n.fallbacks = true;

I18n.translations = {
  ar,
  en,
};
I18n.locale = 'ar-EG';
console.log('RTL : ', I18nManager.isRTL, I18nManager.getConstants());


export default I18n;
