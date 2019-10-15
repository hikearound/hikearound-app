import React from 'react';
import styled from 'styled-components';
import { RefreshControl, Image } from 'react-native';
import { ThemeContext } from 'react-navigation';
import Fire from '../Fire';
import { Logo, FeedList, Sort } from '../components/Index';
import { timings } from '../constants/Index';
import { themes } from '../constants/Themes';
import { getFeedHikeCount, getHikeImage } from '../utils/Hike';
import HomeLoadingState from '../components/loading/Home';

const PAGE_SIZE = 5;

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
    }

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
                {firstLoad && <HomeLoadingState />}
            </RootView>
        );
    }
}

export default HomeScreen;

const RootView = styled.View`
    background-color: ${(props) => props.theme.rootBackground};
    overflow: hidden;
`;
