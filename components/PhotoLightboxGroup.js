import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from '@components/Thumbnail';
import LightboxModal from '@components/modal/LightboxModal';
import { getHikeImageGallery } from '@utils/Hike';
import { buildImageArray } from '@utils/Image';
import { withTheme } from '@utils/Themes';
import ThumbnailLoadingState from '@components/loading/Thumbnail';

const propTypes = {
    hid: PropTypes.string.isRequired,
    dimension: PropTypes.number,
    imageCount: PropTypes.number.isRequired,
};

const defaultProps = {
    dimension: 75,
};

class PhotoLightboxGroup extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            imageArray: [],
            loading: true,
        };
    }

    async componentDidMount() {
        await this.setImages();
        await this.buildImageArray();
        await this.setAnimationType();
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

    setImages = async () => {
        const { hid } = this.props;
        const { images } = await getHikeImageGallery(hid);

        this.setState({ images });
    };

    buildImageArray = async () => {
        const { imageCount } = this.props;
        const { images } = this.state;

        this.setState({
            imageArray: buildImageArray(images, imageCount),
            loading: false,
        });
    };

    render() {
        const { hid, dimension, imageCount } = this.props;
        const { imageArray, animationType, loading } = this.state;

        return (
            <View>
                <PhotoGroup dimension={dimension}>
                    {loading && <ThumbnailLoadingState count={imageCount} />}
                    {imageArray.map((image, index) => (
                        <Thumbnail
                            image={image}
                            imageIndex={index}
                            key={index}
                            hid={hid}
                            dimension={dimension}
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
PhotoLightboxGroup.defaultProps = defaultProps;

export default withTheme(PhotoLightboxGroup);

const PhotoGroup = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: ${(props) => props.dimension}px;
`;
