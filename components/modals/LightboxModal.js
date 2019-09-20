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
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalVisible: false,
            imageAttribution: '',
        };
    }

    componentDidUpdate() {
        const { action, modalAction } = this.props;
        this.toggleModal(action, modalAction);
        this.setImageAttribution();
    }

    setImageAttribution = async () => {
        const { images, imageIndex } = this.props;
        const imageAttribution = images[imageIndex].attribution;
        this.setState({ imageAttribution });
    }

    render() {
        const { animationType, images, imageIndex } = this.props;
        const { modalVisible, imageAttribution } = this.state;

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
                        <ImageAttributionText>
                            {'Photo by: '}
                            {imageAttribution}
                        </ImageAttributionText>
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
    flex-direction: column;
    height: 100%;
    background-color: ${colors.trueBlack};
`;

const ImageAttributionText = styled.Text`
    display: none;
`;
