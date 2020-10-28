import { parseString } from 'react-native-xml2js';
import { db, storage, auth, timestamp } from '../lib/Fire';

export async function getHikeSnapshot(id) {
    return db.collection('hikes').doc(id).get();
}

export function getHikeRef(type, range, sortDirection, querySize) {
    let hikeRef = db.collection('hikes');

    if (type === 'geo') {
        hikeRef = hikeRef
            .where('geohash', '>=', range.lower)
            .where('geohash', '<=', range.upper)
            .orderBy('geohash');
    }

    return hikeRef.orderBy('createdOn', sortDirection).limit(querySize);
}

export async function getHikeImageGallery(id) {
    const gallerySnapshot = await db.collection('images').doc(id).get();
    return gallerySnapshot.data();
}

export async function getHikeImage(id, index) {
    return storage
        .ref(`hikes/${id}/images/covers/${index}_750x750.jpg`)
        .getDownloadURL();
}

export async function getHikeThumbnail(id, index) {
    return storage
        .ref(`hikes/${id}/images/thumbnails/${index}_200x200.jpg`)
        .getDownloadURL();
}

export async function getHikeXmlUrl(id) {
    return storage.ref(`gpx/${id}.gpx`).getDownloadURL();
}

export function writeFavoriteHike(hikeData) {
    const { uid } = auth.currentUser;
    hikeData.savedOn = timestamp;

    db.collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .doc(hikeData.id)
        .set(hikeData, { merge: true });
}

export function removeFavoriteHike(hikeData) {
    const { uid } = auth.currentUser;
    db.collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .doc(hikeData.id)
        .delete();
}

export async function parseHikeXml(hikeXmlUrl) {
    let hikeData = {};

    await fetch(hikeXmlUrl)
        .then((response) => response.text())
        .then((response) => {
            parseString(response, (err, result) => {
                hikeData = JSON.parse(JSON.stringify(result));
            });
        });

    return hikeData;
}

export async function getHikeData(id) {
    const hikeSnapshot = await getHikeSnapshot(id);
    return hikeSnapshot.data();
}

export async function openHikeScreen(id, navigation) {
    const hikeData = await getHikeData(id);

    if (hikeData) {
        navigation.push('Hike', {
            hike: {
                id,
                images: hikeData.images,
                name: hikeData.name,
                distance: hikeData.distance,
                elevation: hikeData.elevation,
                route: hikeData.route,
                city: hikeData.city,
                state: hikeData.state,
                description: hikeData.description,
                coordinates: hikeData.coordinates,
            },
        });
    }
}
