import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-expo-image-cache';
import { Ionicons } from '@expo/vector-icons';
import { opacities, transparentColors } from '../constants/Index';
import { updateAvatar } from '../actions/User';
import { reduceImageAsync, getBlob } from '../utils/Image';
import { withTheme } from '../utils/Themes';

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
    checkPhotoPermissions = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            const { status: newStatus } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL,
            );
            if (newStatus === 'granted') {
                this.launchPhotoPicker();
            }
        } else {
            this.launchPhotoPicker();
        }
    };

    launchPhotoPicker = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });
        if (!photo.cancelled) {
            const uri = await this.reduceImage(photo.uri);
            await this.uploadImage(uri);
        }
    };

    reduceImage = async (originalUri) => {
        const { uri } = await reduceImageAsync(originalUri);
        return uri;
    };

    uploadImage = async (uri) => {
        const { dispatchAvatar } = this.props;
        const blob = await getBlob(uri);
        if (blob) {
            dispatchAvatar({ uri, blob });
        }
    };

    avatar = (avatar, avatarResizeMode, size) => {
        const { theme } = this.props;

        return (
            <Image
                uri={avatar}
                resizeMode={avatarResizeMode}
                style={{
                    height: size,
                    width: size,
                    borderRadius: size / 2,
                    backgroundColor: theme.colors.avatarBackground,
                }}
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

    render() {
        const { avatar, size, avatarResizeMode, isEditable } = this.props;

        if (isEditable) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.checkPhotoPermissions();
                    }}
                    activeOpacity={opacities.regular}
                >
                    {this.avatar(avatar, avatarResizeMode, size)}
                    {this.cameraGradientOverlay(size)}
                </TouchableOpacity>
            );
        }
        return <View>{this.avatar(avatar, avatarResizeMode, size)}</View>;
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Avatar));
