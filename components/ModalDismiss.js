import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
    colors,
    transparentColors,
    opacities,
    spacing,
    fontSizes,
} from '../constants/Index';
import { closeModal } from '../actions/Modal';

const DISMISS_ICON_OFFSET = 25;
const DISMISS_ICON_SIZE = 35;

const propTypes = {
    close: PropTypes.func.isRequired,
    includeBackground: PropTypes.bool,
    textDismiss: PropTypes.bool,
};

const defaultProps = {
    includeBackground: false,
    textDismiss: false,
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        close: () => dispatch(closeModal()),
    };
}

class ModalDismiss extends React.PureComponent {
    close = () => {
        const { close } = this.props;
        close();
    };

    render() {
        const { includeBackground, textDismiss } = this.props;
        let iconStyle;

        if (includeBackground) {
            iconStyle = (
                <DismissIconWrapper>
                    <Ionicons
                        name='ios-close'
                        color={colors.purple}
                        size={DISMISS_ICON_SIZE}
                    />
                </DismissIconWrapper>
            );
        } else {
            iconStyle = (
                <Ionicons
                    name='ios-close'
                    color={colors.white}
                    size={DISMISS_ICON_SIZE + 5}
                />
            );
        }

        if (textDismiss) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.close();
                    }}
                    activeOpacity={opacities.regular}
                    style={{
                        position: 'absolute',
                        left: parseInt(spacing.medium, 10),
                        bottom: parseInt(spacing.small, 10),
                    }}
                >
                    <DismissText>Close</DismissText>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                activeOpacity={opacities.regular}
                style={{
                    position: 'absolute',
                    right: DISMISS_ICON_OFFSET,
                    top: DISMISS_ICON_OFFSET,
                    zIndex: 1,
                }}
            >
                {iconStyle}
            </TouchableOpacity>
        );
    }
}

ModalDismiss.propTypes = propTypes;
ModalDismiss.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalDismiss);

const DismissIconWrapper = styled.View`
    border-radius: ${DISMISS_ICON_SIZE}px;
    height: ${DISMISS_ICON_SIZE}px;
    width: ${DISMISS_ICON_SIZE}px;
    box-shadow: 0 4px 4px ${transparentColors.grayDark};
    background-color: ${colors.white};
    padding-left: 11px;
`;

const DismissText = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.extraLarge};
`;
