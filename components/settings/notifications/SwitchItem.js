import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateNotifs } from '../../../actions/User';
import { ItemContainer, ItemText } from '../Item';
import SettingsSwitch from '../../SettingsSwitch';

const propTypes = {
    item: PropTypes.string.isRequired,
    dispatchNotifications: PropTypes.func.isRequired,
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
        dispatchNotifications: (notifData) => dispatch(updateNotifs(notifData)),
    };
}

class SwitchItem extends React.Component {
    constructor(props) {
        super(props);
        const { item, emailNotifs, pushNotifs } = this.props;

        this.state = {};

        if (item.includes('email')) {
            this.state.value = emailNotifs.enabled;
        } else if (item.includes('push')) {
            this.state.value = pushNotifs.enabled;
        }
    }

    handleToggleSwitch = (value) => {
        const {
            item,
            dispatchNotifications,
            emailNotifs,
            pushNotifs,
        } = this.props;

        const notifData = { emailNotifs, pushNotifs };

        if (item.includes('email')) {
            notifData.emailNotifs.enabled = value;
        } else if (item.includes('push')) {
            notifData.pushNotifs.enabled = value;
        }

        this.setState({ value });
        dispatchNotifications(notifData);
    };

    render() {
        const { item } = this.props;
        const { value } = this.state;

        return (
            <ItemContainer>
                <ItemText key={item.key}>{item}</ItemText>
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
