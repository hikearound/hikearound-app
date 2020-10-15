import React from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../constants/Index';
import AppNavigator from '../navigators/AppNavigator';
import { cacheImages } from '../utils/Image';
import { initializeLocalization } from '../utils/Localization';
import { initializeGeolocation } from '../utils/Location';
import { localImages } from '../constants/Images';

initializeLocalization();
initializeGeolocation();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.purple,
    },
});

class Splash extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoadingComplete: true,
            splashAnimation: new Animated.Value(0),
            splashAnimationComplete: false,
        };
    }

    async componentDidMount() {
        await SplashScreen.preventAutoHideAsync();
        this.loadAsync();
    }

    loadAsync = async () => {
        await this.loadResourcesAsync();
        this.handleFinishLoading();
    };

    maybeRenderLoadingImage = () => {
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

    loadResourcesAsync = async () => {
        cacheImages(localImages);
    };

    handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    render() {
        const { isLoadingComplete } = this.state;

        if (!isLoadingComplete) {
            return <View />;
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <AppNavigator />
                {this.maybeRenderLoadingImage()}
            </View>
        );
    }
}

export default Splash;
