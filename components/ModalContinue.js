import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { colors, opacities, spacing, fontSizes } from '../constants/Index';
import { closeModal } from '../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    continueText: PropTypes.string,
};

const defaultProps = {
    continueText: 'Continue',
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: () => dispatch(closeModal()),
    };
}

class ModalDismiss extends React.PureComponent {
    close = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag();
    };

    render() {
        const { continueText } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                activeOpacity={opacities.regular}
                style={{
                    position: 'absolute',
                    right: parseInt(spacing.medium, 10),
                    bottom: parseInt(spacing.small, 10),
                }}
            >
                <DismissText>{continueText}</DismissText>
            </TouchableOpacity>
        );
    }
}

ModalDismiss.propTypes = propTypes;
ModalDismiss.defaultProps = defaultProps;

export default connect(
    null,
    mapDispatchToProps,
)(ModalDismiss);

const DismissText = styled.Text`
    color: ${colors.white};
    font-size: ${fontSizes.extraLarge};
`;
