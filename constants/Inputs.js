export const nameInput = {
    placeholder: 'Name',
    name: 'name',
    autoCorrect: false,
    textContentType: 'name',
    autoCapitalize: 'words',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
};

export const emailInput = {
    keyboardType: 'email-address',
    placeholder: 'Email',
    name: 'email',
    autoCorrect: false,
    autoCapitalize: 'none',
    textContentType: 'emailAddress',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'next',
};

export const passwordInput = {
    placeholder: 'Password',
    name: 'password',
    secureTextEntry: true,
    textContentType: 'password',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
};

export const updateLocationInput = {
    placeholder: 'Location',
    name: 'location',
    value: 'updatedLocation',
    autoCapitalize: 'words',
    textContentType: 'addressCityAndState',
    enablesReturnKeyAutomatically: true,
    returnKeyType: 'done',
};

const updateNameInput = nameInput;
updateNameInput.value = 'updatedName';

export const signInInputs = [emailInput, passwordInput];
export const createAccountInputs = [nameInput, emailInput, passwordInput];
export const editProfileInputs = [updateNameInput, updateLocationInput];

export default { signInInputs, createAccountInputs, editProfileInputs };
