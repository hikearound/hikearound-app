import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enTranslations, esTranslations } from '../constants/Translations';

export function initializeLocalization() {
    i18n.use(initReactI18next).init({
        resources: {
            en: enTranslations,
            es: esTranslations,
        },
        lng: Localization.locale,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });
}

export default { initializeLocalization };
