import * as Updates from 'expo-updates';

export async function checkForUpdate() {
    if (__DEV__) {
        return false;
    }
    const update = await Updates.checkForUpdateAsync();
    return update.isAvailable;
}

export async function fetchUpdate() {
    if (__DEV__) {
        return false;
    }
    const update = await Updates.fetchUpdateAsync();
    return update.isNew;
}

export async function reloadApp() {
    await Updates.reloadAsync();
}
