import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDarkMode } from '../../actions/User';
import { ItemContainer, ItemText } from './Item';
import SettingsSwitch from '../SettingsSwitch';

const propTypes = {
    item: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired,
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
    constructor(props) {
        super(props);
        const { sections } = this.props;

        this.state = {
            displaySectionData: sections[1].data,
        };
    }

    handleToggleSwitch = (value) => {
        const { item, dispatchDarkMode } = this.props;
        const { displaySectionData } = this.state;

        if (displaySectionData.includes(item) && item === 'Dark Mode') {
            dispatchDarkMode(value);
        }
    };

    render() {
        const { item, darkMode } = this.props;

        return (
            <ItemContainer>
                <ItemText key={item.key}>{item}</ItemText>
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
