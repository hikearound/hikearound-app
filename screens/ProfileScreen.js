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

    async componentDidMount() {
        // const hikeData = await this.queryHikeData();
    }

    getHikesRef = async () => {
        const firestore = firebase.firestore();
        return firestore.collection('favoritedHikes');
    }

    getUid = async () => firebase.auth().currentUser.uid

    queryHikeData = async () => {
        const uid = await this.getUid();
        const favoritedHikesRef = await this.getHikesRef();
        return favoritedHikesRef.doc(uid).get();
    }

    render() {
        const { name } = this.props;
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

const hikes = [
    {
        id: 'zvXj5WRBdxrlRTLm65SD',
        name: 'Hike 1',
        description: 'Hello',
    },
    {
        id: 'zvXj5WRBdxrlRTLm65SD',
        name: 'Hike 2',
        description: 'Hello again',
    },
];
