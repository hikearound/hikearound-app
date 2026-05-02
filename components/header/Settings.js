import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '@constants/Index';

const propTypes = {
  onPress: PropTypes.func.isRequired,
};

function Settings({ onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={opacities.regular}
      onPress={() => {
        onPress();
      }}
      style={{
        marginRight: 8,
        marginTop: -1,
      }}
    >
      <Ionicons name='ios-settings-sharp' size={24} color={colors.white} />
    </TouchableOpacity>
  );
}

Settings.propTypes = propTypes;

export default Settings;
