import { Alert } from 'react-native';
import firebase from 'firebase';
import InputGroup from './InputGroup';

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

    handleLogin = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                Alert.alert('Error', error.message);
            })
            .then((response) => {
                if (response) {
                    this.handleContinue();
                }
            });
    };
}

export default CreateAccountInputGroup;
