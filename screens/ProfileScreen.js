import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modal/EditProfileModal';
import { buildFavoriteHikesArray } from '../utils/User';
import ProfileLoadingState from '../components/loading/Profile';
import { timings } from '../constants/Index';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';
import Title from '../components/header/Title';

const propTypes = {
    favoriteHikes: PropTypes.array.isRequired,
    updatedHikeData: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        updatedHikeData: state.hikeReducer.updatedHikeData,
        name: state.userReducer.name,
        favoriteHikes: state.profileReducer.favoriteHikes,
    };
}

function mapDispatchToProps() {
    return {};
}

const scrollRef = React.createRef();

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation, favoriteHikes, t } = this.props;

        let firstLoad = true;

        if (favoriteHikes.length > 0) {
            firstLoad = false;
        }

        this.state = {
            firstLoad,
            favoriteHikes,
            showEmptyState: false,
            scrollEnabled: false,
        };

        navigation.setOptions({
            headerTitle: () => (
                <Title title={t('label.nav.you')} scrollRef={scrollRef} />
            ),
            headerRight: () => <Settings navigation={navigation} />,
        });
    }

    async componentDidMount() {
        await this.getFavoriteHikes();
    }

    async componentDidUpdate(prevProps) {
        const { updatedHikeData, name } = this.props;

        if (prevProps.updatedHikeData !== updatedHikeData) {
            setTimeout(async () => {
                await this.getFavoriteHikes();
            }, timings.extraLong);
        }

        if (prevProps.name !== name) {
            this.maybeHideLoadingState();
        }
    }

    maybeHideLoadingState = async () => {
        const { favoriteHikes } = this.state;
        const { name } = this.props;

        if (favoriteHikes && name) {
            this.setState({ firstLoad: false });
        }
    };

    maybeSetEmptyState = () => {
        const { favoriteHikes } = this.state;

        if (favoriteHikes.length === 0) {
            this.setState({ showEmptyState: true });
        } else {
            this.setState({ showEmptyState: false });
        }
    };

    getFavoriteHikes = async () => {
        const favoriteHikes = await buildFavoriteHikesArray();

        if (favoriteHikes) {
            await this.setState({ favoriteHikes });
        }

        this.maybeHideLoadingState();
        this.maybeSetEmptyState();
    };

    render() {
        const {
            firstLoad,
            showEmptyState,
            favoriteHikes,
            scrollEnabled,
        } = this.state;

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                {firstLoad && <ProfileLoadingState />}
                {!firstLoad && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        ref={scrollRef}
                        scrollEnabled={scrollEnabled}
                        contentContainerStyle={{ flex: 1 }}
                    >
                        <ProfileHeader />
                        <ProfileBody
                            hikeData={favoriteHikes}
                            loading={firstLoad}
                            showEmptyState={showEmptyState}
                        />
                    </ScrollView>
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
)(withTranslation()(withTheme(ProfileScreen)));
