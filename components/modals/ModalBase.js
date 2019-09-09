import React from 'react';
import { Modal, StatusBar } from 'react-native';

class ModalBase extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate() {
        const { action, modalAction } = this.props;
        this.toggleModal(action, modalAction);
    }

    showModal() {
        this.setState({ modalVisible: true });
        StatusBar.setHidden(true);
    }

    hideModal() {
        this.setState({ modalVisible: false });
        StatusBar.setHidden(false);
    }

    toggleModal(action, modalAction) {
        if (action === modalAction) {
            this.showModal();
        } else if (action === 'hideModal') {
            this.hideModal();
        }
    }

    render() {
        const { modalVisible } = this.state;
        return <Modal visible={modalVisible} />;
    }
}

export default ModalBase;
