import React from 'react';
import { useScrollToTop } from '@react-navigation/native';
import PropTypes from 'prop-types';

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

export default withScrollToTop;
