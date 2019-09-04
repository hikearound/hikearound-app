import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { spacing, borderRadius } from '../constants/Index';

function mapStateToProps(state) {
    return {
        imageIndex: state.imageIndex,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setLightboxPhoto: (imageIndex) => dispatch({
            type: 'SET_LIGHTBOX_PHOTO',
            imageIndex,
        }),
        showLightbox: () => dispatch({
            type: 'SHOW_LIGHTBOX',
        }),
    };
}

class Thumbnail extends React.PureComponent {
    thumbnailPress = () => {
        const {
            setLightboxPhoto,
            showLightbox,
            thumbnailIndex,
        } = this.props;

        setLightboxPhoto(thumbnailIndex);
        showLightbox();
    }

    render() {
        const { image } = this.props;

        return (
            <TouchableOpacity onPress={this.thumbnailPress}>
                <ThumbnailImage
                    source={image.source}
                    resizeMode='cover'
                />
            </TouchableOpacity>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Thumbnail);

const ThumbnailImage = styled.Image`
    display: flex;
    width: 100px;
    height: 100px;
    border-radius: ${borderRadius.small}px;
    margin: 0 ${spacing.micro}px 30px 0;
`;
