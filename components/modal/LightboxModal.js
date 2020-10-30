import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalOverflow from './header/Overflow';
import ModalDismiss from './header/Dismiss';
import { colors } from '../../constants/Index';
import LoadingOverlay from '../LoadingOverlay';
import { closeModal } from '../../actions/Modal';
import { toggleModalVisibility } from '../../utils/Modal';
import { toggleStatusBar } from '../../utils/Themes';

const propTypes = {
    action: PropTypes.string.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    currentModal: PropTypes.string.isRequired,
    animationType: PropTypes.string,
    modalType: PropTypes.string,
    hid: PropTypes.string.isRequired,
    selectedHike: PropTypes.string,
    imageIndex: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    closeAction: PropTypes.string,
};

const defaultProps = {
    selectedHike: null,
    animationType: 'push',
    modalType: 'lightbox',
    closeAction: 'closeLightbox',
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        imageIndex: state.modalReducer.imageIndex,
        currentModal: state.modalReducer.currentModal,
        selectedHike: state.modalReducer.selectedHike,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (closeAction) => dispatch(closeModal(closeAction)),
    };
}

class LightboxModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType } = this.props;

        const functions = {
            show: this.showModal.bind(this),
            hide: this.hideModal.bind(this),
        };

        toggleModalVisibility(prevProps, currentModal, modalType, functions);
    }

    dispatchCloseAction = () => {
        const { dispatchModalFlag, closeAction } = this.props;
        dispatchModalFlag(closeAction);
    };

    hideModal = () => {
        toggleStatusBar(false);
        this.dispatchCloseAction();
        this.setState({ modalVisible: false });
    };

    showModal = () => {
        toggleStatusBar(true);
        this.setState({ modalVisible: true });
    };

    render() {
        const { modalVisible } = this.state;
        const {
            animationType,
            images,
            imageIndex,
            hid,
            selectedHike,
            action,
        } = this.props;

        if (hid === selectedHike) {
            return (
                <Modal
                    animationType={animationType}
                    transparent={false}
                    visible={modalVisible}
                >
                    <ModalRoot>
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
                                onSwipeDown={() => this.hideModal()}
                            />
                        )}
                    </ModalRoot>
                </Modal>
            );
        }
        return null;
    }
}

LightboxModal.propTypes = propTypes;
LightboxModal.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(LightboxModal);

const ModalRoot = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${colors.black};
`;
