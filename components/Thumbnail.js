import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { spacing, borderRadius, opacities } from '../constants/Index';
import { showModal, setLightboxImage } from '../actions/Modal';

const propTypes = {
    dispatchImage: PropTypes.func.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    modalType: PropTypes.string,
    dimension: PropTypes.number,
};

const defaultProps = {
    modalType: 'lightbox',
    dimension: 75,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchImage: (imageIndex) => dispatch(setLightboxImage(imageIndex)),
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class Thumbnail extends React.PureComponent {
    thumbnailPress = () => {
        const {
            dispatchImage,
            dispatchModalFlag,
            imageIndex,
            modalType,
        } = this.props;

        dispatchImage(imageIndex);
        dispatchModalFlag(modalType);
    };

    render() {
        const { image, dimension } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.thumbnailPress}
            >
                <ThumbnailImage
                    source={{ uri: image.thumbnailUri }}
                    resizeMode='cover'
                    dimension={dimension}
                />
            </TouchableOpacity>
        );
    }
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail);

const ThumbnailImage = styled.Image`
    display: flex;
    background-color: ${(props) => props.theme.thumbnailBackground};
    width: ${(props) => props.dimension}px;
    height: ${(props) => props.dimension}px;
    border-radius: ${borderRadius.small}px;
    margin: 0 ${spacing.tiny}px ${spacing.micro}px 0;
`;
