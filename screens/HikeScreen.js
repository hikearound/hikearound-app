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
            title: hike.title || 'Hike',
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

        hikeXml = JSON.parse(hikeXml)
        var startingLat = (
            parseFloat(hikeXml.gpx.metadata[0].bounds[0]["$"].maxlat) + parseFloat(hikeXml.gpx.metadata[0].bounds[0]["$"].minlat)
        ) / 2
        var startingLon = (
            parseFloat(hikeXml.gpx.metadata[0].bounds[0]["$"].maxlon) + parseFloat(hikeXml.gpx.metadata[0].bounds[0]["$"].minlon)
        ) / 2

        this.setState({mapRegion: {
            latitude: startingLat,
            longitude: startingLon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 }
        });

        latLongArray = [];
        arrayLength = hikeXml.gpx.rte[0].rtept.length;
        for (var i = 0, len = arrayLength; i < len; ++i) {
            latLongObject = hikeXml.gpx.rte[0].rtept[i]["$"];
            latLongArray.push(
                {
                    latitude: parseFloat(latLongObject.lat),
                    longitude: parseFloat(latLongObject.lon)
                }
            )
        }
        this.setState({ latLongArray });
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
        return (
            <RootView>
                <PurpleBlockView></PurpleBlockView>
                <ScrollView>
                    <Content>
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
                                        coordinates={this.state.latLongArray}
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
                            <TitleText>{hike.title}</TitleText>
                            <DescriptionText>{hike.content}</DescriptionText>
                        </BodyContent>
                    </Content>
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

const Content = styled.View``;

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

const Image = styled.Image`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background: #3c4560;
`;

const Title = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    width: 170px;
    position: absolute;
    top: 78px;
    left: 20px;
`;

const Caption = styled.Text`
    color: white;
    font-size: 17;
    position: absolute;
    bottom: 20px;
    left: 20px;
    max-width: 300px;
`;

const CloseView = styled.View`
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 22px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.View`
    flex-direction: row;
    position: absolute;
    top: 40px;
    left: 20px;
    align-items: center;
`;

const Logo = styled.Image`
    width: 24px;
    height: 24px;
`;

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 5px;
    text-transform: uppercase;
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
