import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import InputButton from '../InputButton';
import { colors, fontWeights, spacing, fontSizes } from '../../constants/Index';

const propTypes = {
    resetAction: PropTypes.object.isRequired,
    inputs: PropTypes.array.isRequired,
};

class InputGroup extends React.Component {
    constructor(props) {
        super(props);
        const { inputs } = this.props;

        this.mappedInputs = inputs.map((input) => ({
            ref: React.createRef(),
            ...input,
        }));

        this.state = {
            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsHidden: false,
        };
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleContinue = () => {
        const { resetAction, navigation } = this.props;
        navigation.dispatch(resetAction);
    };

    handleFocus = (index) => () => {
        this.setState({
            nextFocusDisabled: index === this.mappedInputs.length - 1,
            previousFocusDisabled: index === 0,
            activeInputIndex: index,
        });
    };

    handleFocusNext = () => {
        const { nextFocusDisabled, activeInputIndex } = this.state;
        if (nextFocusDisabled) {
            return;
        }
        this.mappedInputs[activeInputIndex + 1].ref.current.focus();
    };

    handleFocusPrevious = () => {
        const { previousFocusDisabled, activeInputIndex } = this.state;
        if (previousFocusDisabled) {
            return;
        }
        this.mappedInputs[activeInputIndex - 1].ref.current.focus();
    };

    render() {
        const { inputs } = this.props;

        const {
            nextFocusDisabled,
            previousFocusDisabled,
            buttonsHidden,
        } = this.state;

        return (
            <RootView>
                <ScrollView keyboardShouldPersistTaps='always'>
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
                                    onFocus={this.handleFocus(index)}
                                    autoFocus={index === 0}
                                    onChangeText={(text) =>
                                        this.setValue(name, text, index)
                                    }
                                />
                            </LabelInputGroup>
                        ),
                    )}
                    <InputButton text='Continue' action={this.handleLogin} />
                </ScrollView>
                <KeyboardAccessoryNavigation
                    avoidKeyboard
                    nextDisabled={nextFocusDisabled}
                    previousDisabled={previousFocusDisabled}
                    nextHidden={buttonsHidden}
                    previousHidden={buttonsHidden}
                    onNext={this.handleFocusNext}
                    onPrevious={this.handleFocusPrevious}
                    doneButton={<Text />}
                    tintColor={colors.purple}
                    onDone={this.handleLogin}
                />
            </RootView>
        );
    }
}

InputGroup.propTypes = propTypes;

export default InputGroup;

const RootView = styled.View`
    display: flex;
    flex: 1;
`;

const TextInput = styled.TextInput`
    color: ${colors.darkGray};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;

const Text = styled.Text`
    font-size: ${fontSizes.medium}px;
    color: ${colors.purple};
    font-weight: ${fontWeights.bold};
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
    width: 85px;
`;
