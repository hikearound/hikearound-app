import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import HomeLoadingState from '../components/loading/Home';
import HomeActions from '../components/HomeActions';
import FeedList from '../components/FeedList';
import Promotion from '../components/Promotion';
import FeedRefreshControl from '../components/FeedRefreshControl';
import HomeEmptyState from '../components/empty/HomeEmptyState';
import {
    initializeUserData,
    initializeAvatar,
    updateUserPosition,
} from '../actions/User';
import { initializeNotificationData } from '../actions/Notification';
import { initializeMapData } from '../actions/Map';
import { initializeProfileData } from '../actions/Profile';
import { timings } from '../constants/Index';
import { defaultState } from '../constants/states/Home';
import { RootView } from '../styles/Screens';
import { getUserData, getProfileData } from '../utils/User';
import { withTheme, SetBarStyle } from '../utils/Themes';
import { getMapData } from '../utils/Map';
import { getNotificationData } from '../utils/Notifications';
import {
    getPosition,
    getNearestCity,
    positionKnown,
    watchPositionAsync,
} from '../utils/Location';
import { getPromotionStatus } from '../utils/Promotions';
import { queryHikes, sortHikes, cacheFeedImages } from '../utils/Feed';
import { queryReviews } from '../utils/Review';
import { getSortDirection } from '../utils/Filter';
import {
    checkInitialUrl,
    addUrlListener,
    removeUrlListener,
    addNotificationResponseReceivedListener,
    removeNotificationListener,
    addNotificationReceivedListener,
} from '../utils/Link';
import FilterModal from '../components/modal/FilterModal';
import Logo from '../components/header/Logo';

const propTypes = {
    dispatchUserPosition: PropTypes.func.isRequired,
    dispatchUserData: PropTypes.func.isRequired,
    dispatchProfileData: PropTypes.func.isRequired,
    dispatchNotificationData: PropTypes.func.isRequired,
    dispatchMapData: PropTypes.func.isRequired,
    dispatchAvatar: PropTypes.func.isRequired,
    filterParams: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        filterParams: state.feedReducer.filterParams,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserPosition: (currentPosition) =>
            dispatch(updateUserPosition(currentPosition)),
        dispatchNotificationData: (notificationData) =>
            dispatch(initializeNotificationData(notificationData)),
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
        dispatchProfileData: (profileData) =>
            dispatch(initializeProfileData(profileData)),
        dispatchMapData: (mapData) => dispatch(initializeMapData(mapData)),
        dispatchAvatar: (avatarUri) => dispatch(initializeAvatar(avatarUri)),
    };
}

