import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import ModalBase from './ModalBase';
import { withTheme } from '../../utils/Themes';
import { RootView } from '../../styles/Screens';
import SearchCancel from '../SearchCancel';
import { ModalHeader, ModalBody } from '../../styles/Modals';
import {
    fontSizes,
    colors,
    spacing,
    borderRadius,
} from '../../constants/Index';

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
        return (
            <ModalHeader>
                <SearchContainer>
                    <InputView>
                        <Ionicons
                            name='md-search'
                            size={22}
                            color={colors.gray}
                            style={{
                                display: 'flex',
                                marginLeft: 8,
                                marginTop: 4,
                            }}
                        />
                        <SearchInput
                            autoFocus
                            onSubmitEditing={() => this.handleSubmitEditing()}
                            ref={(ref) => this.assignRef(ref)}
                            enablesReturnKeyAutomatically={false}
                            returnKeyType='search'
                            clearButtonMode='while-editing'
                            placeholder='Search'
                        />
                    </InputView>
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

const InputView = styled.View`
    display: flex;
    flex: 1;
    margin-top: auto;
    margin-bottom: ${spacing.tiny}px;
    margin-left: ${spacing.tiny}px;
    margin-right: ${spacing.tiny}px;
    background-color: ${colors.white};
    border-radius: ${borderRadius.medium}px;
    flex-direction: row;
`;

const SearchInput = styled.TextInput.attrs((props) => ({
    placeholderTextColor: props.theme.inputPlaceholderText,
}))`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    padding: 7px ${spacing.tiny}px 7px ${spacing.micro}px;
    display: flex;
    flex: 1;
`;
