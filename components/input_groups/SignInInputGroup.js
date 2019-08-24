import { Alert } from 'react-native';
import firebase from 'firebase';
import InputGroup from './InputGroup';

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
            .catch((error) => {
                Alert.alert('Error', error.message);
            })
            .then((response) => {
                if (response) {
                    this.handleContinue();
                }
            });
    }
}

export default SignInInputGroup;
