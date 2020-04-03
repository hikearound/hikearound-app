import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Animated, Easing } from 'react-native';
import { LandingButton } from '../components/Index';
import { spacing } from '../constants/Index';
import { RootView } from '../styles/Screens';
import { withTheme } from '../utils/Themes';

const backgroundImageDefault = require('../assets/default/landing-bg.png');
const backgroundImageDark = require('../assets/dark/landing-bg.png');

class LandingScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        navigation.setOptions({
            headerLeft: () => null,
        });

        this.state = {
            left: new Animated.Value(0),
        };
    }

    componentDidMount() {
        const { left } = this.state;
        Animated.loop(
            Animated.sequence([
                Animated.timing(left, {
                    toValue: -500,
                    duration: 60000,
                    easing: Easing.linear,
                }),
            ]),
        ).start();

        this.setBackgroundImage();
    }

    setBackgroundImage = () => {
        const { theme } = this.props;
        let backgroundImage = backgroundImageDefault;

        if (theme.dark) {
            backgroundImage = backgroundImageDark;
        }

        this.setState({ backgroundImage });
    };

    render() {
        const { left, backgroundImage } = this.state;
        const { navigation, theme } = this.props;

        return (
            <ThemeProvider theme={theme.colors}>
                <RootView>
                    <AnimatedBackgroundWrapper style={{ left }}>
                        <LandingBackground source={backgroundImage} />
                    </AnimatedBackgroundWrapper>
                    <ButtonWrapper>
                        <LandingButton
                            primary
                            text='Create Account'
                            action={() => {
                                navigation.push('CreateAccount');
                            }}
                        />
                        <LandingButton
                            text='Sign In'
                            margin={
                                `${spacing.tiny}px ${spacing.medium}px ` +
                                `0 ${spacing.medium}px`
                            }
                            action={() => {
                                navigation.push('SignIn');
                            }}
                        />
                    </ButtonWrapper>
                </RootView>
            </ThemeProvider>
        );
    }
}

export default withTheme(LandingScreen);

const BackgroundWrapper = styled.View`
    height: 100%;
    width: 500%;
    opacity: 0.7;
`;

const LandingBackground = styled.ImageBackground`
    height: 100%;
`;

const AnimatedBackgroundWrapper = Animated.createAnimatedComponent(
    BackgroundWrapper,
);

const ButtonWrapper = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
`;
