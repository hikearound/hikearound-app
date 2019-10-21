import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeContext } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import openMap from 'react-native-open-maps';
import { parseString } from 'react-native-xml2js';
import {
    HikeBody,
    Overflow,
    Toast,
    MapModal,
    HikeMapWrapper,
} from '../components/Index';
import { hikeActionSheet } from '../components/action_sheets/Hike';
import { getMapSetting } from '../utils/Settings';
import { themes } from '../constants/Themes';
import { getHikeXmlUrl } from '../utils/Hike';

const propTypes = {
    map: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        map: state.userReducer.map,
    };
}

function mapDispatchToProps() {
    return {};
}

class HikeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const hike = navigation.getParam('hike');
        return {
            title: hike.name || 'Hike',
            headerRight: <Overflow navigation={navigation} />,
        };
    };

    constructor(props, context) {
        super(props, context);

        const { navigation } = this.props;
        const hike = navigation.getParam('hike');

        this.state = hike;
        this.hikeActionSheet = hikeActionSheet.bind(this);

        navigation.setParams({
            showActionSheet: this.hikeActionSheet,
        });
    }

    componentDidMount() {
        this.initializeMap();
    }

    setMapRegion() {
        const { startingLat, startingLon, latDelta, lonDelta } = this.state;

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

    getHikeData = async () => {
        const { id } = this.state;
        const hikeXmlUrl = await getHikeXmlUrl(id);

        await fetch(hikeXmlUrl)
            .then((response) => response.text())
            .then((response) => {
                parseString(response, (err, result) => {
                    const hikeData = JSON.stringify(result);
                    this.setHikeData(JSON.parse(hikeData));
                });
            });

        this.parseCoordinates();
        this.setMapRegion();
    };

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const maxlat = parseFloat(hikeMetaData.maxlat);
        const minlat = parseFloat(hikeMetaData.minlat);
        const minlon = parseFloat(hikeMetaData.minlon);
        const maxlon = parseFloat(hikeMetaData.maxlon);

        this.setState({
            startingLat: (maxlat + minlat) / 2,
            startingLon: (maxlon + minlon) / 2,
            latDelta: maxlat - minlat + 0.02,
            lonDelta: maxlon - minlon,
            hikeData,
        });
    }

    navigationToHike = async () => {
        const { startingLat, startingLon } = this.state;
        const { map } = this.props;

        const mapProvider = getMapSetting(map);

        openMap({
            provider: mapProvider,
            travelType: 'drive',
            query: `${startingLat}, ${startingLon}`,
        });
    };

    initializeMap = async () => {
        this.getHikeData();
    };

    parseCoordinates() {
        const { hikeData } = this.state;
        const coordinates = [];
        const coordinateCount = hikeData.gpx.rte[0].rtept.length;

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.rte[0].rtept[i].$;
            coordinates.push({
                latitude: parseFloat(coordinate.lat),
                longitude: parseFloat(coordinate.lon),
            });
        }

        this.setState({ coordinates });
    }

    static contextType = ThemeContext;

    render() {
        const {
            coordinates,
            region,
            distance,
            elevation,
            route,
            name,
            city,
            description,
            id,
            images,
        } = this.state;

        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
                <RootView>
                    <Toast name={name} />
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
                            distance={distance}
                            description={description}
                            id={id}
                            images={images}
                        />
                    </ScrollView>
                    <MapModal
                        mapRef={(ref) => {
                            this.mapView = ref;
                        }}
                        coordinates={coordinates}
                        region={region}
                        animationType='push'
                        modalAction='showMap'
                    />
                </RootView>
            </ThemeProvider>
        );
    }
}

HikeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HikeScreen);

const RootView = styled.View`
    background-color: ${(props) => props.theme.rootBackground};
`;

const PurpleBlockView = styled.View`
    height: 100px;
    background-color: ${(props) => props.theme.blockView};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
