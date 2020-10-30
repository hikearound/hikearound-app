import React from 'react';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { colors } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { showModal } from '../actions/Modal';

const propTypes = {
    onStarRatingPress: PropTypes.func.isRequired,
    starSize: PropTypes.number,
    maxStars: PropTypes.number,
    emptyStar: PropTypes.string,
    halfStar: PropTypes.string,
    fullStar: PropTypes.string,
    iconSet: PropTypes.string,
    rating: PropTypes.number,
};

const defaultProps = {
    emptyStar: 'ios-star-outline',
    halfStar: 'ios-star-half',
    fullStar: 'ios-star',
    iconSet: 'Ionicons',
    starSize: 25,
    maxStars: 5,
    rating: 0,
};

function mapStateToProps(state) {
    return {
        closeAction: state.modalReducer.closeAction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class Stars extends React.PureComponent {
    render() {
        const {
            starSize,
            maxStars,
            emptyStar,
            fullStar,
            halfStar,
            iconSet,
            onStarRatingPress,
            rating,
        } = this.props;

        return (
            <StarRating
                disabled={false}
                emptyStar={emptyStar}
                fullStar={fullStar}
                halfStar={halfStar}
                iconSet={iconSet}
                maxStars={maxStars}
                rating={rating}
                selectedStar={(selectedRating) =>
                    onStarRatingPress(selectedRating)
                }
                starSize={starSize}
                starStyle={{ paddingLeft: 1.5, paddingRight: 1.5 }}
                fullStarColor={colors.purple}
                emptyStarColor={colors.grayMedium}
            />
        );
    }
}

Stars.propTypes = propTypes;
Stars.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Stars));
