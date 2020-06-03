import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import { spacing, borderRadius, opacities } from '../constants/Index';
import { showModal, setLightboxImage } from '../actions/Modal';
import { withTheme } from '../utils/Themes';

const propTypes = {
    dispatchImage: PropTypes.func.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    modalType: PropTypes.string,
    dimension: PropTypes.number,
    resizeMode: PropTypes.string,
    tint: PropTypes.string,
};

const defaultProps = {
    modalType: 'lightbox',
    dimension: 75,
    resizeMode: 'cover',
    tint: 'light',
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchImage: (imageIndex) => dispatch(setLightboxImage(imageIndex)),
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class Thumbnail extends React.PureComponent {
    thumbnailPress = () => {
        const {
            dispatchImage,
            dispatchModalFlag,
            imageIndex,
            modalType,
        } = this.props;

        dispatchImage(imageIndex);
        dispatchModalFlag(modalType);
    };

    render() {
        const { image, dimension, theme, resizeMode, tint } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.thumbnailPress}
            >
                <Image
                    uri={image.thumbnailUri}
                    preview={image.thumbnailUri}
                    resizeMode={resizeMode}
                    tint={tint}
                    dimension={dimension}
                    style={{
                        height: dimension,
                        width: dimension,
                        borderRadius: parseInt(borderRadius.small, 10),
                        marginRight: parseInt(spacing.tiny, 10),
                        marginBottom: parseInt(spacing.micro, 10),
                        backgroundColor: theme.thumbnailBackground,
                    }}
                />
            </TouchableOpacity>
        );
    }
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(Thumbnail));
