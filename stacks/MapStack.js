import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { MapScreen, HikeScreen } from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';
import { setFocusedStack } from '../actions/Navigation';
import ToastProvider from '../providers/ToastProvider';

const propTypes = {
    dispatchFocusedStack: PropTypes.func.isRequired,
    focusedStack: PropTypes.string.isRequired,
    stackName: PropTypes.string,
};

const defaultProps = {
    stackName: 'Map',
};

function mapStateToProps(state) {
    return {
        focusedStack: state.navigationReducer.focusedStack,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFocusedStack: (stackName) =>
            dispatch(setFocusedStack(stackName)),
    };
}

const Stack = createStackNavigator();

class MapStack extends React.Component {
    componentDidMount() {
        const { navigation, dispatchFocusedStack, stackName } = this.props;

        this.unsubscribe = navigation.addListener('focus', () => {
            dispatchFocusedStack(stackName);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderMapScreen = (t) => (
        <Stack.Screen
            name='Map'
            component={MapScreen}
            options={{
                headerTitle: t('label.nav.map'),
                headerShown: false,
            }}
        />
    );

    renderHikeScreen = () => (
        <Stack.Screen name='Hike' component={HikeScreen} />
    );

    render() {
        const { stackName, focusedStack, theme, t } = this.props;
        const enableToast = stackName === focusedStack;

        return (
            <>
                <Stack.Navigator
                    initialRouteName={stackName}
                    screenOptions={screenOptions(theme.colors.headerStyle)}
                    headerMode={headerMode}
                    mode={mode}
                >
                    {this.renderMapScreen(t)}
                    {this.renderHikeScreen()}
                </Stack.Navigator>
                {enableToast && <ToastProvider />}
            </>
        );
    }
}

MapStack.propTypes = propTypes;
MapStack.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(MapStack)));
