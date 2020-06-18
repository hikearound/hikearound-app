import algoliasearch from 'algoliasearch/lite';
import Constants from 'expo-constants';
import { ALGOLIA_SEARCH_KEY } from 'react-native-dotenv';

export const searchClient = algoliasearch(
    Constants.manifest.extra.algolia.appId,
    ALGOLIA_SEARCH_KEY,
);

export default searchClient;
