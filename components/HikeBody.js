import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
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
import LightboxModal from './modals/LightboxModal';

const propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
};

const defaultProps = {
    description: '',
    name: '',
    city: '',
    images: [],
};

class HikeBody extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            description: '',
            imageArray: [],
        };
    }

    componentWillMount() {
        this.updateDescription();
        this.buildHikeImageArray();
    }

    getHikeImageUrl = async (id, imageIndex) => {
        const ref = firebase.storage().ref(
            `hikes/${id}/images/${imageIndex}.jpg`
        );
        return ref.getDownloadURL();
    }

    buildHikeImageArray = async () => {
        const { id, images } = this.props;
        const imageArray = [];

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < images.length; i += 1) {
            const imageUrl = await this.getHikeImageUrl(id, i);
            imageArray.push({
                uri: imageUrl,
                attribution: images[i],
            });
        }

        this.setState({ imageArray });
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
        const { description, imageArray } = this.state;

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
                <PhotoGroup>
                    {imageArray.map((image, index) => (
                        <Thumbnail
                            image={image}
                            imageIndex={index}
                            key={index}
                        />
                    ))}
                </PhotoGroup>
                <LightboxModal
                    images={imageArray}
                    animationType='fade'
                    modalAction='showLightbox'
                />
            </BodyContent>
        );
    }
}

HikeBody.propTypes = propTypes;
HikeBody.defaultProps = defaultProps;

export default HikeBody;

const BodyContent = styled.View`
    padding: ${spacing.medium}px ${spacing.small}px;
    background-color: ${colors.white};
`;

const PhotoGroup = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
