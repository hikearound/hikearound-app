import React from 'react';
import styled from 'styled-components';
import { ScrollView, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { colors, timings } from '../constants/Index';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modals/EditProfileModal';
import { getUserFavoriteHikes } from '../utils/User';
import ProfileLoadingState from '../components/loading/Profile';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
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
            shouldLoad: false,
        };
    }

    async componentWillMount() {
        this.getHikeData();
    }

    componentDidMount() {
        this.loadingTimeout = setTimeout(() => {
            this.setState({
                shouldLoad: true,
            });
        }, timings.short);

        this.timeout = setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, timings.long);
    }

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

    render() {
        const { hikes, loading, maybeShowEmptyState, shouldLoad } = this.state;

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
        if (loading && shouldLoad) {
            LayoutAnimation.easeInEaseOut();
            return (
                <RootView>
                    <ProfileLoadingState />
                </RootView>
            );
        }
        return null;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
    width: 100%;
`;
