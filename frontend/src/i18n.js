import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tr from './locales/tr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
    ar: { translation: ar },
  },
  // localStorage is missing while the build prerenders pages (scripts/prerender.mjs); that HTML is Turkish.
  lng: (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'tr',
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;