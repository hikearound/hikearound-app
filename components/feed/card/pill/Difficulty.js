import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { colors } from '../../../../constants/Index';
import { withTheme } from '../../../../utils/Themes';
import { getDifficultyColor } from '../../../../utils/Card';
import { Pill, Text } from '../../../../styles/Pill';

const propTypes = {
    label: PropTypes.string.isRequired,
};

class DifficultyPill extends React.PureComponent {
    renderGenericPill = () => {
        const { t, label } = this.props;

        return (
            <Pill>
                <Text>{t(`hike.difficulty.${label.toLowerCase()}`)}</Text>
            </Pill>
        );
    };

    renderColorPill = () => {
        const { t, label } = this.props;
        const backgroundColor = getDifficultyColor(label);

        return (
            <Pill style={{ backgroundColor, borderWidth: 0 }}>
                <Text style={{ color: colors.white }}>
                    {t(`hike.difficulty.${label.toLowerCase()}`)}
                </Text>
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

export default withTranslation()(withTheme(DifficultyPill));
