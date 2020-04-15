import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useScrollToTop } from '@react-navigation/native';
import { spacing } from '../constants/Index';
import Subtitle from './Subtitle';
import PhotoLightboxGroup from './PhotoLightboxGroup';
import HikeMapWrapper from './HikeMapWrapper';
import TextContent from './hike/TextContent';

const propTypes = {
    scrollRef: PropTypes.object.isRequired,
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
        const { coordinates, region, scrollRef } = this.props;
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                >
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

function HikeBodyFunction(props) {
    const ref = React.useRef(null);
    useScrollToTop(ref);

    return <HikeBody {...props} scrollRef={ref} />;
}

HikeBody.propTypes = propTypes;
HikeBody.defaultProps = defaultProps;

export default HikeBodyFunction;

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
