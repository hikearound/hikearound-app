import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import styled from 'styled-components';
import { colors, timings } from '../constants/Index';
import AppNavigator from '../navigators/AppNavigator';
import { cacheImages } from '../utils/Image';
import { initializeLocalization } from '../utils/Localization';
import { initializeGeolocation } from '../utils/Location';
import { localImages } from '../constants/Images';
import { withTheme } from '../utils/Themes';
import { auth } from '../lib/Fire';
import { initializeAuthSubscription } from '../actions/Auth';

initializeLocalization();
initializeGeolocation();

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchAuthSubscription: (user) =>
            dispatch(initializeAuthSubscription(user)),
    };
}

const propTypes = {
    dispatchAuthSubscription: PropTypes.func.isRequired,
};

class Splash extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoadingComplete: false,
            splashAnimation: new Animated.Value(0),
            splashAnimationComplete: false,
        };
    }

    async componentDidMount() {
        try {
            await SplashScreen.preventAutoHideAsync();
        } catch (e) {
            this.getAuthSubscription();
        }
        this.loadAsync();
    }

    loadAsync = async () => {
        await this.loadResourcesAsync();
    };

    loadResourcesAsync = async () => {
        await this.getAuthSubscription();
        await cacheImages(localImages);
    };

    getAuthSubscription = async () => {
        const { dispatchAuthSubscription } = this.props;

        await auth.onAuthStateChanged(async (user) => {
            await dispatchAuthSubscription(user);
            this.handleFinishLoading();
        });
    };

    handleFinishLoading = () => {
        this.timeout = setTimeout(async () => {
            this.setState({ isLoadingComplete: true });
        }, timings.regular);
    };

    maybeRenderTransition = () => {
        const { splashAnimationComplete, splashAnimation } = this.state;

        if (splashAnimationComplete) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.purple,
                    opacity: splashAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                }}
            >
                <Animated.Image
                    source={require('../assets/splash.png')}
                    style={{
                        width: undefined,
                        height: undefined,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        resizeMode: 'contain',
                    }}
                    onLoadEnd={this.animateOut}
                />
            </Animated.View>
        );
    };

    animateOut = () => {
        const { splashAnimation } = this.state;

        SplashScreen.hideAsync();
        Animated.timing(splashAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            this.setState({ splashAnimationComplete: true });
        });
    };

    render() {
        const { isLoadingComplete } = this.state;

        return (
            <View>
                <StatusBar barStyle='light-content' />
                <AppNavigator />
                {isLoadingComplete && this.maybeRenderTransition()}
            </View>
        );
    }
}

Splash.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Splash));

const View = styled.View`
    flex: 1;
    background-color: ${colors.purple};
`;
