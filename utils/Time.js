import moment from 'moment';

export function isRecent(data, numDays) {
    const now = moment();

    const savedOn = moment(data.savedOn.toDate());
    const daysOld = now.diff(savedOn, 'days');

    if (daysOld <= numDays) {
        return true;
    }

    return false;
}

export default isRecent;
