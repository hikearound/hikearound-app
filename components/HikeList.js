import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withScrollToTop } from '../utils/Navigation';
import HikeListItem from './HikeListItem';
import { colors, fontSizes, fontWeights, spacing } from '../constants/Index';

const propTypes = {
    maybeShowEmptyState: PropTypes.bool.isRequired,
    hikeData: PropTypes.array.isRequired,
    scrollRef: PropTypes.object.isRequired,
};

class HikeList extends React.Component {
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
            location={item.city}
            distance={item.distance}
        />
    );

    render() {
        const { hikeData, scrollRef } = this.props;
        const extractKey = ({ id }) => id;

        return (
            <RootView>
                {hikeData && (
                    <FlatList
                        ref={scrollRef}
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderListHeader}
                        ListEmptyComponent={this.renderEmptyList}
                        data={hikeData}
                        extraData={hikeData}
                        keyExtractor={extractKey}
                        scrollEnabled={false}
                    />
                )}
            </RootView>
        );
    }
}

HikeList.propTypes = propTypes;
HikeList.propTypes = propTypes;

export default withTranslation()(withScrollToTop(HikeList));

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
