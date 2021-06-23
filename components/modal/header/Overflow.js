import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '@constants/Index';
import { lightboxActionSheet } from '@components/action_sheets/Lightbox';
import { getOverflowIconPosition } from '@utils/Modal';

const propTypes = {
    images: PropTypes.array.isRequired,
    imageIndex: PropTypes.number.isRequired,
    iconSize: PropTypes.number,
};

const defaultProps = {
    iconSize: 30,
};

class ModalOverflow extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { t } = this.props;

        this.state = { attribution: '' };
        this.showLightboxActionSheet = lightboxActionSheet.bind(this, t);
    }

    componentDidMount() {
        this.setImageAttribution();
        this.setPosition();
    }

    setPosition = () => {
        const position = getOverflowIconPosition();

        this.setState({
            top: position.top,
            left: position.left,
        });
    };

    setImageAttribution = async () => {
        const { images, imageIndex } = this.props;
        const { attribution } = images[imageIndex];

        this.setState({ attribution });
    };

    showAttributionAlert = () => {
        const { t } = this.props;
        const { attribution } = this.state;

        Alert.alert(
            t('alert.attribution.title'),
            t('alert.attribution.body', { name: attribution.name }),
        );
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
