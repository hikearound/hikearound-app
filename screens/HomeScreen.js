import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LayoutAnimation, RefreshControl } from 'react-native';
import Fire from '../Fire';
import { Logo, List, Sort } from '../components/Index';
import { colors } from '../constants/Index';

/* eslint-disable no-restricted-syntax */

const PAGE_SIZE = 5;

function mapStateToProps(state) {
    return {
        action: state.action,
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
    }

    state = {
        sortType: 'desc',
        loading: false,
        posts: [],
        data: {},
    };

    componentDidMount() {
        const { navigation } = this.props;
        const { sortType } = this.state;
        if (Fire.shared.uid) {
            this.makeRemoteRequest();
        }
        navigation.setParams({
            sortType,
        });
    }

    addPosts = (posts) => {
        this.setState((previousState) => {
            const data = {
                ...previousState.data,
                ...posts,
            };
            return {
                data,
                posts: Object.values(data).sort(
                    (a, b) => a.timestamp < b.timestamp
                ),
            };
        });
    };

    makeRemoteRequest = async (lastKey) => {
        const { loading } = this.state;
        if (loading) {
            return;
        }
        this.setState({ loading: true });

        const { data, cursor } = await Fire.shared.getPaged({
            size: PAGE_SIZE,
            start: lastKey,
        });

        this.lastKnownKey = cursor;
        const posts = {};
        for (const child of data) {
            posts[child.key] = child;
        }
        this.addPosts(posts);
        this.setState({ loading: false });
    };

    onRefresh = () => {
        this.makeRemoteRequest();
    }

    onEndReached = () => {
        this.makeRemoteRequest(this.lastKnownKey);
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        const { loading, posts } = this.state;
        return (
            <RootView>
                <List
                    refreshControl={(
                        <RefreshControl
                            tintColor='#E4E4E4'
                            refreshing={loading}
                            onRefresh={this.onRefresh}
                        />
                    )}
                    onPressFooter={this.onEndReached}
                    data={posts}
                />
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
)(HomeScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;
