import React from 'react';
import styled from 'styled-components';
import { LayoutAnimation, RefreshControl } from 'react-native';
import firebase from 'firebase';
import Fire from '../Fire';
import { Logo, FeedList, Sort } from '../components/Index';
import { colors } from '../constants/Index';

/* eslint-disable no-restricted-syntax */

const PAGE_SIZE = 5;

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <Logo />,
            headerBackTitle: null,
            headerRight: <Sort sortType={params.sortType} />,
        };
    }

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
    }

    setFeedHikeCount = () => {
        firebase.firestore().collection('hikes').get().then((snap) => {
            this.setState({ feedHikeCount: snap.size });
        });
    }

    addhikes = (hikes) => {
        this.setState((previousState) => {
            const data = {
                ...previousState.data,
                ...hikes,
            };
            return {
                data,
                hikes: Object.values(data).sort(
                    (a, b) => a.timestamp < b.timestamp
                ),
            };
        });
    }

    makeRemoteRequest = async (lastKey) => {
        const hikes = {};
        const {
            data,
            cursor,
        } = await Fire.shared.getPaged({
            size: PAGE_SIZE,
            start: lastKey,
        });

        this.lastKnownKey = cursor;
        for (const hike of data) {
            hikes[hike.key] = hike;
        }

        this.addhikes(hikes);
        this.setState({ loading: false });
    }

    onRefresh = async () => {
        await this.setState({ loading: true });
        this.timeout = setTimeout(() => {
            this.makeRemoteRequest();
        }, 1000);
    }

    onEndReached = () => {
        const { hikes, feedHikeCount } = this.state;
        if (hikes.length < feedHikeCount) {
            this.makeRemoteRequest(this.lastKnownKey);
        }
    }

    render() {
        const { loading, hikes } = this.state;
        LayoutAnimation.easeInEaseOut();
        return (
            <RootView>
                <FeedList
                    refreshControl={(
                        <RefreshControl
                            tintColor='#E4E4E4'
                            refreshing={loading}
                            onRefresh={this.onRefresh}
                        />
                    )}
                    onEndReached={this.onEndReached}
                    hikes={hikes}
                />
            </RootView>
        );
    }
}

export default HomeScreen;

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;
