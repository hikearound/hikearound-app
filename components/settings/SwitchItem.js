import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDarkMode } from '@actions/User';
import { updateMapData } from '@actions/Map';
import { settingsItems } from '@constants/Index';
import SettingsSwitch from '@components/SettingsSwitch';
import { getMapData } from '@utils/Map';
import { withTheme } from '@utils/Themes';
import BaseSettingsItem from './BaseSettingsItem';

const propTypes = {
    item: PropTypes.object.isRequired,
    darkMode: PropTypes.bool.isRequired,
    dispatchDarkMode: PropTypes.func.isRequired,
    dispatchMapData: PropTypes.func.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
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
        const { item, dispatchDarkMode, dispatchMapData } = this.props;

        if (item.type === settingsItems.darkMode) {
            dispatchDarkMode(value);
            getMapData(dispatchMapData);
        }
    };

    render() {
        const { item, darkMode, isFirst, isLast } = this.props;

        return (
            <BaseSettingsItem item={item} isFirst={isFirst} isLast={isLast}>
                <SettingsSwitch
                    onValueChange={(value) => this.handleToggleSwitch(value)}
                    value={darkMode}
                />
            </BaseSettingsItem>
        );
    }
}

SwitchItem.propTypes = propTypes;
SwitchItem.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(SwitchItem));
