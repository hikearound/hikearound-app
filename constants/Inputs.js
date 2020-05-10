import i18n from 'i18next';

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
    placeholder: i18n.t('location'),
    name: 'location',
    value: 'updatedLocation',
    autoCapitalize: 'words',
    textContentType: 'addressCityAndState',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
};

const updateNameInput = nameInput;
updateNameInput.value = 'updatedName';

export const editProfileInputs = [updateNameInput, updateLocationInput];

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

export default { getSignInInputs, getCreateAccountInputs, editProfileInputs };
