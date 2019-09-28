import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { colors } from '../constants/Index';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';

const propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        name: state.userReducer.name,
        location: state.userReducer.location,
    };
}

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'You',
        headerBackTitle: null,
        headerRight: <Settings navigation={navigation} />,
    });

    constructor(props) {
        super(props);

        this.state = {
            hikes: [],
            loading: false,
            maybeShowEmptyState: false,
        };
    }

    async componentWillMount() {
        this.getHikeData();
    }

    getHikeSnapshot = async () => {
        this.setState({ loading: true });
        const firestore = firebase.firestore();
        const uid = await this.getUid();
        return firestore
            .collection('favoritedHikes')
            .doc(uid)
            .collection('hikes')
            .get();
    };

    getHikeData = async () => {
        const hikeSnapshot = await this.getHikeSnapshot();
        const hikes = [];

        hikeSnapshot.forEach((hike) => {
            if (hike.exists) {
                const hikeData = hike.data() || {};
                hikeData.id = hike.id;
                hikes.push(hikeData);
            }
        });

        if (hikes.length === 0) {
            this.setState({
                maybeShowEmptyState: true,
            });
        }

        this.setState({
            hikes,
            loading: false,
        });
    };

    getUid = async () => firebase.auth().currentUser.uid;

    render() {
        const { name, location } = this.props;
        const { hikes, loading, maybeShowEmptyState } = this.state;

        if (!loading) {
            return (
                <RootView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ProfileHeader name={name} location={location} />
                        <ProfileBody
                            hikes={hikes}
                            loading={loading}
                            maybeShowEmptyState={maybeShowEmptyState}
                        />
                    </ScrollView>
                </RootView>
            );
        }
        return null;
    }
}

ProfileScreen.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;
