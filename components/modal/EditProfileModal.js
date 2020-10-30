import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Avatar from '../Avatar';
import InputLabelGroup from '../InputLabelGroup';
import { spacing } from '../../constants/Index';
import { updateUserData } from '../../actions/User';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import { ModalBody } from '../../styles/Modals';
import { getInputs, setInputRefs } from '../../utils/Inputs';
import { toggleModalVisibility } from '../../utils/Modal';
import ModalHeader from './Header';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    dispatchUserData: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    closeAction: PropTypes.string.isRequired,
};

const defaultProps = {
    animationType: 'push',
    modalType: 'editProfile',
    transparent: true,
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
        closeAction: state.modalReducer.closeAction,
        name: state.userReducer.name,
        location: state.userReducer.location,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(updateUserData(userData)),
    };
}

class EditProfileModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { t, modalType } = this.props;

        const inputs = getInputs(t, modalType);
        const refs = setInputRefs(inputs, modalType);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state = {
            modalVisible: false,
            inputs,
            refs,
        };
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType } = this.props;

        toggleModalVisibility(
            prevProps,
            currentModal,
            modalType,
            this.showModal,
            this.hideModal,
        );
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    setNameAndLocation = () => {
        const { name, location } = this.props;
        const { updatedName } = this.state;

        if (updatedName === undefined) {
            this.setState({
                updatedName: name,
                updatedLocation: location,
            });
        }
    };

    renderModalHeader = (t) => {
        return (
            <ModalHeader
                title={t('screen.profile.edit')}
                continueAction='updateUserData'
                continueText={t('label.modal.save')}
            />
        );
    };

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

    showModal = () => {
        this.setNameAndLocation();
        this.setState({ modalVisible: true });
    };

    hideModal = () => {
        this.maybeUpdateUserData();
        this.setState({ modalVisible: false });
    };

    maybeUpdateUserData = () => {
        const { name, location, closeAction } = this.props;
        const userData = { location, name };

        if (closeAction === 'updateUserData') {
            this.maybeUpdateName(userData);
            this.maybeUpdateLocation(userData);
        }
    };

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
        const { animationType, transparent, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
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
EditProfileModal.defaultProps = defaultProps;

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
