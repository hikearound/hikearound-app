export const nameInput = {
    name: 'name',
    autoCorrect: false,
    textContentType: 'name',
    autoCapitalize: 'words',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
    autoCompleteType: 'name',
};

export const emailInput = {
    keyboardType: 'email-address',
    name: 'email',
    autoCorrect: false,
    autoCapitalize: 'none',
    textContentType: 'emailAddress',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
    autoCompleteType: 'username',
};

export const passwordInput = {
    name: 'password',
    secureTextEntry: true,
    textContentType: 'password',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
    autoCompleteType: 'password',
};

export const updateLocationInput = {
    name: 'location',
    value: 'updatedLocation',
    autoCapitalize: 'words',
    textContentType: 'addressCityAndState',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
};

nameInput.value = 'updatedName';
export const updateNameInput = nameInput;

export const currentPasswordInput = {
    name: 'currentPassword',
    secureTextEntry: true,
    textContentType: 'password',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
    autoCompleteType: 'password',
};

export const newPasswordInput = {
    name: 'newPassword',
    secureTextEntry: true,
    textContentType: 'password',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
    autoCompleteType: 'password',
};

export const reviewInput = {
    name: 'review',
    textContentType: 'none',
    multiline: true,
    enablesReturnKeyAutomatically: false,
    returnKeyType: 'default',
    autoCompleteType: 'off',
    autoFocus: true,
};
