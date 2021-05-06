import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { withTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { opacities, colors, spacing } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { shareAction, baseUrl } from '../constants/Common';
import { getToastText } from '../utils/Toast';
import { copyLink } from '../actions/Hike';

const propTypes = {
    hid: PropTypes.string.isRequired,
    dispatchCopyLink: PropTypes.func.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
};

const defaultProps = {
    iconSize: 28,
    iconColor: colors.white,
    iconName: 'ios-share-social-outline',
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchCopyLink: () => dispatch(copyLink()),
    };
}

class ShareButton extends React.Component {
    onPress = () => {
        this.shareHike();
        Haptics.selectionAsync();
    };

    shareHike = async () => {
        const { hid, t, dispatchCopyLink } = this.props;
        const result = await Share.share({ url: `${baseUrl}/hike/${hid}` });

        if (result.action === Share.sharedAction) {
            if (result.activityType.includes(shareAction)) {
                Toast.show({
                    text1: getToastText('copyLink', t, {}),
                    position: 'bottom',
                    type: 'success',
                });
                dispatchCopyLink();
            }
        }
    };

    getButtonStyle = () => ({
        position: 'absolute',
        right: 47,
        bottom: parseInt(spacing.tiny, 10),
        zIndex: 1,
    });

    renderIcon = () => {
        const { iconSize, iconColor, iconName } = this.props;
        return <Ionicons name={iconName} color={iconColor} size={iconSize} />;
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={this.getButtonStyle()}
            >
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

ShareButton.propTypes = propTypes;
ShareButton.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(ShareButton)));
