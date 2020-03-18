import firebase from 'firebase';

const db = firebase.firestore();

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

export default { pageFeed, sortHikes };
