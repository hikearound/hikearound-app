import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { withTranslation } from 'react-i18next';
import {
    spacing,
    borderRadius,
    opacities,
    fontWeights,
    fontSizes,
} from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { dismissPromotion } from '../utils/Promotions';
import { availabiltyMap } from '../constants/Images';

const propTypes = {
    imageSize: PropTypes.number,
    animationInTiming: PropTypes.number,
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    swipeDirection: PropTypes.array,
};

const defaultProps = {
    imageSize: 125,
    animationInTiming: 500,
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    swipeDirection: ['up', 'down'],
};

function Promotion({
    imageSize,
    animationIn,
    animationInTiming,
    animationOut,
    swipeDirection,
    t,
}) {
    const [isModalVisible, setModalVisible] = useState(true);

    const dismissModal = () => {
        setModalVisible(false);
        dismissPromotion('welcome');
    };

    const renderDismissButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() => dismissModal()}
            >
                <ButtonView>
                    <ButtonText>{t('promotion.welcome.cta')}</ButtonText>
                </ButtonView>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Modal
                isVisible={isModalVisible}
                animationIn={animationIn}
                animationInTiming={animationInTiming}
                animationOut={animationOut}
                swipeDirection={swipeDirection}
                onSwipeComplete={() => dismissModal()}
            >
                <Wrapper>
                    <PromoImage source={availabiltyMap} imageSize={imageSize} />
                    <PromoTextHeading>
                        {t('promotion.welcome.title')}
                    </PromoTextHeading>
                    <PromoTextDescription>
                        {t('promotion.welcome.description')}
                    </PromoTextDescription>
                    {renderDismissButton()}
                </Wrapper>
            </Modal>
        </View>
    );
}

Promotion.propTypes = propTypes;
Promotion.defaultProps = defaultProps;

export default withTranslation()(withTheme(Promotion));

const Wrapper = styled.View`
    background-color: ${(props) => props.theme.background};
    border-radius: ${borderRadius.medium}px;
`;

const ButtonView = styled.View`
    border-color: ${(props) => props.theme.modalButtonBorder};
    border-top-width: 1px;
    margin-top: 24px;
`;

const ButtonText = styled.Text`
    color: ${(props) => props.theme.buttonInputText};
    text-align: center;
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.medium};
    line-height: ${fontSizes.large}px;
    padding: ${spacing.small}px;
`;

const PromoTextHeading = styled.Text`
    color: ${(props) => props.theme.text};
    text-align: center;
    margin-top: ${spacing.tiny}px;
    font-weight: ${fontWeights.medium};
    font-size: ${fontSizes.extraLarge}px;
    padding: 0 24px;
`;

const PromoTextDescription = styled.Text`
    color: ${(props) => props.theme.text};
    text-align: center;
    margin-top: ${spacing.tiny}px;
    padding: 0 24px;
`;

const PromoImage = styled.Image`
    height: ${(props) => props.imageSize}px;
    width: ${(props) => props.imageSize}px;
    margin: 24px auto ${spacing.tiny}px auto;
`;
