import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import { defaultTheme, darkTheme } from '../constants/Themes';

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

function App({ darkMode }) {
    let scheme = useColorScheme();
    if (darkMode) {
        scheme = 'dark';
    }

    return (
        <SafeAreaProvider>
            <AppearanceProvider>
                <NavigationContainer
                    theme={scheme === 'dark' ? darkTheme : defaultTheme}
                >
                    <TabNavigator />
                </NavigationContainer>
            </AppearanceProvider>
        </SafeAreaProvider>
    );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
