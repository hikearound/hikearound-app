import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { withTranslation } from 'react-i18next';
import ReviewListItem from './ReviewListItem';
import {
    HeaderContainer,
    HeaderText,
    EmptyContainerText,
    TopBorder,
} from '../styles/Lists';
import { spacing } from '../constants/Index';

const propTypes = {
    maybeShowEmptyState: PropTypes.bool.isRequired,
    reviewData: PropTypes.array.isRequired,
    shouldShowHeader: PropTypes.bool,
};

const defaultProps = {
    shouldShowHeader: true,
};

class ReviewList extends React.Component {
    renderListHeader = () => {
        const { t, shouldShowHeader } = this.props;

        if (shouldShowHeader) {
            return (
                <HeaderContainer>
                    <HeaderText>{t('label.heading.reviews')}</HeaderText>
                </HeaderContainer>
            );
        }

        return null;
    };

    renderEmptyList = () => {
        const { maybeShowEmptyState, t } = this.props;

        if (maybeShowEmptyState) {
            return (
                <>
                    <TopBorder />
                    <EmptyContainerText>
                        {t('screen.hike.review.empty')}
                    </EmptyContainerText>
                </>
            );
        }
        return null;
    };

    renderItem = ({ item }) => {
        return (
            <ReviewListItem
                id={item.id}
                user={item.user}
                rating={item.rating}
                review={item.review}
                savedOn={item.savedOn}
            />
        );
    };

    render() {
        const { reviewData } = this.props;
        const extractKey = ({ id }) => id;

        return (
            <View style={{ marginBottom: parseInt(spacing.tiny, 10) }}>
                {reviewData && (
                    <FlatList
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderListHeader}
                        ListEmptyComponent={this.renderEmptyList}
                        data={reviewData}
                        extraData={reviewData}
                        keyExtractor={extractKey}
                        scrollEnabled={false}
                    />
                )}
            </View>
        );
    }
}

ReviewList.propTypes = propTypes;
ReviewList.defaultProps = defaultProps;

export default withTranslation()(ReviewList);
