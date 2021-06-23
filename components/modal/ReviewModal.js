import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import Stars from '@components/Stars';
import { addReviewData, updateReviewData } from '@actions/Review';
import { withTheme } from '@utils/Themes';
import { RootView } from '@styles/Screens';
import { toggleModalVisibility } from '@utils/Modal';
import { fontWeights, fontSizes, spacing, timings } from '@constants/Index';
import ModalHeader from '@components/modal/Header';
import { ModalBody } from '@styles/Modals';
import { getInputs } from '@utils/Inputs';
import { writeReview, updateReview } from '@utils/Review';
import { updateReviewedHikes } from '@actions/User';
import LoadingOverlay from '@components/LoadingOverlay';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    dispatchReviewData: PropTypes.func.isRequired,
    dispatchUpdatedReviewData: PropTypes.func.isRequired,
    dispatchReviewedHikes: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    reviewData: PropTypes.object,
    closeAction: PropTypes.string.isRequired,
    selectedStars: PropTypes.number.isRequired,
    hid: PropTypes.string.isRequired,
    hike: PropTypes.object.isRequired,
    reviewedHikes: PropTypes.array.isRequired,
};

const defaultProps = {
    animationType: 'push',
    modalType: 'review',
    transparent: true,
    reviewData: {},
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
        closeAction: state.modalReducer.closeAction,
        reviewedHikes: state.userReducer.reviewedHikes,
        reviewData: state.modalReducer.reviewData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchReviewData: (reviewData) => dispatch(addReviewData(reviewData)),
        dispatchUpdatedReviewData: (reviewData) =>
            dispatch(updateReviewData(reviewData)),
        dispatchReviewedHikes: (reviewedHikes) =>
            dispatch(updateReviewedHikes(reviewedHikes)),
    };
}

class ReviewModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { t, modalType } = this.props;
        const inputs = getInputs(t, modalType);

        this.state = {
            continueDisabled: true,
            modalVisible: false,
            loading: false,
            inputs,
            review: null,
        };
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType, reviewData } = this.props;

        const functions = {
            show: this.showModal.bind(this),
            hide: this.hideModal.bind(this),
        };

        if (prevProps.reviewData !== reviewData) {
            this.maybeSetValues();
        }

        toggleModalVisibility(prevProps, currentModal, modalType, functions);
    }

    onStarRatingPress = (rating) => {
        this.setState({ rating });
        this.maybeToggleSaveButton();
    };

    async setValue(name, text) {
        await this.setState({ [name]: text });
        this.maybeToggleSaveButton();
    }

    maybeSetValues = () => {
        const { reviewData } = this.props;

        if (reviewData.review && reviewData.rating) {
            this.setState({
                review: reviewData.review,
                rating: reviewData.rating,
                rid: reviewData.rid,
            });
        }
    };

    maybeToggleSaveButton = () => {
        const { review } = this.state;

        let continueDisabled = true;
        if (review) {
            continueDisabled = false;
        }

        this.setState({ continueDisabled });
    };

    renderModalHeader = (t) => {
        const { reviewData } = this.props;
        const { continueDisabled } = this.state;

        let continueAction = 'addReview';

        if (reviewData.isEditing) {
            continueAction = 'updateReview';
        }

        return (
            <ModalHeader
                title={t('modal.review.title')}
                dismissAction='closeReview'
                continueAction={continueAction}
                continueText={t('label.modal.save')}
                continueDisabled={continueDisabled}
            />
        );
    };

    addReview = async () => {
        const {
            hid,
            hike,
            reviewedHikes,
            dispatchReviewData,
            dispatchReviewedHikes,
        } = this.props;
        const { review, rating } = this.state;

        this.setState({ loading: true });

        const reviewData = await writeReview({
            hid,
            review,
            rating,
            geohash: hike.geohash,
        });

        reviewedHikes.push(hid);

        dispatchReviewData(reviewData);
        dispatchReviewedHikes(reviewedHikes);
    };

    updateReview = async () => {
        const { dispatchUpdatedReviewData } = this.props;
        const { review, rating, rid } = this.state;
        const reviewData = { rid, review, rating };

        this.setState({ loading: true });
        await updateReview(reviewData);

        dispatchUpdatedReviewData(reviewData);
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    showModal = () => {
        this.setRating();
        this.setState({ modalVisible: true });
    };

    hideModal = () => {
        this.maybeWriteReviewData();
    };

    setRating = () => {
        const { selectedStars, reviewData } = this.props;

        if (!reviewData.rating) {
            this.setState({ rating: selectedStars });
        }
    };

    maybeWriteReviewData = () => {
        const { closeAction } = this.props;

        if (closeAction === 'addReview') {
            this.addReview();
        }

        if (closeAction === 'updateReview') {
            this.updateReview();
        }

        if (closeAction === 'updateReview' || closeAction === 'addReview') {
            this.setLoadingTimeout();
        }

        if (closeAction === 'closeReview') {
            this.setState({ modalVisible: false });
        }
    };

    setLoadingTimeout = () => {
        setTimeout(() => {
            this.setState({
                loading: false,
                modalVisible: false,
            });
        }, timings.extraLong);
    };

    renderModalBody = () => {
        const { hike } = this.props;
        const { rating, inputs, review } = this.state;

        return (
            <ModalBody includePadding>
                <HikeName>{hike.name}</HikeName>
                <StarWrapper>
                    <Stars
                        rating={rating}
                        starSize={17}
                        onStarRatingPress={this.onStarRatingPress}
                    />
                </StarWrapper>
                {inputs.map(
                    (
                        {
                            name,
                            placeholder,
                            textContentType,
                            multiline,
                            returnKeyType,
                            autoCompleteType,
                            autoFocus,
                        },
                        index,
                    ) => (
                        <Input
                            key={index}
                            placeholder={placeholder}
                            defaultValue={review}
                            multiline={multiline}
                            autoCompleteType={autoCompleteType}
                            onChangeText={(text) =>
                                this.setValue(name, text, index)
                            }
                            labelName={placeholder}
                            textContentType={textContentType}
                            returnKeyType={returnKeyType}
                            inputRef={(ref) => this.assignRef(ref, name)}
                            autoFocus={autoFocus}
                        />
                    ),
                )}
            </ModalBody>
        );
    };

    render() {
        const { modalVisible, loading } = this.state;
        const { animationType, transparent, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
            >
                <RootView>
                    <LoadingOverlay loading={loading} />
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

const Input = styled.TextInput.attrs((props) => ({
    placeholderTextColor: props.theme.inputPlaceholderText,
}))`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
    padding-top: 3px;
`;

const HikeName = styled.Text`
    color: ${(props) => props.theme.text};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.extraLarge}px;
    line-height: ${fontSizes.big}px;
    padding-top: ${spacing.micro}px;
`;

const StarWrapper = styled.View`
    margin-top: 2px;
    width: 45px;
`;
