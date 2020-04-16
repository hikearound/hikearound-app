import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, spacing } from '../constants/Index';

const propTypes = {
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

class SettingsSwitch extends React.PureComponent {
    render() {
        const { value, onValueChange } = this.props;

        return (
            <Switch
                onValueChange={(updatedValue) => onValueChange(updatedValue)}
                value={value}
                trackColor={{ true: colors.purple, false: colors.gray }}
                style={{
                    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                }}
            />
        );
    }
}

SettingsSwitch.propTypes = propTypes;

export default SettingsSwitch;

const Switch = styled.Switch`
    position: absolute;
    right: ${spacing.tiny}px;
    top: 8px;
`;
