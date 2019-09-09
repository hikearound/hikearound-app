import React from 'react';
import styled from 'styled-components';
import { Modal, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../constants/Index';
import ModalDismiss from '../ModalDismiss';
import LightboxImage from '../LightboxImage';

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
        StatusBar.setHidden(false);
        this.setState({ modalVisible: false });
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
