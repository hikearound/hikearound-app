import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

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
    autoFocus: PropTypes.bool,
};

const defaultProps = {
    inputMaxLegnth: 100,
    defaultValue: '',
    keyboardType: 'default',
    secureTextEntry: false,
    autoCorrect: false,
    autoCapitalize: 'none',
    autoFocus: false,
};

class InputLabelGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
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
            autoFocus,
        } = this.props;

        return (
            <LabelInputGroup>
                <InputLabel>{placeholder}</InputLabel>
                <ModalInput
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    autoFocus={autoFocus}
                    textContentType={textContentType}
                    maxLength={inputMaxLegnth}
                    onChangeText={onChangeText}
                    defaultValue={defaultValue}
                />
            </LabelInputGroup>
        );
    }
}

InputLabelGroup.propTypes = propTypes;
InputLabelGroup.defaultProps = defaultProps;

export default InputLabelGroup;

const LabelInputGroup = styled.View`
    width: 100%;
    flex-direction: row;
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    border-bottom-width: 1px;
    padding: ${spacing.small}px;
    margin-top: -1px;
`;

const InputLabel = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
    width: 95px;
`;

const ModalInput = styled.TextInput`
    color: ${colors.darkGray};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;
