import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@utils/Themes';
import { getMapSearchStyle } from '@styles/Map';
import { withNavigation } from '@utils/Navigation';
import { updateMapData } from '@actions/Map';

const propTypes = {
    hideHikeSheet: PropTypes.func.isRequired,
    returnKeyType: PropTypes.string,
};

const defaultProps = {
    returnKeyType: 'search',
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMapData: (mapData) => dispatch(updateMapData(mapData)),
    };
}

class PlaceholderMapSearch extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { theme } = this.props;

        this.searchInputRef = React.createRef();

        this.state = {
            style: getMapSearchStyle(theme),
        };
    }

    componentDidUpdate(prevProps) {
        const { theme } = this.props;

        if (prevProps.theme !== theme) {
            this.updateMapStyle();
        }
    }

    updateMapStyle = () => {
        const { theme } = this.props;

        this.setState({
            style: getMapSearchStyle(theme),
        });
    };

    setMapStyle = (hideShadow, hideBackground) => {
        const { theme } = this.props;

        this.setState({
            style: getMapSearchStyle(theme, hideShadow, hideBackground),
        });
    };

    onFocus = () => {
        const { hideHikeSheet } = this.props;

        hideHikeSheet();
    };

    render() {
        const { t, returnKeyType, theme } = this.props;
        const { style } = this.state;

        return (
            <View style={style.textInputContainer}>
                <TextInput
                    placeholder={t('screen.map.search')}
                    ref={this.searchInputRef}
                    style={style.textInput}
                    enablesReturnKeyAutomatically={false}
                    returnKeyType={returnKeyType}
                    onFocus={() => this.onFocus()}
                    placeholderTextColor={theme.colors.inputPlaceholderText}
                />
            </View>
        );
    }
}

PlaceholderMapSearch.propTypes = propTypes;
PlaceholderMapSearch.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withNavigation(withTheme(PlaceholderMapSearch))));
