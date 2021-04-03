import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { db } from '../lib/Fire';

const enTranslations = require('../constants/translations/En.json');
const esTranslations = require('../constants/translations/Es.json');

export async function getLocalizationData(languageCode) {
    return db.collection('i18n').doc(languageCode).get();
}

export function getLanguageCode() {
    return Localization.locale;
}

export function shouldCapitalizeTimestamp() {
    const lang = getLanguageCode();

    if (!lang.includes('en')) {
        return true;
    }

    return false;
}

export async function initializeLocalization() {
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: enTranslations },
            es: { translation: esTranslations },
        },
        lng: Localization.locale,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });
}

export function getInputLabels(t) {
    const inputLabels = {
        name: t('label.input.name'),
        email: t('label.input.email'),
        password: t('label.input.password'),
        location: t('label.input.location'),
        currentPassword: t('label.input.currentPassword'),
        newPassword: t('label.input.newPassword'),
        review: t('input.hint.review'),
    };

    return inputLabels;
}

export function mapCodeToTranslation(t, errorCode) {
    if (errorCode === 'auth/email-already-in-use') {
        return t('error.auth.account.exists');
    }
    if (errorCode === 'auth/invalid-email') {
        return t('error.auth.account.invalid');
    }
    if (errorCode === 'auth/weak-password') {
        return t('error.auth.password.weak');
    }
    if (errorCode === 'auth/wrong-password') {
        return t('error.auth.password.wrong');
    }
    if (errorCode === 'auth/too-many-requests') {
        return t('error.auth.account.tooMany');
    }
    if (errorCode === 'auth/user-not-found') {
        return t('error.auth.account.notFound');
    }
    return t('error.auth.generic');
}
