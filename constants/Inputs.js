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

export function getSignInInputs(emailLabel, passwordLabel) {
    emailInput.placeholder = emailLabel;
    passwordInput.placeholder = passwordLabel;
    return [emailInput, passwordInput];
}

export function getCreateAccountInputs(nameLabel, emailLabel, passwordLabel) {
    nameInput.placeholder = nameLabel;
    emailInput.placeholder = emailLabel;
    passwordInput.placeholder = passwordLabel;
    return [nameInput, emailInput, passwordInput];
}

export function getEditProfileInputs(nameLabel, locationLabel, name, location) {
    updateNameInput.placeholder = nameLabel;
    updateNameInput.defaultValue = name;
    updateLocationInput.placeholder = locationLabel;
    updateLocationInput.defaultValue = location;
    return [updateNameInput, updateLocationInput];
}

export default {
    getSignInInputs,
    getCreateAccountInputs,
    getEditProfileInputs,
};
