import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Animated } from 'react-native';
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
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }

    componentDidMount() {
        const { fadeAnim } = this.state;
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 650,
        }).start();
    }

    hideModal = () => {
        const { hideModal } = this.props;
        hideModal();
    }

    render() {
        const { images, imageIndex } = this.props;
        const { fadeAnim } = this.state;

        return (
            <ImageZoom
                enableSwipeDown
                onSwipeDown={() => { this.hideModal(); }}
                cropWidth={IMAGE_WIDTH}
                cropHeight={IMAGE_HEIGHT}
                imageWidth={IMAGE_WIDTH}
                imageHeight={IMAGE_HEIGHT}
            >
                <AnimatedImage
                    source={images[imageIndex]}
                    resizeMode='contain'
                    style={{
                        opacity: fadeAnim,
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        marginTop: -25,
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

const AnimatedImage = Animated.createAnimatedComponent(Image);
