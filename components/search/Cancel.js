import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { colors, opacities, spacing, fontSizes } from '@constants/Index';
import { withNavigation } from '@utils/Navigation';

class Cancel extends React.PureComponent {
    close = () => {
        const { navigation } = this.props;
        navigation.goBack();
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

export default withTranslation()(withNavigation(Cancel));

const CancelText = styled.Text`
    display: flex;
    align-self: flex-end;
    margin-top: auto;
    margin-bottom: 17px;
    margin-right: ${spacing.tiny}px;
    color: ${colors.white};
    font-size: ${fontSizes.large}px;
`;
