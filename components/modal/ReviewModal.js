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
import {
    fontWeights,
    fontSizes,
    spacing,
    timings,
} from '../../constants/Index';
import ModalHeader from './Header';
import { ModalBody } from '../../styles/Modals';
import { getInputs } from '../../utils/Inputs';
import { writeReviewData } from '../../utils/Review';
import { updateReviewedHikes } from '../../actions/User';
import LoadingOverlay from '../LoadingOverlay';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    dispatchReviewData: PropTypes.func.isRequired,
    dispatchReviewedHikes: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    closeAction: PropTypes.string.isRequired,
    selectedStars: PropTypes.number.isRequired,
    hid: PropTypes.string.isRequired,
    hikeName: PropTypes.string.isRequired,
    reviewedHikes: PropTypes.array.isRequired,
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
        reviewedHikes: state.userReducer.reviewedHikes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchReviewData: (reviewData) => dispatch(addReviewData(reviewData)),
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
            modalVisible: false,
            loading: false,
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

    onStarRatingPress = (rating) => {
        this.setState({ rating });
    };

    setValue(name, text) {
        this.setState({ [name]: text });
    }

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

    addReview = async () => {
        const {
            dispatchReviewData,
            dispatchReviewedHikes,
            hid,
            reviewedHikes,
        } = this.props;
        const { review, rating } = this.state;

        this.setState({ loading: true });

        const reviewData = await writeReviewData({ hid, review, rating });

        reviewedHikes.push(hid);

        dispatchReviewData(reviewData);
        dispatchReviewedHikes(reviewedHikes);
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
    };

    setRating = () => {
        const { selectedStars } = this.props;
        this.setState({ rating: selectedStars });
    };

    maybeAddReviewData = () => {
        const { closeAction } = this.props;

        if (closeAction === 'addReview') {
            this.addReview();

            this.loadingTimeout = setTimeout(() => {
                this.setState({
                    loading: false,
                    modalVisible: false,
                });
            }, timings.long);
        }

        if (closeAction === 'closeReview') {
            this.setState({ modalVisible: false });
        }
    };

    renderModalBody = () => {
        const { hikeName } = this.props;
        const { rating, inputs } = this.state;

        return (
            <ModalBody includePadding>
                <HikeName>{hikeName}</HikeName>
                <StarWrapper>
                    <Stars
                        rating={rating}
                        starSize={18}
                        onStarRatingPress={this.onStarRatingPress}
                    />
                </StarWrapper>
                {inputs.map(
                    (
                        {
                            name,
                            defaultValue,
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
                            defaultValue={defaultValue}
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
