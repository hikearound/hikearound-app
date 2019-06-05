import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

    buttonPress = () => {
        console.log('click');
        this.updateButtonStyle();
        Haptic.selection();
    }

    updateButtonStyle() {
        if (this.state.iconName == 'ios-heart-empty') {
            this.setState({
                iconColor: '#935DFF',
                iconName: 'ios-heart',
            });
            this.props.favoriteHike();
        } else {
            this.setState({
                iconColor: '#CDCDCD',
                iconName: 'ios-heart-empty',
            });
            this.props.unfavoriteHike();
        }
    }

    render() {
        const { ...props } = this.props;
        // {this.props.name}
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={this.buttonPress}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 30,
                }}>
                <Icon
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
