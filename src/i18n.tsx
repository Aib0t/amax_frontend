import i18n from 'i18next';
import Backend from 'i18next-xhr-backend'
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next'
// @ts-ignore
import translationEN from '/src/loc/en.json';
// @ts-ignore
import translationRU from '/src/loc/ru.json';
// @ts-ignore
import translationES from '/src/loc/es.json';
// @ts-ignore
import translationDE from '/src/loc/de.json';
// @ts-ignore
import translationFR from '/src/loc/fr.json';
// @ts-ignore
import translationHI from '/src/loc/hi.json';
// @ts-ignore
import translationIT from '/src/loc/it.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    },
    de: {
        translation: translationDE
    },
    es: {
        translation: translationES
    },
    fr: {
        translation: translationFR
    },
    hi: {
        translation: translationHI
    },
    it: {
        translation: translationIT
    }
};

i18n
    .use(initReactI18next)
    .use(detector)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    })

export default i18n