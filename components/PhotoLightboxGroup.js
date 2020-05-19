import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import LightboxModal from './modals/LightboxModal';
import { getHikeImage, getHikeImageGallery } from '../utils/Hike';

const propTypes = {
    id: PropTypes.string.isRequired,
};

class PhotoLightboxGroup extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { imageArray: [] };
    }

    componentDidMount() {
        this.buildHikeImageArray();
    }

    buildHikeImageArray = async () => {
        const { id } = this.props;
        const imageArray = [];

        const hikeImages = await getHikeImageGallery(id);
        const photoCount = Object.keys(hikeImages).length;

        for (let i = 0; i < photoCount; i += 1) {
            const imageUrl = await getHikeImage(id, i);
            imageArray.push({
                uri: imageUrl,
                attribution: hikeImages[i].attribution,
            });
        }

        this.setState({ imageArray });
    };

    render() {
        const { imageArray } = this.state;
        return (
            <View>
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
            </View>
        );
    }
}

PhotoLightboxGroup.propTypes = propTypes;

export default PhotoLightboxGroup;

const PhotoGroup = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
