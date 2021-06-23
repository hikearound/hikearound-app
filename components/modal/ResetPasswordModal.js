import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import InputLabelGroup from '@components/InputLabelGroup';
import { withTheme } from '@utils/Themes';
import { RootView, SubText } from '@styles/Screens';
import { ModalBody } from '@styles/Modals';
import { getInputs } from '@utils/Inputs';
import { showAlert } from '@utils/alert/Reset';
import { maybeSendResetNotif } from '@utils/Password';
import { toggleModalVisibility } from '@utils/Modal';
import ModalHeader from '@components/modal/Header';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    modalType: PropTypes.string,
    transparent: PropTypes.bool,
    animationType: PropTypes.string,
};

const defaultProps = {
    modalType: 'resetPassword',
    transparent: true,
    animationType: 'push',
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
        closeAction: state.modalReducer.closeAction,
    };
}

function mapDispatchToProps() {
    return {};
}

class ResetPasswordModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { t, modalType } = this.props;
        const inputs = getInputs(t, modalType);

        this.state = {
            modalVisible: false,
            inputs,
        };
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType } = this.props;

        const functions = {
            show: this.showModal.bind(this),
            hide: this.hideModal.bind(this),
        };

        toggleModalVisibility(prevProps, currentModal, modalType, functions);
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    renderModalHeader = (t) => (
        <ModalHeader
            title={t('modal.reset.title')}
            continueAction='resetPassword'
            continueText={t('label.modal.send')}
        />
    );

    renderHelpText = (t) => <SubText>{t('modal.reset.help')}</SubText>;

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    hideModal = () => {
        const { email } = this.state;

        if (email) {
            this.delayHideModal();
        } else {
            this.hideAndClearModal();
        }
    };

    delayHideModal = () => {
        const { t } = this.props;
        const { email } = this.state;

        maybeSendResetNotif(email);
        showAlert(t, email, this.hideAndClearModal.bind(this));
    };

    hideAndClearModal = () => {
        this.setState({ modalVisible: false, email: null });
    };

    showModal = () => {
        this.setState({ modalVisible: true });
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
                        onSubmitEditing={() => this.hideModal()}
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
        const { animationType, transparent, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody(inputs, t)}
                </RootView>
            </Modal>
        );
    }
}

ResetPasswordModal.propTypes = propTypes;
ResetPasswordModal.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(ResetPasswordModal)));
