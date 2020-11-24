import React from 'react';
import { withTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { withTheme } from '../utils/Themes';
import { toastConfig, getToastOffset } from '../utils/Toast';

class ToastProvider extends React.PureComponent {
    render() {
        return (
            <Toast
                config={toastConfig}
                ref={(ref) => Toast.setRef(ref)}
                bottomOffset={getToastOffset()}
            />
        );
    }
}

export default withTranslation()(withTheme(ToastProvider));
