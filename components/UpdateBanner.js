import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { spacing, colors, opacities } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { reloadApp, fetchUpdate } from '@utils/Update';

const propTypes = {};
const defaultProps = {};

function UpdateBanner({ t }) {
    useEffect(() => {
        fetchUpdate();
    });

    const onPress = async () => {
        await reloadApp();
    };

    const renderUpdateButton = () => (
        <TouchableOpacity
            activeOpacity={opacities.regular}
            onPress={() => onPress()}
        >
            <ButtonView>
                <ButtonText>{t('update.cta')}</ButtonText>
            </ButtonView>
        </TouchableOpacity>
    );

    return (
        <Wrapper>
            <BannerText>{t('update.text')}</BannerText>
            {renderUpdateButton()}
        </Wrapper>
    );
}

UpdateBanner.propTypes = propTypes;
UpdateBanner.defaultProps = defaultProps;

export default withTranslation()(withTheme(UpdateBanner));

const Wrapper = styled.View`
    padding: 12px ${spacing.tiny}px;
    flex-direction: row;
    background-color: ${(props) => props.theme.rootBackground};
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

const ButtonView = styled.View`
    display: flex;
`;

const ButtonText = styled.Text`
    color: ${colors.purple};
`;

const BannerText = styled.Text`
    color: ${(props) => props.theme.text};
    flex: 1;
`;
