import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { InstantSearch } from 'react-instantsearch-native';
import TabNavigator from './TabNavigator';
import { defaultTheme, darkTheme } from '../constants/Themes';
import { withTheme } from '../utils/Themes';
import { setCurrentScreen } from '../utils/Analytics';
import { searchClient } from '../constants/Search';

const propTypes = {
    darkMode: PropTypes.bool,
    searchState: PropTypes.object,
};

const defaultProps = {
    darkMode: false,
    searchState: {},
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
        const { searchState } = this.props;

        this.state = { searchState };
        StatusBar.setBarStyle('light-content', true);
    }

    onSearchStateChange = (nextState) => {
        const { searchState } = this.state;

        this.setState({
            searchState: { ...searchState, ...nextState },
        });
    };

    onNavigationStateChange = () => {
        const previousRoute = routeNameRef.current;
        const currentRoute = navigationRef.current.getCurrentRoute().name;

        if (previousRoute !== currentRoute) {
            setCurrentScreen(currentRoute);
        }

        routeNameRef.current = currentRoute;
    };

    setRouteNameRef = () => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        setCurrentScreen(routeNameRef.current);
    };

    render() {
        const { scheme, darkMode } = this.props;
        const { searchState } = this.state;

        let theme = defaultTheme;

        if (darkMode || scheme === 'dark') {
            theme = darkTheme;
        }

        return (
            <SafeAreaProvider>
                <AppearanceProvider>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName='hikes'
                        searchState={searchState}
                        onSearchStateChange={this.onSearchStateChange}
                    >
                        <NavigationContainer
                            ref={navigationRef}
                            onReady={() => this.setRouteNameRef()}
                            onStateChange={() => this.onNavigationStateChange()}
                            theme={theme}
                        >
                            <ThemeProvider theme={theme.colors}>
                                <TabNavigator />
                            </ThemeProvider>
                        </NavigationContainer>
                    </InstantSearch>
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
