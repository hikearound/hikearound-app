import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Linking } from 'expo';
import { RefreshControl } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { CacheManager } from 'react-native-expo-image-cache';
import { Logo, FeedList, Sort } from '../components/Index';
import { themes } from '../constants/Themes';
import { getFeedHikeCount, getHikeImage, openHikeScreen } from '../utils/Hike';
import HomeLoadingState from '../components/loading/Home';
import { getAvatarUri, getUserData } from '../utils/User';
import { initializeUserData, initializeAvatar } from '../actions/User';
import { timings } from '../constants/Index';
import { pageFeed } from '../utils/Feed';
import { getHikeIdFromUrl } from '../utils/Link';

const PAGE_SIZE = 5;

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
        const { params = {} } = navigation.state;
        const { headerStyle } = navigationOptions;

        headerStyle.backgroundColor = themes[theme].headerStyle;

        return {
            headerTitle: <Logo />,
            headerBackTitle: null,
            headerRight: <Sort sortType={params.sortType} />,
            headerStyle,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            hikes: [],
            data: {},
            feedHikeCount: 0,
            sortType: 'desc',
            loading: false,
            firstLoad: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { sortType } = this.state;

        this.checkInitialUrl();
        this.makeRemoteRequest();
        this.setFeedHikeCount();
        this.getUserProfileData();

        navigation.setParams({
            sortType,
        });
    }

    checkInitialUrl = async () => {
        const { navigation } = this.props;
        const initialUrl = await Linking.getInitialURL();
        const hid = getHikeIdFromUrl(initialUrl);

        if (hid) {
            openHikeScreen(hid, navigation);
        }
    };

    getUserProfileData = async () => {
        const { dispatchUserData, dispatchAvatar, avatar } = this.props;
        let avatarUri = await getAvatarUri();
        const userData = await getUserData();

        dispatchUserData(userData.data());

        if (avatarUri) {
            dispatchAvatar(avatarUri);
        } else {
            avatarUri = avatar;
        }

        this.cacheAvatar(avatarUri);
    };

    cacheAvatar = (uri) => {
        CacheManager.get(uri).getPath();
    };

    setFeedHikeCount = async () => {
        const feedHikeCount = await getFeedHikeCount();
        this.setState({ feedHikeCount });
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

    makeRemoteRequest = async (lastKey) => {
        const hikes = {};
        const { data, cursor } = await pageFeed({
            size: PAGE_SIZE,
            start: lastKey,
        });

        this.lastKnownKey = cursor;

        /* eslint-disable-next-line */
        for (const hike of data) {
            const imageUrl = await this.cacheHikeImage(hike);
            hike.coverPhoto = imageUrl;
            hikes[hike.key] = hike;
        }

        if (hikes) {
            this.setState({
                firstLoad: false,
            });
        }

        this.addhikes(hikes);
        this.setState({ loading: false });
    };

    cacheHikeImage = async (hike) => {
        let imageUrl = null;

        if (hike.images) {
            imageUrl = await getHikeImage(hike.id, 0);
            if (imageUrl) {
                await CacheManager.get(imageUrl).getPath();
            }
        }

        return imageUrl;
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
