import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { withTranslation } from 'react-i18next';
import ModalBase from './ModalBase';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import SearchCancel from '../SearchCancel';
import { ModalHeader, ModalBody } from '../../styles/Modals';
import { fontSizes } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

class SearchModal extends ModalBase {
    renderModalHeader = () => {
        return (
            <ModalHeader>
                <SearchContainer>
                    <SearchInput />
                    <SearchCancel />
                </SearchContainer>
            </ModalHeader>
        );
    };

    renderModalBody = () => {
        return <ModalBody />;
    };

    render() {
        const { modalVisible } = this.state;
        const { animationType, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody()}
                </RootView>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(
    withTranslation()(withTheme(SearchModal)),
);

const SearchContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

const SearchInput = styled.TextInput.attrs((props) => ({
    placeholderTextColor: props.theme.inputPlaceholderText,
}))`
    display: flex;
    flex: 1;
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    padding: 7px 10px;
    background-color: white;
    border-radius: 4px;
    margin-top: auto;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
`;
