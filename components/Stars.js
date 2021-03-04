import React from 'react';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { colors } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { showModal } from '../actions/Modal';

const propTypes = {
    onStarRatingPress: PropTypes.func,
    starSize: PropTypes.number,
    maxStars: PropTypes.number,
    emptyStar: PropTypes.string,
    halfStar: PropTypes.string,
    fullStar: PropTypes.string,
    iconSet: PropTypes.string,
    rating: PropTypes.number,
    disabled: PropTypes.bool,
    filledColor: PropTypes.string,
    emptyColor: PropTypes.string,
    halfStarEnabled: PropTypes.bool,
};

const defaultProps = {
    onStarRatingPress: () => {},
    emptyStar: 'star-o',
    halfStar: 'star-half-empty',
    fullStar: 'star',
    iconSet: 'FontAwesome',
    starSize: 22,
    maxStars: 5,
    rating: 0,
    disabled: false,
    filledColor: colors.purple,
    emptyColor: colors.gray,
    halfStarEnabled: false,
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
            disabled,
            filledColor,
            emptyColor,
            halfStarEnabled,
        } = this.props;

        return (
            <StarRating
                disabled={disabled}
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
                fullStarColor={filledColor}
                emptyStarColor={emptyColor}
                halfStarEnabled={halfStarEnabled}
            />
        );
    }
}

Stars.propTypes = propTypes;
Stars.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Stars));
