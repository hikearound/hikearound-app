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
} from '@constants/Index';
import { closeModal } from '@actions/Modal';
import HeaderText from '@styles/Header';
import { getDismissIconPosition } from '@utils/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    includeBackground: PropTypes.bool,
    textDismiss: PropTypes.bool,
    iconSize: PropTypes.number,
    dismissLanguage: PropTypes.string,
    closeAction: PropTypes.string,
    isPageSheet: PropTypes.bool,
    alignLeft: PropTypes.bool,
    iconWrapperSize: PropTypes.number,
};

const defaultProps = {
    includeBackground: false,
    closeAction: 'close',
    textDismiss: false,
    iconSize: 26,
    dismissLanguage: 'close',
    isPageSheet: false,
    alignLeft: true,
    iconWrapperSize: 35,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (closeAction) => dispatch(closeModal(closeAction)),
    };
}

class ModalDismiss extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.setPosition();
    }

    close = () => {
        const { dispatchModalFlag, closeAction } = this.props;
        dispatchModalFlag(closeAction);
    };

    setPosition = () => {
        const { includeBackground } = this.props;
        const position = getDismissIconPosition(includeBackground);

        this.setState({
            top: position.top,
            right: position.right,
        });
    };

    setStyle = () => {
        const { alignLeft } = this.props;

        const style = {
            position: 'absolute',
            bottom: parseInt(spacing.small, 10),
        };

        if (alignLeft) {
            style.left = parseInt(spacing.small, 10);
        } else {
            style.right = parseInt(spacing.small, 10);
        }

        return style;
    };

    render() {
        const {
            includeBackground,
            dismissLanguage,
            iconSize,
            textDismiss,
            isPageSheet,
            iconWrapperSize,
            t,
        } = this.props;
        const { top, right } = this.state;

        let iconStyle = (
            <Ionicons
                name='ios-close'
                color={colors.white}
                size={iconSize - 2}
            />
        );

        if (includeBackground) {
            iconStyle = (
                <DismissIconWrapper size={iconWrapperSize}>
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
                    style={this.setStyle()}
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
                    right,
                    top,
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
    border-radius: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    box-shadow: 0 4px 4px ${transparentColors.gray};
    background-color: ${(props) => props.theme.sheetBackground};
    padding-left: 4.5px;
    padding-top: 4px;
`;
