import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { withTheme } from '../utils/Themes';
import { getMapSearchStyle } from '../styles/Search';
import { withNavigation } from '../utils/Navigation';
import { updateMapData } from '../actions/Map';

const propTypes = {
    searchInputRef: PropTypes.object.isRequired,
    hideHikeSheet: PropTypes.func.isRequired,
    dispatchMapData: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMapData: (mapData) => dispatch(updateMapData(mapData)),
    };
}

class MapSearch extends React.Component {
    onPress = (details) => {
        const { dispatchMapData } = this.props;
        const selectedCity = details;
        dispatchMapData({ selectedHike: null, selectedCity });
    };

    searchFocus = () => {
        const { hideHikeSheet } = this.props;
        hideHikeSheet();
    };

    render() {
        const { searchInputRef, theme } = this.props;
        const mapSearchStyle = getMapSearchStyle(theme);

        return (
            <GooglePlacesAutocomplete
                placeholder='Search for hikes by city'
                ref={searchInputRef}
                query={{
                    key: Constants.manifest.extra.googlePlaces.apiKey,
                    language: 'en',
                    types: '(cities)',
                    components: 'country:us',
                }}
                fetchDetails
                GooglePlacesDetailsQuery={{
                    fields: 'formatted_address,geometry',
                }}
                textInputProps={{
                    onFocus: () => this.searchFocus(),
                    enablesReturnKeyAutomatically: false,
                    returnKeyType: 'search',
                    clearButtonMode: 'always',
                }}
                onPress={(data, details = null) => this.onPress(details)}
                styles={mapSearchStyle}
            />
        );
    }
}

MapSearch.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(withTheme(MapSearch)));
