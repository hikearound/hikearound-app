import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-reanimated-carousel';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { withNavigation } from '@utils/Navigation';
import RecentReviewListItem from '@components/feed/review/RecentReviewListItem';
import { fontWeights, fontSizes, spacing } from '@constants/Index';
import { getScreenWidth } from '@utils/Screen';
import { cardWidth as itemWidth } from '@constants/Carousel';

const propTypes = {
    reviews: PropTypes.array,
    hasTransparentBackground: PropTypes.bool,
};

const defaultProps = {
    reviews: [],
    hasTransparentBackground: false,
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
        const { reviews, hasTransparentBackground, t } = this.props;

        return (
            <ListWrapper hasTransparentBackground={hasTransparentBackground}>
                {this.renderListHeader()}
                {reviews.length > 0 ? (
                    <CarouselWrapper>
                        {this.renderPadding()}
                        <Carousel
                            data={reviews}
                            renderItem={this.renderItem}
                            width={itemWidth + parseInt(spacing.tiny, 10)}
                            height={190}
                            style={{ width: getScreenWidth() }}
                            scrollAnimationDuration={300}
                            snapEnabled={true}
                            overscrollEnabled={false}
                            withAnimation={{
                                type: 'spring',
                                config: {
                                    damping: 15,
                                    mass: 1,
                                    stiffness: 150,
                                },
                            }}
                            panGestureHandlerProps={{
                                activeOffsetX: [-5, 5],
                                minVelocityX: 50,
                            }}
                        />
                    </CarouselWrapper>
                ) : (
                    <EmptyState>
                        <EmptyStateText>
                            {t('label.heading.noRecentReviews')}
                        </EmptyStateText>
                    </EmptyState>
                )}
            </ListWrapper>
        );
    }
}

RecentReviewList.propTypes = propTypes;
RecentReviewList.defaultProps = defaultProps;

export default withTranslation()(withNavigation(RecentReviewList));

export const ListWrapper = styled.View`
    background-color: ${(props) =>
        props.hasTransparentBackground
            ? 'transparent'
            : props.theme.reviewSectionBackground};
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${(props) => props.theme.itemBorder};
    margin-top: 13px;
    margin-bottom: 2px;
    padding-bottom: ${spacing.tiny}px;
    align-self: flex-start;
    width: 100%;
`;

export const View = styled.View`
    padding: ${spacing.tiny}px;
`;

export const Padding = styled.View`
    padding-left: ${spacing.tiny}px;
`;

export const CarouselWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    width: 100%;
    flex-direction: row;
`;

export const EmptyState = styled.View`
    padding: ${spacing.tiny}px;
    align-items: flex-start;
`;

export const EmptyStateText = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.small}px;
    text-align: left;
`;
