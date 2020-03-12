import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDarkMode } from '../../actions/User';
import { ItemContainer, ItemText } from '../../styles/Settings';
import { settingsItems } from '../../constants/Index';
import SettingsSwitch from '../SettingsSwitch';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchDarkMode: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDarkMode: (darkMode) => dispatch(updateDarkMode(darkMode)),
    };
}

class SwitchItem extends React.PureComponent {
    handleToggleSwitch = (value) => {
        const { item, dispatchDarkMode } = this.props;

        if (item.type === settingsItems.darkMode) {
            dispatchDarkMode(value);
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
)(SwitchItem);
