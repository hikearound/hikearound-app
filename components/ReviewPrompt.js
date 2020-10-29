import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { colors, borderRadius, spacing } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { showModal } from '../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    modalCloseAction: PropTypes.string,
    setSelectedStars: PropTypes.func.isRequired,
    starSize: PropTypes.number,
    maxStars: PropTypes.number,
    emptyStar: PropTypes.string,
    halfStar: PropTypes.string,
    fullStar: PropTypes.string,
    iconSet: PropTypes.string,
};

const defaultProps = {
    modalCloseAction: null,
    emptyStar: 'ios-star-outline',
    halfStar: 'ios-star-half',
    fullStar: 'ios-star',
    iconSet: 'Ionicons',
    starSize: 25,
    maxStars: 5,
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

        this.state = {
            starCount: 0,
        };
    }

    componentDidUpdate() {
        const { modalCloseAction } = this.props;

        console.log(modalCloseAction)
        if (modalCloseAction === 'closeReview') {
            this.resetStars();
        }
    }

    onStarRatingPress(rating) {
        const { dispatchModalFlag, setSelectedStars } = this.props;

        dispatchModalFlag('review');
        setSelectedStars(rating);

        this.setState({
            starCount: rating,
        });
    }

    resetStars() {
        this.setState({ starCount: 0 });
    }

    render() {
        const {
            starSize,
            maxStars,
            emptyStar,
            fullStar,
            halfStar,
            iconSet,
        } = this.props;
        const { starCount } = this.state;

        return (
            <PromptWrapper>
                <PromptTitle>Tried this hike? Leave a review!</PromptTitle>
                <StarWrapper>
                    <StarRating
                        disabled={false}
                        emptyStar={emptyStar}
                        fullStar={fullStar}
                        halfStar={halfStar}
                        iconSet={iconSet}
                        maxStars={maxStars}
                        rating={starCount}
                        selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                        }
                        starSize={starSize}
                        starStyle={{ paddingLeft: 1.5, paddingRight: 1.5 }}
                        fullStarColor={colors.purple}
                        emptyStarColor={colors.grayMedium}
                    />
                </StarWrapper>
            </PromptWrapper>
        );
    }
}

ReviewPrompt.propTypes = propTypes;
ReviewPrompt.defaultProps = defaultProps;

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
