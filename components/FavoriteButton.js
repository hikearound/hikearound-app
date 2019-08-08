import React from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { opacities } from '../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        favoriteHike: () => dispatch({
            type: 'FAVORITE_HIKE',
        }),
        unfavoriteHike: () => dispatch({
            type: 'UNFAVORITE_HIKE',
        }),
    };
}

class FavoriteButton extends React.Component {
    state = {
        iconColor: '#CDCDCD',
        iconName: 'ios-heart-empty',
        iconSize: 30,
    };

    componentWillMount = async () => {
        const { _key } = this.props;
        const hikeArray = await this.getFavoritedHikes();
        if (hikeArray.includes(_key)) {
            this.setHeartFilled();
        }
    }

    getFavoritedHikes = async () => AsyncStorage.getItem('favoritedHikes');

    setFavoriteHike = async () => {
        const { _key } = this.props;
        let hikeArray = await this.getFavoritedHikes();
        if (hikeArray) {
            hikeArray = JSON.parse(hikeArray);
            if (!hikeArray.includes(_key)) {
                hikeArray.push(_key);
                AsyncStorage.setItem(
                    'favoritedHikes', JSON.stringify(hikeArray)
                );
            }
        } else {
            const newHikeArray = [_key];
            AsyncStorage.setItem(
                'favoritedHikes', JSON.stringify(newHikeArray)
            );
        }
    }

    setHeartFilled() {
        this.setState({
            iconColor: '#935DFF',
            iconName: 'ios-heart',
        });
    }

    setHeartEmpty() {
        this.setState({
            iconColor: '#CDCDCD',
            iconName: 'ios-heart-empty',
        });
    }

    removeFavoriteHike = async () => {
        const { _key } = this.props;
        let hikeArray = await this.getFavoritedHikes();
        hikeArray = JSON.parse(hikeArray);
        const index = hikeArray.indexOf(_key);
        delete hikeArray[index];
        AsyncStorage.setItem(
            'favoritedHikes', JSON.stringify(hikeArray)
        );
    }

    buttonPress = () => {
        this.updateButtonStyle();
        Haptics.selection();
    }

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
                }}
            >
                <Ionicons
                    name={iconName}
                    color={iconColor}
                    size={iconSize}
                />
            </TouchableOpacity>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoriteButton);
