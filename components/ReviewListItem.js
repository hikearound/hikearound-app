import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/min/locales';
import Avatar from './Avatar';
import Stars from './Stars';
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

const propTypes = {
    user: PropTypes.object.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    savedOn: PropTypes.object.isRequired,
};

class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: null,
        };
    }

    componentDidMount() {
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
            timestamp: moment(timestamp).format('ddd MMM Do'),
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

    renderBody = () => {
        const { rating, review } = this.props;

        return (
            <Body>
                <StarWrapper>
                    <Stars rating={rating} starSize={18} disabled />
                </StarWrapper>
                <Review>{review}</Review>
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

export default withTranslation()(ReviewListItem);
