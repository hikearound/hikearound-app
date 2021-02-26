import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withScrollToTop } from '../utils/Navigation';
import HikeListItem from './HikeListItem';
import { spacing } from '../constants/Index';
import { HeaderContainer, HeaderText } from '../styles/Lists';

const propTypes = {
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

    renderEmptyList = () => null;

    renderItem = ({ item }) => (
        <HikeListItem
            id={item.id}
            name={item.name}
            location={`${item.city}, ${item.state}`}
            distance={item.distance}
        />
    );

    render() {
        const { hikeData, scrollRef } = this.props;
        const extractKey = ({ id }) => id;

        return (
            <View>
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
                        style={{
                            marginLeft: parseInt(spacing.small, 10),
                        }}
                    />
                )}
            </View>
        );
    }
}

HikeList.propTypes = propTypes;

export default withTranslation()(withScrollToTop(HikeList));
