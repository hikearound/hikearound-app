import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import ModalDismiss from './header/Dismiss';
import Stars from '../Stars';
import ModalContinue from './header/Continue';
import { addReviewData } from '../../actions/Review';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import { ModalHeader, ModalTitleText, ModalBody } from '../../styles/Modals';
import { toggleModalVisibility } from '../../utils/Modal';
import { fontWeights, fontSizes, spacing } from '../../constants/Index';

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

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { action, modalAction } = this.props;
        const prevAction = prevProps.action;

        toggleModalVisibility(
            action,
            modalAction,
            prevAction,
            this.showModal,
            this.hideModal,
        );
    }

    onStarRatingPress = (rating) => {
        this.setState({ rating });
    };

    renderModalHeader = (t) => {
        return (
            <ModalHeader>
                <ModalTitleText>{t('modal.review.title')}</ModalTitleText>
                <ModalDismiss textDismiss modalCloseAction='closeReview' />
                <ModalContinue
                    continueText={t('label.modal.save')}
                    modalCloseAction='addReview'
                />
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
        const { selectedStars } = this.props;

        this.setState({
            modalVisible: true,
            rating: selectedStars,
        });
    };

    hideModal = () => {
        const { modalCloseAction } = this.props;

        if (modalCloseAction === 'addReview') {
            this.addReview();
        }

        this.setState({ modalVisible: false });
    };

    renderModalBody = () => {
        const { name } = this.props;
        const { rating } = this.state;

        return (
            <ModalBody includePadding>
                <HikeName>{name}</HikeName>
                <StarWrapper>
                    <Stars
                        rating={rating}
                        starSize={20}
                        onStarRatingPress={this.onStarRatingPress}
                    />
                </StarWrapper>
            </ModalBody>
        );
    };

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

const HikeName = styled.Text`
    color: ${(props) => props.theme.text};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.extraLarge}px;
    line-height: ${fontSizes.big}px;
    padding-top: ${spacing.micro}px;
`;

const StarWrapper = styled.View`
    margin-top: 2px;
    width: 50px;
`;
