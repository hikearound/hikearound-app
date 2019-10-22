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
    hikeData: PropTypes.array.isRequired,
    action: PropTypes.string,
};

const defaultProps = {
    action: '',
};

function mapStateToProps(state) {
    return {
        hikeData: state.hikeReducer.hikeData,
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
        };
    }

    async componentWillMount() {
        await this.getHikeData();
    }

    getHikeData = async () => {
        const hikeData = [];
        const favoritedHikes = await getUserFavoriteHikes();
        const { dispatchHikeData } = this.props;

        if (favoritedHikes) {
            this.setState({
                firstLoad: false,
            });
        }

        favoritedHikes.forEach((hike) => {
            if (hike.exists) {
                const favoriteHike = hike.data() || {};
                favoriteHike.id = hike.id;
                hikeData.push(favoriteHike);
            }
        });

        if (hikeData.length === 0) {
            this.setState({
                maybeShowEmptyState: true,
            });
        }
        if (hikeData) {
            dispatchHikeData(hikeData);
        }
    };

    static contextType = ThemeContext;

    render() {
        const { firstLoad, maybeShowEmptyState } = this.state;
        const { hikeData, action } = this.props;
        const theme = themes[this.context];

        return (
            <RootView theme={theme}>
                {firstLoad && <ProfileLoadingState />}
                {!firstLoad && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ProfileHeader />
                        <ProfileBody
                            action={action}
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
