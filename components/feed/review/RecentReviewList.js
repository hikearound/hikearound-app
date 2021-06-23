import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { withNavigation } from '@utils/Navigation';
import RecentReviewListItem from '@components/feed/review/RecentReviewListItem';
import { fontWeights, fontSizes, spacing } from '@constants/Index';
import { getScreenWidth } from '@utils/Screen';
import { cardWidth as itemWidth } from '@constants/Carousel';
import { animatedStyles } from '@utils/Animation';

const propTypes = {
    reviews: PropTypes.array,
    layout: PropTypes.string,
    activeSlideAlignment: PropTypes.string,
};

const defaultProps = {
    reviews: [],
    layout: 'default',
    activeSlideAlignment: 'start',
};

class RecentReviewList extends React.Component {
    renderPadding = () => <Padding />;

    renderListHeader = () => {
        const { t } = this.props;

        return (
            <View>
                <Text>{t('label.heading.recentReviews')}</Text>
            </View>
        );
    };

    renderItem = ({ item }) => {
        const { id, hid, rating, review, savedOn, userLikes, user, hike } =
            item;

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
        const { reviews, layout, activeSlideAlignment } = this.props;

        return (
            <ListWrapper>
                {this.renderListHeader()}
                <Carousel
                    data={reviews}
                    layout={layout}
                    extraData={reviews}
                    ListHeaderComponent={this.renderPadding}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                    itemWidth={itemWidth + parseInt(spacing.tiny, 10)}
                    sliderWidth={getScreenWidth()}
                    activeSlideAlignment={activeSlideAlignment}
                    slideInterpolatedStyle={animatedStyles}
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
    margin-top: 13px;
    margin-bottom: 2px;
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
