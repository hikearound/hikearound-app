import React from 'react';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ModalDismiss from './header/Dismiss';
import ModalContinue from './header/Continue';
import ModalBase from './ModalBase';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import {
    PageSheetModalHeader,
    PageSheetModalTitleText,
    ModalBody,
} from '../../styles/Modals';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        modalCloseAction: state.modalReducer.modalCloseAction,
    };
}

function mapDispatchToProps() {
    return {};
}

const defaultProps = {
    presentationStyle: 'pageSheet',
};

class FilterModal extends ModalBase {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    hideModal = () => {
        this.setState({ modalVisible: false });
    };

    renderModalHeader = (t) => (
        <PageSheetModalHeader>
            <PageSheetModalTitleText>
                {t('modal.filter.title')}
            </PageSheetModalTitleText>
            <ModalDismiss isPageSheet textDismiss dismissLanguage='cancel' />
            <ModalContinue
                isPageSheet
                continueText={t('label.modal.reset')}
                modalCloseAction='resetPassword'
            />
        </PageSheetModalHeader>
    );

    renderModalBody = () => <ModalBody />;

    render() {
        const { modalVisible } = this.state;
        const { animationType, transparent, presentationStyle, t } = this.props;
        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
                presentationStyle={presentationStyle}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody()}
                </RootView>
            </Modal>
        );
    }
}

FilterModal.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(FilterModal)));
