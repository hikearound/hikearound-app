import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import styled from 'styled-components';
import { colors, timings } from '@constants/Index';
import AppNavigator from '@navigators/AppNavigator';
import { cacheImages } from '@utils/Image';
import { initializeLocalization } from '@utils/Localization';
import { initializeGeolocation } from '@utils/Location';
import { localImages } from '@constants/Images';
import { withTheme } from '@utils/Themes';
import Fire, { auth } from '@lib/Fire';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeAuthSubscription } from '@actions/Auth';
import SplashImage from '@components/SplashImage';

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
    animationDuration: PropTypes.number,
};

const defaultProps = {
    animationDuration: 500,
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

    componentWillUnmount = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = 0;
        }
        
        if (this.unsubscribeAuth) {
            this.unsubscribeAuth();
        }
    };

    loadAsync = async () => {
        await this.loadResourcesAsync();
    };

    loadResourcesAsync = async () => {
        await this.getAuthSubscription();
        await cacheImages(localImages);
    };

    getAuthSubscription = async () => {
        const { dispatchAuthSubscription } = this.props;

        try {
            console.log('Setting up Firebase v9 auth listener with RN persistence...');
            
            // Set up auth state listener using modern v9 auth with persistence
            this.unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
                console.log('Auth state changed - user:', user ? `${user.email} (${user.uid})` : 'null');
                
                // Dispatch the auth state (whether user exists or not)
                await dispatchAuthSubscription(user);
                this.handleFinishLoading();
            });
        } catch (error) {
            console.warn('Error setting up auth subscription:', error);
            // Fallback to no user
            await dispatchAuthSubscription(null);
            this.handleFinishLoading();
        }
    };

    handleFinishLoading = () => {
        this.timer = setTimeout(() => {
            this.setState({ isLoadingComplete: true });
        }, timings.regular);
    };

    maybeRenderTransition = () => {
        const { splashAnimationComplete, splashAnimation } = this.state;

        if (splashAnimationComplete) {
            return null;
        }

        return (
            <SplashImage
                opacity={splashAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                })}
                animateOut={this.animateOut}
            />
        );
    };

    animateOut = () => {
        const { animationDuration } = this.props;
        const { splashAnimation } = this.state;

        SplashScreen.hideAsync();

        Animated.timing(splashAnimation, {
            toValue: 1,
            duration: animationDuration,
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
Splash.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Splash));

const View = styled.View`
    flex: 1;
    background-color: ${colors.purple};
`;
