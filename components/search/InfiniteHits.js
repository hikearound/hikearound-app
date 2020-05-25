import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { openHikeScreen } from '../../utils/Hike';
import { withNavigation } from '../../utils/Navigation';
import HikeListItem from '../HikeListItem';
import Header from './Header';

const propTypes = {
    hits: PropTypes.array.isRequired,
    refine: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

class InfiniteHits extends React.Component {
    onEndReached = () => {
        const { hasMore, refine } = this.props;
        if (hasMore) {
            refine();
        }
    };

    getHikeData = async (objectID) => {
        const { navigation } = this.props;
        openHikeScreen(objectID, navigation);
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
            />
        );
    };

    render() {
        const { hits, hasMore, refine } = this.props;

        if (hits.length > 0) {
            return (
                <CollapsibleHeaderFlatList
                    keyExtractor={(item) => item.objectID}
                    keyboardShouldPersistTaps='handled'
                    data={hits}
                    renderItem={this.renderItem}
                    onEndReached={() => hasMore && refine()}
                    CollapsibleHeaderComponent={<Header />}
                    headerHeight={35}
                />
            );
        }

        return null;
    }
}

InfiniteHits.propTypes = propTypes;

export default withNavigation(connectInfiniteHits(InfiniteHits));
