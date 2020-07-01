import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalOverflow from './header/Overflow';
import ModalDismiss from './header/Dismiss';
import ModalBase from './ModalBase';
import { colors } from '../../constants/Index';
import LoadingOverlay from '../LoadingOverlay';
import { closeModal } from '../../actions/Modal';

function mapStateToProps(state) {
    return {
        imageIndex: state.modalReducer.imageIndex,
        action: state.modalReducer.action,
        selectedHike: state.modalReducer.selectedHike,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: () => dispatch(closeModal()),
    };
}

class LightboxModal extends ModalBase {
    hideLightbox = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag();
    };

    render() {
        const { modalVisible } = this.state;
        const {
            animationType,
            images,
            imageIndex,
            id,
            selectedHike,
            action,
        } = this.props;

        if (id === selectedHike) {
            return (
                <Modal
                    animationType={animationType}
                    transparent={false}
                    visible={modalVisible}
                >
                    <ModalRoot>
                        <SafeAreaView style={{ flex: 1 }}>
                            <ModalOverflow
                                images={images}
                                imageIndex={imageIndex}
                            />
                            <ModalDismiss />
                            {!(action === 'hideModal') && (
                                <ImageViewer
                                    imageUrls={images}
                                    index={imageIndex}
                                    loadingRender={() => (
                                        <LoadingOverlay loading isLightbox />
                                    )}
                                    renderIndicator={() => null}
                                    enablePreload
                                    enableSwipeDown
                                    useNativeDriver
                                    onSwipeDown={() => this.hideLightbox()}
                                />
                            )}
                        </SafeAreaView>
                    </ModalRoot>
                </Modal>
            );
        }
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LightboxModal);

const ModalRoot = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${colors.black};
`;
