import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, spacing } from '@constants/Index';

const propTypes = {
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
};

const defaultProps = {
    disabled: false,
};

class SettingsSwitch extends React.PureComponent {
    render() {
        const { value, onValueChange, disabled } = this.props;

        return (
            <Switch
                onValueChange={(updatedValue) => onValueChange(updatedValue)}
                value={value}
                disabled={disabled}
                trackColor={{ true: colors.purple, false: colors.gray }}
                style={{
                    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                }}
            />
        );
    }
}

SettingsSwitch.propTypes = propTypes;
SettingsSwitch.defaultProps = defaultProps;

export default SettingsSwitch;

const Switch = styled.Switch`
    position: absolute;
    right: ${spacing.tiny}px;
    top: 8px;
`;
