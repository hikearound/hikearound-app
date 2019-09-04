import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import {
    TouchableOpacity,
    Modal,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import {
    colors,
    opacities,
} from '../constants/Index';

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
            imageIndex: 0,
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
        const { images } = this.props;
        const { modalVisible, imageIndex } = this.state;

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
                            style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                marginRight: 20,
                                marginTop: -20,
                            }}
                        >
                            <Ionicons
                                name='ios-close'
                                color={colors.white}
                                size={45}
                            />
                        </TouchableOpacity>
                        <LightboxImage
                            source={images[imageIndex].source}
                            resizeMode='contain'
                        />
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

const LightboxImage = styled.Image`
    height: 100%;
`;
