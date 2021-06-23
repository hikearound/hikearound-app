import {
    sort,
    elevationSize,
    distanceLength,
    difficultyLabel,
    typeLabel,
    elevationIntervals,
    distanceIntervals,
} from '@constants/Filters';

function getFilterControls(t) {
    const sortGroup = {
        type: 'sort',
        multiple: false,
        title: t('control.sort.title'),
        values: [t('control.sort.value.new'), t('control.sort.value.old')],
    };

    const routeGroup = {
        type: 'route',
        multiple: true,
        title: t('control.route.title'),
        values: [t('hike.data.loop'), t('hike.data.out')],
    };

    const difficultyGroup = {
        type: 'difficulty',
        multiple: true,
        title: t('control.difficulty.title'),
        values: [
            t('hike.difficulty.easy'),
            t('hike.difficulty.moderate'),
            t('hike.difficulty.difficult'),
        ],
    };

    const elevationGroup = {
        type: 'elevation',
        multiple: true,
        title: t('control.elevation.title'),
        values: [
            t('control.elevation.value', { elevation: '0-249' }),
            t('control.elevation.value', { elevation: '250-499' }),
            t('control.elevation.value', { elevation: '500+' }),
        ],
    };

    const distanceGroup = {
        type: 'distance',
        multiple: true,
        title: t('control.distance.title'),
        values: [
            t('control.distance.value', { distance: '0-4.9' }),
            t('control.distance.value', { distance: '5-9.9' }),
            t('control.distance.value', { distance: '10+' }),
        ],
    };

    return [
        sortGroup,
        routeGroup,
        difficultyGroup,
        elevationGroup,
        distanceGroup,
    ];
}

export function getSegmentedControls(t, controlType) {
    if (controlType === 'filter') {
        return getFilterControls(t);
    }
    return null;
}

export function getSortDirection(filterParams) {
    if (filterParams.sort === sort.new) {
        return 'asc';
    }
    return 'desc';
}

export function filterForDifficulty(filterParams, difficulty) {
    const difficultyArray = [];

    filterParams.forEach((item) => {
        difficultyArray.push(difficultyLabel[item]);
    });

    if (!difficultyArray.includes(difficulty)) {
        return false;
    }

    return true;
}

export function filterForRoute(filterParams, route) {
    const routeArray = [];

    filterParams.forEach((item) => {
        routeArray.push(typeLabel[item]);
    });

    if (!routeArray.includes(route)) {
        return false;
    }

    return true;
}

export function filterForElevation(filterParams, elevation) {
    let minElevation;
    let maxElevation;

    if (filterParams.includes(elevationSize.small)) {
        minElevation = elevationIntervals.zero;
        maxElevation = elevationIntervals.first;

        if (filterParams.includes(elevationSize.medium)) {
            maxElevation = elevationIntervals.third;

            if (filterParams.includes(elevationSize.large)) {
                maxElevation = elevationIntervals.fifth;
            }
        }
    } else if (filterParams.includes(elevationSize.medium)) {
        minElevation = elevationIntervals.second;
        maxElevation = elevationIntervals.third;

        if (filterParams.includes(elevationSize.large)) {
            maxElevation = elevationIntervals.fifth;
        }
    } else if (filterParams.includes(elevationSize.large)) {
        minElevation = elevationIntervals.fourth;
        maxElevation = elevationIntervals.fifth;
    }

    if (elevation >= minElevation && elevation <= maxElevation) {
        return true;
    }

    return false;
}

export function filterForDistance(filterParams, distance) {
    let minDistance;
    let maxDistance;

    if (filterParams.includes(distanceLength.short)) {
        minDistance = distanceIntervals.zero;
        maxDistance = distanceIntervals.first;

        if (filterParams.includes(distanceLength.medium)) {
            maxDistance = distanceIntervals.third;

            if (filterParams.includes(distanceLength.long)) {
                maxDistance = distanceIntervals.fifth;
            }
        }
    } else if (filterParams.includes(distanceLength.medium)) {
        minDistance = distanceIntervals.second;
        maxDistance = distanceIntervals.third;

        if (filterParams.includes(distanceLength.long)) {
            maxDistance = distanceIntervals.fifth;
        }
    } else if (filterParams.includes(distanceLength.long)) {
        minDistance = distanceIntervals.fourth;
        maxDistance = distanceIntervals.fifth;
    }

    if (distance >= minDistance && distance <= maxDistance) {
        return true;
    }

    return false;
}
