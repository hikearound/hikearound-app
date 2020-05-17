import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, Animated } from 'react-native';
import { connect } from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import { closeModal } from '../actions/Modal';

const { height, width } = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

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
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag();
    };

    render() {
        const { images, imageIndex } = this.props;
        const { fadeAnim } = this.state;

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
                <AnimatedImage
                    source={images[imageIndex]}
                    resizeMode='contain'
                    style={{
                        opacity: fadeAnim,
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
