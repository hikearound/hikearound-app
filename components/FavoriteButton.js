import React from 'react';
import { TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Haptic } from 'expo';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        favoriteHike: () => dispatch({
            type: 'FAVORITE_HIKE'
        }),
        unfavoriteHike: () => dispatch({
            type: 'UNFAVORITE_HIKE'
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
        let hikeArray = await this.getFavoritedHikes()
        if (hikeArray.includes(this.props._key)) {
            this.setHeartFilled();
        }
    }

    buttonPress = () => {
        this.updateButtonStyle();
        Haptic.selection();
    }

    getFavoritedHikes = async () => {
        return AsyncStorage.getItem('favoritedHikes');
    }

    setFavoriteHike = async () => {
        let hikeArray = await this.getFavoritedHikes()
        if (hikeArray) {
            hikeArray = JSON.parse(hikeArray)
            if (!hikeArray.includes(this.props._key)) {
                hikeArray.push(this.props._key)
                AsyncStorage.setItem(
                    'favoritedHikes', JSON.stringify(hikeArray)
                );
            }
        } else {
            var newHikeArray = [this.props._key]
            AsyncStorage.setItem(
                'favoritedHikes', JSON.stringify(newHikeArray)
            );
        }
    }

    removeFavoriteHike = async () => {
        let hikeArray = await this.getFavoritedHikes()
        hikeArray = JSON.parse(hikeArray)
        var index = hikeArray.indexOf(this.props._key);
        delete hikeArray[index];
        AsyncStorage.setItem(
            'favoritedHikes', JSON.stringify(hikeArray)
        );
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

    updateButtonStyle() {
        if (this.state.iconName == 'ios-heart-empty') {
            this.setHeartFilled();
            this.setFavoriteHike();
            this.props.favoriteHike();
        } else {
            this.setHeartEmpty();
            this.removeFavoriteHike();
            this.props.unfavoriteHike();
        }
    }

    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={this.buttonPress}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 30,
                }}>
                <Ionicons
                    name={this.state.iconName}
                    color={this.state.iconColor}
                    size={this.state.iconSize}
                />
            </TouchableOpacity>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoriteButton);
