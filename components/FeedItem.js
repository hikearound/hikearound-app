import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import FeedCard from './FeedCard';
import { spacing, opacities } from '../constants/Index';
import { withNavigation } from '../utils/Navigation';
import { defaultProps } from '../constants/states/FeedItem';

const propTypes = {
    coverPhoto: PropTypes.string,
    id: PropTypes.string,
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
};

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: true,
        };
    }

    render() {
        const {
            navigation,
            id,
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
            imageCount,
            review,
        } = this.props;

        const { showCard } = this.state;

        if (showCard) {
            return (
                <CardsContainer>
                    <TouchableOpacity
                        activeOpacity={opacities.regular}
                        onPress={() => {
                            navigation.push('Hike', {
                                hike: {
                                    id,
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
                                },
                            });
                        }}
                    >
                        <FeedCard
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

export default withNavigation(FeedItem);

const CardsContainer = styled.View`
    flex-direction: column;
    padding: ${spacing.tiny}px;
    padding-bottom: 0;
`;
