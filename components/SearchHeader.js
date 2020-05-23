import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { withTheme } from '../utils/Themes';
import SearchCancel from './SearchCancel';
import { ModalHeader } from '../styles/Modals';
import { fontSizes, colors, spacing, borderRadius } from '../constants/Index';

function mapStateToProps() {
    return {};
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

class SearchHeader extends React.PureComponent {
    handleSubmitEditing = () => {
        // todo
    };

    assignRef = (ref) => {
        this.searchInput = ref;
    };

    render() {
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
    }
}

SearchHeader.propTypes = propTypes;
SearchHeader.defaultProps = defaultProps;

export default connect(mapStateToProps)(
    withTranslation()(withTheme(SearchHeader)),
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
