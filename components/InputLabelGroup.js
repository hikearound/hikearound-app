import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fontSizes, spacing, fontWeights } from '../constants/Index';
import { withTheme } from '../utils/Themes';

const propTypes = {
    placeholder: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    textContentType: PropTypes.string.isRequired,
    inputMaxLegnth: PropTypes.number,
    onChangeText: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCompleteType: PropTypes.string,
    autoFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    enablesReturnKeyAutomatically: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    inputRef: PropTypes.func,
};

const defaultProps = {
    inputMaxLegnth: 100,
    defaultValue: '',
    keyboardType: 'default',
    secureTextEntry: false,
    autoCorrect: false,
    autoCapitalize: 'none',
    autoCompleteType: 'off',
    autoFocus: false,
    blurOnSubmit: true,
    enablesReturnKeyAutomatically: false,
    returnKeyType: 'default',
    onChange: () => {},
    onSubmitEditing: () => {},
    inputRef: () => {},
};

class InputLabelGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { keyboardTheme: 'light' };
    }

    componentDidMount() {
        const { theme, scheme } = this.props;

        if (theme.dark || scheme === 'dark') {
            this.setState({ keyboardTheme: 'dark' });
        }
    }

    render() {
        const {
            textContentType,
            inputMaxLegnth,
            defaultValue,
            onChangeText,
            placeholder,
            keyboardType,
            secureTextEntry,
            autoCorrect,
            autoCapitalize,
            autoCompleteType,
            autoFocus,
            blurOnSubmit,
            enablesReturnKeyAutomatically,
            returnKeyType,
            onChange,
            onSubmitEditing,
            inputRef,
        } = this.props;
        const { keyboardTheme } = this.state;

        return (
            <LabelInputGroup>
                <InputLabel>{placeholder}</InputLabel>
                <Input
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    autoCompleteType={autoCompleteType}
                    autoFocus={autoFocus}
                    textContentType={textContentType}
                    maxLength={inputMaxLegnth}
                    onChangeText={onChangeText}
                    defaultValue={defaultValue}
                    blurOnSubmit={blurOnSubmit}
                    onSubmitEditing={onSubmitEditing}
                    enablesReturnKeyAutomatically={
                        enablesReturnKeyAutomatically
                    }
                    returnKeyType={returnKeyType}
                    onChange={onChange}
                    ref={inputRef}
                    keyboardAppearance={keyboardTheme}
                />
            </LabelInputGroup>
        );
    }
}

InputLabelGroup.propTypes = propTypes;
InputLabelGroup.defaultProps = defaultProps;

export default withTheme(InputLabelGroup);

const LabelInputGroup = styled.View`
    width: 100%;
    flex-direction: row;
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    border-bottom-width: 1px;
    margin-top: -1px;
`;

const InputLabel = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
    padding: ${spacing.small}px 0 ${spacing.small}px ${spacing.small}px;
    width: 105px;
`;

const Input = styled.TextInput.attrs((props) => ({
    placeholderTextColor: props.theme.inputPlaceholderText,
}))`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
    padding: ${spacing.small}px;
`;
