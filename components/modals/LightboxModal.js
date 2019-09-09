import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal, SafeAreaView } from 'react-native';
import ModalDismiss from '../ModalDismiss';
import ModalBase from './ModalBase';
import LightboxImage from '../LightboxImage';
import { colors } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        imageIndex: state.imageIndex,
        action: state.action,
    };
}

class LightboxModal extends ModalBase {
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
