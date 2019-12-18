import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Linking } from 'expo';
import { RefreshControl } from 'react-native';
import { ThemeContext } from 'react-navigation';
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

const pageSize = 5;

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
    static navigationOptions = ({ navigationOptions, theme }) => {
        const { headerStyle } = navigationOptions;

        headerStyle.backgroundColor = themes[theme].headerStyle;

        return {
            headerTitle: <Logo />,
            headerBackTitle: null,
            headerRight: <Sort sortType='desc' />,
            headerStyle,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            hikes: [],
            data: {},
            feedHikeCount: 0,
            loading: false,
            firstLoad: true,
        };
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
        this.makeRemoteRequest();
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

    makeRemoteRequest = async (lastKey) => {
        const hikes = {};
        const { data, cursor } = await pageFeed({
            size: pageSize,
            start: lastKey,
        });

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
        this.setState((previousState) => {
            const data = {
                ...previousState.data,
                ...hikes,
            };
            return {
                data,
                hikes: Object.values(data).sort(
                    (a, b) => a.timestamp < b.timestamp,
                ),
            };
        });
    };

    onRefresh = async () => {
        await this.setState({ loading: true });
        this.timeout = setTimeout(() => {
            this.makeRemoteRequest();
        }, timings.medium);
    };

    onEndReached = () => {
        const { hikes, feedHikeCount } = this.state;
        if (hikes.length < feedHikeCount) {
            this.makeRemoteRequest(this.lastKnownKey);
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
            <RootView theme={theme}>
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
        );
    }
}

HomeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeScreen);

const RootView = styled.View`
    background-color: ${(props) => props.theme.rootBackground};
    overflow: hidden;
`;
