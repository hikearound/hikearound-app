import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import Toast from 'react-native-toast-message';
import TabNavigator from './TabNavigator';
import { defaultTheme, darkTheme } from '../constants/Themes';
import { withTheme } from '../utils/Themes';
import { setCurrentScreen } from '../utils/Analytics';
import { toastConfig } from '../utils/Toast';

const propTypes = {
    darkMode: PropTypes.bool,
};

const defaultProps = {
    darkMode: false,
};

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps() {
    return {};
}

const routeNameRef = React.createRef();
const navigationRef = React.createRef();

class AppNavigator extends React.PureComponent {
    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content', true);
    }

    onNavigationStateChange = () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
            setCurrentScreen(currentRouteName, {});
        }

        routeNameRef.current = currentRouteName;
    };

    setRouteNameRef = () => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    };

    render() {
        const { scheme, darkMode } = this.props;

        let theme = defaultTheme;
        if (darkMode || scheme === 'dark') {
            theme = darkTheme;
        }

        return (
            <SafeAreaProvider>
                <AppearanceProvider>
                    <NavigationContainer
                        ref={navigationRef}
                        onReady={() => this.setRouteNameRef()}
                        onStateChange={() => this.onNavigationStateChange()}
                        theme={theme}
                    >
                        <ThemeProvider theme={theme.colors}>
                            <TabNavigator />
                            <Toast
                                config={toastConfig}
                                ref={(ref) => Toast.setRef(ref)}
                                bottomOffset={80}
                            />
                        </ThemeProvider>
                    </NavigationContainer>
                </AppearanceProvider>
            </SafeAreaProvider>
        );
    }
}

AppNavigator.propTypes = propTypes;
AppNavigator.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(AppNavigator));
