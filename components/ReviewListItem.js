import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/min/locales';
import ReadMore from 'react-native-read-more-text';
import Avatar from './Avatar';
import Stars from './Stars';
import LikeButton from './LikeButton';
import OverflowButton from './review/Overflow';
import { getLanguageCode } from '../utils/Localization';
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

const propTypes = {
    user: PropTypes.object.isRequired,
    rating: PropTypes.number.isRequired,
    rid: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    savedOn: PropTypes.object.isRequired,
    numberOfLines: PropTypes.number,
    userLikes: PropTypes.array.isRequired,
};

const defaultProps = {
    numberOfLines: 5,
};

class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);
        const { t, user } = this.props;

        this.state = {
            timestamp: null,
            review: undefined,
        };

        this.reviewActionSheet = reviewActionSheet.bind(this, t, user);
    }

    componentDidMount() {
        this.updateReview();
        this.setLanguage();
        this.setTimestamp();
    }

    setLanguage = () => {
        const lang = getLanguageCode();
        moment.locale(lang);
    };

    setTimestamp = () => {
        const { savedOn } = this.props;
        const timestamp = savedOn.toDate();

        this.setState({
            timestamp: moment(timestamp).format('ddd, MMM Do, YYYY'),
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
        const { review } = this.state;

        if (review && review.length >= 300) {
            return true;
        }

        return false;
    };

    updateReview() {
        const { review } = this.props;

        if (review) {
            this.setState({
                review: review.replace(/(\n\n)/gm, ' '),
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

export default withTranslation()(ReviewListItem);
