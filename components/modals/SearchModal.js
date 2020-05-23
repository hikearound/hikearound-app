import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { withTranslation } from 'react-i18next';
import ModalBase from './ModalBase';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import SearchHeader from '../SearchHeader';
import { ModalBody } from '../../styles/Modals';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

class SearchModal extends ModalBase {
    handleSubmitEditing = () => {
        // todo
    };

    assignRef = (ref) => {
        this.searchInput = ref;
    };

    renderModalHeader = () => {
        return <SearchHeader />;
    };

    renderModalBody = () => {
        return <ModalBody />;
    };

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
                    {this.renderModalHeader()}
                    {this.renderModalBody()}
                </RootView>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(
    withTranslation()(withTheme(SearchModal)),
);
