import React from 'react';
import styled from 'styled-components';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'
import Subtitle from '../components/Subtitle'

class HikeBody extends React.Component {
    render() {
        var description = this.props.description.replace(
            '\\n\\n', '\n\n'
        );
        return (
            <BodyContent>
                <TitleText>{this.props.name}</TitleText>
                <LocationText>{this.props.city}</LocationText>
                <Subtitle text={'Description'}/>
                <DescriptionText>{description}</DescriptionText>
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
