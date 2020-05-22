import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalBase from './ModalBase';
import { RootView } from '../../styles/Screens';

function mapStateToProps(state) {
    return {
        imageIndex: state.modalReducer.imageIndex,
        action: state.modalReducer.action,
    };
}

class SearchModal extends ModalBase {
    render() {
        const { modalVisible } = this.state;
        const { animationType } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <RootView>
                    <SafeAreaView style={{ flex: 1 }} />
                </RootView>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(SearchModal);
