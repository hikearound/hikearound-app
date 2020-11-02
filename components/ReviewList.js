import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { withTranslation } from 'react-i18next';
import { queryReviews, buildReviewData, sortReviews } from '../utils/Review';
import HikeListItem from './HikeListItem';
import { colors, fontSizes, fontWeights, spacing } from '../constants/Index';

const propTypes = {
    maybeShowEmptyState: PropTypes.bool.isRequired,
    hid: PropTypes.string.isRequired,
};

class ReviewList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            reviews: null,
            sortDirection: 'desc',
            querySize: 10,
        };
    }

    componentDidMount = async () => {
        await this.getReviewData();
    };

    getReviewData = async (lastKey) => {
        const { hid } = this.props;
        const { sortDirection, querySize } = this.state;

        const { data, cursor } = await queryReviews(
            hid,
            sortDirection,
            querySize,
            lastKey,
        );

        this.lastKnownKey = cursor;
        const reviews = await buildReviewData(data);
        this.addReviews(reviews);
    };

    addReviews = async (reviews) => {
        const { sortDirection } = this.state;

        this.setState((previousState) => {
            const reviewData = sortReviews(
                previousState,
                reviews,
                sortDirection,
            );

            return {
                reviews: reviewData.sortedReviews,
            };
        });
    };

    renderListHeader = () => {
        const { t } = this.props;

        return (
            <HeaderContainer>
                <HeaderText>{t('screen.profile.header')}</HeaderText>
            </HeaderContainer>
        );
    };

    renderEmptyList = () => {
        const { maybeShowEmptyState, t } = this.props;

        if (maybeShowEmptyState) {
            return (
                <EmptyContainer>
                    <EmptyContainerText>
                        {t('screen.profile.empty')}
                    </EmptyContainerText>
                </EmptyContainer>
            );
        }
        return null;
    };

    renderItem = ({ item }) => (
        <HikeListItem
            id={item.id}
            name={item.name}
            location={`${item.city}, ${item.state}`}
            distance={item.distance}
        />
    );

    render() {
        const { reviews } = this.state;
        const extractKey = ({ id }) => id;

        return null;

        return (
            <RootView>
                {reviews && (
                    <FlatList
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderListHeader}
                        ListEmptyComponent={this.renderEmptyList}
                        data={reviews}
                        extraData={reviews}
                        keyExtractor={extractKey}
                        scrollEnabled={false}
                    />
                )}
            </RootView>
        );
    }
}

ReviewList.propTypes = propTypes;
ReviewList.propTypes = propTypes;

export default withTranslation()(ReviewList);

const RootView = styled.View`
    margin-left: ${spacing.small}px;
`;

const HeaderContainer = styled.View`
    padding-bottom: 4px;
    margin-top: ${spacing.tiny}px;
`;

const HeaderText = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

const EmptyContainer = styled.View`
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const EmptyContainerText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
`;
