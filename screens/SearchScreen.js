import React from 'react';
import { withTranslation } from 'react-i18next';
import SearchBox from '@components/search/SearchBox';
import StateResults from '@components/search/StateResults';
import { withTheme, SetBarStyle } from '@utils/Themes';
import InfiniteHits from '@components/search/InfiniteHits';
import { RootView } from '@styles/Screens';
import { getScreenWidth } from '@utils/Screen';

function HeaderTitle() {
  return <SearchBox />;
}

const renderSearchResults = () => (
  <StateResults>
    <InfiniteHits />
  </StateResults>
);

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: HeaderTitle,
      headerTitleContainerStyle: {
        width: getScreenWidth(),
        left: -8,
      },
    });
  }

  render() {
    return (
      <RootView>
        <SetBarStyle barStyle='light-content' />
        {renderSearchResults()}
      </RootView>
    );
  }
}

export default withTranslation()(withTheme(SearchScreen));
