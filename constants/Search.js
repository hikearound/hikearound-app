import algoliasearch from 'algoliasearch/lite';
import Constants from 'expo-constants';

export const searchClient = algoliasearch(
  Constants.expoConfig.extra.algolia.appId,
  Constants.expoConfig.extra.algolia.searchKey
);

export default searchClient;
