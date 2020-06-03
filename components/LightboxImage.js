import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { connect } from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import { closeModal } from '../actions/Modal';

const { height, width } = Dimensions.get('window');

const propTypes = {
    images: PropTypes.array.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: () => dispatch(closeModal()),
    };
}

class LightboxImage extends React.Component {
    hideModal = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag();
    };

    render() {
        const { images, imageIndex } = this.props;

        return (
            <ImageZoom
                enableSwipeDown
                onSwipeDown={() => {
                    this.hideModal();
                }}
                cropWidth={width}
                cropHeight={height}
                imageWidth={width}
                imageHeight={height}
            >
                <Image
                    uri={images[imageIndex].uri}
                    preview={images[imageIndex].thumbnailUri}
                    resizeMode='contain'
                    style={{
                        width,
                        height,
                        marginTop: -25,
                    }}
                />
            </ImageZoom>
        );
    }
}

LightboxImage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LightboxImage);
