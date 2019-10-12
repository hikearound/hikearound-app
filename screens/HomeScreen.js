import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RefreshControl, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext } from 'react-navigation';
import Fire from '../Fire';
import { Logo, FeedList, Sort } from '../components/Index';
import { colors, timings } from '../constants/Index';
import { getFeedHikeCount } from '../utils/Hike';
import { getAvatarUri, getUserData } from '../utils/User';
import { initializeUserData, initializeAvatar } from '../actions/User';
import HomeLoadingState from '../components/loading/Home';

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
        const style = navigationOptions.headerStyle;

        return {
            headerTitle: <Logo />,
            headerBackTitle: null,
            headerStyle: {
                backgroundColor:
                    theme === 'dark' ? colors.black : colors.purple,
                height: style.height,
                borderBottomWidth: style.borderBottomWidth,
                marginLeft: style.marginLeft,
                marginRight: style.marginRight,
            },
            headerRight: <Sort sortType={params.sortType} />,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            feedHikeCount: 0,
            sortType: 'desc',
            loading: true,
            hikes: [],
            data: {},
            firstLoad: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { sortType } = this.state;

        this.loadingTimeout = setTimeout(() => {
            this.setState({
                firstLoad: false,
            });
        }, timings.long);

        if (Fire.shared.uid) {
            this.makeRemoteRequest();
            this.setFeedHikeCount();
        }

        navigation.setParams({
            sortType,
        });

        this.getUserProfileData();
    }

    getUserProfileData = async () => {
        const { dispatchUserData, dispatchAvatar } = this.props;

        const avatarUri = await getAvatarUri();
        const userData = await getUserData();

        if (typeof avatarUri === 'string') {
            Image.prefetch(avatarUri);
        }

        dispatchUserData(userData.data());
        dispatchAvatar(avatarUri);
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
            hikes[hike.key] = hike;
        }

        this.addhikes(hikes);
        this.setState({ loading: false });
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
        const theme = this.context;

        if (!firstLoad) {
            return (
                <RootView theme={theme}>
                    <FeedList
                        refreshControl={
                            <RefreshControl
                                tintColor={
                                    theme === 'dark'
                                        ? colors.white
                                        : colors.cardGray
                                }
                                refreshing={loading}
                                onRefresh={this.onRefresh}
                            />
                        }
                        feedRef={feedRef}
                        onEndReached={this.onEndReached}
                        hikes={hikes}
                    />
                </RootView>
            );
        }
        if (firstLoad) {
            LayoutAnimation.easeInEaseOut();
            return (
                <RootView theme={theme}>
                    <HomeLoadingState />
                </RootView>
            );
        }
        return null;
    }
}

HomeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeScreen);

const RootView = styled.View`
    background-color: ${(props) =>
        props.theme === 'dark' ? colors.trueBlack : colors.white};
    flex: 1;
    overflow: hidden;
`;
