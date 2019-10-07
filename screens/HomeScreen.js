import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RefreshControl, Image } from 'react-native';
import { connect } from 'react-redux';
import Fire from '../Fire';
import { Logo, FeedList, Sort } from '../components/Index';
import { colors } from '../constants/Index';
import { getFeedHikeCount } from '../utils/Hike';
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
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <Logo />,
            headerBackTitle: null,
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
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { sortType } = this.state;

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

    render() {
        const { loading, hikes } = this.state;
        const feedRef = React.createRef();

        return (
            <RootView>
                <FeedList
                    refreshControl={
                        <RefreshControl
                            tintColor='#E4E4E4'
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
}

HomeScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;
