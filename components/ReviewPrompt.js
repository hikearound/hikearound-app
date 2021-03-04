import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Stars from './Stars';
import { borderRadius, spacing } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { showModal } from '../actions/Modal';
import { removeReviewFromArray, addReviewToArray } from '../utils/Review';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    closeAction: PropTypes.string.isRequired,
    setSelectedStars: PropTypes.func.isRequired,
    reviewedHikes: PropTypes.array.isRequired,
    selectedReview: PropTypes.string,
    selectedHike: PropTypes.string,
    hid: PropTypes.string.isRequired,
    reviewAction: PropTypes.string,
};

const defaultProps = {
    selectedReview: null,
    selectedHike: null,
    reviewAction: null,
};

function mapStateToProps(state) {
    return {
        closeAction: state.modalReducer.closeAction,
        reviewAction: state.reviewReducer.action,
        reviewedHikes: state.userReducer.reviewedHikes,
        selectedReview: state.reviewReducer.selectedReview,
        selectedHike: state.reviewReducer.selectedHike,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class ReviewPrompt extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { reviewedHikes } = this.props;

        this.onStarRatingPress = this.onStarRatingPress.bind(this);
        this.state = {
            rating: 0,
            reviews: reviewedHikes,
        };
    }

    async componentDidUpdate(prevProps) {
        const { closeAction, reviewAction, selectedReview } = this.props;

        if (closeAction === 'closeReview') {
            this.resetStars();
        }

        if (reviewAction === 'addReview') {
            if (prevProps.selectedReview !== selectedReview) {
                this.addReview();
            }
        }

        if (reviewAction === 'deleteReview') {
            if (prevProps.selectedReview !== selectedReview) {
                this.resetStars();
                this.removeReview();
            }
        }
    }

    onStarRatingPress(rating) {
        const { dispatchModalFlag, setSelectedStars } = this.props;

        dispatchModalFlag('review');
        setSelectedStars(rating);

        this.setState({ rating });
    }

    addReview = async () => {
        const { selectedHike } = this.props;
        const { reviews } = this.state;

        this.setState({ reviews: addReviewToArray(reviews, selectedHike) });
    };

    removeReview = async () => {
        const { selectedHike } = this.props;
        const { reviews } = this.state;

        this.setState({
            reviews: removeReviewFromArray(reviews, selectedHike),
        });
    };

    resetStars() {
        this.setState({ rating: 0 });
    }

    render() {
        const { rating, reviews } = this.state;
        const { hid, t } = this.props;

        if (!reviews.includes(hid)) {
            return (
                <PromptWrapper>
                    <PromptTitle>{t('screen.hike.review.prompt')}</PromptTitle>
                    <StarWrapper>
                        <Stars
                            rating={rating}
                            onStarRatingPress={this.onStarRatingPress}
                            starSize={18}
                        />
                    </StarWrapper>
                </PromptWrapper>
            );
        }
        return null;
    }
}

ReviewPrompt.propTypes = propTypes;
ReviewPrompt.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(ReviewPrompt)));

const PromptWrapper = styled.View`
    border: 1px solid;
    border-color: ${(props) => props.theme.itemBorder};
    border-radius: ${borderRadius.medium}px;
    padding: ${spacing.tiny}px;
    margin-top: ${spacing.medium}px;
    margin-bottom: ${spacing.micro}px;
`;

const StarWrapper = styled.View`
    margin: 0 auto;
`;

const PromptTitle = styled.Text`
    margin: 0 auto;
    margin-bottom: 2px;
    color: ${(props) => props.theme.text};
`;
