import React from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import ModalDismiss from '@components/modal/header/Dismiss';
import ModalReset from '@components/modal/header/Reset';
import FilterSegmentedControl from '@components/FilterSegmentedControl';
import { withTheme } from '@utils/Themes';
import { RootView } from '@styles/Screens';
import { getSegmentedControls } from '@utils/Filter';
import {
    PageSheetModalHeader,
    PageSheetModalTitleText,
    ModalBody,
} from '@styles/Modals';
import { defaultState } from '@constants/states/FilterModal';
import { Button, Text } from '@styles/Actions';
import { opacities, spacing } from '@constants/Index';
import { filterFeed } from '@actions/Feed';
import { closeModal } from '@actions/Modal';
import { toggleModalVisibility } from '@utils/Modal';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    dispatchFilterParams: PropTypes.func.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    animationType: PropTypes.string,
    presentationStyle: PropTypes.string,
    modalType: PropTypes.string,
    closeAction: PropTypes.string,
};

const defaultProps = {
    animationType: 'slide',
    presentationStyle: 'pageSheet',
    modalType: 'filter',
    closeAction: 'closeFilter',
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFilterParams: (filterParams) =>
            dispatch(filterFeed(filterParams)),
        dispatchModalFlag: (closeAction) => dispatch(closeModal(closeAction)),
    };
}

class FilterModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        const { t, modalType } = this.props;
        const controls = getSegmentedControls(t, modalType);

        this.handleSingleSelect = this.handleSingleSelect.bind(this);
        this.handleMultipleSelect = this.handleMultipleSelect.bind(this);

        this.state = defaultState;
        this.state.controls = controls;
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType } = this.props;

        const functions = {
            show: this.showModal.bind(this),
            hide: this.hideModal.bind(this),
        };

        toggleModalVisibility(prevProps, currentModal, modalType, functions);
    }

    hideModal = () => {
        this.dispatchCloseAction();
        this.setState({ modalVisible: false });
    };

    showModal = () => {
        this.setState({ modalVisible: true });
    };

    dispatchCloseAction = () => {
        const { dispatchModalFlag, closeAction } = this.props;
        dispatchModalFlag(closeAction);
    };

    resetFilters = () => {
        this.setState({
            selectedIndices: {
                sort: 0,
                route: [],
                difficulty: [],
                elevation: [],
                distance: [],
            },
        });
    };

    handleSingleSelect = (index, type) => {
        const { selectedIndices } = this.state;
        selectedIndices[type] = index;

        this.setState({ selectedIndices });
    };

    handleMultipleSelect = (index, type) => {
        const { selectedIndices } = this.state;

        if (selectedIndices[type].includes(index)) {
            selectedIndices[type] = selectedIndices[type].filter(
                (item) => item !== index,
            );
        } else {
            selectedIndices[type].push(index);
        }

        this.setState({ selectedIndices });
    };

    renderModalHeader = (t) => (
        <PageSheetModalHeader>
            <PageSheetModalTitleText>
                {t('modal.filter.title')}
            </PageSheetModalTitleText>
            <ModalDismiss isPageSheet textDismiss dismissLanguage='cancel' />
            <ModalReset
                isPageSheet
                resetText={t('label.modal.reset')}
                resetFilters={this.resetFilters}
            />
        </PageSheetModalHeader>
    );

    renderModalBody = () => {
        const { selectedIndices, controls } = this.state;

        return (
            <ModalBody includePadding>
                {controls.map(({ title, multiple, values, type }, index) => {
                    if (multiple) {
                        return (
                            <FilterSegmentedControl
                                title={title}
                                key={index}
                                multiple={multiple}
                                values={values}
                                selectedIndices={selectedIndices[type]}
                                selectedIndex={0}
                                type={type}
                                onTabPress={this.handleMultipleSelect}
                            />
                        );
                    }
                    return (
                        <FilterSegmentedControl
                            title={title}
                            key={index}
                            multiple={multiple}
                            values={values}
                            selectedIndices={[]}
                            selectedIndex={selectedIndices[type]}
                            type={type}
                            onTabPress={this.handleSingleSelect}
                        />
                    );
                })}
                {this.renderFilterButton()}
            </ModalBody>
        );
    };

    applyFilters = () => {
        const { dispatchFilterParams } = this.props;
        const { selectedIndices } = this.state;

        dispatchFilterParams(selectedIndices);
        this.hideModal();
    };

    renderFilterButton = () => {
        const { t } = this.props;

        return (
            <ButtonWrapper>
                <TouchableOpacity
                    onPress={() => {
                        this.applyFilters();
                    }}
                    activeOpacity={opacities.regular}
                >
                    <Button primary>
                        <Text primary>{t('modal.filter.cta')}</Text>
                    </Button>
                </TouchableOpacity>
            </ButtonWrapper>
        );
    };

    render() {
        const { modalVisible } = this.state;
        const { animationType, presentationStyle, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                visible={modalVisible}
                presentationStyle={presentationStyle}
            >
                <RootView>
                    {this.renderModalHeader(t)}
                    {this.renderModalBody()}
                </RootView>
            </Modal>
        );
    }
}

FilterModal.propTypes = propTypes;
FilterModal.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(FilterModal)));

const ButtonWrapper = styled.View`
    position: absolute;
    bottom: 80px;
    left: ${spacing.tiny}px;
    right: ${spacing.tiny}px;
`;
