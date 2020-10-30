import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import Stars from '../Stars';
import { addReviewData } from '../../actions/Review';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import { toggleModalVisibility } from '../../utils/Modal';
import { fontWeights, fontSizes, spacing } from '../../constants/Index';
import ModalHeader from './Header';
import { ModalBody } from '../../styles/Modals';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    dispatchReviewData: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    closeAction: PropTypes.string.isRequired,
    selectedStars: PropTypes.number.isRequired,
    hid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

const defaultProps = {
    animationType: 'push',
    modalType: 'review',
    transparent: true,
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
        closeAction: state.modalReducer.closeAction,
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
        const { currentModal, modalType } = this.props;

        toggleModalVisibility(
            prevProps,
            currentModal,
            modalType,
            this.showModal,
            this.hideModal,
        );
    }

    onStarRatingPress = (rating) => {
        this.setState({ rating });
    };

    renderModalHeader = (t) => {
        return (
            <ModalHeader
                title={t('modal.review.title')}
                dismissAction='closeReview'
                continueAction='addReview'
                continueText={t('label.modal.save')}
            />
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
        this.setRating();
        this.setState({ modalVisible: true });
    };

    hideModal = () => {
        this.maybeAddReviewData();
        this.setState({ modalVisible: false });
    };

    setRating = () => {
        const { selectedStars } = this.props;
        this.setState({ rating: selectedStars });
    };

    maybeAddReviewData = () => {
        const { closeAction } = this.props;

        if (closeAction === 'addReview') {
            this.addReview();
        }
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
