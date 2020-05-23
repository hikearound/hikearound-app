import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
    iconStyle: PropTypes.object,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
};

const defaultProps = {
    iconStyle: {
        display: 'flex',
        marginLeft: 8,
        marginTop: 4,
    },
    iconName: 'md-search',
    iconSize: 22,
};

class SearchModal extends ModalBase {
    handleSubmitEditing = () => {
        // todo
    };

    assignRef = (ref) => {
        this.searchInput = ref;
    };

    renderModalHeader = () => {
        const { iconStyle, iconName, iconSize, t } = this.props;

        return (
            <ModalHeader>
                <SearchContainer>
                    <InputView>
                        <Ionicons
                            name={iconName}
                            size={iconSize}
                            color={colors.gray}
                            style={iconStyle}
                        />
                        <SearchInput
                            autoFocus
                            onSubmitEditing={() => this.handleSubmitEditing()}
                            ref={(ref) => this.assignRef(ref)}
                            enablesReturnKeyAutomatically={false}
                            returnKeyType='search'
                            clearButtonMode='while-editing'
                            placeholder={t('label.nav.search')}
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

SearchModal.propTypes = propTypes;
SearchModal.defaultProps = defaultProps;

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
