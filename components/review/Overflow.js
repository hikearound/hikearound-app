import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { opacities, spacing } from '@constants/Index';
import { withTheme } from '@utils/Themes';

const propTypes = {
    onPress: PropTypes.func,
    iconSize: PropTypes.number,
};

const defaultProps = {
    onPress: () => {},
    iconSize: 25,
};

class Overflow extends React.PureComponent {
    render() {
        const { onPress, iconSize, theme } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -1,
                    paddingTop: parseInt(spacing.micro, 10),
                    paddingLeft: parseInt(spacing.tiny, 10),
                }}
                onPress={onPress}
            >
                <Ionicons
                    name='ios-ellipsis-horizontal'
                    size={iconSize}
                    color={theme.colors.overflowFill}
                />
            </TouchableOpacity>
        );
    }
}

Overflow.propTypes = propTypes;
Overflow.defaultProps = defaultProps;

export default withTranslation()(withTheme(Overflow));
