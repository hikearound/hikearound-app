import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spacing } from '../constants/Index';
import Subtitle from './Subtitle';
import PhotoLightboxGroup from './PhotoLightboxGroup';
import HikeMapWrapper from './HikeMapWrapper';
import TextContent from './hike/TextContent';

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
                <BlockView />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HikeMapWrapper
                        coordinates={coordinates}
                        region={region}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                    />
                    <BodyContent>
                        <TextContent
                            name={name}
                            city={city}
                            id={id}
                            distance={distance}
                            description={description}
                        />
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
    background-color: ${(props) => props.theme.rootBackground};
`;

const BlockView = styled.View`
    height: 500px;
    background-color: ${(props) => props.theme.blockView};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
