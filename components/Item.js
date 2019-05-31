import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import FeedCard from '../components/FeedCard'
import { withNavigation } from 'react-navigation';
import firebase from 'firebase'

class Item extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        if (this.props.images) {
            var ref = firebase.storage().ref(this.props.images[0]);
            ref.getDownloadURL().then(data => {
                this.setState({ imageUrl: data });
            })
        }
    }

    render() {
        return (
            <CardsContainer>
                <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                        this.props.navigation.push('Hike', {
                            hike: this.props
                        });
                    }}>
                    <FeedCard
                        title={this.props.name}
                        image={{ uri: this.state.imageUrl }}
                        distance={this.props.distance}
                        elevation={this.props.elevation}
                        route={this.props.route}
                        description={this.props.description}
                    />
                </TouchableOpacity>
            </CardsContainer>
        );
    }
}

export default withNavigation(Item);

const CardsContainer = styled.View`
    flex-direction: column;
    padding: 15px 15px 0 15px;
`;
