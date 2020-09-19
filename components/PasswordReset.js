import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from '../utils/Themes';
import { colors, fontSizes, spacing } from '../constants/Index';
import { showModal } from '../actions/Modal';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
};

class PasswordReset extends React.PureComponent {
    resetPassword = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag('resetPassword');
    };

    render() {
        const { t } = this.props;

        return (
            <Text onPress={this.resetPassword}>{t('screen.signIn.reset')}</Text>
        );
    }
}

PasswordReset.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(PasswordReset)));

const Text = styled.Text`
    color: ${colors.purple};
    font-size: ${fontSizes.small}px;
    margin: ${spacing.small}px;
`;
