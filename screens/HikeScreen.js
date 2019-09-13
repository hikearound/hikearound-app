import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import {
    ScrollView,
    AsyncStorage,
    ActionSheetIOS,
} from 'react-native';
import { connect } from 'react-redux';
import openMap from 'react-native-open-maps';
import {
    HikeBody,
    Overflow,
    Toast,
    MapModal,
    HikeMapWrapper,
} from '../components/Index';
import { colors } from '../constants/Index';

const SHEET_ITEMS = ['Get Directions', 'Cancel'];
const SHEET_CANCEL_INDEX = 1;

const { parseString } = require('react-native-xml2js');

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

class HikeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const hike = navigation.getParam('hike');
        return {
            title: hike.name || 'Hike',
            headerRight: (
                <Overflow navigation={navigation} />
            ),
        };
    }

    constructor(props, context) {
        super(props, context);
        const { navigation } = this.props;
        navigation.setParams({
            showActionSheet: this.showActionSheet,
        });
        this.state = {};
    }

    componentDidMount() {
        this.initializeMap();
    }

    setMapRegion() {
        const {
            startingLat, startingLon, latDelta, lonDelta,
        } = this.state;

        const region = {
            latitude: startingLat,
            longitude: startingLon,
            latitudeDelta: latDelta,
            longitudeDelta: lonDelta,
        };

        if (region) {
            this.setState({ region });
        }
    }

    getHikeXmlUrl = async () => {
        const xmlRef = await this.getXmlRef();
        const ref = firebase.storage().ref(xmlRef);
        return ref.getDownloadURL();
    }

    getXmlRef = async () => {
        const { navigation } = this.props;
        const hike = navigation.getParam('hike');
        const { id } = hike;
        const xmlUrl = `hikes/${id}/hike.gpx`;
        return xmlUrl;
    }

    getHikeData = async () => {
        const hikeXmlUrl = await this.getHikeXmlUrl();

        await fetch(hikeXmlUrl)
            .then((response) => response.text())
            .then((response) => {
                parseString(response, (err, result) => {
                    AsyncStorage.setItem(
                        'hikeData', JSON.stringify(result)
                    );
                });
            });

        const hikeData = await AsyncStorage.getItem('hikeData');

        this.setHikeData(JSON.parse(hikeData));
        this.parseCoordinates();
        this.setMapRegion();
    }

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const maxlat = parseFloat(hikeMetaData.maxlat);
        const minlat = parseFloat(hikeMetaData.minlat);
        const minlon = parseFloat(hikeMetaData.minlon);
        const maxlon = parseFloat(hikeMetaData.maxlon);

        this.setState({
            startingLat: ((maxlat + minlat) / 2),
            startingLon: ((maxlon + minlon) / 2),
            latDelta: ((maxlat - minlat) + 0.02),
            lonDelta: (maxlon - minlon),
            hikeData,
        });
    }

    navigationToHike = async () => {
        const { startingLat, startingLon } = this.state;
        const mapSetting = await AsyncStorage.getItem('mapSetting');
        let provider = 'apple';

        if (mapSetting === 'Google Maps') {
            provider = 'google';
        }

        openMap({
            provider,
            travelType: 'drive',
            query: `${startingLat}, ${startingLon}`,
        });
    }

    showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: SHEET_ITEMS,
            cancelButtonIndex: SHEET_CANCEL_INDEX,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.navigationToHike();
            }
        });
    };

    initializeMap = async () => {
        this.getHikeData();
    }

    parseCoordinates() {
        const { hikeData } = this.state;
        const coordinates = [];
        const coordinateCount = hikeData.gpx.rte[0].rtept.length;

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.rte[0].rtept[i].$;
            coordinates.push(
                {
                    latitude: parseFloat(coordinate.lat),
                    longitude: parseFloat(coordinate.lon),
                }
            );
        }

        this.setState({ coordinates });
    }

    render() {
        const { navigation } = this.props;
        const { coordinates, region } = this.state;
        const hike = navigation.getParam('hike');
        const {
            distance,
            elevation,
            route,
            name,
            city,
            description,
            id,
        } = hike;

        return (
            <RootView>
                <Toast name={hike.name} />
                <PurpleBlockView />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HikeMapWrapper
                        coordinates={coordinates}
                        region={region}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                    />
                    <HikeBody
                        name={name}
                        city={city}
                        description={description}
                        id={id}
                    />
                </ScrollView>
                <MapModal
                    mapRef={(ref) => { this.mapView = ref; }}
                    coordinates={coordinates}
                    region={region}
                    animationType='push'
                    modalAction='showMap'
                />
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
)(HikeScreen);

const RootView = styled.View`
    background-color: ${colors.white};
`;

const PurpleBlockView = styled.View`
    height: 200px;
    background-color: ${colors.purple};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
