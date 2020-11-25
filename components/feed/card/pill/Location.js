import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withTheme } from '../../../../utils/Themes';
import { Pill, Text } from '../../../../styles/Pill';

const propTypes = {
    label: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
};

class LocationPill extends React.PureComponent {
    render() {
        const { label, t, distance } = this.props;

        return (
            <Pill>
                <Text>
                    {t('card.distance', {
                        city: label,
                        distance: distance.toFixed(1),
                    })}
                </Text>
            </Pill>
        );
    }
}

LocationPill.propTypes = propTypes;

export default withTranslation()(withTheme(LocationPill));
