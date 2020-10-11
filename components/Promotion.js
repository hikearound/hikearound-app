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
import { availabiltyMap } from '../constants/Images';

const propTypes = {
    animationInTiming: PropTypes.number,
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    swipeDirection: PropTypes.array,
};

const defaultProps = {
    animationInTiming: 500,
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    swipeDirection: ['up', 'down'],
};

function Promotion({
    animationIn,
    animationInTiming,
    animationOut,
    swipeDirection,
    t,
}) {
    const [isModalVisible, setModalVisible] = useState(true);

    const dismissModal = () => {
        setModalVisible(false);
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
                    <PromoImage source={availabiltyMap} />
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
    border-top-width: 1px;
    border-top-color: ${(props) => props.theme.itemBorder};
    margin-top: 24px;
    padding: 12px;
`;

const ButtonText = styled.Text`
    color: ${(props) => props.theme.buttonInputText};
    text-align: center;
    font-size: ${fontSizes.medium}px;
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
    text-align: center;
    height: 175px;
    width: 175px;
    margin: 24px auto ${spacing.tiny}px auto;
`;
