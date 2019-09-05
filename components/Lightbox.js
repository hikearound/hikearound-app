import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import {
    TouchableOpacity,
    Modal,
    StatusBar,
    SafeAreaView,
    Dimensions,
    Image,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { connect } from 'react-redux';
import { colors, opacities } from '../constants/Index';

const DISMISS_ICON_OFFSET = 25;
const DISMISS_ICON_SIZE = 45;

const DISMISS_ICON_STYLE = {
    position: 'absolute',
    right: DISMISS_ICON_OFFSET,
    top: DISMISS_ICON_OFFSET,
    zIndex: 1,
};

const IMAGE_HEIGHT = Dimensions.get('window').height;
const IMAGE_WIDTH = Dimensions.get('window').width;

function mapStateToProps(state) {
    return {
        imageIndex: state.imageIndex,
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeLightbox: () => dispatch({
            type: 'CLOSE_LIGHTBOX',
        }),
    };
}

class Lightbox extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate() {
        this.toggleLightbox();
    }

    toggleLightbox = () => {
        const { action } = this.props;
        if (action === 'showLightbox') {
            this.showLightbox();
        } else if (action === 'closeLightbox') {
            this.closeLightbox();
        }
    }

    showLightbox = () => {
        this.setState({ modalVisible: true });
        StatusBar.setHidden(true);
    }

    closeLightbox = () => {
        const { closeLightbox } = this.props;
        StatusBar.setHidden(false);
        this.setState({ modalVisible: false });
        closeLightbox();
    }

    render() {
        const { images, imageIndex } = this.props;
        const { modalVisible } = this.state;

        return (
            <Modal
                animationType='fade'
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <SafeAreaView style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => { this.closeLightbox(); }}
                            activeOpacity={opacities.regular}
                            style={DISMISS_ICON_STYLE}
                        >
                            <Ionicons
                                name='ios-close'
                                color={colors.white}
                                size={DISMISS_ICON_SIZE}
                            />
                        </TouchableOpacity>
                        <ImageZoom
                            enableSwipeDown
                            onSwipeDown={() => { this.closeLightbox(); }}
                            cropWidth={IMAGE_WIDTH}
                            cropHeight={IMAGE_HEIGHT}
                            imageWidth={IMAGE_WIDTH}
                            imageHeight={IMAGE_HEIGHT}
                        >
                            <Image
                                source={images[imageIndex].source}
                                resizeMode='contain'
                                style={{
                                    width: IMAGE_WIDTH,
                                    height: IMAGE_HEIGHT,
                                }}
                            />
                        </ImageZoom>
                    </SafeAreaView>
                </ModalRoot>
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Lightbox);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
    background-color: ${colors.trueBlack};
`;
