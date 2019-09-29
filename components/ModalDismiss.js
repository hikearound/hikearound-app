import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { colors, opacities } from '../constants/Index';
import { closeModal } from '../actions/Modals';

const DISMISS_ICON_OFFSET = 25;
const DISMISS_ICON_SIZE = 45;
const DISMISS_ICON_WRAPPER_SIZE = DISMISS_ICON_SIZE - 2;

const DISMISS_ICON_STYLE = {
    position: 'absolute',
    right: DISMISS_ICON_OFFSET,
    top: DISMISS_ICON_OFFSET,
    zIndex: 1,
};

const propTypes = {
    close: PropTypes.func.isRequired,
    includeBackground: PropTypes.bool,
};

const defaultProps = {
    includeBackground: false,
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
        const { includeBackground } = this.props;

        if (includeBackground) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.close();
                    }}
                    activeOpacity={opacities.regular}
                    style={DISMISS_ICON_STYLE}
                >
                    <DismissIconWrapper>
                        <Ionicons
                            name='ios-close'
                            color={colors.purple}
                            size={DISMISS_ICON_SIZE}
                        />
                    </DismissIconWrapper>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                activeOpacity={opacities.regular}
                style={DISMISS_ICON_STYLE}
            >
                <Ionicons
                    name='ios-close'
                    color={colors.white}
                    size={DISMISS_ICON_SIZE}
                />
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
    border-radius: ${DISMISS_ICON_WRAPPER_SIZE}px;
    height: ${DISMISS_ICON_WRAPPER_SIZE}px;
    width: ${DISMISS_ICON_WRAPPER_SIZE}px;
    background-color: ${colors.white};
    padding-left: 13px;
`;
