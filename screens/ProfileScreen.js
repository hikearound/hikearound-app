import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../constants/Index';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modals/EditProfileModal';
import ProfileLoadingState from '../components/loading/Profile';
import { initializeUserData, initializeAvatar } from '../actions/User';
import { getUserFavoriteHikes, getAvatarUri, getUserData } from '../utils/User';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    dispatchAvatar: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
        dispatchAvatar: (avatarUri) => dispatch(initializeAvatar(avatarUri)),
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
            loading: true,
            maybeShowEmptyState: false,
        };
    }

    async componentWillMount() {
        this.getUserProfileData();
        this.getHikeData();
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 3000);
    }

    contentLoader = () => <ProfileLoadingState />;

    getHikeData = async () => {
        const favoritedHikes = await getUserFavoriteHikes();
        const hikes = [];

        favoritedHikes.forEach((hike) => {
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
        });
    };

    getUserProfileData = async () => {
        const { dispatchUserData, dispatchAvatar } = this.props;

        const avatarUri = await getAvatarUri();
        const userData = await getUserData();

        dispatchUserData(userData.data());
        dispatchAvatar(avatarUri);
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
                        hideStatusBar={false}
                        fullScreen={false}
                    />
                </RootView>
            );
        }
        if (loading) {
            return <RootView>{this.contentLoader()}</RootView>;
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
