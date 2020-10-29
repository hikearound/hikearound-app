import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { withScrollToTop } from '../utils/Navigation';
import { spacing } from '../constants/Index';
import Subtitle from './Subtitle';
import ReviewPrompt from './ReviewPrompt';
import PhotoLightboxGroup from './PhotoLightboxGroup';
import MapWrapper from './map/Wrapper';
import TextContent from './hike/TextContent';

const propTypes = {
    setSelectedStars: PropTypes.func.isRequired,
    scrollRef: PropTypes.object.isRequired,
    coordinates: PropTypes.array,
    region: PropTypes.object,
    hike: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
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
            state: hike.state,
            description: hike.description,
            hid: hike.id,
        };
    }

    renderReviewSection = () => {
        const { setSelectedStars } = this.props;

        return (
            <View>
                <ReviewPrompt setSelectedStars={setSelectedStars} />
            </View>
        );
    };

    renderGallerySection = (t, hid) => {
        return (
            <View>
                <Subtitle text={t('label.heading.images')} />
                <PhotoLightboxGroup hid={hid} />
            </View>
        );
    };

    render() {
        const { coordinates, region, scrollRef, isLoading, t } = this.props;
        const {
            description,
            name,
            city,
            state,
            hid,
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
                    <MapWrapper
                        coordinates={coordinates}
                        region={region}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                        isLoading={isLoading}
                        hid={hid}
                    />
                    <BodyContent>
                        <TextContent
                            name={name}
                            city={city}
                            state={state}
                            hid={hid}
                            distance={distance}
                            description={description}
                        />
                        {this.renderReviewSection(t, hid)}
                        {this.renderGallerySection(t, hid)}
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
