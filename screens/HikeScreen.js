import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Share } from 'react-native';
import { withTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { HikeBody, Overflow, MapModal } from '../components/Index';
import { hikeActionSheet } from '../components/action_sheets/Hike';
import ReviewModal from '../components/modal/ReviewModal';
import FlagModal from '../components/modal/FlagModal';
import { getHikeXmlUrl, parseHikeXml } from '../utils/Hike';
import { copyLink } from '../actions/Hike';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';
import { getDrivingDirections } from '../utils/Map';
import { shareAction, baseUrl, latModifier } from '../constants/Common';
import { truncateText } from '../utils/Text';
import { timings } from '../constants/Index';
import { getToastText } from '../utils/Toast';
import Title from '../components/header/Title';

const propTypes = {
    dispatchCopyLink: PropTypes.func.isRequired,
    selectedHike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
    selectedHike: null,
};

const scrollRef = React.createRef();

function mapStateToProps(state) {
    return {
        action: state.hikeReducer.action,
        selectedHike: state.modalReducer.selectedHike,
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

        const title = truncateText(hike.name, 23);

        this.state = {
            actions: {},
            id: hike.id,
            startingCoordinates: hike.coordinates.starting,
            isLoading: true,
            selectedStars: 0,
        };

        this.hikeActionSheet = hikeActionSheet.bind(this, t);
        this.setSelectedStars = this.setSelectedStars.bind(this);

        navigation.setOptions({
            headerTitle: () => <Title title={title} scrollRef={scrollRef} />,
            headerRight: () => <Overflow onPress={this.hikeActionSheet} />,
        });
    }

    async componentDidMount() {
        setTimeout(async () => {
            await this.initializeMap();
            this.didLoad();
        }, timings.medium);
    }

    setHikeData(hikeData) {
        const { route } = this.props;
        const { hike } = route.params;
        const { lat, lng } = hike.coordinates.center;

        const hikeMetaData = hikeData.gpx.metadata[0].bounds[0].$;
        const { maxlat, minlat, minlon, maxlon } = hikeMetaData;

        const latitudeDelta = maxlat - minlat + latModifier;
        const longitudeDelta = maxlon - minlon;

        const region = {
            latitude: lat,
            longitude: lng,
            latitudeDelta,
            longitudeDelta,
        };

        this.setState({ region });
    }

    didLoad = () => {
        this.setState({ isLoading: false });
        this.setRouteActions();
    };

    setRouteActions = () => {
        const { route } = this.props;
        const { actions } = route.params;

        setTimeout(async () => {
            this.setState({ actions });
        }, timings.medium);
    };

    setSelectedStars = (rating) => {
        this.setState({ selectedStars: rating });
    };

    initializeMap = async () => {
        const { id } = this.state;
        const hikeXmlUrl = await getHikeXmlUrl(id);
        const hikeData = await parseHikeXml(hikeXmlUrl);

        this.setHikeData(hikeData);
        this.plotCoordinates(hikeData);
    };

    getDirections = async () => {
        const { route } = this.props;
        const { hike } = route.params;
        const { lat, lng } = hike.coordinates.starting;

        getDrivingDirections(lat, lng);
    };

    shareHike = async () => {
        const { id } = this.state;
        const { t, dispatchCopyLink } = this.props;

        const url = `${baseUrl}/hike/${id}`;
        const result = await Share.share({ url });

        if (result.action === Share.sharedAction) {
            if (result.activityType.includes(shareAction)) {
                Toast.show({
                    text1: getToastText('copyLink', t, {}),
                    position: 'bottom',
                    type: 'success',
                });
                dispatchCopyLink();
            }
        }
    };

    buildElevationArray = (elevationData) => {
        const elevationArray = [];

        for (let i = 0; i < elevationData.length; i += 1) {
            elevationArray.push(parseFloat(elevationData[i]).toFixed(2));
        }

        this.setState({ elevationArray });
    };

    plotCoordinates(hikeData) {
        const data = hikeData.gpx.trk[0].trkseg[0].trkpt;
        const coordinateCount = data.length;

        const polyCoordinates = [];
        const elevationData = [];

        for (let i = 0, len = coordinateCount; i < len; i += 1) {
            const item = data[i];
            const coordinate = item.$;
            const elevation = item.ele;

            polyCoordinates.push({
                latitude: parseFloat(coordinate.lat),
                longitude: parseFloat(coordinate.lon),
            });

            if (elevation) {
                elevationData.push(elevation[0]);
            }
        }

        this.buildElevationArray(elevationData);
        this.setState({ polyCoordinates });
    }

    render() {
        const {
            polyCoordinates,
            startingCoordinates,
            region,
            isLoading,
            id,
            elevationArray,
            selectedStars,
            actions,
        } = this.state;

        const { route, selectedHike } = this.props;
        const { hike } = route.params;

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                <HikeBody
                    actions={actions}
                    hike={hike}
                    coordinates={polyCoordinates}
                    region={region}
                    scrollRef={scrollRef}
                    isLoading={isLoading}
                    selectedHike={selectedHike}
                    setSelectedStars={this.setSelectedStars}
                />
                {region && elevationArray && (
                    <MapModal
                        mapRef={(ref) => {
                            this.mapView = ref;
                        }}
                        hid={id}
                        selectedHike={selectedHike}
                        coordinates={polyCoordinates}
                        startingCoordinates={startingCoordinates}
                        elevationArray={elevationArray}
                        hike={hike}
                        region={region}
                    />
                )}
                <ReviewModal
                    selectedStars={selectedStars}
                    hike={hike}
                    hid={id}
                />
                <FlagModal />
            </RootView>
        );
    }
}

HikeScreen.propTypes = propTypes;
HikeScreen.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(HikeScreen)));
