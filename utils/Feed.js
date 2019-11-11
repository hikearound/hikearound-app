import firebase from 'firebase';

export async function pageFeed({ size, start }) {
    let hikeRef = firebase
        .firestore()
        .collection('hikes')
        .orderBy('timestamp', 'desc')
        .limit(size);

    if (start) {
        hikeRef = hikeRef.startAfter(start);
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
