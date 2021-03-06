import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modal/EditProfileModal';
import { buildFavoriteHikesArray } from '../utils/User';
import { timings } from '../constants/Index';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';
import Title from '../components/header/Title';
import FeedRefreshControl from '../components/FeedRefreshControl';

const propTypes = {
    favoriteHikes: PropTypes.array.isRequired,
    updatedHikeData: PropTypes.object.isRequired,
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

        this.state = {
            favoriteHikes,
            showEmptyState: false,
            loading: false,
        };

        navigation.setOptions({
            headerTitle: () => (
                <Title title={t('label.nav.you')} scrollRef={scrollRef} />
            ),
            headerRight: () => <Settings onPress={this.onSettingsPress} />,
        });
    }

    async componentDidMount() {
        this.maybeSetEmptyState();
    }

    async componentDidUpdate(prevProps) {
        const { updatedHikeData } = this.props;

        if (prevProps.updatedHikeData !== updatedHikeData) {
            setTimeout(async () => {
                await this.getFavoriteHikes();
            }, timings.extraLong);
        }
    }

    onSettingsPress = () => {
        const { navigation } = this.props;
        navigation.push('Settings');
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

        this.setState({ loading: false });
        this.maybeSetEmptyState();
    };

    onRefresh = async () => {
        await this.setState({ loading: true });

        this.timeout = setTimeout(() => {
            this.getFavoriteHikes();
        }, timings.medium);
    };

    render() {
        const { showEmptyState, favoriteHikes, loading } = this.state;

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                    scrollEnabled
                    refreshControl={
                        <FeedRefreshControl
                            refreshing={loading}
                            onRefresh={this.onRefresh}
                            topOffset={5}
                        />
                    }
                    contentContainerStyle={{ flex: 1 }}
                >
                    <ProfileHeader />
                    <ProfileBody
                        hikeData={favoriteHikes}
                        showEmptyState={showEmptyState}
                    />
                </ScrollView>
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
