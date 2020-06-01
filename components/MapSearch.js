import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { withTranslation } from 'react-i18next';
import { withTheme } from '../utils/Themes';
import { getMapSearchStyle } from '../styles/Map';
import { withNavigation } from '../utils/Navigation';
import { updateMapData } from '../actions/Map';
import { transparentColors } from '../constants/Index';

const propTypes = {
    searchInputRef: PropTypes.object.isRequired,
    hideHikeSheet: PropTypes.func.isRequired,
    dispatchMapData: PropTypes.func.isRequired,
    selectedHike: PropTypes.string,
    language: PropTypes.string,
    types: PropTypes.string,
    components: PropTypes.string,
    fields: PropTypes.string,
    returnKeyType: PropTypes.string,
    clearButtonMode: PropTypes.string,
};

const defaultProps = {
    selectedHike: null,
    language: 'en',
    types: '(cities)',
    components: 'country:us',
    fields: 'formatted_address,geometry',
    returnKeyType: 'search',
    clearButtonMode: 'always',
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

    onFocus = () => {
        const { hideHikeSheet } = this.props;

        hideHikeSheet();
    };

    onChange = () => {
        const { searchInputRef } = this.props;

        searchInputRef.current.refs.textInput.setNativeProps({
            style: { shadowColor: 'transparent' },
        });
    };

    onBlur = () => {
        const { searchInputRef } = this.props;

        searchInputRef.current.refs.textInput.setNativeProps({
            style: { shadowColor: transparentColors.grayLight },
        });
    };

    render() {
        const {
            searchInputRef,
            language,
            types,
            components,
            fields,
            returnKeyType,
            clearButtonMode,
            theme,
            t,
        } = this.props;
        const mapSearchStyle = getMapSearchStyle(theme);

        return (
            <GooglePlacesAutocomplete
                placeholder={t('screen.map.search')}
                ref={searchInputRef}
                query={{
                    key: Constants.manifest.extra.googlePlaces.apiKey,
                    language,
                    types,
                    components,
                }}
                fetchDetails
                GooglePlacesDetailsQuery={{ fields }}
                textInputProps={{
                    onFocus: () => this.onFocus(),
                    onChange: () => this.onChange(),
                    onBlur: () => this.onBlur(),
                    enablesReturnKeyAutomatically: false,
                    returnKeyType,
                    clearButtonMode,
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
