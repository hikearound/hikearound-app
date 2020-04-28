import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native';
import HomeLoadingState from '../components/loading/Home';
import MapScreen from './MapScreen';
import HomeActions from '../components/HomeActions';
import FeedList from '../components/FeedList';
import { feedActionSheet } from '../components/action_sheets/Feed';
import { initializeUserData, initializeAvatar } from '../actions/User';
import toggleScreen from '../actions/Home';
import { timings } from '../constants/Index';
import { defaultState } from '../constants/states/Home';
import { RootView } from '../styles/Screens';
import { getUserProfileData } from '../utils/User';
import { getFeedHikeCount } from '../utils/Hike';
import { handleAppBadge } from '../utils/Notifications';
import { withTheme } from '../utils/Themes';
import { getCurrentPosition } from '../utils/Location';
import { pageFeed, sortHikes, buildHikeData, setFeed } from '../utils/Feed';
import {
    checkInitialUrl,
    addUrlListener,
    removeUrlListener,
} from '../utils/Link';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    dispatchAvatar: PropTypes.func.isRequired,
    dispatchScreenType: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
        dispatchAvatar: (avatarUri) => dispatch(initializeAvatar(avatarUri)),
        dispatchScreenType: (screenType) => dispatch(toggleScreen(screenType)),
    };
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = defaultState;

        this.feedActionSheet = feedActionSheet.bind(this);
        navigation.setOptions({
            headerRight: () => (
                <HomeActions
                    feedAction={this.feedActionSheet}
                    toggleAction={this.toggleScreenType}
                />
            ),
        });
    }

    componentDidMount() {
        const { navigation, dispatchUserData, dispatchAvatar } = this.props;

        this.setFirstLoad();
        this.getHikeFeedData();
        this.setFeedHikeCount();
        this.getAndSetPosition();

        handleAppBadge();
        checkInitialUrl(navigation);
        addUrlListener(navigation);
        getUserProfileData(dispatchUserData, dispatchAvatar);
    }

    componentWillUnmount() {
        const { navigation } = this.props;
        removeUrlListener(navigation);
    }

    setFirstLoad = () => {
        this.setState({ firstLoad: true });
    };

    setFeedHikeCount = async () => {
        const feedHikeCount = await getFeedHikeCount();
        this.setState({ feedHikeCount });
    };

    sortFeed = async (sortDirection) => {
        await this.setState({
            sortDirection,
            hikes: [],
            firstLoad: true,
        });

        this.onRefresh();
    };

    getHikeFeedData = async (lastKey) => {
        const { sortDirection, pageSize } = this.state;
        const { data, cursor } = await pageFeed(
            pageSize,
            lastKey,
            sortDirection,
        );

        this.lastKnownKey = cursor;
        const hikes = await buildHikeData(data);

        this.addhikes(hikes);
        this.setState({ loading: false, firstLoad: false });
    };

    addhikes = async (hikes) => {
        const { sortDirection } = this.state;

        this.setState((previousState) => {
            const hikeData = sortHikes(previousState, hikes, sortDirection);

            return {
                data: hikeData.data,
                hikes: hikeData.sortedHikes,
            };
        });
    };

    onRefresh = async () => {
        await this.setState({ loading: true });

        this.timeout = setTimeout(() => {
            this.getHikeFeedData();
        }, timings.medium);
    };

    onEndReached = () => {
        const { hikes, feedHikeCount } = this.state;

        if (hikes.length < feedHikeCount) {
            this.getHikeFeedData(this.lastKnownKey);
        }
    };

    toggleScreenType = () => {
        const { dispatchScreenType } = this.props;
        const { view } = this.state;
        const nextView = setFeed(view);

        this.setState({ view: nextView });
        dispatchScreenType(nextView);
    };

    getAndSetPosition = async () => {
        const position = await getCurrentPosition();
        this.setState({ position });
    };

    renderHome = () => {
        const { loading, hikes, view, position, firstLoad } = this.state;
        const { theme } = this.props;
        const scrollRef = React.createRef();

        if (firstLoad) {
            return <HomeLoadingState />;
        }

        if (view === 'map') {
            return <MapScreen position={position} />;
        }

        return (
            <FeedList
                refreshControl={
                    <RefreshControl
                        tintColor={theme.colors.refreshControlTint}
                        refreshing={loading}
                        onRefresh={this.onRefresh}
                    />
                }
                scrollRef={scrollRef}
                onEndReached={this.onEndReached}
                hikes={hikes}
            />
        );
    };

    render() {
        return <RootView>{this.renderHome()}</RootView>;
    }
}

HomeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(HomeScreen));
