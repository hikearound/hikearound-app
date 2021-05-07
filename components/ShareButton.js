import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { withTranslation } from 'react-i18next';
import { opacities, colors, spacing } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { shareHike } from '../utils/Share';
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
        const { hid, t, dispatchCopyLink } = this.props;
        shareHike(hid, dispatchCopyLink, t, true);
    };

    getButtonStyle = () => ({
        position: 'absolute',
        bottom: parseInt(spacing.tiny, 10),
        right: 47,
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
