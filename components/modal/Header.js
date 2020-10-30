import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ModalDismiss from './header/Dismiss';
import ModalContinue from './header/Continue';
import { withTheme } from '../../utils/Themes';
import { ModalHeader, ModalTitleText } from '../../styles/Modals';

const propTypes = {
    title: PropTypes.string.isRequired,
    textDismiss: PropTypes.bool,
    dismissLanguage: PropTypes.string,
    continueText: PropTypes.string.isRequired,
    dismissAction: PropTypes.string,
    continueAction: PropTypes.string.isRequired,
};

const defaultProps = {
    textDismiss: true,
    dismissAction: 'close',
    dismissLanguage: 'cancel',
};

class GenericHeader extends React.PureComponent {
    render() {
        const {
            title,
            textDismiss,
            dismissLanguage,
            continueText,
            dismissAction,
            continueAction,
        } = this.props;

        return (
            <ModalHeader>
                <ModalTitleText>{title}</ModalTitleText>
                <ModalDismiss
                    textDismiss={textDismiss}
                    dismissLanguage={dismissLanguage}
                    closeAction={dismissAction}
                />
                <ModalContinue
                    continueText={continueText}
                    closeAction={continueAction}
                />
            </ModalHeader>
        );
    }
}

GenericHeader.propTypes = propTypes;
GenericHeader.defaultProps = defaultProps;

export default withTranslation()(withTheme(GenericHeader));
