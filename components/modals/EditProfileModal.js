import React from 'react';
import styled from 'styled-components';
import { Modal, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '../ModalDismiss';
import ModalContinue from '../ModalContinue';
import ModalBase from './ModalBase';
import Avatar from '../Avatar';
import { colors, fontSizes, spacing, fontWeights } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        name: state.userReducer.name,
        location: state.userReducer.location,
        avatar: state.userReducer.avatar,
    };
}

class EditProfileModal extends ModalBase {
    showModal() {
        const { name, location } = this.props;
        const { updatedName } = this.state;

        if (updatedName === undefined) {
            this.setState({
                updatedName: name,
                updatedLocation: location,
            });
        }

        this.setState({
            modalVisible: true,
        });
    }

    renderModalHeader = (headerText) => (
        <ModalHeader>
            <ModalTitleText>{headerText}</ModalTitleText>
            <ModalDismiss textDismiss />
            <ModalContinue continueText='Save' />
        </ModalHeader>
    );

    renderModalBody = (avatar, updatedName, updatedLocation) => (
        <ModalBody>
            <AvatarWrapper>
                <Avatar avatar={avatar} size={60} />
            </AvatarWrapper>
            {this.renderLabelInputGroup('Name', 'updatedName', updatedName)}
            {this.renderLabelInputGroup(
                'Location',
                'updatedLocation',
                updatedLocation,
            )}
        </ModalBody>
    );

    renderLabelInputGroup = (labelName, key, value) => (
        <LabelInputGroup>
            <InputLabel>{labelName}</InputLabel>
            <ModalInput
                placeholder={labelName}
                value={value}
                onChangeText={(text) => this.setState({ [key]: text })}
            />
        </LabelInputGroup>
    );

    render() {
        const { modalVisible, updatedName, updatedLocation } = this.state;
        const { animationType, transparent, fullScreen, avatar } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
                fullScreen={fullScreen}
            >
                <ModalRoot>
                    <SafeAreaView style={{ flex: 1 }}>
                        {this.renderModalHeader('Edit Profile')}
                        {this.renderModalBody(
                            avatar,
                            updatedName,
                            updatedLocation,
                        )}
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
    height: ${spacing.header}px;
    width: 100%;
    position: relative;
`;

const AvatarWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    padding: ${spacing.medium}px;
    padding-left: ${spacing.small}px;
`;

const LabelInputGroup = styled.View`
    width: 100%;
    flex-direction: row;
    border-color: ${colors.gray};
    border-top-width: 1px;
    border-bottom-width: 1px;
    padding: ${spacing.small}px;
    margin-top: -1px;
`;

const InputLabel = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
    width: 85px;
`;

const ModalInput = styled.TextInput`
    color: ${colors.darkGray};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;

const ModalTitleText = styled.Text`
    text-align: center;
    color: ${colors.white};
    font-size: ${fontSizes.extraLarge}px;
    position: absolute;
    width: 100%
    text-align: center;
    bottom: ${spacing.small}px;
    font-weight: ${fontWeights.bold};
`;

const ModalBody = styled.View`
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    height: 100%;
`;
