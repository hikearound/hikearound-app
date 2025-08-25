import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { colors, spacing } from '@constants/Index';

const propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
};

const defaultProps = {
    name: 'ios-chevron-back',
    color: colors.white,
    size: 26,
};

const Back = ({ name, color, size }) => (
    <View>
        <Ionicons name={name} size={size} color={color} />
    </View>
);

Back.propTypes = propTypes;
Back.defaultProps = defaultProps;

export default Back;

const View = styled.View`
    margin-left: ${spacing.tiny}px;
`;
