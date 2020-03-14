import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import SwitchNavigator from './SwitchNavigator';
import HomeStack from '../stacks/HomeStack';

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
    // let theme = useColorScheme();

    if (darkMode) {
        // theme = 'dark';
    }

    return (
        <SafeAreaProvider>
            <AppearanceProvider>
                <NavigationContainer theme={DefaultTheme}>
                    <HomeStack />
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
