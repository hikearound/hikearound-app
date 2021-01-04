import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modal/EditProfileModal';
import { getUserFavoriteHikes } from '../utils/User';
import ProfileLoadingState from '../components/loading/Profile';
import { initializeHikeData } from '../actions/Hike';
import { timings } from '../constants/Index';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';

const propTypes = {
    dispatchHikeData: PropTypes.func.isRequired,
    updatedHikeData: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        updatedHikeData: state.hikeReducer.updatedHikeData,
        name: state.userReducer.name,
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
            loading: true,
            maybeShowEmptyState: false,
            hikeData: [],
        };

        navigation.setOptions({
            headerRight: () => <Settings navigation={navigation} />,
        });
    }

    async componentDidMount() {
        await this.getHikeData();
    }

    async componentDidUpdate(prevProps) {
        const { updatedHikeData, name } = this.props;

        if (prevProps.updatedHikeData !== updatedHikeData) {
            setTimeout(async () => {
                await this.getHikeData();
            }, timings.extraLong);
        }

        if (prevProps.name !== name) {
            this.maybeHideLoadingState();
        }
    }

    maybeHideLoadingState = async () => {
        const { hikeData } = this.state;
        const { name } = this.props;

        if (hikeData && name) {
            this.setState({ loading: false });
        }
    };

    getHikeData = async () => {
        const { dispatchHikeData } = this.props;

        const hikeData = [];
        const favoritedHikes = await getUserFavoriteHikes();

        await favoritedHikes.forEach((hike) => {
            if (hike.exists) {
                const favoriteHike = hike.data();
                favoriteHike.id = hike.id;
                hikeData.push(favoriteHike);
            }
        });

        if (hikeData.length === 0) {
            this.setState({ maybeShowEmptyState: true });
        }

        if (hikeData) {
            dispatchHikeData(hikeData);
            await this.setState({ hikeData });
        }

        this.maybeHideLoadingState();
    };

    render() {
        const { loading, maybeShowEmptyState, hikeData } = this.state;

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                {loading && <ProfileLoadingState />}
                {!loading && (
                    <>
                        <ProfileHeader />
                        <ProfileBody
                            hikeData={hikeData}
                            loading={loading}
                            maybeShowEmptyState={maybeShowEmptyState}
                        />
                    </>
                )}
                <EditProfileModal />
            </RootView>
        );
    }
}

ProfileScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(ProfileScreen));
