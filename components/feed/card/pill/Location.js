import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../../../../utils/Themes';
import { Pill, Text } from '../../../../styles/Pill';

const propTypes = {
    label: PropTypes.string.isRequired,
};

class LocationPill extends React.PureComponent {
    render() {
        const { label } = this.props;

        return (
            <Pill>
                <Text>{label}</Text>
            </Pill>
        );
    }
}

LocationPill.propTypes = propTypes;

export default withTheme(LocationPill);
