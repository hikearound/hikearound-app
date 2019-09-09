import React from 'react';
import styled from 'styled-components';
import {
    Modal,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../constants/Index';
import ModalDismiss from '../ModalDismiss';
import HikeMap from '../HikeMap';

function mapStateToProps(state) {
    return {
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

class MapModal extends React.PureComponent {
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
        if (action === 'showMap') {
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
        const { modalVisible } = this.state;
        const {
            animationType,
            mapRef,
            coordinates,
            region,
        } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <HikeMap
                        fullHeight
                        mapRef={mapRef}
                        coordinates={coordinates}
                        region={region}
                    />
                    <ModalDismiss />
                </ModalRoot>
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
    background-color: ${colors.trueBlack};
`;
