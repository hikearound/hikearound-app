import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ModalDismiss from './header/Dismiss';
import ModalContinue from './header/Continue';
import { addReviewData } from '../../actions/Review';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import { ModalHeader, ModalTitleText, ModalBody } from '../../styles/Modals';

const propTypes = {
    action: PropTypes.string.isRequired,
    dispatchReviewData: PropTypes.func.isRequired,
    modalAction: PropTypes.string,
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    modalCloseAction: PropTypes.string.isRequired,
    selectedStars: PropTypes.number.isRequired,
    hid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

const defaultProps = {
    animationType: 'push',
    modalAction: 'showReview',
    transparent: true,
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        modalCloseAction: state.modalReducer.modalCloseAction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchReviewData: (reviewData) => dispatch(addReviewData(reviewData)),
    };
}

class ReviewModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { action, modalAction } = this.props;

        if (prevProps.action !== action) {
            if (action === modalAction) {
                this.showModal();
            } else if (action === 'hideModal') {
                this.hideModal();
            }
        }
    }

    renderModalHeader = (t) => {
        return (
            <ModalHeader>
                <ModalTitleText>{t('modal.review.title')}</ModalTitleText>
                <ModalDismiss textDismiss modalCloseAction='closeReview' />
                <ModalContinue continueText={t('label.modal.save')} />
            </ModalHeader>
        );
    };

    handleSubmitEditing = () => {
        this.hideModal();
    };

    addReview = () => {
        const { dispatchReviewData } = this.props;
        dispatchReviewData();
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    showModal = () => {
        this.setState({ modalVisible: true });
    };

    hideModal = () => {
        const { modalCloseAction } = this.props;

        if (modalCloseAction === 'addReview') {
            this.addReview();
        }
        this.setState({ modalVisible: false });
    };

    renderModalBody = () => <ModalBody />;

    render() {
        const { modalVisible } = this.state;
        const { animationType, transparent, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody()}
                </RootView>
            </Modal>
        );
    }
}

ReviewModal.propTypes = propTypes;
ReviewModal.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(ReviewModal)));
