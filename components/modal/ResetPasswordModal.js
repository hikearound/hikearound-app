import React from 'react';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ModalDismiss from './header/Dismiss';
import ModalContinue from './header/Continue';
import ModalBase from './ModalBase';
import InputLabelGroup from '../InputLabelGroup';
import { withTheme } from '../../utils/Themes';
import { RootView, SubText } from '../../styles/Screens';
import { ModalHeader, ModalTitleText, ModalBody } from '../../styles/Modals';
import { getInputs } from '../../utils/Inputs';
import { showAlert } from '../../utils/alert/Reset';
import { maybeSendResetNotif } from '../../utils/Password';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        modalCloseAction: state.modalReducer.modalCloseAction,
    };
}

function mapDispatchToProps() {
    return {};
}

class ResetPasswordModal extends ModalBase {
    constructor(props, context) {
        super(props, context);
        const { t } = this.props;
        const inputs = getInputs(t, 'forgotPassword');

        this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
        this.state = { modalVisible: false, inputs };
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    toggleModalVisibility = () => {
        this.setState({ modalVisible: false, email: null });
    };

    hideModal = () => {
        const { t } = this.props;
        const { email } = this.state;

        if (email) {
            showAlert(t, email, this.toggleModalVisibility);
            maybeSendResetNotif(email);
        } else {
            this.toggleModalVisibility();
        }
    };

    renderModalHeader = (t) => (
        <ModalHeader>
            <ModalTitleText>{t('modal.reset.title')}</ModalTitleText>
            <ModalDismiss textDismiss dismissLanguage='cancel' />
            <ModalContinue
                continueText={t('label.modal.send')}
                modalCloseAction='resetPassword'
            />
        </ModalHeader>
    );

    renderHelpText = (t) => {
        return <SubText>{t('modal.reset.help')}</SubText>;
    };

    handleSubmitEditing = () => {
        this.hideModal();
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    renderModalBody = (inputs, t) => (
        <ModalBody>
            {inputs.map(
                (
                    {
                        name,
                        defaultValue,
                        placeholder,
                        keyboardType,
                        autoCorrect,
                        autoCapitalize,
                        textContentType,
                        enablesReturnKeyAutomatically,
                        autoCompleteType,
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
                        onChangeText={(text) => this.setValue(name, text)}
                        labelName={placeholder}
                        textContentType={textContentType}
                        enablesReturnKeyAutomatically={
                            enablesReturnKeyAutomatically
                        }
                        autoFocus={index === 0}
                        returnKeyType={returnKeyType}
                        onSubmitEditing={() => this.handleSubmitEditing(index)}
                        inputRef={(ref) => this.assignRef(ref, name)}
                        autoCompleteType={autoCompleteType}
                    />
                ),
            )}
            {this.renderHelpText(t)}
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
                    {this.renderModalBody(inputs, t)}
                </RootView>
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(ResetPasswordModal)));
