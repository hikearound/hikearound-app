import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { withTranslation } from 'react-i18next';
import { withTheme } from '../utils/Themes';
import { getMapSearchStyle } from '../styles/Search';
import { withNavigation } from '../utils/Navigation';
import { updateMapData } from '../actions/Map';

const propTypes = {
    searchInputRef: PropTypes.object.isRequired,
    hideHikeSheet: PropTypes.func.isRequired,
    dispatchMapData: PropTypes.func.isRequired,
    selectedHike: PropTypes.string,
};

const defaultProps = {
    selectedHike: null,
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
        const { dispatchMapData, selectedHike } = this.props;
        const selectedCity = details;

        dispatchMapData({ selectedHike, selectedCity });
    };

    searchFocus = () => {
        const { hideHikeSheet } = this.props;
        hideHikeSheet();
    };

    render() {
        const { searchInputRef, theme, t } = this.props;
        const mapSearchStyle = getMapSearchStyle(theme);

        return (
            <GooglePlacesAutocomplete
                placeholder={t('screen.map.search')}
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
                    placeholderTextColor: theme.colors.inputPlaceholderText,
                }}
                onPress={(data, details = null) => this.onPress(details)}
                styles={mapSearchStyle}
                listUnderlayColor={theme.colors.border}
            />
        );
    }
}

MapSearch.propTypes = propTypes;
MapSearch.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withNavigation(withTheme(MapSearch))));
