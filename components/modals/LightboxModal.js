import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal, SafeAreaView } from 'react-native';
import ModalDismiss from '../ModalDismiss';
import LightboxImage from '../LightboxImage';
import { colors } from '../../constants/Index';
import { showModal, hideModal, toggleModal } from '../../utils/Modal';

function mapStateToProps(state) {
    return {
        imageIndex: state.imageIndex,
        action: state.action,
    };
}

class LightboxModal extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };

        this.showModal = showModal.bind(this);
        this.hideModal = hideModal.bind(this);
        this.toggleModal = toggleModal.bind(this);
    }

    componentDidUpdate() {
        const { action, modalAction } = this.props;
        this.toggleModal(action, modalAction);
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
                        <LightboxImage
                            images={images}
                            imageIndex={imageIndex}
                        />
                    </SafeAreaView>
                </ModalRoot>
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
)(LightboxModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
    background-color: ${colors.trueBlack};
`;
