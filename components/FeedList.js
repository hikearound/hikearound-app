import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { withTranslation } from 'react-i18next';
import FeedItem from '@components/FeedItem';
import Header from '@components/Header';
import FeedFooter from '@components/FeedFooter';
import { withScrollToTop } from '@utils/Navigation';
import { withTheme } from '@utils/Themes';
import RecentReviewList from '@components/feed/review/RecentReviewList';
import Ad from '@components/Ad';
import { getAdsManager } from '@utils/Ad';

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
                {showAds && this.renderAd()}
                {showReviews && this.renderRecentReviews(reviews)}
                <FeedItem
                    hid={id}
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

    // <Ad
    //     adsManager={adsManager}
    //     onAdLoaded={(ad) => console.log(ad)}
    //     onError={(error) => console.log(error)}
    // />

    renderAd = () => <Ad adsManager={adsManager} />;

    renderRecentReviews = (reviews) => <RecentReviewList reviews={reviews} />;

    renderHeader = (title) => <Header title={title} />;

    renderFooter = () => <FeedFooter />;

    render() {
        const {
            onEndReached,
            refreshControl,
            hikes,
            theme,
            scrollRef,
            city,
            t,
        } = this.props;

        const title = t('feed.header', { cityName: city });

        return (
            <>
                <CollapsibleHeaderFlatList
                    ref={scrollRef}
                    data={hikes}
                    extraData={hikes}
                    CollapsibleHeaderComponent={() => this.renderHeader(title)}
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

export default withScrollToTop(withTheme(withTranslation()(FeedList)));
