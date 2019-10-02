import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

const propTypes = {
    setValue: PropTypes.func.isRequired,
    labelName: PropTypes.string.isRequired,
    value: PropTypes.string,
    textContentType: PropTypes.string.isRequired,
    inputMaxLegnth: PropTypes.number,
};

const defaultProps = {
    inputMaxLegnth: 100,
    value: '',
};

class InputLabelGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const {
            labelName,
            textContentType,
            setValue,
            inputMaxLegnth,
            value,
        } = this.props;

        return (
            <LabelInputGroup>
                <InputLabel>{labelName}</InputLabel>
                <ModalInput
                    placeholder={labelName}
                    value={value}
                    textContentType={textContentType}
                    maxLength={inputMaxLegnth}
                    onChangeText={(text) => setValue(text)}
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
    border-color: ${colors.gray};
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
    width: 85px;
`;

const ModalInput = styled.TextInput`
    color: ${colors.darkGray};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;
