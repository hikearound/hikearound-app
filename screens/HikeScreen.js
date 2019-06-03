import React from 'react';
import styled from 'styled-components';
import {
    Button,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import firebase from 'firebase'
import { InfoBar, HikeBody } from '../components/Index'
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

const parseString = require('react-native-xml2js').parseString;

class HikeScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { state: { params = {} } } = navigation;
        const hike = navigation.getParam('hike')
        return {
            title: hike.name || 'Hike',
        };
    }

    constructor(props, context) {
        super(props, context);
    }

    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    };

    componentDidMount() {
        this.initializeMap();
    }

    setMapRegion() {
        this.setState({mapRegion:
            {
                latitude: this.state.startingLat,
                longitude: this.state.startingLon,
                latitudeDelta: this.state.latDelta,
                longitudeDelta: this.state.lonDelta,
            }
        });
    }

    parseCoordinates() {
        var coordinates = [];
        var coordinateCount = this.state.hikeData.gpx.rte[0].rtept.length;
        for (var i = 0, len = coordinateCount; i < len; ++i) {
            coordinate = this.state.hikeData.gpx.rte[0].rtept[i].$;
            coordinates.push(
                {
                    latitude: parseFloat(coordinate.lat),
                    longitude: parseFloat(coordinate.lon)
                }
            )
        }
        this.setState({ coordinates });
    }

    initializeMap = async () => {
        const { navigation } = this.props;
        const hike = navigation.getParam('hike');
        var ref = firebase.storage().ref(hike.gpx);
        let hikeXmlUrl = await ref.getDownloadURL()
        this.getHikeData(hikeXmlUrl)
    };

    getHikeData = async (hikeXmlUrl) => {
        await fetch(hikeXmlUrl)
            .then(response => response.text())
            .then(response => {
                parseString(response, function (err, result) {
                    AsyncStorage.setItem(
                        'hikeData', JSON.stringify(result)
                    );
                });
            })
        var hikeData = await AsyncStorage.getItem('hikeData');
        this.setHikeData(JSON.parse(hikeData));
        this.parseCoordinates();
        this.setMapRegion();
    };

    setHikeData(hikeData) {
        var hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        var maxlat = parseFloat(hikeMetaData.maxlat);
        var minlat = parseFloat(hikeMetaData.minlat);
        var minlon =  parseFloat(hikeMetaData.minlon);
        var maxlon =  parseFloat(hikeMetaData.maxlon);
        this.setState({
            startingLat: ((maxlat + minlat) / 2),
            startingLon: ((maxlon + minlon) / 2),
            latDelta: ((maxlat - minlat) + 0.02),
            lonDelta: (maxlon - minlon),
            hikeData,
        });
    }

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission denied.',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location) });
    };

    render() {
        const { navigation } = this.props;
        const hike = navigation.getParam('hike');
        return (
            <RootView>
                <PurpleBlockView></PurpleBlockView>
                <ScrollView>
                    <MapViewWrapper>
                        <InnerMapViewWrapper>
                            <MapView
                                provider={MapView.PROVIDER_GOOGLE}
                                style = {styles.map}
                                region={this.state.mapRegion}
                                mapType='terrain'
                                showsUserLocation={true}
                                showsMyLocationButton={false}
                                showsPointsOfInterest={false}
                                showsCompass={false}>
                                <MapView.Polyline
                                    coordinates={this.state.coordinates}
                                    strokeColor={colors.purple}
                                    strokeWidth={4}
                                />
                            </MapView>
                            <InfoBar
                                distance={hike.distance}
                                elevation={hike.elevation}
                                route={hike.route}
                            />
                        </InnerMapViewWrapper>
                        <GrayBlockView></GrayBlockView>
                    </MapViewWrapper>
                    <HikeBody
                        name={hike.name}
                        description={hike.description}
                    />
                </ScrollView>
            </RootView>
        );
    }
}

export default HikeScreen;

const styles = StyleSheet.create ({
   map: {
      height: 200,
      zIndex: 1,
      overflow: 'hidden',
      borderRadius: 6,
   }
})

const RootView = styled.View`
    background-color: ${colors.white};
`;

const MapViewWrapper = styled.View`
    flex: 1;
    height: 285px;
    background-color: ${colors.purple};
    padding: ${spacing.micro}px ${spacing.small}px;
`;

const InnerMapViewWrapper = styled.View`
    background-color: ${colors.white};
    border-radius: 6px;
    box-shadow: 0 4px 12px ${colors.transparentGray};
    z-index: 1;
`;

const GrayBlockView = styled.View`
    flex: 1;
    height: 165px;
    background-color: #F6F6F6;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
`;

const PurpleBlockView = styled.View`
    height: 200px;
    background-color: ${colors.purple};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
