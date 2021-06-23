import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { withTheme } from '@utils/Themes';
import { RootView } from '@styles/Screens';
import {
    PageSheetModalHeader,
    PageSheetModalTitleText,
    ModalBody,
} from '@styles/Modals';
import { toggleModalVisibility } from '@utils/Modal';
import ModalDismiss from '@components/modal/header/Dismiss';
import NotificationSettingsScreen from '@screens/settings/NotificationScreen';
import { spacing, colors } from '@constants/Index';
import { closeModal } from '@actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    currentModal: PropTypes.string.isRequired,
    modalType: PropTypes.string,
    animationType: PropTypes.string,
    presentationStyle: PropTypes.string,
};

const defaultProps = {
    animationType: 'slide',
    presentationStyle: 'pageSheet',
    modalType: 'notificationPreferences',
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
        closeAction: state.modalReducer.closeAction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (closeAction) => dispatch(closeModal(closeAction)),
    };
}

class NotificationPreferenceModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
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

    renderModalHeader = (t) => (
        <PageSheetModalHeader showBottomBorder>
            <PageSheetModalTitleText>
                {t('modal.notification.title')}
            </PageSheetModalTitleText>
            <ModalDismiss isPageSheet textDismiss />
        </PageSheetModalHeader>
    );

    dispatchCloseAction = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag('closenotificationPreferences');
    };

    hideModal = () => {
        this.dispatchCloseAction();
        this.setState({ modalVisible: false });
    };

    showModal = () => {
        this.setState({ modalVisible: true });
    };

    renderModalBody = (t) => (
        <StyledModalBody>
            <Explainer>{t('modal.notification.explainer')}</Explainer>
            <NotificationSettingsScreen hideHeaders onlyPush />
        </StyledModalBody>
    );

    render() {
        const { modalVisible } = this.state;
        const { animationType, presentationStyle, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                visible={modalVisible}
                presentationStyle={presentationStyle}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody(t)}
                </RootView>
            </Modal>
        );
    }
}

NotificationPreferenceModal.propTypes = propTypes;
NotificationPreferenceModal.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(NotificationPreferenceModal)));

const StyledModalBody = styled(ModalBody)`
    margin-top: ${spacing.small}px;
`;

const Explainer = styled.Text`
    margin: ${spacing.small}px;
    color: ${colors.grayDark};
`;
