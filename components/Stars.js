import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { connect } from 'react-redux';
import { colors } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { showModal } from '@actions/Modal';

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
            onStarRatingPress,
            rating,
            disabled,
            filledColor,
            emptyColor,
        } = this.props;

        return (
            <StarRating
                rating={rating}
                onChange={disabled ? undefined : onStarRatingPress}
                starSize={starSize}
                maxStars={maxStars}
                color={filledColor}
                emptyColor={emptyColor}
                enableSwiping={!disabled}
                enableHalfStar={false}
                style={{ alignSelf: 'flex-start' }}
                starSize={starSize + 3}
                starStyle={{ marginLeft: 0, marginRight: 1 }}
            />
        );
    }
}

Stars.propTypes = propTypes;
Stars.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Stars));
