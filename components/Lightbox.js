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
import { colors, opacities } from '../constants/Index';

const DISMISS_ICON_OFFSET = 20;
const DISMISS_ICON_SIZE = 45;

const DISMISS_ICON_STYLE = {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: DISMISS_ICON_OFFSET,
    marginTop: -DISMISS_ICON_OFFSET,
    zIndex: 1,
};

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
    margin-top: -${DISMISS_ICON_SIZE}px;
`;
