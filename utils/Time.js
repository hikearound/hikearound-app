import moment from 'moment';
import 'moment/min/locales';
import { getLanguageCode } from './Localization';

export function isRecent(data, numDays) {
    const now = moment();

    const savedOn = moment(new Date(data.savedOn.toDate()));
    const daysOld = now.diff(savedOn, 'days');

    if (daysOld <= numDays) {
        return true;
    }

    return false;
}

export function getLocalizedMoment() {
    const lang = getLanguageCode();
    moment.locale(lang);
    return moment;
}

export function formatDate(date) {
    return new Date(date.toDate());
}
