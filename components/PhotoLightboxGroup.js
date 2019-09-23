import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import LightboxModal from './modals/LightboxModal';

const propTypes = {
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
};

const defaultProps = {
    images: [],
};

class PhotoLightboxGroup extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imageArray: [],
        };
    }

    componentDidUpdate() {
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
PhotoLightboxGroup.defaultProps = defaultProps;

export default PhotoLightboxGroup;

const PhotoGroup = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
