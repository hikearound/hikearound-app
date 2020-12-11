import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { withTranslation } from 'react-i18next';
import { opacities, colors, spacing } from '../constants/Index';
import { favoriteHike, unfavoriteHike } from '../actions/Hike';
import { getToastText } from '../utils/Toast';
import { withTheme } from '../utils/Themes';

const propTypes = {
    hid: PropTypes.string.isRequired,
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
        updatedHikeData: state.hikeReducer.updatedHikeData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFavorite: (hike) => dispatch(favoriteHike(hike)),
        dispatchUnfavorite: (hike) => dispatch(unfavoriteHike(hike)),
    };
}

class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);
        const { favoriteHikes } = this.props;

        this.state = {
            iconColor: colors.gray,
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

    setInitialStyle = () => {
        const { hid } = this.props;
        const { hikes } = this.state;

        if (hikes.includes(hid)) {
            this.setState({
                hikes,
                iconColor: colors.purple,
                iconName: 'ios-heart',
            });
        } else {
            this.setState({
                hikes,
                iconColor: colors.gray,
                iconName: 'ios-heart-outline',
            });
        }
    };

    setFavoriteHike = async () => {
        const {
            hid,
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
        const { hid, dispatchUnfavorite } = this.props;
        const { hikes } = this.state;

        const index = hikes.indexOf(hid);
        hikes.splice(index, 1);

        this.setState({
            hikes,
            iconColor: colors.gray,
            iconName: 'ios-heart-outline',
        });

        dispatchUnfavorite({ hid });
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

    render() {
        const { iconName, iconColor, iconSize } = this.state;
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

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={buttonStyle}
            >
                <Ionicons name={iconName} color={iconColor} size={iconSize} />
            </TouchableOpacity>
        );
    }
}

FavoriteButton.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(FavoriteButton)));
