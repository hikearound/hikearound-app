import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LayoutAnimation, RefreshControl } from 'react-native';
import Logo from '../components/Logo';
import firebase from 'firebase'
import Fire from '../Fire';
import List from '../components/List';
import colors from '../constants/Colors';
import {fontSizes, fontWeights} from '../constants/Fonts';

const PAGE_SIZE = 5;

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <Logo/>,
        headerBackTitle: null,
    };

    state = {
        loading: false,
        posts: [],
        data: {},
    };

    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser;
        // console.log(user.uid);
    }

    componentWillMount() {
        this.props.navigation.setParams({
            scrollToTop: this.scrollToTop,
        });
    }

    componentDidMount() {
        if (Fire.shared.uid) {
            this.makeRemoteRequest();
        }
    }

    scrollToTop = () => {
        this.setState({ scrollToTop: true });
    }

    addPosts = posts => {
        this.setState(previousState => {
            let data = {
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

    makeRemoteRequest = async lastKey => {
        if (this.state.loading) {
            return;
        }
        this.setState({ loading: true });

        const { data, cursor } = await Fire.shared.getPaged({
            size: PAGE_SIZE,
            start: lastKey,
        });

        this.lastKnownKey = cursor;
        let posts = {};
        for (let child of data) {
            posts[child.key] = child;
        }
        this.addPosts(posts);
        this.setState({ loading: false });
    };

    _onRefresh = () => {
        this.makeRemoteRequest();
    }

    onEndReached = () => {
        this.makeRemoteRequest(this.lastKnownKey);
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <RootView>
                <List
                    refreshControl={
                        <RefreshControl
                            tintColor={'#E4E4E4'}
                            refreshing={this.state.loading}
                            onRefresh={this._onRefresh}
                        />
                    }
                    onPressFooter={this.onEndReached}
                    scrollToTop={this.state.scrollToTop}
                    data={this.state.posts}
                />
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;

const Title = styled.Text`
    font-size: 16px;
    color: #b8bece;
    font-weight: ${fontWeights.medium};
    margin-left: 55px;
`;

const SubtitleView = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    margin: 30px 15px 0 15px;
`;

const Subtitle = styled.Text`
    color: #9C9C9C;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 5px;
    text-transform: uppercase;
`;

const Message = styled.Text`
    margin: 20px;
    color: #b8bece;
    font-size: 15px;
    font-weight: ${fontWeights.medium};
`;
