import React from 'react';
import styled from 'styled-components';
import {
    Modal,
    SafeAreaView,
    Dimensions,
    Image,
    StatusBar,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { connect } from 'react-redux';
import { colors } from '../../constants/Index';
import ModalDismiss from '../ModalDismiss';

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
        hideModal: () => dispatch({
            type: 'HIDE_MODAL',
        }),
    };
}

class LightboxModal extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate() {
        this.toggleModal();
    }

    toggleModal = () => {
        const { action } = this.props;
        if (action === 'showLightbox') {
            this.showModal();
        } else if (action === 'hideModal') {
            this.hideModal();
        }
    }

    showModal = () => {
        this.setState({ modalVisible: true });
        StatusBar.setHidden(true);
    }

    hideModal = () => {
        const { hideModal } = this.props;
        StatusBar.setHidden(false);
        this.setState({ modalVisible: false });
        hideModal();
    }

    render() {
        const { animationType, images, imageIndex } = this.props;
        const { modalVisible } = this.state;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ModalDismiss />
                        <ImageZoom
                            enableSwipeDown
                            onSwipeDown={() => { this.hideModal(); }}
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
)(LightboxModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
    background-color: ${colors.trueBlack};
`;
