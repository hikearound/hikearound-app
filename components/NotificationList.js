import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { withTranslation } from 'react-i18next';
import ReviewLikeNotification from '@components/notifications/types/Review';
import DigestNotification from '@components/notifications/types/Digest';
import { timestamps, spacing } from '@constants/Index';
import { shouldCapitalizeTimestamp } from '@utils/Localization';
import { getLocalizedMoment, formatDate } from '@utils/Time';
import { withScrollToTop } from '@utils/Navigation';

const propTypes = {
  notificationData: PropTypes.array.isRequired,
  refreshControl: PropTypes.object.isRequired,
  scrollRef: PropTypes.object.isRequired,
};

const defaultProps = {};

const formatTimestamp = createdOn => {
  const moment = getLocalizedMoment();
  return moment(formatDate(createdOn)).format(timestamps.notification);
};

const renderItem = ({ item }) => {
  const createdOn = formatTimestamp(item.createdOn);
  const capitalizeTimestamp = shouldCapitalizeTimestamp();

  if (item.type === 'reviewLike') {
    return (
      <ReviewLikeNotification
        id={item.id}
        nid={item.id}
        sender={item.sender}
        hike={item.hike}
        hid={item.hid}
        rid={item.extraData.rid}
        createdOn={createdOn}
        capitalizeTimestamp={capitalizeTimestamp}
      />
    );
  }

  if (item.type === 'digest') {
    return (
      <DigestNotification
        id={item.id}
        nid={item.id}
        hike={item.hike}
        hid={item.hid}
        createdOn={createdOn}
        capitalizeTimestamp={capitalizeTimestamp}
      />
    );
  }

  return null;
};

class NotificationList extends React.Component {
  render() {
    const { notificationData, refreshControl, scrollRef } = this.props;
    const extractKey = ({ id }) => id;

    if (!notificationData) {
      return null;
    }

    return (
      <FlatList
        ref={scrollRef}
        renderItem={renderItem}
        refreshControl={refreshControl}
        data={notificationData}
        extraData={notificationData}
        keyExtractor={extractKey}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        contentContainerStyle={{
          paddingTop: parseInt(spacing.micro, 10),
          paddingBottom: parseInt(spacing.small, 10),
        }}
      />
    );
  }
}

NotificationList.propTypes = propTypes;
NotificationList.defaultProps = defaultProps;

export default withScrollToTop(withTranslation()(NotificationList));
