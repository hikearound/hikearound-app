import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import {
    KeyboardAccessoryNavigation
} from 'react-native-keyboard-accessory';
import ActionButton from '../Button';
import {
    colors,
    fontWeights
} from '../../constants/Index';

class InputGroup extends React.Component {
    constructor(props) {
        super(props);
        const { inputs } = this.props;

        mappedInputs = inputs.map(input => ({
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
    }

    handleFocus = index => () => {
        this.setState({
            nextFocusDisabled: index === mappedInputs.length - 1,
            previousFocusDisabled: index === 0,
            activeInputIndex: index,
        });
    }

    handleFocusNext = () => {
        const { nextFocusDisabled, activeInputIndex } = this.state;
        if (nextFocusDisabled) {
            return;
        }
        mappedInputs[activeInputIndex + 1].ref.current.focus();
    }

    handleFocusPrevious = () => {
        const { previousFocusDisabled, activeInputIndex } = this.state;
        if (previousFocusDisabled) {
            return;
        }
        mappedInputs[activeInputIndex - 1].ref.current.focus();
    }

    render() {
        const {
            inputs,
            secondaryInputs,
            passwordLinkDisplay,
        } = this.props;
        const {
            nextFocusDisabled,
            previousFocusDisabled,
            buttonsHidden,
        } = this.state;
        return (
            <RootView>
                <ScrollView keyboardShouldPersistTaps='always'>
                    { inputs.map(({
                        name,
                        placeholder,
                        keyboardType,
                        secureTextEntry,
                        autoCorrect,
                        autoCapitalize,
                        ref,
                    }, index) => (
                        <TextInput
                            key={`input_${index}`}
                            ref={ref}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            onFocus={this.handleFocus(index)}
                            autoFocus={index === 0}
                            onChangeText={text => this.setValue(
                                name, text, index
                            )}
                        />
                    ))}
                    <ActionButton
                        primary
                        text='Continue'
                        margin='0 20px 0 20px'
                        action={this.handleLogin}
                    />
                    <View>{secondaryInputs}</View>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={{
                            display: passwordLinkDisplay,
                        }}
                    >
                        <PasswordText>Forgot Password?</PasswordText>
                    </TouchableOpacity>
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

export default InputGroup;

const RootView = styled.View`
    flex: 1;
`;

const TextInput = styled.TextInput`
    margin: 0 20px 26px 20px;
    padding-bottom: 3px;
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    font-size: 16px;
    color: #333;
`;

const PasswordText = styled.Text`
    font-weight: ${fontWeights.medium};
    font-size: 15px;
    margin: 20px;
    color: ${colors.purple};
`;

const Text = styled.Text`
    font-size: 15px;
    color: ${colors.purple};
    font-weight: ${fontWeights.bold};
`;
