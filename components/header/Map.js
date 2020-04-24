import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { colors, spacing, opacities } from '../../constants/Index';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    name: 'map',
    color: colors.white,
    size: 26,
};

const Map = ({ onPress, name, color, size }) => (
    <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
        <MaterialIcons name={name} size={size} color={color} />
    </StyledOpacity>
);

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;

const StyledOpacity = styled.TouchableOpacity`
    margin-left: ${spacing.tiny}px;
`;
