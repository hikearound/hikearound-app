import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal, StatusBar } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalOverflow from './header/Overflow';
import ModalDismiss from './header/Dismiss';
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

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    animationType: PropTypes.string,
    modalAction: PropTypes.string,
    hid: PropTypes.string.isRequired,
    selectedHike: PropTypes.string,
    imageIndex: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
};

const defaultProps = {
    animationType: 'push',
    modalAction: 'showLightbox',
    selectedHike: null,
};

class LightboxModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { action, modalAction } = this.props;

        if (prevProps.action !== action) {
            if (action === modalAction) {
                this.showModal();
            } else if (action === 'hideModal') {
                this.hideModal();
            }
        }
    }

    hideModal = () => {
        const { dispatchModalFlag } = this.props;

        dispatchModalFlag();
        this.setState({ modalVisible: false });
        StatusBar.setHidden(false);
    };

    showModal = () => {
        this.setState({ modalVisible: true });
        StatusBar.setHidden(true);
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
