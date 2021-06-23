import React from 'react';
import styled from 'styled-components';
import { Animated, Easing } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LandingButton } from '@components/Index';
import { spacing } from '@constants/Index';
import { RootView } from '@styles/Screens';
import { withTheme } from '@utils/Themes';
import { landingBgDefault, landingBgDark } from '@constants/Images';

const propTypes = {
    toValue: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.func,
    useNativeDriver: PropTypes.bool,
};

const defaultProps = {
    toValue: -500,
    duration: 60000,
    easing: Easing.linear,
    useNativeDriver: false,
};

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

    async componentDidMount() {
        const { toValue, duration, easing, useNativeDriver } = this.props;
        const { left } = this.state;

        Animated.loop(
            Animated.sequence([
                Animated.timing(left, {
                    toValue,
                    duration,
                    easing,
                    useNativeDriver,
                }),
            ]),
        ).start();

        this.setBackgroundImage();
    }

    setBackgroundImage = () => {
        const { theme } = this.props;
        let bgImage = landingBgDefault;

        if (theme.dark) {
            bgImage = landingBgDark;
        }

        this.setState({ bgImage });
    };

    render() {
        const { left, bgImage } = this.state;
        const { navigation, t } = this.props;

        return (
            <RootView>
                <AnimatedBackgroundWrapper style={{ left }}>
                    <LandingBackground source={bgImage} />
                </AnimatedBackgroundWrapper>
                <ButtonWrapper>
                    <LandingButton
                        primary
                        text={t('label.nav.createAccount')}
                        action={() => {
                            navigation.push('CreateAccount');
                        }}
                    />
                    <LandingButton
                        text={t('label.nav.signIn')}
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
        );
    }
}

LandingScreen.defaultProps = defaultProps;
LandingScreen.propTypes = propTypes;

export default withTranslation()(withTheme(LandingScreen));

const BackgroundWrapper = styled.View`
    height: 100%;
    width: 500%;
    opacity: 0.7;
`;

const LandingBackground = styled.ImageBackground`
    height: 100%;
`;

const AnimatedBackgroundWrapper =
    Animated.createAnimatedComponent(BackgroundWrapper);

const ButtonWrapper = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
`;
