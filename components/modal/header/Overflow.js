import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '@constants/Index';
import { lightboxActionSheet } from '@components/action_sheets/Lightbox';
import { getOverflowIconPosition } from '@utils/Modal';

const propTypes = {
  iconSize: PropTypes.number,
};

const defaultProps = {
  iconSize: 30,
};

class ModalOverflow extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const { t } = this.props;

    this.state = {};
    this.showLightboxActionSheet = lightboxActionSheet.bind(this, t);
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition = () => {
    const position = getOverflowIconPosition();

    this.setState({
      top: position.top,
      left: position.left,
    });
  };

  render() {
    const { iconSize } = this.props;
    const { top, left } = this.state;

    return (
      <TouchableOpacity
        onPress={() => {
          this.showLightboxActionSheet();
        }}
        activeOpacity={opacities.regular}
        style={{
          position: 'absolute',
          left,
          top,
          zIndex: 1,
        }}
      >
        <Ionicons
          name='ios-ellipsis-horizontal'
          color={colors.white}
          size={iconSize}
        />
      </TouchableOpacity>
    );
  }
}

ModalOverflow.propTypes = propTypes;
ModalOverflow.defaultProps = defaultProps;

export default withTranslation()(ModalOverflow);
