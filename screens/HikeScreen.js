import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Share } from 'react-native';
import openMap from 'react-native-open-maps';
import { HikeBody, Overflow, Toast, MapModal } from '../components/Index';
import { hikeActionSheet } from '../components/action_sheets/Hike';
import { getMapSetting } from '../utils/Settings';
import { themes } from '../constants/Themes';
import { getHikeXmlUrl, parseHikeXml } from '../utils/Hike';
import { getToastText } from '../utils/Toast';
import { copyLink } from '../actions/Hike';
import { RootView } from '../styles/Screens';

const shareAction = 'CopyToPasteboard';
const baseUrl = 'https://tryhikearound.com/hike';
const latModifier = 0.02;

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
            headerRight: () => <Overflow navigation={navigation} />,
        };
    };

    constructor(props, context) {
        super(props, context);
        const { navigation } = this.props;
        const hike = navigation.getParam('hike');

        this.state = {
            id: hike.id,
            name: hike.name,
            toastText: '',
        };

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
            const toastText = getToastText(action, { name });
            this.setToastText(toastText);
        }
    }

    setToastText(toastText) {
        this.setState({ toastText });
    }

    setHikeData(hikeData) {
        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        const latitude = (parseFloat(maxlat) + parseFloat(minlat)) / 2;
        const longitude = (parseFloat(maxlon) + parseFloat(minlon)) / 2;
        const latitudeDelta = maxlat - minlat + latModifier;
        const longitudeDelta = maxlon - minlon;

        const region = {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
        };

        this.setState({ region, hikeData, latitude, longitude });
    }

    initializeMap = async () => {
        const { id } = this.state;
        const hikeXmlUrl = await getHikeXmlUrl(id);
        const hikeData = await parseHikeXml(hikeXmlUrl);

        this.setHikeData(hikeData);
        this.plotCoordinates();
    };

    getDirections = async () => {
        const { latitude, longitude } = this.state;
        const { map } = this.props;
        const mapProvider = getMapSetting(map);

        openMap({
            provider: mapProvider,
            travelType: 'drive',
            query: `${latitude}, ${longitude}`,
        });
    };

    shareHike = async () => {
        const { id } = this.state;
        const { dispatchCopyLink } = this.props;
        const url = `${baseUrl}/${id}`;
        const result = await Share.share({ url });

        if (result.action === Share.sharedAction) {
            if (result.activityType.includes(shareAction)) {
                dispatchCopyLink();
            }
        }
    };

    plotCoordinates() {
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
        const { coordinates, region, toastText } = this.state;
        const { navigation } = this.props;

        const hike = navigation.getParam('hike');
        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
                <RootView>
                    <Toast text={toastText} />
                    <HikeBody
                        hike={hike}
                        coordinates={coordinates}
                        region={region}
                    />
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
