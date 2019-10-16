import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputButton from '../InputButton';
import { colors, fontWeights, spacing, fontSizes } from '../../constants/Index';

const propTypes = {
    resetAction: PropTypes.object.isRequired,
    inputs: PropTypes.array.isRequired,
    continueText: PropTypes.string.isRequired,
};

class InputGroup extends React.Component {
    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleContinue = () => {
        const { resetAction, navigation } = this.props;
        navigation.dispatch(resetAction);
    };

    render() {
        const { inputs, continueText } = this.props;

        return (
            <RootView>
                {inputs.map(
                    (
                        {
                            name,
                            placeholder,
                            keyboardType,
                            secureTextEntry,
                            autoCorrect,
                            autoCapitalize,
                            ref,
                        },
                        index,
                    ) => (
                        <LabelInputGroup key={`input_${index}`}>
                            <InputLabel>{placeholder}</InputLabel>
                            <TextInput
                                ref={ref}
                                placeholder={placeholder}
                                keyboardType={keyboardType}
                                secureTextEntry={secureTextEntry}
                                autoCorrect={autoCorrect}
                                autoCapitalize={autoCapitalize}
                                autoFocus={index === 0}
                                onChangeText={(text) =>
                                    this.setValue(name, text, index)
                                }
                            />
                        </LabelInputGroup>
                    ),
                )}
                <InputButton text={continueText} action={this.handleLogin} />
            </RootView>
        );
    }
}

InputGroup.propTypes = propTypes;

export default InputGroup;

const RootView = styled.View`
    flex: 1;
`;

const TextInput = styled.TextInput`
    color: ${colors.darkGray};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;

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
