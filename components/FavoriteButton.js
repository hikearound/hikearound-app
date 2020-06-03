import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { opacities, colors, spacing } from '../constants/Index';
import { favoriteHike, unfavoriteHike } from '../actions/Hike';

const propTypes = {
    id: PropTypes.string.isRequired,
    dispatchFavorite: PropTypes.func.isRequired,
    dispatchUnfavorite: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
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
    };
}

class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);
        const { favoriteHikes } = this.props;

        this.state = {
            iconColor: colors.gray,
            iconName: 'ios-heart-empty',
            iconSize: 30,
            hikes: favoriteHikes,
        };
    }

    componentDidMount = () => {
        this.setInitialStyle();
    };

    componentDidUpdate(prevProps) {
        const { id } = this.props;

        if (prevProps.id !== id) {
            this.setInitialStyle();
        }
    }

    setInitialStyle = () => {
        const { id } = this.props;
        const { hikes } = this.state;

        if (hikes.includes(id)) {
            this.setState({
                hikes,
                iconColor: colors.purple,
                iconName: 'ios-heart',
            });
        } else {
            this.setState({
                hikes,
                iconColor: colors.gray,
                iconName: 'ios-heart-empty',
            });
        }
    };

    setFavoriteHike = async () => {
        const { id, dispatchFavorite, distance, name, city } = this.props;
        const { hikes } = this.state;

        hikes.push(id);

        this.setState({
            hikes,
            iconColor: colors.purple,
            iconName: 'ios-heart',
        });

        dispatchFavorite({ id, distance, name, city });
    };

    removeFavoriteHike = async () => {
        const { id, dispatchUnfavorite } = this.props;
        const { hikes } = this.state;

        const index = hikes.indexOf(id);
        hikes.splice(index, index);

        this.setState({
            hikes,
            iconColor: colors.gray,
            iconName: 'ios-heart-empty',
        });

        dispatchUnfavorite({ id });
    };

    onPress = () => {
        this.updateButton();
        Haptics.selectionAsync();
    };

    updateButton() {
        const { hikes } = this.state;
        const { id } = this.props;

        if (hikes.includes(id)) {
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
