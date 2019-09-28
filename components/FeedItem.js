import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import FeedCard from './FeedCard';
import { spacing, opacities } from '../constants/Index';

const propTypes = {
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
    name: PropTypes.string,
    distance: PropTypes.number,
    elevation: PropTypes.number,
    route: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
};

const defaultProps = {
    images: [],
    name: '',
    distance: 0,
    elevation: 0,
    route: '',
    description: '',
    city: '',
};

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        const { images, id } = this.props;

        this.state = {};

        if (images.length >= 1) {
            const ref = firebase.storage().ref(`hikes/${id}/images/0.jpg`);
            ref.getDownloadURL().then((data) => {
                this.setState({ imageUrl: data });
            });
        }
    }

    render() {
        const {
            navigation,
            name,
            distance,
            elevation,
            route,
            city,
            description,
        } = this.props;

        const { imageUrl } = this.state;

        return (
            <CardsContainer>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={() => {
                        navigation.push('Hike', {
                            hike: this.props,
                        });
                    }}>
                    <FeedCard
                        name={name}
                        image={{ uri: imageUrl }}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                        city={city}
                        description={description}
                    />
                </TouchableOpacity>
            </CardsContainer>
        );
    }
}

FeedItem.propTypes = propTypes;
FeedItem.defaultProps = defaultProps;

export default withNavigation(FeedItem);

const CardsContainer = styled.View`
    flex-direction: column;
    padding: ${spacing.small}px;
    padding-bottom: 0;
`;
