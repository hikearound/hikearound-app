import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spacing, colors, fontWeights, fontSizes } from '../constants/Index';
import Subtitle from './Subtitle';
import FavoriteButton from './FavoriteButton';
import PhotoLightboxGroup from './PhotoLightboxGroup';
import HikeMapWrapper from './HikeMapWrapper';

const propTypes = {
    coordinates: PropTypes.array,
    region: PropTypes.object,
    hike: PropTypes.object.isRequired,
};

const defaultProps = {
    region: undefined,
    coordinates: [],
};

class HikeBody extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { hike } = this.props;

        this.state = {
            name: hike.name,
            distance: hike.distance,
            elevation: hike.elevation,
            route: hike.route,
            city: hike.city,
            description: hike.description,
            id: hike.id,
            images: hike.images,
        };
    }

    componentDidMount() {
        this.updateDescription();
    }

    updateDescription() {
        const { description } = this.state;
        if (description) {
            this.setState({
                description: description.replace('\\n\\n', '\n\n'),
            });
        }
    }

    render() {
        const { coordinates, region } = this.props;
        const {
            description,
            name,
            city,
            id,
            images,
            distance,
            elevation,
            route,
        } = this.state;

        return (
            <>
                <PurpleBlockView />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HikeMapWrapper
                        coordinates={coordinates}
                        region={region}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                    />
                    <BodyContent>
                        <TitleText>{name}</TitleText>
                        <LocationText>{city}</LocationText>
                        <FavoriteButton
                            name={name}
                            id={id}
                            distance={distance}
                            city={city}
                        />
                        <Subtitle text='Description' />
                        <DescriptionText>{description}</DescriptionText>
                        <Subtitle text='Images' />
                        <PhotoLightboxGroup id={id} images={images} />
                    </BodyContent>
                </ScrollView>
            </>
        );
    }
}

HikeBody.propTypes = propTypes;
HikeBody.defaultProps = defaultProps;

export default HikeBody;

const BodyContent = styled.View`
    padding: ${spacing.small}px ${spacing.small}px;
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

const PurpleBlockView = styled.View`
    height: 500px;
    background-color: ${(props) => props.theme.blockView};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
