import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import {
    spacing,
    colors,
    transparentColors,
    fontSizes,
    fontWeights,
    borderRadius,
    opacities,
} from '@constants/Index';

const propTypes = {
    action: PropTypes.func.isRequired,
    primary: PropTypes.bool,
    text: PropTypes.string.isRequired,
    margin: PropTypes.string,
};

const defaultProps = {
    primary: false,
    margin: '',
};

const LandingButton = ({ action, primary, margin, text }) => (
    <TouchableOpacity activeOpacity={opacities.regular} onPress={action}>
        <Button primary={primary} buttonMargin={margin}>
            <ButtonText primary={primary}>{text}</ButtonText>
        </Button>
    </TouchableOpacity>
);

LandingButton.propTypes = propTypes;
LandingButton.defaultProps = defaultProps;

export default LandingButton;

const Button = styled.View`
    background-color: ${(props) =>
        props.primary
            ? props.theme.buttonBackgroundPrimary
            : props.theme.buttonBackgroundSecondary};
    border-radius: ${borderRadius.medium}px;
    margin: ${(props) => props.buttonMargin || `0 ${spacing.medium}px`};
    border: 1px solid;
    border-color: ${(props) => props.theme.itemBorder};
    box-shadow: 0 2px 8px ${transparentColors.grayLight};
`;

const ButtonText = styled.Text`
    color: ${(props) => (props.primary ? colors.white : props.theme.text)};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.large}px;
    text-align: center;
    padding: ${spacing.small}px 0;
`;
