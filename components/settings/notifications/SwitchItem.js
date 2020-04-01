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
    notifs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        notifs: state.userReducer.notifs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchNotifs: (notifData) => dispatch(updateNotifs(notifData)),
    };
}

class SwitchItem extends React.PureComponent {
    constructor(props) {
        super(props);
        const { item, notifs } = this.props;
        const { email, push } = notifs;

        this.state = { email, push };

        if (item.type === settingsItems.globalEmail) {
            this.state.value = notifs.email.enabled;
        } else if (item.type === settingsItems.globalNotification) {
            this.state.value = notifs.push.enabled;
        }
    }

    handleToggleSwitch = async (value) => {
        const { item } = this.props;

        if (item.type === settingsItems.globalEmail) {
            await this.setState((prevState) => ({
                email: {
                    ...prevState.email,
                    enabled: value,
                },
            }));
        } else if (item.type === settingsItems.globalNotification) {
            await this.setState((prevState) => ({
                push: {
                    ...prevState.push,
                    enabled: value,
                },
            }));
        }

        this.updatePreferences();
        this.setState({ value });
    };

    updatePreferences = () => {
        const { dispatchNotifs } = this.props;
        const { email, push } = this.state;

        dispatchNotifs({ push, email });
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchItem);
