import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Share } from 'react-native';
import openMap from 'react-native-open-maps';
import { withTranslation } from 'react-i18next';
import { HikeBody, Overflow, Toast, MapModal } from '../components/Index';
import { hikeActionSheet } from '../components/action_sheets/Hike';
import { getMapSetting } from '../utils/Settings';
import { getHikeXmlUrl, parseHikeXml } from '../utils/Hike';
import { getToastText } from '../utils/Toast';
import { copyLink } from '../actions/Hike';
import { RootView } from '../styles/Screens';
import { withTheme } from '../utils/Themes';

const shareAction = 'CopyToPasteboard';
const baseUrl = 'https://tryhikearound.com/hike';
const latModifier = 0.005;

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
    constructor(props, context) {
        super(props, context);
        const { navigation, route, t } = this.props;
        const { hike } = route.params;

        this.state = {
            id: hike.id,
            name: hike.name,
            toastText: '',
        };

        this.hikeActionSheet = hikeActionSheet.bind(this, t);

        navigation.setOptions({
            title: hike.name || 'Hike',
            headerRight: () => <Overflow onPress={this.hikeActionSheet} />,
        });
    }

    async componentDidMount() {
        await this.initializeMap();
    }

    componentDidUpdate(prevProps) {
        const { action, t } = this.props;
        const { name } = this.state;

        if (prevProps.action !== action) {
            const toastText = getToastText(action, t, { name });
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
        const coordinateCount = hikeData.gpx.trk[0].trkseg[0].trkpt.length;
        const coordinates = [];

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const coordinate = hikeData.gpx.trk[0].trkseg[0].trkpt[i].$;
            coordinates.push({
                latitude: parseFloat(coordinate.lat),
                longitude: parseFloat(coordinate.lon),
            });
        }

        this.setState({ coordinates });
    }

    render() {
        const { coordinates, region, toastText } = this.state;
        const { route } = this.props;
        const { hike } = route.params;
        const scrollRef = React.createRef();

        return (
            <RootView>
                <Toast text={toastText} />
                <HikeBody
                    hike={hike}
                    coordinates={coordinates}
                    region={region}
                    scrollRef={scrollRef}
                />
                <MapModal
                    mapRef={(ref) => {
                        this.mapView = ref;
                    }}
                    coordinates={coordinates}
                    region={region}
                    animationType='push'
                    modalAction='showMap'
                    hideStatusBar
                />
            </RootView>
        );
    }
}

HikeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(HikeScreen)));
