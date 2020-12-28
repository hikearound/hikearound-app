import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Stars from './Stars';
import { borderRadius, spacing } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { showModal } from '../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    closeAction: PropTypes.string.isRequired,
    setSelectedStars: PropTypes.func.isRequired,
    reviewedHikes: PropTypes.array.isRequired,
    hid: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        closeAction: state.modalReducer.closeAction,
        reviewedHikes: state.userReducer.reviewedHikes,
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

        this.onStarRatingPress = this.onStarRatingPress.bind(this);
        this.state = { rating: 0 };
    }

    componentDidUpdate() {
        const { closeAction } = this.props;

        if (closeAction === 'closeReview') {
            this.resetStars();
        }
    }

    onStarRatingPress(rating) {
        const { dispatchModalFlag, setSelectedStars } = this.props;

        dispatchModalFlag('review');
        setSelectedStars(rating);

        this.setState({ rating });
    }

    resetStars() {
        this.setState({ rating: 0 });
    }

    render() {
        const { rating } = this.state;
        const { reviewedHikes, hid, t } = this.props;

        if (!reviewedHikes.includes(hid)) {
            return (
                <PromptWrapper>
                    <PromptTitle>{t('screen.hike.review.prompt')}</PromptTitle>
                    <StarWrapper>
                        <Stars
                            rating={rating}
                            onStarRatingPress={this.onStarRatingPress}
                            starSize={19}
                        />
                    </StarWrapper>
                </PromptWrapper>
            );
        }
        return null;
    }
}

ReviewPrompt.propTypes = propTypes;

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
