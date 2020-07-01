import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ModalDismiss from './header/Dismiss';
import ModalContinue from './header/Continue';
import ModalBase from './ModalBase';
import Avatar from '../Avatar';
import InputLabelGroup from '../InputLabelGroup';
import { spacing } from '../../constants/Index';
import { updateUserData } from '../../actions/User';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import { ModalHeader, ModalTitleText, ModalBody } from '../../styles/Modals';
import { getInputs, setInputRefs } from '../../utils/Inputs';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        modalCloseAction: state.modalReducer.modalCloseAction,
        name: state.userReducer.name,
        location: state.userReducer.location,
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
        const { t } = this.props;
        const inputs = getInputs(t, 'editProfile');
        const refs = setInputRefs(inputs, 'editProfile');

        this.state = {
            modalVisible: false,
            inputs,
            refs,
        };
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    hideModal() {
        const { name, location, modalCloseAction } = this.props;
        const userData = { location, name };

        if (modalCloseAction === 'updateUserData') {
            this.maybeUpdateName(userData);
            this.maybeUpdateLocation(userData);
        }

        this.setState({ modalVisible: false });
    }

    maybeUpdateName(userData) {
        const { dispatchUserData } = this.props;
        const { inputs, updatedName, refs } = this.state;

        if (updatedName) {
            userData.name = updatedName;
            refs.name.defaultValue = updatedName;

            this.setState({ inputs });
            dispatchUserData(userData);
        }
    }

    maybeUpdateLocation(userData) {
        const { dispatchUserData } = this.props;
        const { inputs, updatedLocation, refs } = this.state;

        if (updatedLocation) {
            userData.location = updatedLocation;
            refs.location.defaultValue = updatedLocation;

            this.setState({ inputs });
            dispatchUserData(userData);
        }
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

    renderModalHeader = (t) => (
        <ModalHeader>
            <ModalTitleText>{t('screen.profile.edit')}</ModalTitleText>
            <ModalDismiss textDismiss />
            <ModalContinue
                continueText={t('label.modal.save')}
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

    renderModalBody = (inputs) => (
        <ModalBody>
            <AvatarWrapper>
                <Avatar isEditable size={60} />
            </AvatarWrapper>
            {inputs.map(
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
        const { modalVisible, inputs } = this.state;
        const { animationType, transparent, fullScreen, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
                fullScreen={fullScreen}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody(inputs)}
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
