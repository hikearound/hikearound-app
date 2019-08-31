import React from 'react';
import styled from 'styled-components';
import {
    spacing,
    colors,
    fontWeights,
    fontSizes,
} from '../constants/Index';
import Subtitle from './Subtitle';
import FavoriteButton from './FavoriteButton';

class HikeBody extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.updateDescription();
    }

    updateDescription() {
        const { description } = this.props;
        if (description) {
            this.setState({
                description: description.replace(
                    '\\n\\n', '\n\n'
                ),
            });
        }
    }

    render() {
        const { name, city, id } = this.props;
        const { description } = this.state;

        return (
            <BodyContent>
                <TitleText>{name}</TitleText>
                <LocationText>{city}</LocationText>
                <FavoriteButton
                    name={name}
                    id={id}
                />
                <Subtitle text='Description' />
                <DescriptionText>{description}</DescriptionText>
            </BodyContent>
        );
    }
}

export default HikeBody;

const BodyContent = styled.View`
    padding: ${spacing.medium}px ${spacing.small}px;
    background-color: ${colors.white};
`;

const DescriptionText = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
`;

const TitleText = styled.Text`
    color: ${colors.black};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.big}px;
`;

const LocationText = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.large}px;
`;
