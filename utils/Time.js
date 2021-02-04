import moment from 'moment';

export function isRecent(data) {
    const now = moment();

    const savedOn = moment(data.savedOn.toDate());
    const daysOld = now.diff(savedOn, 'days');

    if (daysOld <= 30) {
        return true;
    }

    return false;
}

export default isRecent;
