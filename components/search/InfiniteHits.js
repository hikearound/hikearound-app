import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { Keyboard } from 'react-native';
import { withNavigation } from '../../utils/Navigation';
import HikeListItem from '../HikeListItem';
import Stats from './Stats';
import { withTheme } from '../../utils/Themes';

const propTypes = {
    hits: PropTypes.array.isRequired,
    refine: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number,
    paddingBottom: PropTypes.number,
    showsVerticalScrollIndicator: PropTypes.bool,
    keyboardShouldPersistTaps: PropTypes.string,
};

const defaultProps = {
    headerHeight: 35,
    paddingBottom: 25,
    showsVerticalScrollIndicator: false,
    keyboardShouldPersistTaps: 'handled',
};

class InfiniteHits extends React.Component {
    onEndReached = () => {
        const { hasMore, refine } = this.props;
        if (hasMore) {
            refine();
        }
    };

    renderItem = ({ item }) => {
        return (
            <HikeListItem
                id={item.objectID}
                name={item.name}
                location={item.city}
                distance={item.distance}
                item={item}
                shouldHighlight
                showBottomBorder
                showTopBorder={false}
            />
        );
    };

    render() {
        const {
            hits,
            hasMore,
            theme,
            refine,
            headerHeight,
            paddingBottom,
            showsVerticalScrollIndicator,
            keyboardShouldPersistTaps,
        } = this.props;

        if (hits.length > 0) {
            return (
                <CollapsibleHeaderFlatList
                    clipHeader
                    disableHeaderSnap
                    bounces
                    keyExtractor={(item) => item.objectID}
                    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                    data={hits}
                    renderItem={this.renderItem}
                    onEndReached={() => hasMore && refine()}
                    CollapsibleHeaderComponent={<Stats />}
                    headerContainerBackgroundColor={theme.colors.rootBackground}
                    headerHeight={headerHeight}
                    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                    contentContainerStyle={{ paddingBottom }}
                />
            );
        }

        return null;
    }
}

InfiniteHits.propTypes = propTypes;
InfiniteHits.defaultProps = defaultProps;

export default withNavigation(withTheme(connectInfiniteHits(InfiniteHits)));
