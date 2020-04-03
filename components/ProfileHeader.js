import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import {
    spacing,
    colors,
    fontWeights,
    fontSizes,
    opacities,
} from '../constants/Index';
import { showModal } from '../actions/Modal';
import { withTheme } from '../utils/Themes';

const BACKGROUND_IMAGE_DEFAULT = require('../assets/default/profile-bg.png');
const BACKGROUND_IMAGE_DARK = require('../assets/dark/profile-bg.png');

const linkStyle = {
    position: 'absolute',
    bottom: parseInt(spacing.medium, 10),
};

const editProfileStyle = { ...linkStyle };
editProfileStyle.right = parseInt(spacing.small, 10);

const addLocationStyle = { ...linkStyle };
addLocationStyle.left = parseInt(spacing.small, 10);

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

const defaultProps = {
    modalType: 'editProfile',
};

function mapStateToProps(state) {
    return {
        name: state.userReducer.name,
        location: state.userReducer.location,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class ProfileHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.setHeaderImage();
    }

    componentDidUpdate() {
        this.setHeaderImage();
    }

    setHeaderImage = () => {
        const { theme } = this.props;
        let backgroundImage = BACKGROUND_IMAGE_DEFAULT;

        if (theme.dark) {
            backgroundImage = BACKGROUND_IMAGE_DARK;
        }

        this.setState({ backgroundImage });
    };

    editProfile = () => {
        const { dispatchModalFlag, modalType } = this.props;
        dispatchModalFlag(modalType);
    };

    editProfileLink = () => (
        <TouchableOpacity
            activeOpacity={opacities.regular}
            onPress={this.editProfile}
            style={editProfileStyle}
        >
            <ActionLink primary>Edit Profile</ActionLink>
        </TouchableOpacity>
    );

    addLocationLink = () => (
        <TouchableOpacity
            activeOpacity={opacities.regular}
            onPress={this.editProfile}
            style={addLocationStyle}
        >
            <ActionLink>Add Location</ActionLink>
        </TouchableOpacity>
    );

    render() {
        const { name, location } = this.props;
        const { backgroundImage } = this.state;

        return (
            <HeaderWrapper source={backgroundImage}>
                <Avatar />
                <NameText>{name}</NameText>
                {location === '' && this.addLocationLink()}
                {location !== '' && <LocationText>{location}</LocationText>}
                {this.editProfileLink()}
            </HeaderWrapper>
        );
    }
}

ProfileHeader.propTypes = propTypes;
ProfileHeader.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(ProfileHeader));

const HeaderWrapper = styled.ImageBackground`
    padding-left: ${spacing.small}px;
    padding-top: 40px;
    padding-bottom: ${spacing.medium}px;
    min-height: 175px;
`;

const NameText = styled.Text`
    font-size: ${fontSizes.big}px;
    font-weight: ${fontWeights.bold};
    color: ${(props) => props.theme.text};
    margin-top: ${spacing.tiny}px;
`;

const LocationText = styled.Text`
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.medium};
    color: ${(props) => props.theme.text};
`;

const ActionLink = styled.Text`
    font-size: ${fontSizes.medium}px;
    font-weight: ${(props) =>
        props.primary ? fontWeights.medium : fontWeights.regular};
    color: ${(props) => (props.primary ? colors.purple : colors.darkGray)};
`;
