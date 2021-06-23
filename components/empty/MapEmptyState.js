import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withTranslation } from 'react-i18next';
import { colors } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { RootView, Title, Description } from '@styles/Callouts';

const propTypes = {
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconType: PropTypes.string,
};

const defaultProps = {
    iconSize: 50,
    iconColor: colors.purple,
    iconType: 'map-marker',
};

class MapEmptyState extends React.PureComponent {
    render() {
        const { iconSize, iconColor, iconType, t } = this.props;

        return (
            <RootView isSheet>
                <MaterialCommunityIcons
                    name={iconType}
                    color={iconColor}
                    size={iconSize}
                />
                <Title>{t('screen.map.empty.title')}</Title>
                <Description>{t('screen.map.empty.description')}</Description>
            </RootView>
        );
    }
}

MapEmptyState.propTypes = propTypes;
MapEmptyState.defaultProps = defaultProps;

export default withTranslation()(withTheme(MapEmptyState));
