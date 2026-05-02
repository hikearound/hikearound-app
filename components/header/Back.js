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

function Back({ name = 'chevron-back', color = colors.white, size = 26 }) {
  return (
    <View>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

Back.propTypes = propTypes;

export default Back;

const View = styled.View`
  margin-left: ${spacing.tiny}px;
`;
