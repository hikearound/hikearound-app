import React from 'react';
import styled from 'styled-components';
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';
import fontSizes from '../constants/Fonts';

const ActionButton = props => (
    <Button primary={props.primary} buttonMargin={props.margin}>
        <ButtonText primary={props.primary}>{props.text}</ButtonText>
    </Button>
);

export default ActionButton;

const Button = styled.View`
    background-color: ${colors.white};
    background-color: ${props => props.primary ? colors.purple : colors.white};
    color: ${colors.black};
    border-radius: 6px;
    margin: ${props => props.buttonMargin || '0 20px'};
    border: 1px solid ${colors.lightGray};
    box-shadow: 0 2px 8px ${colors.transparentGray};
`;

const ButtonText = styled.Text`
    color: ${props => props.primary ? colors.white : colors.black};
    font-weight: 600;
    font-size: ${fontSizes.button}px;
    text-align: center;
    padding: ${spacing.small}px 0;
`;
