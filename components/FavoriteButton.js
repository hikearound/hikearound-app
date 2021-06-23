import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { withTranslation } from 'react-i18next';
import { opacities, colors, spacing, timings } from '@constants/Index';
import { favoriteHike, unfavoriteHike } from '@actions/Hike';
import { initializeProfileData } from '@actions/Profile';
import { updateFavoriteHikes } from '@actions/User';
import { getToastText } from '@utils/Toast';
import { withTheme } from '@utils/Themes';
import { getProfileData } from '@utils/User';

const propTypes = {
    hid: PropTypes.string.isRequired,
    dispatchProfileData: PropTypes.func.isRequired,
    dispatchUpdatedFavorites: PropTypes.func.isRequired,
    dispatchFavorite: PropTypes.func.isRequired,
    dispatchUnfavorite: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    placement: PropTypes.string.isRequired,
    favoriteHikes: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        favoriteHikes: state.userReducer.favoriteHikes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFavorite: (hike) => dispatch(favoriteHike(hike)),
        dispatchUnfavorite: (hike) => dispatch(unfavoriteHike(hike)),
        dispatchUpdatedFavorites: (hikes) =>
            dispatch(updateFavoriteHikes(hikes)),
        dispatchProfileData: (profileData) =>
            dispatch(initializeProfileData(profileData)),
    };
}

class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);
        const { favoriteHikes } = this.props;

        this.state = {
            iconName: 'ios-heart-outline',
            iconSize: 30,
            hikes: favoriteHikes,
        };
    }

    componentDidMount = () => {
        this.setInitialStyle();
    };

    componentDidUpdate(prevProps) {
        const { hid } = this.props;

        if (prevProps.hid !== hid) {
            this.setInitialStyle();
        }
    }

    getEmptyColor = () => {
        const { placement } = this.props;
        let emptyColor = colors.gray;

        if (placement === 'card') {
            emptyColor = colors.white;
        }

        return emptyColor;
    };

    setInitialStyle = () => {
        const { hid } = this.props;
        const { hikes } = this.state;

        const emptyColor = this.getEmptyColor();

        if (hikes.includes(hid)) {
            this.setState({
                hikes,
                iconColor: colors.purple,
                iconName: 'ios-heart',
            });
        } else {
            this.setState({
                hikes,
                iconColor: emptyColor,
                iconName: 'ios-heart-outline',
            });
        }
    };

    setFavoriteHike = async () => {
        const {
            hid,
            dispatchUpdatedFavorites,
            dispatchFavorite,
            distance,
            name,
            city,
            state,
        } = this.props;
        const { hikes } = this.state;

        hikes.push(hid);
        this.showToast();

        this.setState({
            hikes,
            iconColor: colors.purple,
            iconName: 'ios-heart',
        });

        dispatchFavorite({ hid, distance, name, city, state });
        dispatchUpdatedFavorites(hikes);

        this.updateProfileData();
    };

    getButtonStyle() {
        const { placement } = this.props;

        let buttonStyle = {
            position: 'absolute',
            right: 0,
            top: 6,
        };

        if (placement === 'screen') {
            buttonStyle = {
                position: 'absolute',
                right: parseInt(spacing.small, 10),
                top: parseInt(spacing.small, 10),
            };
        }

        if (placement === 'card') {
            buttonStyle = {
                position: 'absolute',
                right: parseInt(spacing.tiny, 10),
                bottom: parseInt(spacing.tiny, 10),
                zIndex: 1,
            };
        }

        return buttonStyle;
    }

    updateProfileData = async () => {
        const { dispatchProfileData } = this.props;

        this.timeout = setTimeout(async () => {
            await getProfileData(dispatchProfileData);
        }, timings.medium);
    };

    showToast = () => {
        const { t, name } = this.props;

        Toast.show({
            text1: getToastText('favoriteHike', t, { name }),
            position: 'bottom',
            type: 'success',
        });
    };

    removeFavoriteHike = async () => {
        const { hid, dispatchUnfavorite, dispatchUpdatedFavorites } =
            this.props;
        const { hikes } = this.state;

        const index = hikes.indexOf(hid);
        const emptyColor = this.getEmptyColor();

        hikes.splice(index, 1);

        this.setState({
            hikes,
            iconColor: emptyColor,
            iconName: 'ios-heart-outline',
        });

        dispatchUnfavorite({ hid });
        dispatchUpdatedFavorites(hikes);
    };

    onPress = () => {
        this.updateButton();
        Haptics.selectionAsync();
    };

    updateButton() {
        const { hikes } = this.state;
        const { hid } = this.props;

        if (hikes.includes(hid)) {
            this.removeFavoriteHike();
        } else {
            this.setFavoriteHike();
        }
    }

    maybeRenderStroke() {
        const { placement } = this.props;
        const { iconSize } = this.state;

        if (placement === 'card') {
            return (
                <Ionicons
                    name='ios-heart-outline'
                    color={colors.white}
                    size={iconSize}
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                    }}
                />
            );
        }

        return null;
    }

    renderIcon() {
        const { iconName, iconColor, iconSize } = this.state;
        return <Ionicons name={iconName} color={iconColor} size={iconSize} />;
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={this.getButtonStyle()}
            >
                {this.maybeRenderStroke()}
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

FavoriteButton.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(FavoriteButton)));
