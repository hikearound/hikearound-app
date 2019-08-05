import React from 'react';
import styled from 'styled-components';
import { spacing, colors, fontWeights } from '../constants/Index';
import Subtitle from './Subtitle';
import FavoriteButton from './FavoriteButton';

// eslint-disable-next-line react/prefer-stateless-function
class HikeBody extends React.Component {
    render() {
        const {
            name, description, city, _key,
        } = this.props;
        const newlineDescription = description.replace(
            '\\n\\n', '\n\n'
        );
        return (
            <BodyContent>
                <TitleText>{name}</TitleText>
                <LocationText>{city}</LocationText>
                <FavoriteButton
                    name={name}
                    _key={_key}
                />
                <Subtitle text='Description' />
                <DescriptionText>{newlineDescription}</DescriptionText>
            </BodyContent>
        );
    }
}

export default HikeBody;

const BodyContent = styled.View`
    padding: 20px ${spacing.small}px;
    background-color: ${colors.white};
`;

const DescriptionText = styled.Text`
    color: #333;
    font-size: 14px;
`;

const TitleText = styled.Text`
    color: #333;
    font-weight: ${fontWeights.bold};
    font-size: 20px;
`;

const LocationText = styled.Text`
    color: #ABABAB;
    font-size: 16px;
`;
