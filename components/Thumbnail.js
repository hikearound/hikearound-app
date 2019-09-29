import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { spacing, borderRadius, colors, opacities } from '../constants/Index';
import { showModal, setLightboxImage } from '../actions/Modals';

const THUMBNAIL_DIMENSION = 75;

const propTypes = {
    setLightboxPhoto: PropTypes.func.isRequired,
    showLightbox: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setLightboxPhoto: (imageIndex) =>
            dispatch(setLightboxImage(imageIndex)),
        showLightbox: (modalType) => dispatch(showModal(modalType)),
    };
}

class Thumbnail extends React.PureComponent {
    thumbnailPress = () => {
        const { setLightboxPhoto, showLightbox, imageIndex } = this.props;
        const modalType = 'lightbox';

        setLightboxPhoto(imageIndex);
        showLightbox(modalType);
    };

    render() {
        const { image } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.thumbnailPress}
            >
                <ThumbnailImage source={image} resizeMode='cover' />
            </TouchableOpacity>
        );
    }
}

Thumbnail.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Thumbnail);

const ThumbnailImage = styled.Image`
    display: flex;
    background-color: ${colors.lightGray};
    width: ${THUMBNAIL_DIMENSION}px;
    height: ${THUMBNAIL_DIMENSION}px;
    border-radius: ${borderRadius.small}px;
    margin: 0 ${spacing.tiny}px ${spacing.micro}px 0;
`;
