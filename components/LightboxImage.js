import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';

const IMAGE_HEIGHT = Dimensions.get('window').height;
const IMAGE_WIDTH = Dimensions.get('window').width;

const propTypes = {
    images: PropTypes.array.isRequired,
    hideModal: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModal: () => dispatch({
            type: 'HIDE_MODAL',
        }),
    };
}

class LightboxImage extends React.Component {
    hideModal = () => {
        const { hideModal } = this.props;
        hideModal();
    }

    render() {
        const { images, imageIndex } = this.props;

        return (
            <ImageZoom
                enableSwipeDown
                onSwipeDown={() => { this.hideModal(); }}
                cropWidth={IMAGE_WIDTH}
                cropHeight={IMAGE_HEIGHT}
                imageWidth={IMAGE_WIDTH}
                imageHeight={IMAGE_HEIGHT}
            >
                <Image
                    source={images[imageIndex]}
                    resizeMode='contain'
                    style={{
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                    }}
                />
            </ImageZoom>
        );
    }
}

LightboxImage.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LightboxImage);
