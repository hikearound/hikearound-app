import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { opacities, colors } from '../constants/Index';

const propTypes = {
    id: PropTypes.string.isRequired,
    favoriteHike: PropTypes.func.isRequired,
    unfavoriteHike: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        action: state.hikeReducer.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        favoriteHike: () =>
            dispatch({
                type: 'FAVORITE_HIKE',
            }),
        unfavoriteHike: () =>
            dispatch({
                type: 'UNFAVORITE_HIKE',
            }),
    };
}

class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iconColor: colors.gray,
            iconName: 'ios-heart-empty',
            iconSize: 30,
        };
    }

    componentWillMount = async () => {
        const { id } = this.props;
        const hikeArray = await this.getFavoritedHikes();
        if (hikeArray.includes(id)) {
            this.setHeartFilled();
        }
    };

    getFavoritedHikes = async () => AsyncStorage.getItem('favoritedHikes');

    setFavoriteHike = async () => {
        const { id } = this.props;
        let hikeArray = await this.getFavoritedHikes();
        if (hikeArray) {
            hikeArray = JSON.parse(hikeArray);
            if (!hikeArray.includes(id)) {
                hikeArray.push(id);
                AsyncStorage.setItem(
                    'favoritedHikes',
                    JSON.stringify(hikeArray),
                );
            }
        } else {
            const newHikeArray = [id];
            AsyncStorage.setItem(
                'favoritedHikes',
                JSON.stringify(newHikeArray),
            );
        }
    };

    setHeartFilled() {
        this.setState({
            iconColor: colors.purple,
            iconName: 'ios-heart',
        });
    }

    setHeartEmpty() {
        this.setState({
            iconColor: colors.gray,
            iconName: 'ios-heart-empty',
        });
    }

    removeFavoriteHike = async () => {
        const { id } = this.props;
        let hikeArray = await this.getFavoritedHikes();
        hikeArray = JSON.parse(hikeArray);
        const index = hikeArray.indexOf(id);
        delete hikeArray[index];
        AsyncStorage.setItem('favoritedHikes', JSON.stringify(hikeArray));
    };

    buttonPress = () => {
        this.updateButtonStyle();
        Haptics.selectionAsync();
    };

    updateButtonStyle() {
        const { iconName } = this.state;
        const { favoriteHike, unfavoriteHike } = this.props;
        if (iconName === 'ios-heart-empty') {
            this.setHeartFilled();
            this.setFavoriteHike();
            favoriteHike();
        } else {
            this.setHeartEmpty();
            this.removeFavoriteHike();
            unfavoriteHike();
        }
    }

    render() {
        const { iconName, iconColor, iconSize } = this.state;
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.buttonPress}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 30,
                }}>
                <Ionicons name={iconName} color={iconColor} size={iconSize} />
            </TouchableOpacity>
        );
    }
}

FavoriteButton.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FavoriteButton);
