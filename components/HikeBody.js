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
import Thumbnail from './Thumbnail';
import Lightbox from './Lightbox';

const HIKE_IMAGES = [
    {
        source: {
            uri:
                'https://firebasestorage.googleapis.com/v0/b/hikearound-14dad.appspot.com/o/images%2Fhike1.jpg?alt=media&token=2113e260-6bb5-4e75-959f-f0cfc3c8d8e3',
        },
        title: 'Meyers Lane #1',
    },
];

class HikeBody extends React.PureComponent {
    componentWillMount() {
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
                <Subtitle text='Images' />
                {HIKE_IMAGES.map((image, index) => (
                    <Thumbnail
                        image={image}
                        imageIndex={index}
                        key={image.title}
                    />
                ))}
                <Lightbox images={HIKE_IMAGES} />
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
