import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { withTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { withTheme } from '../../utils/Themes';
import { getMapSearchStyle } from '../../styles/Map';
import { withNavigation } from '../../utils/Navigation';
import { updateMapData } from '../../actions/Map';
import { transparentColors } from '../../constants/Index';

const propTypes = {
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
    constructor(props, context) {
        super(props, context);
        this.searchInputRef = React.createRef();
        this.state = { city: '' };
    }

    onPress = (details) => {
        const { dispatchMapData, selectedHike } = this.props;
        const selectedCity = details;

        dispatchMapData({ selectedHike, selectedCity });
    };

    onFocus = () => {
        const { hideHikeSheet } = this.props;
        const { city } = this.state;

        if (city.length > 0) {
            this.onChange();
        }

        hideHikeSheet();
    };

    onChange = (change) => {
        if (change) {
            const city = change.nativeEvent.text;
            this.setState({ city });
        }

        this.searchInputRef.current.refs.textInput.setNativeProps({
            style: { shadowColor: 'transparent' },
        });
    };

    onBlur = () => {
        this.searchInputRef.current.refs.textInput.setNativeProps({
            style: { shadowColor: transparentColors.grayLight },
        });
    };

    render() {
        const {
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
                ref={this.searchInputRef}
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
                    onChange: (change) => this.onChange(change),
                    onBlur: () => this.onBlur(),
                    enablesReturnKeyAutomatically: false,
                    returnKeyType,
                    clearButtonMode,
                    placeholderTextColor: theme.colors.inputPlaceholderText,
                }}
                onPress={(data, details = null) => this.onPress(details)}
                styles={mapSearchStyle}
                listUnderlayColor={theme.colors.searchBackground}
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
