import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { withScrollToTop } from '../utils/Navigation';
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
        };
    }

    render() {
        const { coordinates, region, scrollRef, t } = this.props;
        const {
            description,
            name,
            city,
            id,
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
                        <Subtitle text={t('label.heading.images')} />
                        <PhotoLightboxGroup id={id} />
                    </BodyContent>
                </ScrollView>
            </>
        );
    }
}

HikeBody.propTypes = propTypes;
HikeBody.defaultProps = defaultProps;

export default withTranslation()(withScrollToTop(HikeBody));

const BodyContent = styled.View`
    padding: ${spacing.tiny}px ${spacing.small}px;
    background-color: ${(props) => props.theme.rootBackground};
`;

const BlockView = styled.View`
    height: 300px;
    background-color: ${(props) => props.theme.blockView};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
