import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeContext } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Share } from 'react-native';
import openMap from 'react-native-open-maps';
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
import { getHikeXmlUrl, parseHikeXml } from '../utils/Hike';
import { setToastText } from '../utils/Toast';
import { copyLink } from '../actions/Hike';

const shareAction = 'com.apple.UIKit.activity.CopyToPasteboard';
const baseUrl = 'https://tryhikearound.com/hike';

const propTypes = {
    map: PropTypes.string.isRequired,
    dispatchCopyLink: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        map: state.userReducer.map,
        action: state.hikeReducer.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchCopyLink: () => dispatch(copyLink()),
    };
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

        this.state = {
            name: hike.name,
            distance: hike.distance,
            elevation: hike.elevation,
            route: hike.route,
            city: hike.city,
            description: hike.description,
            id: hike.id,
            images: hike.images,
        };

        this.state.toastText = '';
        this.hikeActionSheet = hikeActionSheet.bind(this);

        navigation.setParams({
            showActionSheet: this.hikeActionSheet,
        });
    }

    async componentDidMount() {
        await this.initializeMap();
    }

    componentDidUpdate(prevProps) {
        const { action } = this.props;
        const { name } = this.state;

        if (prevProps.action !== action) {
            setToastText(action, name);
        }
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
        const hikeData = await parseHikeXml(hikeXmlUrl);

        this.setHikeData(hikeData);
        this.parseCoordinates();
        this.setMapRegion();
    };

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        this.setState({
            startingLat: (parseFloat(maxlat) + parseFloat(minlat)) / 2,
            startingLon: (parseFloat(maxlon) + parseFloat(minlon)) / 2,
            latDelta: maxlat - minlat + 0.02,
            lonDelta: maxlon - minlon,
            hikeData,
        });
    }

    navigateToHike = async () => {
        const { startingLat, startingLon } = this.state;
        const { map } = this.props;

        const mapProvider = getMapSetting(map);

        openMap({
            provider: mapProvider,
            travelType: 'drive',
            query: `${startingLat}, ${startingLon}`,
        });
    };

    shareHike = async () => {
        const { id } = this.state;
        const { dispatchCopyLink } = this.props;

        const url = `${baseUrl}/${id}`;
        const result = await Share.share({ url });

        if (result.action === Share.sharedAction) {
            if (result.activityType === shareAction) {
                dispatchCopyLink();
            }
        }
    };

    initializeMap = async () => {
        this.getHikeData();
    };

    parseCoordinates() {
        const { hikeData } = this.state;
        const coordinateCount = hikeData.gpx.rte[0].rtept.length;
        const coordinates = [];

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
            toastText,
        } = this.state;

        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
                <RootView>
                    <Toast text={toastText} />
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
