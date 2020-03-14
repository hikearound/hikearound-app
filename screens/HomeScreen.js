import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Linking } from 'expo';
import { RefreshControl, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { CommonActions } from '@react-navigation/native';
import { FeedList } from '../components/Index';
import { getFeedHikeCount, openHikeScreen } from '../utils/Hike';
import { cacheHikeImage } from '../utils/Image';
import HomeLoadingState from '../components/loading/Home';
import { getUserProfileData } from '../utils/User';
import { initializeUserData, initializeAvatar } from '../actions/User';
import { timings } from '../constants/Index';
import { pageFeed, sortHikes } from '../utils/Feed';
import { getHikeIdFromUrl } from '../utils/Link';
import { feedActionSheet } from '../components/action_sheets/Feed';
import { RootView } from '../styles/Screens';
import { getBadgeNumber, clearBadge } from '../utils/Notifications';
import { withTheme } from '../hooks/Themes';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    dispatchAvatar: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        avatar: state.userReducer.avatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
        dispatchAvatar: (avatarUri) => dispatch(initializeAvatar(avatarUri)),
    };
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        StatusBar.setBarStyle('light-content', true);

        this.state = {
            feedHikeCount: 0,
            loading: false,
            firstLoad: true,
            sortDirection: 'desc',
            pageSize: 5,
        };

        this.state.hikes = [];
        this.state.data = {};

        this.feedActionSheet = feedActionSheet.bind(this);

        navigation.dispatch(
            CommonActions.setParams({
                showActionSheet: this.feedActionSheet,
            }),
        );
    }

    componentDidMount() {
        const {
            navigation,
            dispatchUserData,
            dispatchAvatar,
            avatar,
        } = this.props;

        this.checkInitialUrl(navigation);
        this.addUrlListener(navigation);
        this.getHikeFeedData();
        this.setFeedHikeCount();
        this.handleAppBadge();

        getUserProfileData(dispatchUserData, dispatchAvatar, avatar);
    }

    componentWillUnmount() {
        const { navigation } = this.props;
        this.removeUrlListener(navigation);
    }

    handleAppBadge = async () => {
        const badgeNumber = await getBadgeNumber();
        if (badgeNumber > 0) {
            clearBadge();
        }
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
        const hikes = {};
        const { sortDirection, pageSize } = this.state;

        const { data, cursor } = await pageFeed(
            pageSize,
            lastKey,
            sortDirection,
        );

        this.lastKnownKey = cursor;

        /* eslint-disable-next-line */
        for (const hike of data) {
            const imageUrl = await cacheHikeImage(hike);
            hike.coverPhoto = imageUrl;
            hikes[hike.key] = hike;
        }

        if (hikes) {
            this.setState({ firstLoad: false });
        }

        this.addhikes(hikes);
        this.setState({ loading: false });
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

    checkInitialUrl = async (navigation) => {
        const url = await Linking.getInitialURL();
        if (url) {
            this.handleOpenURL(url, navigation);
        }
    };

    addUrlListener = (navigation) => {
        Linking.addEventListener('url', (event) =>
            this.handleOpenURL(event.url, navigation),
        );
    };

    removeUrlListener = (navigation) => {
        Linking.removeEventListener('url', (event) =>
            this.handleOpenURL(event.url, navigation),
        );
    };

    handleOpenURL = (url, navigation) => {
        const hid = getHikeIdFromUrl(url);
        if (hid && navigation) {
            openHikeScreen(hid, navigation);
        }
    };

    render() {
        const { loading, hikes, firstLoad } = this.state;
        const { theme } = this.props;
        const feedRef = React.createRef();

        return (
            <ThemeProvider theme={theme.colors}>
                <RootView>
                    {firstLoad && <HomeLoadingState />}
                    {!firstLoad && (
                        <FeedList
                            refreshControl={
                                <RefreshControl
                                    tintColor={theme.colors.refreshControlTint}
                                    refreshing={loading}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            feedRef={feedRef}
                            onEndReached={this.onEndReached}
                            hikes={hikes}
                        />
                    )}
                </RootView>
            </ThemeProvider>
        );
    }
}

HomeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(HomeScreen));
