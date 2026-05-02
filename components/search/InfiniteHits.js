import React from 'react';
import PropTypes from 'prop-types';
// import { FlatList } from 'react-native-collapsible-header-views'; // Temporarily disabled for SDK 46
import { FlatList, Keyboard } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { withNavigation } from '@utils/Navigation';
import HikeListItem from '@components/HikeListItem';
import Stats from '@components/search/Stats';
import { withTheme } from '@utils/Themes';

const propTypes = {
  hits: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  paddingBottom: PropTypes.number,
  showsVerticalScrollIndicator: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.string,
};

const defaultProps = {
  paddingBottom: 25,
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
};

const renderItem = ({ item }) => (
  <HikeListItem
    id={item.objectID}
    name={item.name}
    location={`${item.city}, ${item.state}`}
    distance={item.distance}
    item={item}
    shouldHighlight
    showBottomBorder
    showTopBorder={false}
  />
);

function InfiniteHits({
  hits,
  hasMore,
  refine,
  paddingBottom,
  showsVerticalScrollIndicator,
  keyboardShouldPersistTaps,
}) {
  if (hits.length > 0) {
    return (
      <>
        <Stats />
        <FlatList
          keyExtractor={item => item.objectID}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          data={hits}
          renderItem={renderItem}
          onEndReached={() => hasMore && refine()}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          contentContainerStyle={{ paddingBottom }}
        />
      </>
    );
  }

  return null;
}

InfiniteHits.propTypes = propTypes;
InfiniteHits.defaultProps = defaultProps;

export default withNavigation(withTheme(connectInfiniteHits(InfiniteHits)));
