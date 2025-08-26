import { parseString } from 'react-native-xml2js';
import { db, storage, auth, timestamp } from '@lib/Fire';

export async function getHikeSnapshot(hid) {
    return db.collection('hikes').doc(hid).get();
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

export async function getHikeImageGallery(hid) {
    const gallerySnapshot = await db.collection('images').doc(hid).get();
    const images = gallerySnapshot.data();
    const count = Object.keys(images).length;

    return { images, count };
}

export async function getHikeImage(hid, index) {
    const thumbnail = await storage
        .ref(`hikes/${hid}/images/thumbnails/${index}_200x200.jpg`)
        .getDownloadURL();

    const cover = await storage
        .ref(`hikes/${hid}/images/covers/${index}_750x750.jpg`)
        .getDownloadURL();

    return { thumbnail, cover };
}

export async function getHikeXmlUrl(hid) {
    return storage.ref(`gpx/${hid}.gpx`).getDownloadURL();
}

export function writeFavoriteHike(hikeData) {
    const { uid } = auth.currentUser;
    hikeData.savedOn = timestamp();

    return db
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .doc(hikeData.hid)
        .set(hikeData, { merge: true });
}

export function removeFavoriteHike(hikeData) {
    const { uid } = auth.currentUser;

    return db
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .doc(hikeData.hid)
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

export function extractRouteCoordinates(gpxData) {
    try {
        if (!gpxData || !gpxData.gpx || !gpxData.gpx.trk) {
            return [];
        }

        const tracks = gpxData.gpx.trk;
        const coordinates = [];

        // Handle both single track and array of tracks
        const trackArray = Array.isArray(tracks) ? tracks : [tracks];

        trackArray.forEach((track) => {
            if (track.trkseg) {
                const segments = Array.isArray(track.trkseg) ? track.trkseg : [track.trkseg];
                
                segments.forEach((segment) => {
                    if (segment.trkpt) {
                        const points = Array.isArray(segment.trkpt) ? segment.trkpt : [segment.trkpt];
                        
                        points.forEach((point) => {
                            if (point.$ && point.$.lat && point.$.lon) {
                                coordinates.push({
                                    latitude: parseFloat(point.$.lat),
                                    longitude: parseFloat(point.$.lon),
                                });
                            }
                        });
                    }
                });
            }
        });

        return coordinates;
    } catch (error) {
        console.error('Error extracting route coordinates:', error);
        return [];
    }
}

export async function getHikeRoute(hid) {
    try {
        const xmlUrl = await getHikeXmlUrl(hid);
        const gpxData = await parseHikeXml(xmlUrl);
        const coordinates = extractRouteCoordinates(gpxData);
        return coordinates;
    } catch (error) {
        console.error('Error getting hike route:', error);
        return [];
    }
}

export async function getHikeData(hid) {
    const hikeSnapshot = await getHikeSnapshot(hid);
    const hikeData = hikeSnapshot.data();

    hikeData.createdOn = hikeData.createdOn.toDate().toString();
    hikeData.lastUpdated = hikeData.lastUpdated.toDate().toString();

    return hikeData;
}

export async function openHikeScreen(hid, navigation, actions) {
    const hikeData = await getHikeData(hid);

    if (hikeData) {
        if (!hikeData.review) {
            hikeData.review = { average: 0, count: 0 };
        }

        navigation.push('Hike', {
            hike: {
                hid,
                images: hikeData.images,
                name: hikeData.name,
                distance: hikeData.distance,
                elevation: hikeData.elevation,
                route: hikeData.route,
                city: hikeData.city,
                state: hikeData.state,
                description: hikeData.description,
                coordinates: hikeData.coordinates,
                imageCount: hikeData.imageCount,
                review: hikeData.review,
                geohash: hikeData.geohash,
            },
            actions,
        });
    }
}
