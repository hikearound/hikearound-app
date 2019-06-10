import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    Easing
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { ActionButton, Logo } from '../components/Index'
import { spacing, colors } from '../constants/Index'

class LandingScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <Logo/>,
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            left: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.left, {
                    toValue: -500,
                    duration: 60000,
                    easing: Easing.linear,
                })
            ]),
        ).start()
    }

    render() {
        return (
            <RootView>
                <AnimatedBackgroundWrapper style={{left: this.state.left}}>
                    <LandingBackground
                        source={require('../assets/landing-bg.png')}>
                    </LandingBackground>
                </AnimatedBackgroundWrapper>
                <ButtonWrapper>
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
                </ButtonWrapper>
            </RootView>
        );
    }
}

export default LandingScreen;

const RootView = styled.View`
    flex: 1;
`;

const BackgroundWrapper = styled.View`
    height: 100%;
    width: 500%;
    opacity: 0.5;
`;

const LandingBackground = styled.ImageBackground`
    height: 100%;
`;

const AnimatedBackgroundWrapper = Animated.createAnimatedComponent(
    BackgroundWrapper
);

const ButtonWrapper = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
`;
