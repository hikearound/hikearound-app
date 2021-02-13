import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import FeedItem from './FeedItem';
import FeedHeader from './FeedHeader';
import FeedFooter from './FeedFooter';
import { withScrollToTop } from '../utils/Navigation';
import { withTheme } from '../utils/Themes';
import RecentReviewList from './feed/review/RecentReviewList';
import Ad from './Ad';
import { getAdsManager } from '../utils/Ad';

const adsManager = getAdsManager('feed');

const propTypes = {
    onEndReached: PropTypes.func.isRequired,
    refreshControl: PropTypes.object.isRequired,
    hikes: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired,
    scrollRef: PropTypes.object.isRequired,
    city: PropTypes.string.isRequired,
    lastKnownPosition: PropTypes.object.isRequired,
};

const defaultProps = {};

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
        const showReviews = index === 4 && reviews.length > 0;
        const showAds = false;

        return (
            <>
                {showReviews && <RecentReviewList reviews={reviews} />}
                {showAds && <Ad adsManager={adsManager} />}
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
FeedList.defaultProps = defaultProps;

export default withScrollToTop(withTheme(FeedList));
