import React from 'react';
import { Alert } from 'react-native';
import InputGroup from './InputGroup'
import firebase from 'firebase';

class SignInInputGroup extends InputGroup {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleLogin = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(
                this.state.email, this.state.password
            )
            .catch(function(error) {
                Alert.alert('Error', error.message);
            })
            .then(response => {
                if (response) {
                    this.handleContinue();
                }
            });
    };
}

export default SignInInputGroup;
