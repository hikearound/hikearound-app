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
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';
import fontSizes from '../constants/Fonts';

class HikeScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { state: { params = {} } } = navigation;
        const hike = navigation.getParam('hike')
        return {
            title: hike.name || 'Hike',
        };
    }

    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    };

    componentDidMount() {
        // this.getLocation();
        this.getHikeXml();
    }

    setHikeMetaData() {
        var hikeMetaData = this.state.hikeXml.gpx.metadata[0].bounds[0]["$"];
        var startingLat = ((parseFloat(hikeMetaData.maxlat) + parseFloat(hikeMetaData.minlat)) / 2);
        var startingLon = ((parseFloat(hikeMetaData.maxlon) + parseFloat(hikeMetaData.minlon)) / 2);
        var latDelta = ((parseFloat(hikeMetaData.maxlat) - parseFloat(hikeMetaData.minlat)) + 0.02);
        var lonDelta = (parseFloat(hikeMetaData.maxlon) - parseFloat(hikeMetaData.minlon));
        this.setState({ startingLat });
        this.setState({ startingLon });
        this.setState({ latDelta });
        this.setState({ lonDelta });
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
        var coordinateCount = this.state.hikeXml.gpx.rte[0].rtept.length;
        for (var i = 0, len = coordinateCount; i < len; ++i) {
            coordinate = this.state.hikeXml.gpx.rte[0].rtept[i]["$"];
            coordinates.push(
                {
                    latitude: parseFloat(coordinate.lat),
                    longitude: parseFloat(coordinate.lon)
                }
            )
        }
        this.setState({ coordinates });
    }

    getHikeXml = async () => {
        var hikeXml = await AsyncStorage.getItem('hikeXml');
        if (!hikeXml) {
            var hikeLink = 'https://firebasestorage.googleapis.com/v0/b/designcode-app-969d7.appspot.com/o/hike.gpx?alt=media&token=f658517c-6611-446e-92c2-2b266da4f128';
            fetch(hikeLink)
               .then(response => response.text())
               .then((response) => {
                   const parseString = require('react-native-xml2js').parseString;
                   parseString(response, function (err, result) {
                       AsyncStorage.setItem('hikeXml', JSON.stringify(result));
                   });
               })
        }
        hikeXml = JSON.parse(hikeXml);
        this.setState({ hikeXml });
        this.setHikeMetaData();
        this.parseCoordinates();
        this.setMapRegion();
    };

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
        this.setState({mapRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 }
        });
    };

    render() {
        const { navigation } = this.props;
        const hike = navigation.getParam('hike');
        var description = hike.description.replace('\\n\\n', '\n\n');
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
                            <CardContent>
                                <ContentItem>
                                    <MetaDataType>Distance</MetaDataType>
                                    <MetaData>{hike.distance}m</MetaData>
                                </ContentItem>
                                <ContentItem>
                                    <MetaDataType>Elevation</MetaDataType>
                                    <MetaData>{hike.elevation}ft</MetaData>
                                </ContentItem>
                                <ContentItem>
                                    <MetaDataType>Route</MetaDataType>
                                    <MetaData>{hike.route}</MetaData>
                                </ContentItem>
                            </CardContent>
                        </InnerMapViewWrapper>
                        <GrayBlockView></GrayBlockView>
                    </MapViewWrapper>
                    <BodyContent>
                        <TitleText>{hike.name}</TitleText>
                        <DescriptionText>{description}</DescriptionText>
                    </BodyContent>
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
    background-color: #FFF;
`;

const DescriptionText = styled.Text`
    color: #333;
    font-size: 14px;
`;

const TitleText = styled.Text`
    color: #333;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
`;

const MapViewWrapper = styled.View`
    flex: 1;
    height: 285px;
    background-color: ${colors.purple};
    padding: 5px 15px;
`;

const InnerMapViewWrapper = styled.View`
    background-color: #FFF;
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

const CardContent = styled.View`
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: 10px 15px;
    margin-top: -4px;
    z-index: 2;
    background-color: #FFF;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
`;

const ContentItem = styled.View`
    flex-direction: column;
    flex-grow: 1;
`;

const MetaDataType = styled.Text`
    color: #9C9C9C;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;

const MetaData = styled.Text`
    padding-top: 1px;
    color: #333;
    font-size: 13px;
    font-weight: 500;
`;

const BodyContent = styled.View`
    padding: 20px 15px;
    background-color: #fff;
`;
