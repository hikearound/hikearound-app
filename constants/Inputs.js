export const nameInput = {
    name: 'name',
    autoCorrect: false,
    textContentType: 'name',
    autoCapitalize: 'words',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
};

export const emailInput = {
    keyboardType: 'email-address',
    name: 'email',
    autoCorrect: false,
    autoCapitalize: 'none',
    textContentType: 'emailAddress',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
};

export const passwordInput = {
    name: 'password',
    secureTextEntry: true,
    textContentType: 'password',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
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
