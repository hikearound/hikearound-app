import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, spacing } from '../../../constants/Index';
import { updateNotifs } from '../../../actions/User';
import { ItemContainer, ItemText } from '../Item';

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
        }

        if (item.includes('push')) {
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
        }

        if (item.includes('push')) {
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
                    trackColor={{ true: colors.purple, false: colors.gray }}
                    style={{
                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    }}
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

const SettingsSwitch = styled.Switch`
    position: absolute;
    right: ${spacing.tiny}px;
    top: ${spacing.tiny}px;
`;
