import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { opacities } from '../constants/Index';
import { updateAvatar } from '../actions/User';

const propTypes = {
    dispatchAvatar: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    size: PropTypes.number,
};

const defaultProps = {
    size: 60,
};

function mapStateToProps(state) {
    return {
        avatar: state.userReducer.avatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchAvatar: (avatar) => dispatch(updateAvatar(avatar)),
    };
}

class Avatar extends React.Component {
    componentDidMount() {
        this.loadState();
    }

    loadState = () => {
        const { dispatchAvatar } = this.props;
        AsyncStorage.getItem('state').then((serializedState) => {
            const state = JSON.parse(serializedState);
            if (state) {
                dispatchAvatar(state.avatar);
            }
        });
    };

    checkPhotoPermissions = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            const { newStatus } = await Permissions.askAsync(
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
        const photo = await ImagePicker.launchImageLibraryAsync();
        return photo;
    };

    render() {
        const { avatar, size } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.checkPhotoPermissions();
                }}
                activeOpacity={opacities.regular}
            >
                <Image
                    source={{ uri: avatar }}
                    style={{
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                    }}
                />
            </TouchableOpacity>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Avatar);
