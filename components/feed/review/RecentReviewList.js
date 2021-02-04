import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { withNavigation } from '../../../utils/Navigation';
import RecentReviewListItem from './RecentReviewListItem';
import { fontWeights, fontSizes, spacing } from '../../../constants/Index';

const propTypes = {
    reviews: PropTypes.array,
};

const defaultProps = {
    reviews: [],
};

class RecentReviewList extends React.Component {
    renderPadding = () => {
        return <Padding />;
    };

    renderListHeader = () => {
        const { t } = this.props;

        return (
            <View>
                <Text>{t('label.heading.recentReviews')}</Text>
            </View>
        );
    };

    renderItem = ({ item }) => {
        const {
            id,
            hid,
            rating,
            review,
            savedOn,
            userLikes,
            user,
            hike,
        } = item;

        return (
            <RecentReviewListItem
                id={id}
                rid={id}
                hid={hid}
                rating={rating}
                review={review}
                savedOn={savedOn}
                userLikes={userLikes}
                user={user}
                hike={hike}
            />
        );
    };

    render() {
        const extractKey = ({ id }) => id;
        const { reviews } = this.props;

        return (
            <ListWrapper>
                {this.renderListHeader()}
                <FlatList
                    directionalLockEnabled
                    horizontal
                    ListHeaderComponent={this.renderPadding}
                    showsHorizontalScrollIndicator={false}
                    data={reviews}
                    extraData={reviews}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />
            </ListWrapper>
        );
    }
}

RecentReviewList.propTypes = propTypes;
RecentReviewList.defaultProps = defaultProps;

export default withTranslation()(withNavigation(RecentReviewList));

export const ListWrapper = styled.View`
    background-color: ${(props) => props.theme.reviewSectionBackground};
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${(props) => props.theme.itemBorder};
    margin-top: ${spacing.tiny}px;
    padding-bottom: ${spacing.tiny}px;
`;

export const View = styled.View`
    padding: ${spacing.tiny}px;
`;

export const Padding = styled.View`
    padding-left: ${spacing.tiny}px;
`;

export const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    width: 100%;
    flex-direction: row;
`;
