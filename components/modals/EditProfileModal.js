import React from 'react';
import styled from 'styled-components';
import { Modal, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '../ModalDismiss';
import ModalBase from './ModalBase';
import { colors, fontSizes, spacing, fontWeights } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

class EditProfileModal extends ModalBase {
    showModal() {
        this.setState({ modalVisible: true });
        StatusBar.setBarStyle('dark-content', true);
    }

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
                    <ModalHeader>
                        <ModalDismiss textDismiss />
                        <ModalTitleText>Edit Profile</ModalTitleText>
                    </ModalHeader>
                    <SafeAreaView style={{ flex: 1 }} />
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

const ModalHeader = styled.View`
    background-color: ${colors.white};
    border-bottom-width: 1px;
    border-bottom-color: ${colors.borderGray};
    height: 103px;
    position: relative;
`;

const ModalTitleText = styled.Text`
    text-align: center;
    color: ${colors.black};
    font-size: ${fontSizes.extraLarge};
    position: absolute;
    left: 50%;
    margin-left: -50px;
    bottom: ${spacing.small};
    font-weight: ${fontWeights.medium};
`;
