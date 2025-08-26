import { LogBox } from 'react-native';

export function ignoreWarnings() {
    LogBox.ignoreLogs([
        'Unhandled promise rejection: Error: internal',
        'Constants.platform.ios.model has been deprecated',
        'Notification registration failed',
        'Cannot update a component from inside the function body of a different component',
        'VirtualizedLists should never be nested',
        'Native splash screen is already hidden',
    ]);
}

export default ignoreWarnings;
