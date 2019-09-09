import React from 'react';
import styled from 'styled-components';
import {
    Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { showModal, hideModal, toggleModal } from '../../utils/Modal';
import ModalDismiss from '../ModalDismiss';
import HikeMap from '../HikeMap';

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

class MapModal extends React.PureComponent {
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
)(MapModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
`;
