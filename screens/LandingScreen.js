import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { ActionButton, Logo } from '../components/Index'
import { spacing, colors } from '../constants/Index'

class LandingScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <Logo/>,
        headerBackTitle: null,
    };

    render() {
        return (
            <RootView>
                <SafeAreaView>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => {
                            this.props.navigation.push('CreateAccount');
                        }}>
                        <ActionButton
                            primary
                            text={'Create Account'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => {
                            this.props.navigation.push('SignIn');
                        }}>
                        <ActionButton
                            text={'Sign In'}
                            margin={spacing.small + 'px 20px 0 20px'}
                        />
                    </TouchableOpacity>
                </SafeAreaView>
            </RootView>
        );
    }
}

export default LandingScreen;

const RootView = styled.View`
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
`;
