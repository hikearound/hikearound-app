import React from 'react';
import styled from 'styled-components';
import { Modal, SafeAreaView } from 'react-native';
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
    }

    render() {
        const { modalVisible } = this.state;
        const { animationType, transparent, fullScreen } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
                fullScreen={fullScreen}
            >
                <ModalRoot>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ModalHeader>
                            <ModalDismiss textDismiss />
                            <ModalTitleText>Edit Profile</ModalTitleText>
                        </ModalHeader>
                        <ModalBody>
                            <ModalBodyText>Hello</ModalBodyText>
                        </ModalBody>
                    </SafeAreaView>
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
    background-color: ${colors.purple};
    border-bottom-color: ${colors.borderGray};
    height: 60px;
    position: relative;
`;

const ModalTitleText = styled.Text`
    text-align: center;
    color: ${colors.white};
    font-size: ${fontSizes.extraLarge}px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    bottom: ${spacing.small}px;
    font-weight: ${fontWeights.bold};
`;

const ModalBody = styled.View`
    background-color: ${colors.white};
    display: flex;
    flex: 1;
    padding: ${spacing.medium}px;
`;

const ModalBodyText = styled.Text`
    text-align: left;
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
`;
