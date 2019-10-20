import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RefreshControl, Image } from 'react-native';
import { ThemeContext } from 'react-navigation';
import Fire from '../Fire';
import { Logo, FeedList, Sort } from '../components/Index';
import { themes } from '../constants/Themes';
import { getFeedHikeCount, getHikeImage } from '../utils/Hike';
import HomeLoadingState from '../components/loading/Home';
import { getAvatarUri, getUserData } from '../utils/User';
import { initializeUserData, initializeAvatar } from '../actions/User';

const PAGE_SIZE = 5;

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    dispatchAvatar: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
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

        if (Fire.shared.uid) {
            this.makeRemoteRequest();
            this.setFeedHikeCount();
            this.getUserProfileData();
        }

        navigation.setParams({
            sortType,
        });
    }

    getUserProfileData = async () => {
        const { dispatchUserData, dispatchAvatar } = this.props;

        const avatarUri = await getAvatarUri();
        const userData = await getUserData();

        dispatchUserData(userData.data());
        if (avatarUri) {
            dispatchAvatar(avatarUri);
        }
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
        const { data, cursor } = await Fire.shared.getPaged({
            size: PAGE_SIZE,
            start: lastKey,
        });

        /* eslint-disable no-restricted-syntax */
        this.lastKnownKey = cursor;

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
                Image.prefetch(imageUrl);
            }
        }
        return imageUrl;
    };

    onRefresh = async () => {
        await this.setState({ loading: true });
        this.timeout = setTimeout(() => {
            this.makeRemoteRequest();
        }, 1000);
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
