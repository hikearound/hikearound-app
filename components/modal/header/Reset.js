import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities, spacing } from '@constants/Index';
import HeaderText from '@styles/Header';

const propTypes = {
    resetFilters: PropTypes.func.isRequired,
    resetText: PropTypes.string,
    isPageSheet: PropTypes.bool,
};

const defaultProps = {
    resetText: '',
    isPageSheet: false,
};

class ModalReset extends React.PureComponent {
    reset = () => {
        const { resetFilters } = this.props;
        resetFilters();
    };

    render() {
        const { resetText, isPageSheet } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    this.reset();
                }}
                activeOpacity={opacities.regular}
                style={{
                    position: 'absolute',
                    right: parseInt(spacing.small, 10),
                    bottom: parseInt(spacing.small, 10),
                }}
            >
                <HeaderText isPageSheet={isPageSheet}>{resetText}</HeaderText>
            </TouchableOpacity>
        );
    }
}

ModalReset.propTypes = propTypes;
ModalReset.defaultProps = defaultProps;

export default ModalReset;
