import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import { en, tr } from 'res/translations';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  if (['en', 'tr'].includes(locales[0].languageCode)) {
    I18n.locale = locales[0].languageCode;
  } else {
    I18n.locale = 'en';
  }
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  tr,
};

export default I18n;
