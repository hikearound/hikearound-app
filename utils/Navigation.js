import React from 'react';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const propTypes = {
    scrollRef: PropTypes.object.isRequired,
};

export function withScrollToTop(Component) {
    function WrappedComponent(props) {
        const { scrollRef } = props;
        useScrollToTop(scrollRef);

        return <Component {...props} />;
    }

    WrappedComponent.propTypes = propTypes;
    return WrappedComponent;
}

export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigation = useNavigation();

        return <Component {...props} navigation={navigation} />;
    };
}

export function getHeaderHeight() {
    const baseHeight = 44;
    return baseHeight + Constants.statusBarHeight;
}
