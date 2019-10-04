import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '../ModalDismiss';
import ModalContinue from '../ModalContinue';
import ModalBase from './ModalBase';
import Avatar from '../Avatar';
import InputLabelGroup from '../InputLabelGroup';
import { colors, fontSizes, spacing, fontWeights } from '../../constants/Index';
import { updateUserData } from '../../actions/User';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        modalCloseAction: state.modalReducer.modalCloseAction,
        name: state.userReducer.name,
        location: state.userReducer.location,
        map: state.userReducer.map,
        avatar: state.userReducer.avatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(updateUserData(userData)),
    };
}

class EditProfileModal extends ModalBase {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };

        this.updateLocation = this.updateLocation.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    updateLocation(location) {
        this.setState({
            updatedLocation: location,
        });
    }

    updateName(name) {
        this.setState({
            updatedName: name,
        });
    }

    hideModal() {
        const {
            name,
            location,
            modalCloseAction,
            dispatchUserData,
        } = this.props;

        const { updatedName, updatedLocation } = this.state;
        const userData = { location, name };

        if (modalCloseAction === 'updateUserData') {
            if (updatedName !== name) {
                userData.name = updatedName;
                dispatchUserData(userData);
            }

            if (updatedLocation !== location) {
                userData.location = updatedLocation;
                dispatchUserData(userData);
            }
        }

        this.setState({ modalVisible: false });
    }

    extraActions() {
        const { name, location } = this.props;
        const { updatedName } = this.state;

        if (updatedName === undefined) {
            this.setState({
                updatedName: name,
                updatedLocation: location,
            });
        }
    }

    renderModalHeader = (headerText) => (
        <ModalHeader>
            <ModalTitleText>{headerText}</ModalTitleText>
            <ModalDismiss textDismiss />
            <ModalContinue
                continueText='Save'
                modalCloseAction='updateUserData'
            />
        </ModalHeader>
    );

    renderModalBody = (avatar, updatedName, updatedLocation) => (
        <ModalBody>
            <AvatarWrapper>
                <Avatar avatar={avatar} size={60} />
            </AvatarWrapper>
            <InputLabelGroup
                labelName='Name'
                textContentType='name'
                setValue={this.updateName}
                value={updatedName}
            />
            <InputLabelGroup
                labelName='Location'
                textContentType='addressCityAndState'
                setValue={this.updateLocation}
                value={updatedLocation}
            />
        </ModalBody>
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

EditProfileModal.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditProfileModal);

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
