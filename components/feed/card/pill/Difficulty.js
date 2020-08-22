import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../../constants/Index';
import { withTheme } from '../../../../utils/Themes';
import { getDifficultyColor } from '../../../../utils/Card';
import { Pill, Text } from '../../../../styles/Pill';

const propTypes = {
    label: PropTypes.string.isRequired,
};

class DifficultyPill extends React.PureComponent {
    renderGenericPill = () => {
        const { label } = this.props;

        return (
            <Pill>
                <Text>{label}</Text>
            </Pill>
        );
    };

    renderColorPill = () => {
        const { label } = this.props;
        const backgroundColor = getDifficultyColor(label);

        return (
            <Pill style={{ backgroundColor, borderWidth: 0 }}>
                <Text style={{ color: colors.white }}>{label}</Text>
            </Pill>
        );
    };

    render() {
        const { theme } = this.props;

        if (theme.dark) {
            return this.renderGenericPill();
        }

        return this.renderColorPill();
    }
}

DifficultyPill.propTypes = propTypes;

export default withTheme(DifficultyPill);
