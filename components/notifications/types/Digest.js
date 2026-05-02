import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { opacities } from '@constants/Index';
import {
  Timestamp,
  Title,
  Subtitle,
  NotificationWrapper,
  NotificationBody,
} from '@styles/Notifications';
import { withNavigation } from '@utils/Navigation';
import { markNotificationAsRead } from '@utils/Notifications';
import { openHikeScreen } from '@utils/Hike';
import { notifStar } from '@constants/Images';

const propTypes = {
  createdOn: PropTypes.string.isRequired,
  hike: PropTypes.object.isRequired,
  nid: PropTypes.string.isRequired,
  hid: PropTypes.string.isRequired,
  capitalizeTimestamp: PropTypes.bool.isRequired,
};

const renderIcon = () => <Icon source={notifStar} />;

const renderTitle = t => <Title>{t('notifications.digest.title')}</Title>;

const renderSubtitle = (t, hike) => (
  <Subtitle>
    {t('notifications.digest.subtitle', {
      name: hike.name,
      city: hike.city,
      state: hike.state,
    })}
  </Subtitle>
);

const renderTimestamp = (createdOn, capitalizeTimestamp) => (
  <Timestamp capitalize={capitalizeTimestamp}>{createdOn}</Timestamp>
);

class DigestNotification extends React.Component {
  onPress = async () => {
    const { hid, nid, navigation } = this.props;

    openHikeScreen(hid, navigation, {});
    markNotificationAsRead(nid);
  };

  render() {
    const { t, hike, createdOn, capitalizeTimestamp } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={opacities.regular}
        onPress={this.onPress}
      >
        <NotificationWrapper>
          {renderIcon()}
          <NotificationBody>
            {renderTitle(t)}
            {renderSubtitle(t, hike)}
            {renderTimestamp(createdOn, capitalizeTimestamp)}
          </NotificationBody>
        </NotificationWrapper>
      </TouchableOpacity>
    );
  }
}

DigestNotification.propTypes = propTypes;

export default withTranslation()(withNavigation(DigestNotification));

const Icon = styled.Image`
  display: flex;
  height: 40px;
  width: 40px;
`;
