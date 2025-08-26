import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { connectSearchBox } from 'react-instantsearch-native';
import { withTheme } from '@utils/Themes';
import SearchIcon from '@icons/Search';
import Cancel from '@components/search/Cancel';
import { fontSizes, spacing, borderRadius } from '@constants/Index';
import { withNavigation } from '@utils/Navigation';

const propTypes = {
    refine: PropTypes.func.isRequired,
    currentRefinement: PropTypes.string.isRequired,
};

class SearchBox extends React.PureComponent {
    componentDidMount() {
        const { navigation } = this.props;

        this.unsubscribe = navigation.addListener('blur', () => {
            this.searchInput.blur();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    assignRef = (ref) => {
        this.searchInput = ref;
    };

    handleSubmitEditing = () => {
        // const { currentRefinement } = this.props;
        // console.log(currentRefinement)
    };

    render() {
        const { refine, currentRefinement, t } = this.props;

        return (
            <SearchContainer>
                <InputView>
                    <SearchIcon />
                    <SearchInput
                        autoFocus
                        onSubmitEditing={() => this.handleSubmitEditing()}
                        ref={(ref) => this.assignRef(ref)}
                        enablesReturnKeyAutomatically={false}
                        returnKeyType='search'
                        clearButtonMode='always'
                        placeholder={t('label.nav.search')}
                        onChangeText={(text) => refine(text)}
                        value={currentRefinement}
                        autoCorrect={false}
                    />
                </InputView>
                <Cancel />
            </SearchContainer>
        );
    }
}

SearchBox.propTypes = propTypes;

export default withTranslation()(
    withTheme(withNavigation(connectSearchBox(SearchBox))),
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
    margin-left: 0;
    margin-right: ${spacing.tiny}px;
    border-radius: ${borderRadius.medium}px;
    flex-direction: row;
    background-color: ${(props) => props.theme.searchBackground};
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
