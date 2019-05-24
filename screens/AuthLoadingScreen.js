import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import styled from 'styled-components';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content', true);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        var uid = await AsyncStorage.getItem('uid');
        // uid = false;
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: uid ? 'Home' : 'Landing'
            })],
        }));
    };

    render() {
        return (
            <RootView>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </RootView>
        );
    }
}

export default AuthLoadingScreen;

const RootView = styled.View`
    flex: 1;
`;
