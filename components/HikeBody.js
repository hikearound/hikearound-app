import React from 'react';
import PropTypes from 'prop-types';
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

const HIKE_IMAGES = [
    {
        source: {
            uri: 'https://image.redbull.com/rbcom/052/2018-03-05/acaf2999-8c5a-477f-81bd-4095d708afb9/0012/0/0/0/1667/2500/1050/1/hike-mental-fitness.jpg',
        },
    },
    {
        source: {
            uri: 'https://www.sundanceresort.com/wp-content/uploads/2016/08/Hike_Sundance_0143-2000x1000-c-center.jpg',
        },
    },
    {
        source: {
            uri: 'https://www.outsideonline.com/sites/default/files/styles/img_600x600/public/2019/01/18/active-volcano-hike_s.jpg',
        },
    },
];

const propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    id: PropTypes.string.isRequired,
};

const defaultProps = {
    description: '',
    name: '',
    city: '',
};

class HikeBody extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            description: '',
        };
    }

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
                <PhotoGroup>
                    {HIKE_IMAGES.map((image, index) => (
                        <Thumbnail
                            image={image}
                            imageIndex={index}
                            key={index}
                        />
                    ))}
                </PhotoGroup>
                <LightboxModal
                    images={HIKE_IMAGES}
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
