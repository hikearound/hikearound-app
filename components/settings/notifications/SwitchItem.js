import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateNotifs } from '../../../actions/User';
import { ItemContainer, ItemText } from '../../../styles/Settings';
import SettingsSwitch from '../../SettingsSwitch';
import { settingsItems } from '../../../constants/Index';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchNotifs: PropTypes.func.isRequired,
    emailNotifs: PropTypes.object.isRequired,
    pushNotifs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        emailNotifs: state.userReducer.emailNotifs,
        pushNotifs: state.userReducer.pushNotifs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchNotifs: (notifData) => dispatch(updateNotifs(notifData)),
    };
}

class SwitchItem extends React.Component {
    constructor(props) {
        super(props);
        const { item, emailNotifs, pushNotifs } = this.props;

        this.state = {};

        if (item.type === settingsItems.globalEmail) {
            this.state.value = emailNotifs.enabled;
        } else if (item.type === settingsItems.globalNotification) {
            this.state.value = pushNotifs.enabled;
        }
    }

    handleToggleSwitch = (value) => {
        const { item, dispatchNotifs, emailNotifs, pushNotifs } = this.props;
        const notifData = { emailNotifs, pushNotifs };

        if (item.type === settingsItems.globalEmail) {
            notifData.emailNotifs.enabled = value;
        } else if (item.type === settingsItems.globalNotification) {
            notifData.pushNotifs.enabled = value;
        }

        this.setState({ value });
        dispatchNotifs(notifData);
    };

    render() {
        const { item } = this.props;
        const { value } = this.state;

        return (
            <ItemContainer>
                <ItemText key={item.key}>{item.name}</ItemText>
                <SettingsSwitch
                    onValueChange={(updatedValue) =>
                        this.handleToggleSwitch(updatedValue)
                    }
                    value={value}
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
