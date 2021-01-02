import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/min/locales';
import ReadMore from 'react-native-read-more-text';
import { deleteReviewData } from '../actions/Review';
import Avatar from './Avatar';
import Stars from './Stars';
import LikeButton from './LikeButton';
import OverflowButton from './review/Overflow';
import { getLanguageCode } from '../utils/Localization';
import { showModal, setReviewData } from '../actions/Modal';
import {
    ReviewItem,
    Header,
    Info,
    Name,
    Timestamp,
    Body,
    StarWrapper,
    Review,
} from '../styles/Review';
import { ActionText } from '../styles/Text';
import { reviewActionSheet } from './action_sheets/Review';
import { parseText } from '../utils/Text';
import { timestamps } from '../constants/Index';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    dispatchReviewData: PropTypes.func.isRequired,
    dispatchDeleteReview: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    rating: PropTypes.number.isRequired,
    rid: PropTypes.string.isRequired,
    hid: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    savedOn: PropTypes.object.isRequired,
    numberOfLines: PropTypes.number,
    userLikes: PropTypes.array.isRequired,
    truncationLimit: PropTypes.number,
};

const defaultProps = {
    numberOfLines: 5,
    truncationLimit: 300,
};

function mapStateToProps(state) {
    return {
        reviewData: state.reviewReducer.reviewData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDeleteReview: (reviewData) =>
            dispatch(deleteReviewData(reviewData)),
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
        dispatchReviewData: (reviewData) => dispatch(setReviewData(reviewData)),
    };
}

class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timestamp: null,
            review: undefined,
        };

        this.bindActionSheet();
    }

    componentDidMount() {
        this.updateReview();
        this.setLanguage();
        this.setTimestamp();
    }

    componentDidUpdate(prevProps) {
        const { review } = this.props;

        if (prevProps.review !== review) {
            this.updateReview();
            this.bindActionSheet();
        }
    }

    bindActionSheet = () => {
        const {
            t,
            rid,
            user,
            review,
            rating,
            dispatchModalFlag,
            dispatchReviewData,
        } = this.props;

        const data = { user, review, rating, rid };

        this.reviewActionSheet = reviewActionSheet.bind(
            this,
            t,
            data,
            dispatchModalFlag,
            dispatchReviewData,
        );
    };

    setLanguage = () => {
        const lang = getLanguageCode();
        moment.locale(lang);
    };

    deleteReview = () => {
        const { dispatchDeleteReview, rid, hid } = this.props;
        dispatchDeleteReview({ rid, hid });
    };

    setTimestamp = () => {
        const { savedOn } = this.props;
        const timestamp = savedOn.toDate();

        this.setState({
            timestamp: moment(timestamp).format(timestamps.standard),
        });
    };

    renderHeader = () => {
        const { user } = this.props;
        const { timestamp } = this.state;

        return (
            <Header>
                <Avatar avatar={user.photoURL} size={40} />
                <Info>
                    <Name>{user.name}</Name>
                    <Timestamp>{timestamp}</Timestamp>
                </Info>
            </Header>
        );
    };

    expandText = (handlePress) => {
        const { review } = this.props;

        handlePress();
        this.setState({ review });
    };

    renderTruncatedFooter = (handlePress) => {
        const { t } = this.props;
        const truncateReview = this.maybeTruncateReview();

        if (truncateReview) {
            return (
                <ActionText onPress={() => this.expandText(handlePress)}>
                    {t('label.common.read')}
                </ActionText>
            );
        }

        return null;
    };

    renderRevealedFooter = () => {
        return null;
    };

    maybeTruncateReview = () => {
        const { truncationLimit } = this.props;
        const { review } = this.state;

        if (review && review.length >= truncationLimit) {
            return true;
        }

        return false;
    };

    updateReview() {
        const { review } = this.props;

        if (review) {
            this.setState({
                review: parseText(review),
            });
        }
    }

    renderBody = () => {
        const { rating, numberOfLines, rid, userLikes } = this.props;
        const { review } = this.state;

        return (
            <Body>
                <StarWrapper>
                    <Stars rating={rating} starSize={17} disabled />
                </StarWrapper>
                <ReadMore
                    numberOfLines={numberOfLines}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}
                >
                    <Review>{review}</Review>
                </ReadMore>
                <LikeButton rid={rid} userLikes={userLikes} />
                <OverflowButton onPress={this.reviewActionSheet} />
            </Body>
        );
    };

    render() {
        return (
            <ReviewItem>
                {this.renderHeader()}
                {this.renderBody()}
            </ReviewItem>
        );
    }
}

ReviewListItem.propTypes = propTypes;
ReviewListItem.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(ReviewListItem));
