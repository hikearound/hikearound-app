import React from 'react';
import { Modal } from 'react-native';
import { showModal, hideModal, toggleModal } from '../../utils/Modal';

class ModalBase extends React.PureComponent {
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
        return <Modal visible={modalVisible} />;
    }
}

export default ModalBase;
