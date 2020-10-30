import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
import { profileBgDefault, profileBgDark } from '../constants/Images';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    modalType: PropTypes.string,
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
    }

    componentDidMount() {
        this.setHeaderImage();
    }

    componentDidUpdate() {
        this.setHeaderImage();
    }

    setHeaderImage = () => {
        const { theme } = this.props;
        let bgImage = profileBgDefault;

        if (theme.dark) {
            bgImage = profileBgDark;
        }

        this.setState({ bgImage });
    };

    editProfile = () => {
        const { dispatchModalFlag, modalType } = this.props;
        dispatchModalFlag(modalType);
    };

    editProfileLink = (t) => (
        <TouchableOpacity
            activeOpacity={opacities.regular}
            onPress={this.editProfile}
            style={{
                position: 'absolute',
                bottom: parseInt(spacing.medium, 10),
                right: parseInt(spacing.small, 10),
            }}
        >
            <ActionLink primary>{t('screen.profile.edit')}</ActionLink>
        </TouchableOpacity>
    );

    addLocationLink = (t) => (
        <TouchableOpacity
            activeOpacity={opacities.regular}
            onPress={this.editProfile}
            style={{ display: 'flex' }}
        >
            <ActionLink>{t('screen.profile.add')}</ActionLink>
        </TouchableOpacity>
    );

    render() {
        const { name, location, t } = this.props;
        const { bgImage } = this.state;

        return (
            <HeaderWrapper source={bgImage}>
                <ProfileBlock>
                    <Avatar />
                    <NameText>{name}</NameText>
                    {location === '' && this.addLocationLink(t)}
                    {location !== '' && <LocationText>{location}</LocationText>}
                </ProfileBlock>
                {this.editProfileLink(t)}
            </HeaderWrapper>
        );
    }
}

ProfileHeader.propTypes = propTypes;
ProfileHeader.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(ProfileHeader)));

const HeaderWrapper = styled.ImageBackground`
    padding-left: ${spacing.small}px;
    min-height: 175px;
`;

const ProfileBlock = styled.View`
    position: absolute;
    bottom: ${spacing.medium}px;
    left: ${spacing.small}px;
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
    color: ${(props) => (props.primary ? colors.purple : colors.grayDark)};
`;
