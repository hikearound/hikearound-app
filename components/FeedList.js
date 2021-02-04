import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import FeedItem from './FeedItem';
import FeedHeader from './FeedHeader';
import FeedFooter from './FeedFooter';
import { withScrollToTop } from '../utils/Navigation';
import { withTheme } from '../utils/Themes';
import RecentReviewList from './feed/review/RecentReviewList';

const propTypes = {
    onEndReached: PropTypes.func.isRequired,
    refreshControl: PropTypes.object.isRequired,
    hikes: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired,
    scrollRef: PropTypes.object.isRequired,
    city: PropTypes.string.isRequired,
    lastKnownPosition: PropTypes.object.isRequired,
};

class FeedList extends React.Component {
    renderItem = ({ item, index }) => {
        const {
            id,
            name,
            distance,
            elevation,
            route,
            description,
            city,
            state,
            coverPhoto,
            coordinates,
            difficulty,
            imageCount,
            review,
            geohash,
        } = item;

        const { lastKnownPosition, reviews } = this.props;
        const maybeShowReviews = index === 4 && reviews.length > 0;

        return (
            <>
                {maybeShowReviews && <RecentReviewList reviews={reviews} />}
                <FeedItem
                    id={id}
                    name={name}
                    distance={distance}
                    elevation={elevation}
                    route={route}
                    description={description}
                    city={city}
                    state={state}
                    coverPhoto={coverPhoto}
                    coordinates={coordinates}
                    difficulty={difficulty}
                    imageCount={imageCount}
                    review={review}
                    geohash={geohash}
                    lastKnownPosition={lastKnownPosition}
                />
            </>
        );
    };

    renderFooter = () => <FeedFooter />;

    render() {
        const {
            onEndReached,
            refreshControl,
            hikes,
            theme,
            scrollRef,
            city,
        } = this.props;

        return (
            <>
                <CollapsibleHeaderFlatList
                    ref={scrollRef}
                    data={hikes}
                    extraData={hikes}
                    CollapsibleHeaderComponent={<FeedHeader city={city} />}
                    headerHeight={35}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    renderItem={this.renderItem}
                    refreshControl={refreshControl}
                    onEndReached={onEndReached}
                    ListFooterComponent={this.renderFooter}
                    headerContainerBackgroundColor={theme.colors.rootBackground}
                    disableHeaderSnap
                    bounces
                />
            </>
        );
    }
}

FeedList.propTypes = propTypes;

export default withScrollToTop(withTheme(FeedList));
