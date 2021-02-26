import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { writeReviewFlag } from '../../utils/Moderation';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import {
    PageSheetModalHeader,
    PageSheetModalTitleText,
    ModalBody,
} from '../../styles/Modals';
import { toggleModalVisibility } from '../../utils/Modal';
import ModalDismiss from './header/Dismiss';
import {
    colors,
    fontSizes,
    spacing,
    fontWeights,
    timings,
} from '../../constants/Index';
import FlagButton from './flag/Button';
import { closeModal } from '../../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    currentModal: PropTypes.string.isRequired,
    modalType: PropTypes.string,
    animationType: PropTypes.string,
    presentationStyle: PropTypes.string,
    flaggedReview: PropTypes.string,
};

const defaultProps = {
    animationType: 'slide',
    presentationStyle: 'pageSheet',
    modalType: 'flagReview',
    flaggedReview: null,
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
        closeAction: state.modalReducer.closeAction,
        flaggedReview: state.modalReducer.flaggedReview,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (closeAction) => dispatch(closeModal(closeAction)),
    };
}

class FlagReviewModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
            flagSubmitted: false,
        };

        this.submitReport = this.submitReport.bind(this);
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
                {t('modal.flag.title')}
            </PageSheetModalTitleText>
            <ModalDismiss isPageSheet textDismiss dismissLanguage='cancel' />
        </PageSheetModalHeader>
    );

    hideModal = () => {
        this.setState({ modalVisible: false });
    };

    hideAndClearModal = () => {
        const { dispatchModalFlag } = this.props;

        this.setState({
            flagSubmitted: true,
        });

        setTimeout(() => {
            dispatchModalFlag('submitFlag');

            this.setState({
                modalVisible: false,
                flagSubmitted: false,
            });
        }, timings.extraLong);
    };

    showModal = () => {
        this.setState({ modalVisible: true });
    };

    submitReport = (type) => {
        const { flaggedReview } = this.props;
        writeReviewFlag(flaggedReview, type);

        this.hideAndClearModal();
    };

    renderModalBody = () => {
        const { flagSubmitted } = this.state;

        return (
            <ModalBody>
                {flagSubmitted && this.renderConfirmation()}
                {!flagSubmitted && this.renderIntro()}
                {!flagSubmitted && this.renderActions()}
            </ModalBody>
        );
    };

    renderIntro = () => {
        const { t } = this.props;

        return (
            <IntroSection>
                <Subtitle>{t('modal.flag.subtitle')}</Subtitle>
                <Subtext>{t('modal.flag.subtext')}</Subtext>
            </IntroSection>
        );
    };

    renderActions = () => (
        <>
            <FlagButton type='spam' onPress={this.submitReport} />
            <FlagButton type='offensive' onPress={this.submitReport} />
        </>
    );

    renderConfirmation = () => {
        const { t } = this.props;

        return (
            <IntroSection>
                <Subtitle>{t('modal.flag.confirmation.subtitle')}</Subtitle>
                <Subtext>{t('modal.flag.confirmation.subtext')}</Subtext>
            </IntroSection>
        );
    };

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
                    {this.renderModalBody()}
                </RootView>
            </Modal>
        );
    }
}

FlagReviewModal.propTypes = propTypes;
FlagReviewModal.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(FlagReviewModal)));

const IntroSection = styled.View`
    padding: ${spacing.large}px ${spacing.small}px;
`;

const Subtitle = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    margin-top: ${spacing.tiny}px;
    margin-bottom: ${spacing.micro}px;
`;

const Subtext = styled.Text`
    color: ${colors.grayDark};
    font-size: ${fontSizes.medium}px;
`;
