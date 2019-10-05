import firebase from 'firebase';

export async function getHikeSnapshot(id) {
    return firebase
        .firestore()
        .collection('hikes')
        .doc(id)
        .get();
}

export async function getFeedHikeCount() {
    const snap = await firebase
        .firestore()
        .collection('hikes')
        .get();
    return snap.size;
}

export async function getHikeImage(id, index) {
    return firebase
        .storage()
        .ref(`hikes/${id}/images/${index}.jpg`)
        .getDownloadURL();
}

export async function getHikeXmlUrl(id) {
    return firebase
        .storage()
        .ref(`hikes/${id}/hike.gpx`)
        .getDownloadURL();
}

export default {
    getHikeSnapshot,
    getFeedHikeCount,
    getHikeImage,
    getHikeXmlUrl,
};
