import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Image } from 'react-native';
import { Image as CachedImage } from 'react-native-expo-image-cache';
import { Ionicons } from '@expo/vector-icons';
import { withTranslation } from 'react-i18next';
import { opacities, transparentColors } from '../constants/Index';
import { updateAvatar } from '../actions/User';
import { withTheme } from '../utils/Themes';
import { avatarActionSheet } from './action_sheets/Avatar';

const propTypes = {
    dispatchAvatar: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    avatarResizeMode: PropTypes.string,
    size: PropTypes.number,
    isEditable: PropTypes.bool,
};

const defaultProps = {
    size: 60,
    avatarResizeMode: 'cover',
    isEditable: false,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchAvatar: (photoData) => dispatch(updateAvatar(photoData)),
    };
}

class Avatar extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { t, dispatchAvatar } = this.props;

        this.avatarActionSheet = avatarActionSheet.bind(
            this,
            t,
            dispatchAvatar,
        );
    }

    renderAvatar = () => {
        const { avatar, size, avatarResizeMode, theme } = this.props;

        const style = {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.avatarBackground,
        };

        if (avatar.includes('file:///')) {
            return (
                <Image
                    source={{ uri: avatar }}
                    resizeMode={avatarResizeMode}
                    style={style}
                />
            );
        }

        return (
            <CachedImage
                uri={avatar}
                resizeMode={avatarResizeMode}
                style={style}
            />
        );
    };

    cameraGradientOverlay = (size) => (
        <View
            style={{
                position: 'absolute',
                backgroundColor: transparentColors.grayDark,
                height: size,
                width: size,
                borderRadius: size / 2,
            }}
        >
            <Ionicons
                name='ios-camera'
                color={transparentColors.white}
                size={30}
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: 12,
                    left: 15,
                }}
            />
        </View>
    );

    renderEditableAvatar = () => {
        const { avatar, size, avatarResizeMode } = this.props;

        return (
            <TouchableOpacity
                onPress={this.avatarActionSheet}
                activeOpacity={opacities.regular}
            >
                {this.renderAvatar(avatar, avatarResizeMode, size)}
                {this.cameraGradientOverlay(size)}
            </TouchableOpacity>
        );
    };

    render() {
        const { isEditable } = this.props;

        if (isEditable) {
            return this.renderEditableAvatar();
        }

        return this.renderAvatar();
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(Avatar)));
