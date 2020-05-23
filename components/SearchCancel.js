import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { colors, opacities, spacing, fontSizes } from '../constants/Index';
import { closeModal } from '../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: () => dispatch(closeModal()),
    };
}

class SearchCancel extends React.PureComponent {
    close = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag();
    };

    render() {
        const { t } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                activeOpacity={opacities.regular}
            >
                <CancelText>{t('label.modal.cancel')}</CancelText>
            </TouchableOpacity>
        );
    }
}

SearchCancel.propTypes = propTypes;

export default connect(
    null,
    mapDispatchToProps,
)(withTranslation()(SearchCancel));

const CancelText = styled.Text`
    display: flex;
    align-self: flex-end;
    margin-top: auto;
    margin-bottom: 17px;
    margin-right: ${spacing.tiny}px;
    color: ${colors.white};
    font-size: ${fontSizes.large}px;
`;
