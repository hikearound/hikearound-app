import * as Permissions from 'expo-permissions';

export async function getPermissionStatus(type) {
    let permission;
    if (type === 'location') {
        permission = Permissions.LOCATION;
    }
    const { status } = await Permissions.getAsync(permission);
    return status;
}

export default getPermissionStatus;
