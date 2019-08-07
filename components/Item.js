import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import FeedCard from './FeedCard';
import { spacing } from '../constants/Index';

class Item extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        const { images } = this.props;
        if (images) {
            const ref = firebase.storage().ref(images[0]);
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
            description,
        } = this.props;
        const { imageUrl } = this.state;
        return (
            <CardsContainer>
                <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                        navigation.push('Hike', {
                            hike: this.props,
                        });
                    }}
                >
                    <FeedCard
                        title={name}
                        image={{ uri: imageUrl }}
                        distance={distance}
                        elevation={elevation}
                        route={route}
                        description={description}
                    />
                </TouchableOpacity>
            </CardsContainer>
        );
    }
}

export default withNavigation(Item);

const CardsContainer = styled.View`
    flex-direction: column;
    padding: ${spacing.small}px;
    padding-bottom: 0;
`;
