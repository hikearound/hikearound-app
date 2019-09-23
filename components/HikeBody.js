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
import PhotoLightboxGroup from './PhotoLightboxGroup';

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

class HikeBody extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            description: '',
        };
    }

    componentWillMount() {
        this.updateDescription();
    }

    componentDidUpdate() {
        const { description } = this.state;
        if (description === '') {
            this.updateDescription();
        }
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
        const {
            name,
            city,
            id,
            images,
        } = this.props;
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
                <PhotoLightboxGroup
                    id={id}
                    images={images}
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
