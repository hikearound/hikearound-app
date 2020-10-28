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
import { initializeUserData, initializeAvatar } from '../actions/User';
import { initializeMapData } from '../actions/Map';
import { timings } from '../constants/Index';
import { defaultState } from '../constants/states/Home';
import { RootView } from '../styles/Screens';
import { getUserData } from '../utils/User';
import { handleAppBadge } from '../utils/Notifications';
import { withTheme, SetBarStyle } from '../utils/Themes';
import { getMapData } from '../utils/Map';
import { getPosition, getNearestCity, shouldSetCity } from '../utils/Location';
import { getPromotionStatus } from '../utils/Promotions';
import { queryHikes, sortHikes, buildHikeData } from '../utils/Feed';
import { getSortDirection } from '../utils/Filter';
import {
    checkInitialUrl,
    addUrlListener,
    removeUrlListener,
    addNotificationListener,
    removeNotificationListener,
} from '../utils/Link';
import FilterModal from '../components/modal/FilterModal';
import Logo from '../components/header/Logo';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
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
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
        dispatchMapData: (mapData) => dispatch(initializeMapData(mapData)),
        dispatchAvatar: (avatarUri) => dispatch(initializeAvatar(avatarUri)),
    };
}

const scrollRef = React.createRef();
const listenerRef = React.createRef();

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = defaultState;

        navigation.setOptions({
            headerTitle: () => <Logo scrollRef={scrollRef} />,
            headerRight: () => <HomeActions />,
        });
    }

    async componentDidMount() {
        const {
            navigation,
            dispatchUserData,
            dispatchAvatar,
            dispatchMapData,
        } = this.props;

        this.setFirstLoad();
        this.getAndSetPosition();
        this.addListeners();

        await this.getAndSetPromotions();
        await getUserData(dispatchUserData, dispatchAvatar);
        await getMapData(dispatchMapData);

        checkInitialUrl(navigation);
        handleAppBadge();
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
        const { navigation } = this.props;

        addUrlListener(navigation);
        addNotificationListener(navigation, listenerRef);
    };

    removeListeners = () => {
        const { navigation } = this.props;

        removeUrlListener(navigation);
        removeNotificationListener(listenerRef);
    };

    getAndSetPromotions = async () => {
        const promotion = await getPromotionStatus('welcome');
        this.setState({ promotion });
    };

    setFirstLoad = () => {
        this.setState({ firstLoad: true });
    };

    getHikeFeedData = async (lastKey) => {
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
        const hikes = await buildHikeData(data);

        this.addhikes(hikes);
        this.setState({ loading: false, firstLoad: false });
    };

    addhikes = async (hikes) => {
        const { sortDirection, firstLoad } = this.state;

        if (firstLoad) {
            this.setState(() => {
                const hikeData = sortHikes({}, hikes, sortDirection);

                return {
                    data: hikeData.data,
                    hikes: hikeData.sortedHikes,
                };
            });
        } else {
            this.setState((previousState) => {
                const hikeData = sortHikes(previousState, hikes, sortDirection);

                return {
                    data: hikeData.data,
                    hikes: hikeData.sortedHikes,
                };
            });
        }
    };

    onRefresh = async () => {
        await this.setState({ loading: true });

        this.timeout = setTimeout(() => {
            this.getHikeFeedData();
        }, timings.medium);
    };

    onEndReached = () => {
        this.getHikeFeedData(this.lastKnownKey);
    };

    getAndSetPosition = async () => {
        const lastKnownPosition = await getPosition('lastKnown');
        this.setState({ lastKnownPosition });

        if (shouldSetCity(lastKnownPosition)) {
            this.getAndSetCity();
        } else {
            this.setState({ firstLoad: false });
        }
    };

    getAndSetCity = async () => {
        const { lastKnownPosition } = this.state;
        const { coords } = lastKnownPosition;
        const city = await getNearestCity(coords);

        this.setState({ city });
        this.setHikeData();
    };

    setHikeData = () => {
        this.getHikeFeedData();
    };

    shouldShowEmptyState = () => {
        const { hikes } = this.state;
        return hikes.length === 0;
    };

    filterFeed = async () => {
        const { filterParams } = this.props;
        const sortDirection = getSortDirection(filterParams);

        await this.setState({
            sortDirection,
            hikes: [],
            firstLoad: true,
        });

        this.onRefresh();
    };

    renderHome = () => {
        const { hikes, firstLoad, loading, city } = this.state;
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
                city={city}
            />
        );
    };

    maybeRenderPromotion = () => {
        const { firstLoad, promotion } = this.state;
        return !firstLoad && promotion.shouldShow && <Promotion />;
    };

    renderOther = () => {
        return (
            <>
                <SetBarStyle barStyle='light-content' />
                <FilterModal />
            </>
        );
    };

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
