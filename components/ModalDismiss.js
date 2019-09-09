import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { colors, opacities } from '../constants/Index';

const DISMISS_ICON_OFFSET = 25;
const DISMISS_ICON_SIZE = 45;

const DISMISS_ICON_STYLE = {
    position: 'absolute',
    right: DISMISS_ICON_OFFSET,
    top: DISMISS_ICON_OFFSET,
    zIndex: 1,
};

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModal: () => dispatch({
            type: 'HIDE_MODAL',
        }),
    };
}

class ModalDismiss extends React.PureComponent {
    hideModal = () => {
        const { hideModal } = this.props;
        hideModal();
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => { this.hideModal(); }}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalDismiss);