const scrollRef = React.createRef();
const notificationResponseReceivedRef = React.createRef();
const notificationReceivedRef = React.createRef();

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = defaultState;
        this.mapRef = React.createRef();

        navigation.setOptions({
            headerTitle: () => <Logo scrollRef={scrollRef} />,
            headerRight: () => <HomeActions />,
        });
    }

    async componentDidMount() {
        const {
            navigation,
            dispatchUserPosition,
            dispatchUserData,
            dispatchNotificationData,
            dispatchProfileData,
            dispatchAvatar,
            dispatchMapData,
        } = this.props;

        this.setFirstLoad();
        this.addListeners();

        await this.getAndSetPosition();
        await this.getAndSetData();

        await watchPositionAsync(dispatchUserPosition);
        await getUserData(dispatchUserData, dispatchAvatar);
        await getProfileData(dispatchProfileData);
        await getMapData(dispatchMapData);
        await getNotificationData(dispatchNotificationData);

        await this.getAndSetPromotions();

        checkInitialUrl(navigation);
    }

    componentDidUpdate(prevProps) {
        const { filterParams } = this.props;

        if (prevProps.filterParams !== filterParams) {
            this.filterFeed();
        }
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners = () => {
        const { navigation, dispatchUserData, dispatchAvatar, t } = this.props;

        addUrlListener(navigation);
        addNotificationReceivedListener(
            dispatchUserData,
            dispatchAvatar,
            notificationReceivedRef,
        );
        addNotificationResponseReceivedListener(
            navigation,
            notificationResponseReceivedRef,
            t,
        );
    };

    removeListeners = () => {
        const { navigation } = this.props;

        removeUrlListener(navigation);
        removeNotificationListener(notificationReceivedRef);
        removeNotificationListener(notificationResponseReceivedRef);
    };

    getAndSetPromotions = async () => {
        const promotion = await getPromotionStatus('welcome');
        this.setState({ promotion });
    };

    setFirstLoad = () => {
        this.setState({ firstLoad: true });
    };

    getNearbyHikes = async (lastKey) => {
        const {
            sortDirection,
            distance,
            querySize,
            queryType,
            lastKnownPosition,
        } = this.state;
        const { filterParams } = this.props;

        const { data, cursor } = await queryHikes(
            querySize,
            queryType,
            lastKey,
            lastKnownPosition,
            sortDirection,
            distance,
            filterParams,
        );

        this.lastKnownKey = cursor;
        await cacheFeedImages(data);

        this.addhikes(data);
        this.maybeToggleFirstLoad();

        this.setState({ loading: false });
    };

    getNearbyReviews = async () => {
        const {
            sortDirection,
            distance,
            querySize,
            lastKnownPosition,
        } = this.state;
        const { t } = this.props;

        const { data } = await queryReviews(
            t,
            querySize,
            lastKnownPosition,
            sortDirection,
            distance,
        );

        this.setState({ reviews: data });
    };

    maybeToggleFirstLoad = () => {
        const { lastKnownPosition } = this.state;

        if (lastKnownPosition.coords) {
            this.setState({ firstLoad: false });
        }
    };

    addhikes = async (hikes) => {
        const { sortDirection, firstLoad } = this.state;

        this.setState((previousState) => {
            let data = {};

            if (!firstLoad) {
                data = previousState.data;
            }

            const hikeData = sortHikes(data, hikes, sortDirection);

            return {
                data: hikeData.data,
                hikes: hikeData.sortedHikes,
            };
        });
    };

    onRefresh = async () => {
        await this.setState({ loading: true });

        this.timeout = setTimeout(() => {
            this.getNearbyHikes();
        }, timings.medium);
    };

    onEndReached = () => {
        this.getNearbyHikes(this.lastKnownKey);
    };

    getAndSetPosition = async () => {
        const lastKnownPosition = await getPosition('lastKnown');
        await this.setState({ lastKnownPosition });
    };

    getAndSetData = async () => {
        const { lastKnownPosition } = this.state;

        if (positionKnown(lastKnownPosition)) {
            this.queryFeedData();
        } else {
            this.setState({ firstLoad: false });
        }
    };

    queryFeedData = async () => {
        await this.getAndSetCity();
        await this.getNearbyReviews();
        await this.getNearbyHikes();
    };

    getAndSetCity = async () => {
        const { lastKnownPosition } = this.state;
        const city = await getNearestCity(lastKnownPosition.coords);

        this.setState({ city });
    };

    shouldShowEmptyState = () => {
        const { hikes } = this.state;
        return hikes.length === 0;
    };

    filterFeed = async () => {
        const { filterParams } = this.props;
        const sortDirection = getSortDirection(filterParams);

        await this.getAndSetPromotions();

        await this.setState({
            sortDirection,
            hikes: [],
            firstLoad: true,
        });

        this.onRefresh();
    };

    renderHome = () => {
        const {
            hikes,
            reviews,
            firstLoad,
            loading,
            city,
            lastKnownPosition,
        } = this.state;
        const showEmptyState = this.shouldShowEmptyState();

        if (firstLoad) {
            return <HomeLoadingState />;
        }

        if (showEmptyState) {
            return <HomeEmptyState city={city} />;
        }

        return (
            <FeedList
                refreshControl={
                    <FeedRefreshControl
                        refreshing={loading}
                        onRefresh={this.onRefresh}
                    />
                }
                scrollRef={scrollRef}
                onEndReached={this.onEndReached}
                hikes={hikes}
                reviews={reviews}
                city={city}
                lastKnownPosition={lastKnownPosition}
            />
        );
    };

    maybeRenderPromotion = () => {
        const { firstLoad, promotion } = this.state;
        return !firstLoad && promotion.shouldShow && <Promotion />;
    };

    renderOther = () => (
        <>
            <SetBarStyle barStyle='light-content' />
            <FilterModal />
        </>
    );

    render() {
        return (
            <RootView>
                {this.renderOther()}
                {this.maybeRenderPromotion()}
                {this.renderHome()}
            </RootView>
        );
    }
}

HomeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(HomeScreen)));
