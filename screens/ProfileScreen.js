import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modals/EditProfileModal';
import { getUserFavoriteHikes } from '../utils/User';
import ProfileLoadingState from '../components/loading/Profile';
import { initializeHikeData } from '../actions/Hike';
import { timings } from '../constants/Index';
import { RootView } from '../styles/Screens';
import { withTheme } from '../utils/Themes';

const propTypes = {
    dispatchHikeData: PropTypes.func.isRequired,
    updatedHikeData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        hikeData: state.hikeReducer.hikeData,
        updatedHikeData: state.hikeReducer.updatedHikeData,
        avatar: state.userReducer.avatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchHikeData: (hikeData) => dispatch(initializeHikeData(hikeData)),
    };
}

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = {
            firstLoad: true,
            maybeShowEmptyState: false,
            hikeData: [],
        };

        navigation.setOptions({
            title: 'You',
            headerRight: () => <Settings navigation={navigation} />,
        });

        this.loadingTimeout = setTimeout(() => {
            this.setState({
                shouldLoad: true,
            });
        }, timings.short);
    }

    async componentDidMount() {
        await this.getHikeData();
    }

    async componentDidUpdate(prevProps) {
        const { updatedHikeData } = this.props;

        if (prevProps.updatedHikeData !== updatedHikeData) {
            await this.getHikeData();
        }
    }

    getHikeData = async () => {
        const hikeData = [];
        const favoritedHikes = await getUserFavoriteHikes();
        const { dispatchHikeData } = this.props;

        if (favoritedHikes) {
            this.setState({ firstLoad: false });
        }

        favoritedHikes.forEach((hike) => {
            if (hike.exists) {
                const favoriteHike = hike.data() || {};
                favoriteHike.id = hike.id;
                hikeData.push(favoriteHike);
            }
        });

        if (hikeData.length === 0) {
            this.setState({ maybeShowEmptyState: true });
        }

        if (hikeData) {
            dispatchHikeData(hikeData);
            this.setState({ hikeData });
        }
    };

    render() {
        const {
            firstLoad,
            maybeShowEmptyState,
            hikeData,
            shouldLoad,
        } = this.state;
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme.colors}>
                <RootView>
                    {firstLoad && shouldLoad && <ProfileLoadingState />}
                    {!firstLoad && (
                        <>
                            <ProfileHeader />
                            <ProfileBody
                                hikeData={hikeData}
                                loading={firstLoad}
                                maybeShowEmptyState={maybeShowEmptyState}
                            />
                        </>
                    )}
                    <EditProfileModal
                        animationType='push'
                        modalAction='showEditProfile'
                        transparent
                        hideStatusBar={false}
                        fullScreen={false}
                    />
                </RootView>
            </ThemeProvider>
        );
    }
}

ProfileScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(ProfileScreen));
