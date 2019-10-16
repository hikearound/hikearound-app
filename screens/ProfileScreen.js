import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext } from 'react-navigation';
import { timings } from '../constants/Index';
import { themes } from '../constants/Themes';
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
            firstLoad: true,
            maybeShowEmptyState: false,
        };
    }

    async componentWillMount() {
        this.getHikeData();
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                firstLoad: false,
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

    static contextType = ThemeContext;

    render() {
        const { hikes, firstLoad, maybeShowEmptyState } = this.state;
        const theme = themes[this.context];

        return (
            <RootView theme={theme}>
                {!firstLoad && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ProfileHeader />
                        <ProfileBody
                            hikes={hikes}
                            loading={firstLoad}
                            maybeShowEmptyState={maybeShowEmptyState}
                        />
                    </ScrollView>
                )}
                {firstLoad && <ProfileLoadingState />}
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);

const RootView = styled.View`
    background: ${(props) => props.theme.rootBackground};
    flex: 1;
    overflow: hidden;
    width: 100%;
`;
