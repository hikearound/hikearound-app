import { db } from '../lib/Fire';
import { cacheHikeImage } from './Image';

export async function pageFeed(pageSize, lastKey, sortDirection) {
    let hikeRef = db
        .collection('hikes')
        .orderBy('timestamp', sortDirection)
        .limit(pageSize);

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
        (a, b) => a.timestamp < b.timestamp,
    );

    if (sortDirection === 'asc') {
        sortedHikes = Object.values(data).sort(
            (a, b) => a.timestamp > b.timestamp,
        );
    }

    return { data, sortedHikes };
}

export async function buildHikeData(data) {
    const hikes = {};

    /* eslint-disable-next-line */
    for (const hike of data) {
        const imageUrl = await cacheHikeImage(hike);
        hike.coverPhoto = imageUrl;
        hikes[hike.key] = hike;
    }

    return hikes;
}

export function setFeed(view) {
    let nextView = 'map';

    if (view === nextView) {
        nextView = 'feed';
    }

    return nextView;
}

export default { pageFeed, sortHikes, buildHikeData, setFeed };
