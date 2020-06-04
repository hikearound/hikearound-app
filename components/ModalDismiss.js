import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
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

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    includeBackground: PropTypes.bool,
    textDismiss: PropTypes.bool,
    iconOffset: PropTypes.number,
    iconSize: PropTypes.number,
};

const defaultProps = {
    includeBackground: false,
    textDismiss: false,
    iconOffset: 25,
    iconSize: 35,
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
        const {
            includeBackground,
            iconSize,
            iconOffset,
            textDismiss,
            t,
        } = this.props;

        let iconStyle = (
            <Ionicons
                name='ios-close'
                color={colors.white}
                size={iconSize + 5}
            />
        );

        if (includeBackground) {
            iconStyle = (
                <DismissIconWrapper iconSize={iconSize}>
                    <Ionicons
                        name='ios-close'
                        color={colors.purple}
                        size={iconSize}
                    />
                </DismissIconWrapper>
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
                        bottom: parseInt(spacing.small, 10),
                        left: parseInt(spacing.small, 10),
                    }}
                >
                    <DismissText>{t('label.modal.close')}</DismissText>
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
                    right: iconOffset,
                    top: iconOffset,
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
    null,
    mapDispatchToProps,
)(withTranslation()(ModalDismiss));

const DismissIconWrapper = styled.View`
    border-radius: ${(props) => props.iconSize}px;
    height: ${(props) => props.iconSize}px;
    width: ${(props) => props.iconSize}px;
    box-shadow: 0 4px 4px ${transparentColors.gray};
    background-color: ${(props) => props.theme.sheetBackground};
    padding-left: 11px;
`;

const DismissText = styled.Text`
    color: ${colors.white};
    font-size: ${fontSizes.large}px;
`;
