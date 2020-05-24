import algoliasearch from 'algoliasearch/lite';
import Constants from 'expo-constants';

export const searchClient = algoliasearch(
    Constants.manifest.extra.algolia.appId,
    Constants.manifest.extra.algolia.searchKey,
);

export default searchClient;
