import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ModalDismiss from '../ModalDismiss';
import ModalContinue from '../ModalContinue';
import ModalBase from './ModalBase';
import Avatar from '../Avatar';
import InputLabelGroup from '../InputLabelGroup';
import { spacing } from '../../constants/Index';
import { updateUserData } from '../../actions/User';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import { ModalHeader, ModalTitleText, ModalBody } from '../../styles/Modals';
import { getEditProfileInputs } from '../../constants/Inputs';

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
        const { name, location, t } = this.props;

        const editProfileInputs = getEditProfileInputs(
            t('name'),
            t('location'),
            name,
            location,
        );

        this.state = {
            modalVisible: false,
            editProfileInputs,
        };
    }

    setValue(name, text) {
        this.setState({ [name]: text });
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

    renderModalHeader = () => (
        <ModalHeader>
            <ModalTitleText>Edit Profile</ModalTitleText>
            <ModalDismiss textDismiss />
            <ModalContinue
                continueText='Save'
                modalCloseAction='updateUserData'
            />
        </ModalHeader>
    );

    handleSubmitEditing = (index) => {
        if (index === 0) {
            this.locationInput.focus();
        } else {
            this.hideModal();
        }
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    renderModalBody = (editProfileInputs) => (
        <ModalBody>
            <AvatarWrapper>
                <Avatar isEditable size={60} />
            </AvatarWrapper>
            {editProfileInputs.map(
                (
                    {
                        name,
                        value,
                        defaultValue,
                        placeholder,
                        keyboardType,
                        autoCorrect,
                        autoCapitalize,
                        textContentType,
                        enablesReturnKeyAutomatically,
                        returnKeyType,
                    },
                    index,
                ) => (
                    <InputLabelGroup
                        key={index}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        autoCorrect={autoCorrect}
                        autoCapitalize={autoCapitalize}
                        defaultValue={defaultValue}
                        onChangeText={(text) => this.setValue(value, text)}
                        labelName={placeholder}
                        textContentType={textContentType}
                        enablesReturnKeyAutomatically={
                            enablesReturnKeyAutomatically
                        }
                        returnKeyType={returnKeyType}
                        onSubmitEditing={() => this.handleSubmitEditing(index)}
                        inputRef={(ref) => this.assignRef(ref, name)}
                    />
                ),
            )}
        </ModalBody>
    );

    render() {
        const { modalVisible, editProfileInputs } = this.state;
        const { animationType, transparent, fullScreen } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
                fullScreen={fullScreen}
            >
                <RootView>
                    {this.renderModalHeader()}
                    {this.renderModalBody(editProfileInputs)}
                </RootView>
            </Modal>
        );
    }
}

EditProfileModal.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(EditProfileModal)));

const AvatarWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    padding: ${spacing.medium}px;
    padding-left: ${spacing.small}px;
`;
