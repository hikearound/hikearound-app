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
import { avatarDefault, avatarDark } from '../constants/Images';

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
        const { t, avatar, dispatchAvatar } = this.props;

        this.avatarActionSheet = avatarActionSheet.bind(
            this,
            t,
            dispatchAvatar,
        );

        this.state = { avatarState: avatar };
    }

    componentDidMount() {
        const { theme, avatar } = this.props;

        if (theme.dark && avatar === avatarDefault) {
            this.updateAvatar(avatarDark);
        }

        if (!theme.dark && avatar === avatarDark) {
            this.updateAvatar(avatarDefault);
        }
    }

    componentDidUpdate(prevProps) {
        const { theme, avatar } = this.props;
        const { avatarState } = this.state;

        if (prevProps.theme !== theme) {
            if (theme.dark && avatarState === avatarDefault) {
                this.updateAvatar(avatarDark);
            }

            if (!theme.dark && avatarState === avatarDark) {
                this.updateAvatar(avatarDefault);
            }
        }

        if (prevProps.avatar !== avatar) {
            this.updateAvatar(avatar);
        }
    }

    updateAvatar = (avatar) => {
        this.setState({ avatarState: avatar });
    };

    renderAvatar = () => {
        const { avatarState } = this.state;
        const { size, avatarResizeMode, theme } = this.props;

        const style = {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.avatarBackground,
        };

        if (avatarState.includes('file:///')) {
            return (
                <Image
                    source={{ uri: avatarState }}
                    resizeMode={avatarResizeMode}
                    style={style}
                />
            );
        }

        return (
            <CachedImage
                uri={avatarState}
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
        const { size } = this.props;

        return (
            <TouchableOpacity
                onPress={this.avatarActionSheet}
                activeOpacity={opacities.regular}
            >
                {this.renderAvatar()}
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
