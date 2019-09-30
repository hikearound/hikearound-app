import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '../ModalDismiss';
import ModalBase from './ModalBase';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

class EditProfileModal extends ModalBase {
    render() {
        const { modalVisible } = this.state;
        const { animationType } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <ModalDismiss includeBackground />
                </ModalRoot>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(EditProfileModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
`;
