import store from '../store/Store';

const nameInput = {
    name: 'name',
    autoCorrect: false,
    textContentType: 'name',
    autoCapitalize: 'words',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
};

const emailInput = {
    keyboardType: 'email-address',
    name: 'email',
    autoCorrect: false,
    autoCapitalize: 'none',
    textContentType: 'emailAddress',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
};

const passwordInput = {
    name: 'password',
    secureTextEntry: true,
    textContentType: 'password',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
};

const updateLocationInput = {
    name: 'location',
    value: 'updatedLocation',
    autoCapitalize: 'words',
    textContentType: 'addressCityAndState',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
};

const updateNameInput = nameInput;
updateNameInput.value = 'updatedName';

export function getSignInInputs(labels) {
    emailInput.placeholder = labels.email;
    passwordInput.placeholder = labels.password;

    return [emailInput, passwordInput];
}

export function getCreateAccountInputs(labels) {
    nameInput.placeholder = labels.name;
    emailInput.placeholder = labels.email;
    passwordInput.placeholder = labels.password;

    return [nameInput, emailInput, passwordInput];
}

export function getEditProfileInputs(labels) {
    const state = store.getState();
    const { name, location } = state.userReducer;

    updateNameInput.placeholder = labels.name;
    updateNameInput.defaultValue = name;
    updateLocationInput.placeholder = labels.location;
    updateLocationInput.defaultValue = location;

    return [updateNameInput, updateLocationInput];
}

export default {
    getSignInInputs,
    getCreateAccountInputs,
    getEditProfileInputs,
};
