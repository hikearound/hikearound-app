import { LogBox } from 'react-native';

export function ignoreWarnings() {
    LogBox.ignoreLogs([
        'Unhandled promise rejection: Error: internal',
        'Warning: Cannot update a component from inside the function body of a different component',
        'Error: Native splash screen is already hidden',
    ]);
}

export default ignoreWarnings;
