import { LogBox } from 'react-native';

export function ignoreWarnings() {
    LogBox.ignoreLogs([
        'Calling `getNode()` on the ref of an Animated component is no longer necessary.',
        'Unhandled promise rejection: Error: internal',
        'Warning: Cannot update a component from inside the function body of a different component',
        'Error: Native splash screen is already hidden',
        'VirtualizedLists should never be nested',
        'Non-serializable values were found in the navigation state',
    ]);
}

export default ignoreWarnings;
