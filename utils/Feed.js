import { cacheHikeImage } from './Image';
import { getRange, maybeShowHikeInFeed } from './Location';
import { getHikeRef } from './Hike';

export function sortHikeData(data, sortDirection) {
    let sortedHikes = data.sort(
        (a, b) => b.createdOn.toDate() - a.createdOn.toDate(),
    );

    if (sortDirection === 'asc') {
        sortedHikes = data.sort(
            (a, b) => a.createdOn.toDate() - b.createdOn.toDate(),
        );
    }

    return sortedHikes;
}

export async function queryHikes(
    querySize,
    queryType,
    lastKey,
    position,
    sortDirection,
    distance,
) {
    const { latitude, longitude } = position.coords;

    const range = getRange(latitude, longitude, distance);
    let hikeRef = getHikeRef('geo', range, sortDirection, querySize);

    if (lastKey) {
        hikeRef = hikeRef.startAfter(lastKey);
    }

    const querySnapshot = await hikeRef.get();
    const data = [];

    await querySnapshot.forEach((hike) => {
        if (hike.exists) {
            const hikeData = hike.data() || {};

            hikeData.id = hike.id;

            const reduced = {
                key: hike.id,
                ...hikeData,
            };

            const { lat, lng } = hikeData.coordinates.center;

            const addHikeToFeed = maybeShowHikeInFeed(
                distance,
                latitude,
                longitude,
                lat,
                lng,
            );

            if (queryType === 'feed') {
                if (addHikeToFeed) {
                    data.push(reduced);
                }
            } else {
                data.push(reduced);
            }
        }
    });

    const sortedData = sortHikeData(data, sortDirection);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { data: sortedData, cursor: lastVisible };
}

export function sortHikes(previousState, hikes, sortDirection) {
    const data = { ...previousState.data, ...hikes };

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

export async function buildHikeData(data) {
    const hikes = {};

    /* eslint-disable-next-line */
    for (const hike of data) {
        const photoIndex = hike.coverPhoto;
        const imageUrl = await cacheHikeImage(hike, photoIndex);

        hike.coverPhoto = imageUrl;
        hikes[hike.key] = hike;
    }

    return hikes;
}
