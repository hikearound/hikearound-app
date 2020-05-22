import { cacheHikeImage } from './Image';
import { getRange } from './Location';
import { getHikeRef } from './Hike';

export async function pageFeed(pageSize, lastKey, position, sortDirection) {
    const { latitude, longitude } = position.coords;

    const range = getRange(latitude, longitude, 50);
    let hikeRef = getHikeRef('geo', range, sortDirection, pageSize);

    if (lastKey) {
        hikeRef = hikeRef.startAfter(lastKey);
    }

    const querySnapshot = await hikeRef.get();
    const data = [];

    querySnapshot.forEach((hike) => {
        if (hike.exists) {
            const hikeData = hike.data() || {};

            hikeData.id = hike.id;

            const reduced = {
                key: hike.id,
                ...hikeData,
            };

            data.push(reduced);
        }
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { data, cursor: lastVisible };
}

export function sortHikes(previousState, hikes, sortDirection) {
    const data = { ...previousState.data, ...hikes };

    let sortedHikes = Object.values(data).sort(
        (a, b) => a.dateCreated < b.dateCreated,
    );

    if (sortDirection === 'asc') {
        sortedHikes = Object.values(data).sort(
            (a, b) => a.dateCreated > b.dateCreated,
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

export function setFeed(view) {
    let nextView = 'search';

    if (view === nextView) {
        nextView = 'feed';
    }

    return nextView;
}
