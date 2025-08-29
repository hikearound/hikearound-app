import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { withScrollToTop } from '@utils/Navigation';
import { spacing, timings, colors } from '@constants/Index';
import Subtitle from '@components/Subtitle';
import ReviewPrompt from '@components/ReviewPrompt';
import ReviewList from '@components/ReviewList';
import PhotoLightboxGroup from '@components/PhotoLightboxGroup';
import MapWrapper from '@components/map/Wrapper';
import TextContent from '@components/hike/TextContent';
import { getRecentReviews, removeReviewFromList } from '@utils/Review';
import { defaultState } from '@constants/states/HikeBody';
import { withTheme } from '@utils/Themes';
import FeedRefreshControl from '@components/FeedRefreshControl';

const propTypes = {
    setSelectedStars: PropTypes.func.isRequired,
    scrollRef: PropTypes.object.isRequired,
    coordinates: PropTypes.array,
    region: PropTypes.object,
    hike: PropTypes.object.isRequired,
    hid: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    reviewData: PropTypes.object,
    reviewAction: PropTypes.string,
    selectedReview: PropTypes.string,
    actions: PropTypes.object,
};

const defaultProps = {
    region: undefined,
    coordinates: [],
    reviewData: {},
    reviewAction: null,
    selectedReview: null,
    actions: {},
};

function mapStateToProps(state) {
    return {
        reviewData: state.reviewReducer.reviewData,
        reviewAction: state.reviewReducer.action,
        selectedReview: state.reviewReducer.selectedReview,
    };
}

function mapDispatchToProps() {
    return {};
}

class HikeBody extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { hike } = this.props;

        this.state = {
            loading: false,
            name: hike.name,
            distance: hike.distance,
            elevation: hike.elevation,
            route: hike.route,
            city: hike.city,
            state: hike.state,
            description: hike.description,
            imageCount: hike.imageCount,
            ...defaultState,
        };

        this.reviewListRef = React.createRef();
    }

    componentDidMount = async () => {
        await this.getReviewData();
    };

    componentDidUpdate(prevProps) {
        const { reviewData, reviewAction, selectedReview, actions } =
            this.props;

        if (prevProps.reviewData !== reviewData) {
            this.updateReviewData();
        }

        if (prevProps.actions !== actions) {
            this.maybeFireActions();
        }

        if (reviewAction === 'deleteReview') {
            if (prevProps.selectedReview !== selectedReview) {
                this.deleteReview();
            }
        }
    }

    onRefresh = async () => {
        await this.setState({ loading: true });

        this.timeout = setTimeout(() => {
            this.getReviewData();
        }, timings.medium);
    };

    maybeFireActions = async () => {
        const { actions } = this.props;

        if (actions) {
            if (actions.scrollToReviewList) {
                await this.scrollToReviewList();
            }
        }
    };

    deleteReview = async () => {
        const { selectedReview } = this.props;
        const { reviews } = this.state;

        this.setState({
            reviews: removeReviewFromList(reviews, selectedReview),
        });
    };

    updateReviewData = async () => {
        await this.getReviewData();
        await this.scrollToReviewList();
    };

    scrollToReviewList = () => {
        // Temporarily disabled to test scrolling freeze
        return;
        
        const { scrollRef } = this.props;

        if (this.reviewListRef.current) {
            this.reviewListRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                    scrollRef.current.scrollTo({
                        x: 0,
                        y: pageY,
                        animated: true,
                    });
                },
            );
        }
    };

    getReviewData = async () => {
        const { t, hid } = this.props;
        const { sortDirection, querySize } = this.state;
        const reviews = await getRecentReviews(
            t,
            hid,
            sortDirection,
            querySize,
        );

        this.setState({ reviews, loading: false });
        this.maybeSetEmptyState(reviews);
    };

    maybeSetEmptyState = async (reviews) => {
        if (reviews.length === 0) {
            this.setState({ showEmptyState: true });
        }
    };

    renderReviewPrompt = (setSelectedStars, hid) => (
        <ReviewPrompt setSelectedStars={setSelectedStars} hid={hid} />
    );

    renderGallerySection = (t, hid, imageCount) => (
        <View>
            <Subtitle text={t('label.heading.images')} />
            <PhotoLightboxGroup hid={hid} imageCount={imageCount} />
        </View>
    );

    renderReviewSection = (t, reviews, showEmptyState) => (
        <View>
            <Subtitle text={t('label.heading.reviews')} hideBorder />
            <ReviewList
                reviewListRef={this.reviewListRef}
                reviewData={reviews}
                shouldShowHeader={false}
                showEmptyState={showEmptyState}
            />
        </View>
    );

    render() {
        const {
            setSelectedStars,
            coordinates,
            region,
            scrollRef,
            isLoading,
            hid,
            t,
        } = this.props;
        const {
            description,
            name,
            city,
            state,
            distance,
            elevation,
            route,
            reviews,
            showEmptyState,
            imageCount,
            loading,
        } = this.state;

        return (
            <>
                <BlockView />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                >
                    <MapWrapper
                        coordinates={coordinates}
                        region={region}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                        isLoading={isLoading}
                        hid={hid}
                    />
                    <BodyContent>
                        <TextContent
                            name={name}
                            city={city}
                            state={state}
                            hid={hid}
                            distance={distance}
                            description={description}
                        />
                        {this.renderReviewPrompt(setSelectedStars, hid)}
                        {this.renderGallerySection(t, hid, imageCount)}
                        {this.renderReviewSection(t, reviews, showEmptyState)}
                    </BodyContent>
                </ScrollView>
            </>
        );
    }
}

HikeBody.propTypes = propTypes;
HikeBody.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withScrollToTop(withTheme(HikeBody))));

const BodyContent = styled.View`
    padding: ${spacing.tiny}px ${spacing.small}px;
    background-color: ${(props) => props.theme.rootBackground};
`;

const BlockView = styled.View`
    height: 300px;
    background-color: ${(props) => props.theme.blockView};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
