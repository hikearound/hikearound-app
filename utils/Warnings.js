import { LogBox } from 'react-native';

export function ignoreWarnings() {
    LogBox.ignoreLogs([
        'Unhandled promise rejection: Error: internal',
        'Constants.installationId has been deprecated',
        'Notification registration failed',
        'Cannot update a component from inside the function body of a different component',
        'Calling `getNode()` on the ref of an Animated component is no longer necessary',
        'VirtualizedLists should never be nested',
        'Native splash screen is already hidden',
    ]);
}

export default ignoreWarnings;
