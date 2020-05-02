import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDarkMode } from '../../actions/User';
import { updateMapData } from '../../actions/Map';
import { ItemContainer, ItemText } from '../../styles/Settings';
import { settingsItems } from '../../constants/Index';
import SettingsSwitch from '../SettingsSwitch';
import { getMapData } from '../../utils/Map';
import { withTheme } from '../../utils/Themes';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchDarkMode: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    dispatchMapData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDarkMode: (darkMode) => dispatch(updateDarkMode(darkMode)),
        dispatchMapData: (mapData) => dispatch(updateMapData(mapData)),
    };
}

class SwitchItem extends React.PureComponent {
    handleToggleSwitch = (value) => {
        const { item, scheme, dispatchDarkMode, dispatchMapData } = this.props;

        if (item.type === settingsItems.darkMode) {
            dispatchDarkMode(value);
            getMapData(dispatchMapData, scheme);
        }
    };

    render() {
        const { item, darkMode } = this.props;

        return (
            <ItemContainer>
                <ItemText key={item.key}>{item.name}</ItemText>
                <SettingsSwitch
                    onValueChange={(value) => this.handleToggleSwitch(value)}
                    value={darkMode}
                />
            </ItemContainer>
        );
    }
}

SwitchItem.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(SwitchItem));
