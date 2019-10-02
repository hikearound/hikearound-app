import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { colors } from '../constants/Index';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modals/EditProfileModal';
import { updateName, updateLocation } from '../actions/User';

const propTypes = {
    dispatchName: PropTypes.func.isRequired,
    dispatchLocation: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchName: (name) => dispatch(updateName(name)),
        dispatchLocation: (location) => dispatch(updateLocation(location)),
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
        this.getUserData();
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

    getUserSnapshot = async () => {
        const firestore = firebase.firestore();
        const uid = await this.getUid();

        return firestore
            .collection('users')
            .doc(uid)
            .get();
    };

    getUserData = async () => {
        const { dispatchName, dispatchLocation } = this.props;
        const userSnapshot = await this.getUserSnapshot();
        const user = await userSnapshot.data();

        dispatchName(user.name);
        dispatchLocation(user.location);
    };

    render() {
        const { hikes, loading, maybeShowEmptyState } = this.state;

        if (!loading) {
            return (
                <RootView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ProfileHeader />
                        <ProfileBody
                            hikes={hikes}
                            loading={loading}
                            maybeShowEmptyState={maybeShowEmptyState}
                        />
                    </ScrollView>
                    <EditProfileModal
                        animationType='push'
                        modalAction='showEditProfile'
                        transparent
                        fullScreen={false}
                    />
                </RootView>
            );
        }
        return null;
    }
}

ProfileScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;
