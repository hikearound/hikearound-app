import React from 'react';
import styled from 'styled-components';
import { colors, fontSizes, fontWeights } from '../constants/Index'

class HikeBody extends React.Component {
    render() {
        var description = this.props.description.replace(
            '\\n\\n', '\n\n'
        );
        return (
            <BodyContent>
                <TitleText>{this.props.name}</TitleText>
                <DescriptionText>{description}</DescriptionText>
            </BodyContent>
        );
    }
}

export default HikeBody;

const BodyContent = styled.View`
    padding: 20px 15px;
    background-color: ${colors.white};
`;

const DescriptionText = styled.Text`
    color: #333;
    font-size: 14px;
`;

const TitleText = styled.Text`
    color: #333;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
`;
