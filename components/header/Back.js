import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { colors, spacing } from '../../constants/Index';

const propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    name: 'arrow-back-ios',
    color: colors.white,
    size: 25,
};

const Back = ({ name, color, size }) => (
    <View>
        <MaterialIcons name={name} size={size} color={color} />
    </View>
);

Back.propTypes = propTypes;
Back.defaultProps = defaultProps;

export default Back;

const View = styled.View`
    margin-left: ${spacing.tiny}px;
`;
