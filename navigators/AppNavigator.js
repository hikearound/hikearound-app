import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import TabNavigator from './TabNavigator';
import { defaultTheme, darkTheme } from '../constants/Themes';
import { withTheme } from '../utils/Themes';

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

class AppNavigator extends React.PureComponent {
    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content', true);
    }

    async componentDidMount() {
        try {
            await SplashScreen.preventAutoHideAsync();
        } catch (e) {
            // Already hidden
        }
    }

    render() {
        const { scheme, darkMode } = this.props;

        let theme = defaultTheme;
        if (darkMode || scheme === 'dark') {
            theme = darkTheme;
        }

        return (
            <SafeAreaProvider>
                <AppearanceProvider>
                    <NavigationContainer theme={theme}>
                        <ThemeProvider theme={theme.colors}>
                            <TabNavigator />
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
