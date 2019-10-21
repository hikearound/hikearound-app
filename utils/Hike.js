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

export function writeFavoriteHike(hikeData) {
    const { uid } = firebase.auth().currentUser;
    firebase
        .firestore()
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .doc(hikeData.id)
        .set(hikeData, { merge: true });
}

export function removeFavoriteHike(hikeData) {
    const { uid } = firebase.auth().currentUser;
    firebase
        .firestore()
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .doc(hikeData.id)
        .delete();
}

export default {
    getHikeSnapshot,
    getFeedHikeCount,
    getHikeImage,
    getHikeXmlUrl,
};
