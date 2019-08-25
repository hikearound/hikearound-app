import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import {
    colors,
    fontSizes,
    fontWeights,
    spacing,
    opacities,
} from '../constants/Index';

const ProfileHikeRow = ({
    name, location, distance,
}) => (
    <TouchableOpacity activeOpacity={opacities.regular}>
        <Container>
            <Name>{name}</Name>
            <MetaData>
                {location}
                {' · '}
                {distance}
                {'m'}
            </MetaData>
        </Container>
    </TouchableOpacity>
);

export default ProfileHikeRow;

const Container = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const Name = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.bold};
`;

const MetaData = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.medium}px;
`;
