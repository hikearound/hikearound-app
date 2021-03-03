import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/min/locales';
import { getLanguageCode } from '../../../utils/Localization';
import { timestamps, opacities } from '../../../constants/Index';
import Avatar from '../../Avatar';
import {
    Timestamp,
    Title,
    Subtitle,
    NotificationWrapper,
    NotificationBody,
} from '../../../styles/Notifications';
import { withNavigation } from '../../../utils/Navigation';
import { markNotificationAsRead } from '../../../utils/Notifications';
import { openHikeScreen } from '../../../utils/Hike';

const propTypes = {
    createdOn: PropTypes.object.isRequired,
    sender: PropTypes.object.isRequired,
    hike: PropTypes.object.isRequired,
    hid: PropTypes.string.isRequired,
    nid: PropTypes.string.isRequired,
};

class ReviewLikeNotification extends React.Component {
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
        const { createdOn } = this.props;

        const timestamp = createdOn.toDate();
        const format = timestamps.notification;

        this.setState({
            timestamp: moment(timestamp).format(format),
        });
    };

    onPress = async () => {
        const { hid, nid, navigation } = this.props;

        openHikeScreen(hid, navigation, { scrollToReviewList: true });
        markNotificationAsRead(nid);
    };

    render() {
        const { sender, hike, t } = this.props;
        const { timestamp } = this.state;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
            >
                <NotificationWrapper>
                    <Avatar avatar={sender.photoURL} size={40} />
                    <NotificationBody>
                        <Title>
                            {t('notifications.reviewLike.title', {
                                name: sender.name,
                            })}
                        </Title>
                        <Subtitle>
                            {t('notifications.reviewLike.subtitle', {
                                name: hike.name,
                                city: hike.city,
                                state: hike.state,
                            })}
                        </Subtitle>
                        <Timestamp>{timestamp}</Timestamp>
                    </NotificationBody>
                </NotificationWrapper>
            </TouchableOpacity>
        );
    }
}

ReviewLikeNotification.propTypes = propTypes;

export default withTranslation()(withNavigation(ReviewLikeNotification));
