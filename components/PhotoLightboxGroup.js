import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import LightboxModal from './modal/LightboxModal';
import {
    getHikeThumbnail,
    getHikeImage,
    getHikeImageGallery,
} from '../utils/Hike';
import { withTheme } from '../utils/Themes';

const propTypes = {
    hid: PropTypes.string.isRequired,
};

class PhotoLightboxGroup extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { imageArray: [] };
    }

    async componentDidMount() {
        const { hid } = this.props;

        this.buildHikeImageArray(hid);
        this.setAnimationType();
    }

    componentDidUpdate(prevProps) {
        const { theme } = this.props;

        if (prevProps.theme !== theme) {
            this.setAnimationType();
        }
    }

    setAnimationType = async () => {
        const { theme } = this.props;
        let animationType = 'fade';

        if (theme.dark) {
            animationType = 'none';
        }

        this.setState({ animationType });
    };

    buildHikeImageArray = async (id) => {
        const imageArray = [];

        const hikeImages = await getHikeImageGallery(id);
        const photoCount = Object.keys(hikeImages).length;

        for (let i = 0; i < photoCount; i += 1) {
            const thumbnailUrl = await getHikeThumbnail(id, i);
            const imageUrl = await getHikeImage(id, i);

            imageArray.push({
                thumbnailUri: thumbnailUrl,
                url: imageUrl,
                attribution: hikeImages[i].attribution,
            });
        }

        this.setState({ imageArray });
    };

    render() {
        const { hid } = this.props;
        const { imageArray, animationType } = this.state;

        return (
            <View>
                <PhotoGroup>
                    {imageArray.map((image, index) => (
                        <Thumbnail
                            image={image}
                            imageIndex={index}
                            key={index}
                            hid={hid}
                        />
                    ))}
                </PhotoGroup>
                <LightboxModal
                    hid={hid}
                    images={imageArray}
                    animationType={animationType}
                />
            </View>
        );
    }
}

PhotoLightboxGroup.propTypes = propTypes;

export default withTheme(PhotoLightboxGroup);

const PhotoGroup = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
