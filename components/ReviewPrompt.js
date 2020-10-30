import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Stars from './Stars';
import { borderRadius, spacing } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { showModal } from '../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    modalCloseAction: PropTypes.string.isRequired,
    setSelectedStars: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        modalCloseAction: state.modalReducer.modalCloseAction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class ReviewPrompt extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onStarRatingPress = this.onStarRatingPress.bind(this);
        this.state = { rating: 0 };
    }

    componentDidUpdate() {
        const { modalCloseAction } = this.props;

        if (modalCloseAction === 'closeReview') {
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

        return (
            <PromptWrapper>
                <PromptTitle>Tried this hike? Leave a review!</PromptTitle>
                <StarWrapper>
                    <Stars
                        rating={rating}
                        onStarRatingPress={this.onStarRatingPress}
                    />
                </StarWrapper>
            </PromptWrapper>
        );
    }
}

ReviewPrompt.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(ReviewPrompt));

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
