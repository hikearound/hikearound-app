import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
    ScrollView,
    Alert,
    AsyncStorage,
    Keyboard,
    View,
} from 'react-native';
import {
    spacing,
    colors,
    fontSizes,
    fontWeights
} from '../../constants/Index'
import ActionButton from '../../components/Button'
import firebase from 'firebase';
import {
    KeyboardAccessoryNavigation
} from 'react-native-keyboard-accessory';

class InputGroup extends React.Component {
    constructor(props) {
        super(props);

        inputs = this.props.inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));

        this.state = {
            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,
        };
    }

    handleContinue = () => {
        this.props.navigation.dispatch(this.props.resetAction);
    }

    setValue(name, text, index) {
        this.setState({[name]: text});
    }

    handleFocus = index => () => {
        this.setState({
            nextFocusDisabled: index === inputs.length - 1,
            previousFocusDisabled: index === 0,
            activeInputIndex: index,
        });
    }

    handleFocusNext = () => {
        const { nextFocusDisabled, activeInputIndex } = this.state;
        if (nextFocusDisabled) {
            return;
        }
        inputs[activeInputIndex + 1].ref.current.focus();
    }

    handleFocusPrevious = () => {
        const { previousFocusDisabled, activeInputIndex } = this.state;
        if (previousFocusDisabled) {
            return;
        }
        inputs[activeInputIndex - 1].ref.current.focus();
    }

    render() {
        const { ...props } = this.props;
        return (
            <RootView>
                <ScrollView keyboardShouldPersistTaps='always'>
                    { this.props.inputs.map(({
                        name,
                        placeholder,
                        keyboardType,
                        secureTextEntry,
                        autoCorrect,
                        autoCapitalize,
                        ref,
                    }, index) =>
                        <TextInput
                            key={`input_${index}`}
                            ref={ref}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            blurOnSubmit={true}
                            onFocus={this.handleFocus(index)}
                            autoFocus={index === 0}
                            onChangeText={text => this.setValue(
                                name, text, index
                            )}
                        />
                    )}
                    <ActionButton
                        primary
                        text={'Continue'}
                        margin={'0 20px 0 20px'}
                        action={this.handleLogin}
                    />
                <View>{this.props.secondaryInputs}</View>
                <TouchableOpacity
                    activeOpacity={0.4}
                    style={{
                        display: this.props.passwordLinkDisplay,
                    }}>
                    <PasswordText>Forgot Password?</PasswordText>
                </TouchableOpacity>
            </ScrollView>
            <KeyboardAccessoryNavigation
                avoidKeyboard={true}
                nextDisabled={this.state.nextFocusDisabled}
                previousDisabled={this.state.previousFocusDisabled}
                nextHidden={this.state.buttonsHidden}
                previousHidden={this.state.buttonsHidden}
                onNext={this.handleFocusNext}
                onPrevious={this.handleFocusPrevious}
                doneButton={<Text></Text>}
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
