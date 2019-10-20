import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import TabNavigator from './TabNavigator';

const Navigation = createAppContainer(TabNavigator);

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
    let theme = useColorScheme();

    if (darkMode) {
        theme = 'dark';
    }

    return (
        <AppearanceProvider>
            <Navigation theme={theme} />
        </AppearanceProvider>
    );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
