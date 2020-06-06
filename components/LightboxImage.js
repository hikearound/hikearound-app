import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import LoadingOverlay from './LoadingOverlay';
import { closeModal } from '../actions/Modal';

const { height, width } = Dimensions.get('window');

const propTypes = {
    images: PropTypes.array.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    resizeMode: PropTypes.string,
};

const defaultProps = {
    resizeMode: 'contain',
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

        this.state = { loading: true };
    }

    hideModal = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag();
    };

    imageDidLoad = async () => {
        this.setState({ loading: false });
    };

    render() {
        const { images, imageIndex, resizeMode } = this.props;
        const { loading } = this.state;

        return (
            <>
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
                        source={{ uri: images[imageIndex].uri }}
                        resizeMode={resizeMode}
                        onLoad={this.imageDidLoad}
                        style={{
                            width,
                            height,
                            marginTop: -40,
                        }}
                    />
                </ImageZoom>
                <LoadingOverlay loading={loading} isLightbox />
            </>
        );
    }
}

LightboxImage.propTypes = propTypes;
LightboxImage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(LightboxImage);
