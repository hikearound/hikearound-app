import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import FeedCard from '@components/FeedCard';
import { spacing, opacities } from '@constants/Index';
import { withNavigation } from '@utils/Navigation';
import { defaultProps } from '@constants/states/FeedItem';
import { hikeActionSheet } from '@components/action_sheets/Hike';
import { copyLink } from '@actions/Hike';
import { shareHike } from '@utils/Share';
import { getDrivingDirections } from '@utils/Map';

const propTypes = {
    coverPhoto: PropTypes.string,
    hid: PropTypes.string,
    name: PropTypes.string,
    distance: PropTypes.number,
    elevation: PropTypes.number,
    route: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    coordinates: PropTypes.object,
    difficulty: PropTypes.string,
    imageCount: PropTypes.number,
    review: PropTypes.object,
    geohash: PropTypes.string,
    lastKnownPosition: PropTypes.object.isRequired,
    dispatchCopyLink: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchCopyLink: () => dispatch(copyLink()),
    };
}

class FeedItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCard: true,
        };
    }

    showHikeSheet = () => {
        const { hid, name, dispatchCopyLink } = this.props;
        hikeActionSheet(
            hid,
            name,
            this.shareHike,
            this.getDirections,
            dispatchCopyLink,
        );
    };

    showSheetWithHaptics = () => {
        Haptics.selectionAsync();
        this.showHikeSheet();
    };

    shareHike = async () => {
        const { t, hid, dispatchCopyLink } = this.props;
        shareHike(hid, dispatchCopyLink, t);
    };

    getDirections = async () => {
        const { coordinates, name } = this.props;
        const { lat, lng } = coordinates.starting;
        getDrivingDirections(lat, lng, name);
    };

    handlePress = () => {
        const {
            navigation,
            hid,
            name,
            distance,
            elevation,
            route,
            city,
            state,
            description,
            coordinates,
            difficulty,
            imageCount,
            review,
            geohash,
        } = this.props;
        navigation.push('Hike', {
            hike: {
                hid,
                name,
                distance,
                elevation,
                route,
                city,
                state,
                description,
                coordinates,
                difficulty,
                imageCount,
                review,
                geohash,
            },
        });
    };

    render() {
        const {
            hid,
            name,
            distance,
            elevation,
            route,
            city,
            state,
            description,
            coverPhoto,
            coordinates,
            difficulty,
            review,
            lastKnownPosition,
        } = this.props;

        const { showCard } = this.state;

        if (showCard) {
            return (
                <CardsContainer>
                    <TouchableOpacity
                        activeOpacity={opacities.regular}
                        onLongPress={this.showSheetWithHaptics}
                        onPress={this.handlePress}
                    >
                        <FeedCard
                            hid={hid}
                            name={name}
                            image={{ uri: coverPhoto }}
                            distance={distance}
                            elevation={elevation}
                            route={route}
                            city={city}
                            state={state}
                            description={description}
                            difficulty={difficulty}
                            review={review}
                            coordinates={coordinates}
                            lastKnownPosition={lastKnownPosition}
                        />
                    </TouchableOpacity>
                </CardsContainer>
            );
        }
        return null;
    }
}

FeedItem.propTypes = propTypes;
FeedItem.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withNavigation(FeedItem)));

const CardsContainer = styled.View`
    flex-direction: column;
    padding: ${spacing.tiny}px;
    padding-bottom: 0;
`;
