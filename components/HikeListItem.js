import React from 'react';
import styled from 'styled-components';
import {
    colors,
    fontSizes,
} from '../constants/Index';

const ProfileHikeRow = ({
    name, description,
}) => (
    <Container>
        <Name>{name}</Name>
        <Description>{description}</Description>
    </Container>
);

export default ProfileHikeRow;

const Container = styled.View`
    width: 100%;
`;

const Name = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.big}px;
`;

const Description = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.big}px;
`;
