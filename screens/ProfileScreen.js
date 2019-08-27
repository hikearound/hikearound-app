import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { colors } from '../constants/Index';
import {
    Settings,
    ProfileHeader,
    ProfileBody,
} from '../components/Index';

function mapStateToProps(state) {
    return {
        action: state.action,
        name: state.name,
    };
}

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'You',
        headerBackTitle: null,
        headerRight: <Settings navigation={navigation} />,
    })

    constructor(props) {
        super(props);

        this.state = {
            hikes: [],
        };
    }

    async componentDidMount() {
        this.getHikeData();
    }

    getHikeSnapshot = async () => {
        const firestore = firebase.firestore();
        const uid = await this.getUid();
        return firestore.collection('favoritedHikes').doc(uid)
            .collection('hikes').get();
    }

    getHikeData = async () => {
        const hikeSnapshot = await this.getHikeSnapshot();
        const hikes = [];

        hikeSnapshot.forEach((hike) => {
            if (hike.exists) {
                const hikeData = hike.data() || {};
                hikes.push(hikeData);
            }
        });

        this.setState({ hikes });
    }

    getUid = async () => firebase.auth().currentUser.uid

    render() {
        const { name } = this.props;
        const { hikes } = this.state;
        return (
            <RootView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ProfileHeader name={name} />
                    <ProfileBody hikes={hikes} />
                </ScrollView>
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
)(ProfileScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;
