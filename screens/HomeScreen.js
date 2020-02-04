import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Linking } from 'expo';
import { RefreshControl } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { ThemeProvider } from 'styled-components';
import { Logo, FeedList, Sort } from '../components/Index';
import { themes } from '../constants/Themes';
import { getFeedHikeCount, openHikeScreen } from '../utils/Hike';
import { cacheHikeImage } from '../utils/Image';
import HomeLoadingState from '../components/loading/Home';
import { getUserProfileData } from '../utils/User';
import { initializeUserData, initializeAvatar } from '../actions/User';
import { timings } from '../constants/Index';
import { pageFeed } from '../utils/Feed';
import { getHikeIdFromUrl } from '../utils/Link';
import { feedActionSheet } from '../components/action_sheets/Feed';
import { RootView } from '../styles/Screens';

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
    static navigationOptions = ({ navigation, navigationOptions, theme }) => {
        const { headerStyle } = navigationOptions;

        headerStyle.backgroundColor = themes[theme].headerStyle;

        return {
            headerTitle: () => <Logo />,
            headerRight: () => <Sort navigation={navigation} />,
            animationEnabled: false,
            headerStyle,
        };
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;

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

        navigation.setParams({
            showActionSheet: this.feedActionSheet,
        });
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

        getUserProfileData(dispatchUserData, dispatchAvatar, avatar);
    }

    componentWillUnmount() {
        const { navigation } = this.props;
        this.removeUrlListener(navigation);
    }

    setFeedHikeCount = async () => {
        const feedHikeCount = await getFeedHikeCount();
        this.setState({ feedHikeCount });
    };

    sortFeed = async (sortDirection) => {
        await this.setState({
            sortDirection,
            hikes: [],
        });
        this.getHikeFeedData();
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

    addhikes = (hikes) => {
        const { sortDirection } = this.state;

        this.setState((previousState) => {
            const data = {
                ...previousState.data,
                ...hikes,
            };

            let sortedHikes = Object.values(data).sort(
                (a, b) => a.timestamp < b.timestamp,
            );

            if (sortDirection === 'asc') {
                sortedHikes = Object.values(data).sort(
                    (a, b) => a.timestamp > b.timestamp,
                );
            }

            return {
                data,
                hikes: sortedHikes,
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

    static contextType = ThemeContext;

    render() {
        const { loading, hikes, firstLoad } = this.state;
        const feedRef = React.createRef();
        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
                <RootView>
                    {firstLoad && <HomeLoadingState />}
                    {!firstLoad && (
                        <FeedList
                            refreshControl={
                                <RefreshControl
                                    tintColor={theme.refreshControlTint}
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
)(HomeScreen);
