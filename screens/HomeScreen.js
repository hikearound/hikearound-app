import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LayoutAnimation, RefreshControl } from 'react-native';
import firebase from 'firebase'
import Fire from '../Fire';
import { Logo, List, HeaderSort } from '../components/Index'
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

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
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitle: <Logo/>,
            headerBackTitle: null,
            headerRight: <HeaderSort sortType={params.sortType}/>,
        };
    }

    state = {
        sortType: 'desc',
        loading: false,
        posts: [],
        data: {},
    };

    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser;
        // console.log(user.uid);
    }

    componentDidMount() {
        if (Fire.shared.uid) {
            this.makeRemoteRequest();
        }
        this.props.navigation.setParams({
            sortType: this.state.sortType,
        });
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

const Message = styled.Text`
    margin: 20px;
    color: #b8bece;
    font-size: 15px;
    font-weight: ${fontWeights.medium};
`;
