import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '../constants/Index';
import { lightboxActionSheet } from './action_sheets/Lightbox';

const propTypes = {
    images: PropTypes.array.isRequired,
    imageIndex: PropTypes.number.isRequired,
    iconOffset: PropTypes.number,
    iconSize: PropTypes.number,
};

const defaultProps = {
    iconOffset: 30,
    iconSize: 35,
};

class ModalOverflow extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { t } = this.props;

        this.state = {
            imageAttribution: '',
        };

        this.showLightboxActionSheet = lightboxActionSheet.bind(this, t);
    }

    componentDidMount() {
        this.setImageAttribution();
    }

    setImageAttribution = async () => {
        const { images, imageIndex } = this.props;
        const imageAttribution = images[imageIndex].attribution;
        this.setState({ imageAttribution });
    };

    showAttributionAlert = () => {
        const { t } = this.props;
        const { imageAttribution } = this.state;
        Alert.alert(
            t('alert.attribution.title'),
            t('alert.attribution.body', { name: imageAttribution }),
        );
    };

    render() {
        const { iconOffset, iconSize } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    this.showLightboxActionSheet();
                }}
                activeOpacity={opacities.regular}
                style={{
                    position: 'absolute',
                    left: iconOffset,
                    top: iconOffset,
                    zIndex: 1,
                }}
            >
                <Ionicons
                    name='ios-more'
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
