import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { opacities } from '@constants/Index';
import Avatar from '@components/Avatar';
import {
    Timestamp,
    Title,
    Subtitle,
    NotificationWrapper,
    NotificationBody,
} from '@styles/Notifications';
import { withNavigation } from '@utils/Navigation';
import { markNotificationAsRead } from '@utils/Notifications';
import { openReviewScreen } from '@utils/Review';

const propTypes = {
    createdOn: PropTypes.string.isRequired,
    sender: PropTypes.object.isRequired,
    hike: PropTypes.object.isRequired,
    rid: PropTypes.string.isRequired,
    nid: PropTypes.string.isRequired,
    capitalizeTimestamp: PropTypes.bool.isRequired,
};

class ReviewLikeNotification extends React.Component {
    onPress = async () => {
        const { rid, nid, navigation, t } = this.props;

        openReviewScreen(rid, navigation, t, {});
        markNotificationAsRead(nid);
    };

    renderIcon = (sender) => <Avatar avatar={sender.photoURL} size={40} />;

    renderTitle = (t, sender) => (
        <Title>
            {t('notifications.reviewLike.title', {
                name: sender.name,
            })}
        </Title>
    );

    renderSubtitle = (t, hike) => (
        <Subtitle>
            {t('notifications.reviewLike.subtitle', {
                name: hike.name,
                city: hike.city,
                state: hike.state,
            })}
        </Subtitle>
    );

    renderTimestamp = (createdOn, capitalizeTimestamp) => (
        <Timestamp capitalize={capitalizeTimestamp}>{createdOn}</Timestamp>
    );

    render() {
        const { t, sender, hike, createdOn, capitalizeTimestamp } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
            >
                <NotificationWrapper>
                    {this.renderIcon(sender)}
                    <NotificationBody>
                        {this.renderTitle(t, sender)}
                        {this.renderSubtitle(t, hike)}
                        {this.renderTimestamp(createdOn, capitalizeTimestamp)}
                    </NotificationBody>
                </NotificationWrapper>
            </TouchableOpacity>
        );
    }
}

ReviewLikeNotification.propTypes = propTypes;

export default withTranslation()(withNavigation(ReviewLikeNotification));
