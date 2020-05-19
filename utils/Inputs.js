import store from '../store/Store';
import { getInputLabels } from './Localization';
import {
    nameInput,
    emailInput,
    passwordInput,
    updateLocationInput,
    updateNameInput,
} from '../constants/Inputs';

function getSignInInputs(labels) {
    emailInput.placeholder = labels.email;
    passwordInput.placeholder = labels.password;

    return [emailInput, passwordInput];
}

function getCreateAccountInputs(labels) {
    nameInput.placeholder = labels.name;
    emailInput.placeholder = labels.email;
    passwordInput.placeholder = labels.password;

    return [nameInput, emailInput, passwordInput];
}

function getEditProfileInputs(labels) {
    const state = store.getState();
    const { name, location } = state.userReducer;

    updateNameInput.placeholder = labels.name;
    updateNameInput.defaultValue = name;
    updateLocationInput.placeholder = labels.location;
    updateLocationInput.defaultValue = location;

    return [updateNameInput, updateLocationInput];
}

export function getInputs(t, inputType) {
    const labels = getInputLabels(t);

    if (inputType === 'createAccount') {
        return getCreateAccountInputs(labels);
    }
    if (inputType === 'signIn') {
        return getSignInInputs(labels);
    }
    if (inputType === 'editProfile') {
        return getEditProfileInputs(labels);
    }

    return null;
}

export function setInputRefs(inputs, inputType) {
    if (inputType === 'editProfile') {
        return {
            name: inputs[0],
            location: inputs[1],
        };
    }

    return null;
}
