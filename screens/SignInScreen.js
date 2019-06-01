import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
    ScrollView,
    Alert,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import Fire from '../Fire';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'
import { ActionButton, HikeBody } from '../components/Index'

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

let inputs = [
    {
        keyboardType: 'email-address',
        placeholder: 'Email',
        autoCorrect: false,
        autoCapitalize: 'none',
    },
    {
        placeholder: 'Password',
        secureTextEntry: true,
    },
];

function mapStateToProps(state) {
    return { action: state.action };
}

class SignInScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: colors.purple,
            height: 60,
        },
        headerTintColor: colors.white,
        headerTitle: 'Sign In',
        headerTitleStyle: {
            fontSize: parseInt(fontSizes.header),
        },
    };

    state = {
        isLoading: false,

    };

    constructor(props) {
        super(props);

        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));

        this.state = {
            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,
            email: '',
            password: '',
        };
    }

    setValue(text, index) {
        if (index === 0) {
            this.setState({ email: text });
        } else {
            this.setState({ password: text });
        }
    }

    handleLogin = async () => {
        this.setState({ isLoading: true });
        firebase
            .auth()
            .signInWithEmailAndPassword(
                this.state.email, this.state.password
            )
            .catch(function(error) {
                Alert.alert('Error', error.message);
            })
            .then(response => {
                this.setState({ isLoading: false });
                if (response) {
                    AsyncStorage.setItem(
                        'response', JSON.stringify(response)
                    );
                    this.setState({ isSuccessful: true });
                    this.storeUid(response.user.uid);
                    this.handleContinue();
                }
            });
    };

    storeUid = async uid => {
        try {
            await AsyncStorage.setItem('uid', uid);
        } catch (error) {}
    };

    handleContinue = () => {
        this.props.navigation.dispatch(resetAction);
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
        return (
            <RootView>
                <ScrollView keyboardShouldPersistTaps='always'>
                    { inputs.map(({
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
                            onChangeText={text => this.setValue(text, index)}
                        />
                    )}
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={this.handleLogin}
                        >
                        <ActionButton
                            primary
                            text={'Continue'}
                            margin={'0 20px 0 20px'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.4}>
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
                    doneButton={<Text>Continue</Text>}
                    tintColor={colors.purple}
                    onDone={this.handleLogin}
                />
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
)(SignInScreen);

const RootView = styled.View`
    flex: 1;
    margin-top: 26px;
`;

const TextInput = styled.TextInput`
    margin: 0 20px 26px 20px;
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    font-size: 16px;
`;

const Text = styled.Text`
    font-size: 15px;
    color: ${colors.purple};
    font-weight: ${fontWeights.bold};
`;

const PasswordText = styled.Text`
    font-weight: ${fontWeights.medium};
    font-size: 15px;
    margin: 20px;
    color: ${colors.purple};
`;
