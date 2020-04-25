import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components';
import { colors, opacities } from '../../constants/Index';

const iconLeftMargin = '8px';
const iconTopMargin = '3px';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    name: 'filter',
    color: colors.white,
    size: 18,
};

const Sort = ({ onPress, name, color, size }) => (
    <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
        <FontAwesome5 name={name} size={size} color={color} solid />
    </StyledOpacity>
);

Sort.propTypes = propTypes;
Sort.defaultProps = defaultProps;

export default Sort;

const StyledOpacity = styled.TouchableOpacity`
    margin-left: ${iconLeftMargin};
    margin-top: ${iconTopMargin};
`;
