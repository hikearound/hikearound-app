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
} from '../../../constants/Index';
import { closeModal } from '../../../actions/Modal';
import HeaderText from '../../../styles/Header';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    includeBackground: PropTypes.bool,
    textDismiss: PropTypes.bool,
    iconSize: PropTypes.number,
    dismissLanguage: PropTypes.string,
    closeAction: PropTypes.string,
    isPageSheet: PropTypes.bool,
};

const defaultProps = {
    includeBackground: false,
    closeAction: 'close',
    textDismiss: false,
    iconSize: 28,
    dismissLanguage: 'close',
    isPageSheet: false,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (closeAction) => dispatch(closeModal(closeAction)),
    };
}

class ModalDismiss extends React.PureComponent {
    close = () => {
        const { dispatchModalFlag, closeAction } = this.props;
        dispatchModalFlag(closeAction);
    };

    render() {
        const {
            includeBackground,
            dismissLanguage,
            iconSize,
            textDismiss,
            isPageSheet,
            t,
        } = this.props;

        let iconStyle = (
            <Ionicons name='ios-close' color={colors.white} size={iconSize} />
        );

        if (includeBackground) {
            iconStyle = (
                <DismissIconWrapper>
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
                    <HeaderText isPageSheet={isPageSheet}>
                        {t(`label.modal.${dismissLanguage}`)}
                    </HeaderText>
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
                    right: 25,
                    top: 30,
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
    border-radius: 35px;
    height: 35px;
    width: 35px;
    box-shadow: 0 4px 4px ${transparentColors.gray};
    background-color: ${(props) => props.theme.sheetBackground};
    padding-left: 4px;
    padding-top: 3px;
`;
