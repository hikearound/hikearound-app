import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateNotifs } from '../../../actions/User';
import { ItemContainer, ItemText } from '../../../styles/Settings';
import SettingsSwitch from '../../SettingsSwitch';
import { shouldDisableSwitch } from '../../../utils/User';

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

class SwitchItem extends React.Component {
    constructor(props) {
        super(props);
        const { item, notifs } = this.props;

        this.state = {
            value: notifs[item.type][item.property],
        };
    }

    handleToggleSwitch = async (value) => {
        const { notifs, item, dispatchNotifs } = this.props;

        notifs[item.type][item.property] = { enabled: value };
        this.setState({ value: { enabled: value } });

        dispatchNotifs(null);
        dispatchNotifs(notifs);
    };

    render() {
        const { item, notifs } = this.props;
        const { value } = this.state;
        const disabled = shouldDisableSwitch(notifs, item);

        return (
            <ItemContainer>
                <ItemText key={item.key}>{item.name}</ItemText>
                <SettingsSwitch
                    onValueChange={(updatedValue) =>
                        this.handleToggleSwitch(updatedValue)
                    }
                    disabled={disabled}
                    value={value.enabled}
                />
            </ItemContainer>
        );
    }
}

SwitchItem.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SwitchItem);
