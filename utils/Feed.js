import { CacheManager } from 'react-native-expo-image-cache';
import { getRange, maybeShowInFeed } from './Location';
import { getHikeRef } from './Hike';
import {
    filterForDifficulty,
    filterForRoute,
    filterForElevation,
    filterForDistance,
} from './Filter';

export async function filterHike(hikeData, filterParams) {
    if (filterParams.difficulty.length > 0) {
        const difficulty = filterForDifficulty(
            filterParams.difficulty,
            hikeData.difficulty,
        );

        if (!difficulty) {
            return false;
        }
    }

    if (filterParams.route.length > 0) {
        const route = filterForRoute(filterParams.route, hikeData.route);

        if (!route) {
            return false;
        }
    }

    if (filterParams.elevation.length > 0) {
        const elevation = filterForElevation(
            filterParams.elevation,
            hikeData.elevation,
        );

        if (!elevation) {
            return false;
        }
    }

    if (filterParams.distance.length > 0) {
        const distance = filterForDistance(
            filterParams.distance,
            hikeData.distance,
        );

        if (!distance) {
            return false;
        }
    }

    return true;
}

export function sortHikes(previousData, hikeArray, sortDirection) {
    const hikes = {};

    for (const hike of hikeArray) {
        hikes[hike.key] = hike;
    }

    const data = { ...previousData, ...hikes };

    // if (previousState.data) {
    //     console.log(Object.size(previousState.data));
    // }

    // console.log(hikes[0])

    let sortedHikes = Object.values(data).sort(
        (a, b) => a.createdOn < b.createdOn,
    );

    if (sortDirection === 'desc') {
        sortedHikes = Object.values(data).sort(
            (a, b) => a.createdOn > b.createdOn,
        );
    }

    return { data, sortedHikes };
}

export async function queryHikes(
    querySize,
    queryType,
    lastKey,
    position,
    sortDirection,
    distance,
    filterParams,
) {
    const { latitude, longitude } = position.coords;
    const range = getRange(latitude, longitude, distance);

    let isHikeInFilter = true;
    let hikeRef = getHikeRef('geo', range, sortDirection, querySize);

    if (lastKey) {
        hikeRef = hikeRef.startAfter(lastKey);
    }

    const data = [];
    const querySnapshot = await hikeRef.get();

    await querySnapshot.forEach(async (hike) => {
        if (hike.exists) {
            const hikeData = hike.data() || {};

            hikeData.id = hike.id;

            if (!hikeData.review) {
                hikeData.review = { average: 0, count: 0 };
            }

            const reduced = {
                key: hike.id,
                ...hikeData,
            };

            const { lat, lng } = hikeData.coordinates.center;

            const addHikeToFeed = maybeShowInFeed(
                distance,
                latitude,
                longitude,
                lat,
                lng,
            );

            if (filterParams) {
                isHikeInFilter = await filterHike(hikeData, filterParams);
            }

            if (queryType === 'feed') {
                if (addHikeToFeed) {
                    if (isHikeInFilter) {
                        data.push(reduced);
                    }
                }
            } else {
                data.push(reduced);
            }
        }
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { data, cursor: lastVisible };
}

export async function cacheFeedImages(data) {
    for (const hike of data) {
        await CacheManager.get(hike.coverPhoto).getPath();
    }
}
