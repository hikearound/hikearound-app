import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StarRating from 'react-native-star-rating';
import { colors, borderRadius } from '../constants/Index';
import { withTheme } from '../utils/Themes';

const propTypes = {
    id: PropTypes.string.isRequired,
};

class ReviewPrompt extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            starCount: 0,
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
        });
    }

    render() {
        const { id } = this.props;
        const { starCount } = this.state;

        return (
            <PromptWrapper>
                <PromptTitle>Tried this hike? Leave a review!</PromptTitle>
                <StarWrapper>
                    <StarRating
                        disabled={false}
                        emptyStar='ios-star-outline'
                        fullStar='ios-star'
                        halfStar='ios-star-half'
                        iconSet='Ionicons'
                        maxStars={5}
                        rating={starCount}
                        selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                        }
                        starSize={25}
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

export default withTheme(ReviewPrompt);

const PromptWrapper = styled.View`
    border: 1px solid;
    border-color: ${(props) => props.theme.itemBorder};
    border-radius: ${borderRadius.medium}px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 5px;
`;

const StarWrapper = styled.View`
    margin: 0 auto;
`;

const PromptTitle = styled.Text`
    margin: 0 auto;
    margin-bottom: 2px;
    color: ${(props) => props.theme.text};
`;
