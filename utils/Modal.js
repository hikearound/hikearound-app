import { StatusBar } from 'react-native';

export function showModal() {
    this.setState({ modalVisible: true });
    StatusBar.setHidden(true);
}

export function hideModal() {
    this.setState({ modalVisible: false });
    StatusBar.setHidden(false);
}

export function toggleModal(action, modalAction) {
    if (action === modalAction) {
        this.showModal();
    } else if (action === 'hideModal') {
        this.hideModal();
    }
}

export default { showModal, hideModal, toggleModal };
