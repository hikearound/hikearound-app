import firebase from 'firebase';

export async function pageFeed(pageSize, lastKey, sortDirection) {
    let hikeRef = firebase
        .firestore()
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

export default { pageFeed };
