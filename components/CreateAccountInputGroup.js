import React from 'react';
import { Alert } from 'react-native';
import InputGroup from '../components/InputGroup'
import firebase from 'firebase';

class CreateAccountInputGroup extends InputGroup {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordCopy: '',
        };
    }

    setValue(text, index) {
        if (index == 0) {
            this.setState({name: text});
        } else if (index == 1) {
            this.setState({email: text});
        } else if (index == 2) {
            this.setState({password: text});
        } else {
            this.setState({passwordCopy: text});
        }
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

export default CreateAccountInputGroup;
