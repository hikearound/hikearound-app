import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import SafeAreaView from 'react-native-safe-area-view';
import ActionButton from '../components/ActionButton';
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';

class LandingScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: colors.purple,
            height: parseInt(spacing.header),
        },
        headerTintColor: colors.white,
        headerTitle: <HeaderLogo/>,
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content', true);
    }

    componentDidMount() {
        // do something
    }

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
                            margin={'20px'}
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
    bottom: 0;
    left: 0;
    right: 0;
`;
