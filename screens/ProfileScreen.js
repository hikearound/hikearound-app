import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext } from 'react-navigation';
import { themes } from '../constants/Themes';
import { Settings, ProfileHeader, ProfileBody } from '../components/Index';
import EditProfileModal from '../components/modals/EditProfileModal';
import { getUserFavoriteHikes } from '../utils/User';
import ProfileLoadingState from '../components/loading/Profile';
import { initializeHikeData } from '../actions/Hike';

const propTypes = {
    dispatchHikeData: PropTypes.func.isRequired,
    updatedHikeData: PropTypes.object,
    action: PropTypes.string,
};

const defaultProps = {
    action: '',
    updatedHikeData: {},
};

function mapStateToProps(state) {
    return {
        hikeData: state.hikeReducer.hikeData,
        updatedHikeData: state.hikeReducer.updatedHikeData,
        action: state.hikeReducer.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchHikeData: (hikeData) => dispatch(initializeHikeData(hikeData)),
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
            firstLoad: true,
            maybeShowEmptyState: false,
            hikeData: [],
        };
    }

    async componentWillMount() {
        await this.getHikeData();
    }

    async componentDidUpdate(prevProps) {
        const { action, updatedHikeData } = this.props;

        if (action === 'favoriteHike' || action === 'unfavoriteHike') {
            if (prevProps.updatedHikeData !== updatedHikeData) {
                await this.getHikeData();
            }
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

    static contextType = ThemeContext;

    render() {
        const { firstLoad, maybeShowEmptyState, hikeData } = this.state;
        const theme = themes[this.context];

        return (
            <RootView theme={theme}>
                {firstLoad && <ProfileLoadingState />}
                {!firstLoad && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ProfileHeader />
                        <ProfileBody
                            hikeData={hikeData}
                            loading={firstLoad}
                            maybeShowEmptyState={maybeShowEmptyState}
                        />
                    </ScrollView>
                )}
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

ProfileScreen.propTypes = propTypes;
ProfileScreen.defaultProps = defaultProps;

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
