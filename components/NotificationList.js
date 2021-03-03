import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { withTranslation } from 'react-i18next';
import ReviewLikeNotification from './notifications/types/Review';

const propTypes = {
    notificationData: PropTypes.array.isRequired,
    refreshControl: PropTypes.object.isRequired,
};

const defaultProps = {};

class NotificationList extends React.Component {
    renderItem = ({ item }) => {
        if (item.type === 'reviewLike') {
            return (
                <ReviewLikeNotification
                    id={item.id}
                    nid={item.id}
                    sender={item.sender}
                    hike={item.hike}
                    hid={item.hid}
                    createdOn={item.createdOn}
                />
            );
        }
        return null;
    };

    render() {
        const { notificationData, refreshControl } = this.props;
        const extractKey = ({ id }) => id;

        return (
            <>
                {notificationData && (
                    <FlatList
                        renderItem={this.renderItem}
                        refreshControl={refreshControl}
                        data={notificationData}
                        extraData={notificationData}
                        keyExtractor={extractKey}
                        scrollEnabled
                    />
                )}
            </>
        );
    }
}

NotificationList.propTypes = propTypes;
NotificationList.defaultProps = defaultProps;

export default withTranslation()(NotificationList);
