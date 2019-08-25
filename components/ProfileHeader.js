import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Avatar from './Avatar';
import {
    spacing,
    colors,
    fontWeights,
    fontSizes,
    opacities,
} from '../constants/Index';

const backgroundImg = require('../assets/profile-bg.png');

class ProfileHeader extends React.PureComponent {
    render() {
        const { name } = this.props;

        return (
            <HeaderWrapper source={backgroundImg}>
                <AvatarWrapper>
                    <TouchableOpacity activeOpacity={opacities.regular}>
                        <Avatar />
                    </TouchableOpacity>
                </AvatarWrapper>
                <NameText>{name}</NameText>
                <LocationText>Seattle, WA</LocationText>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    style={{
                        position: 'absolute',
                        right: parseInt(spacing.small, 10),
                        bottom: 20,
                    }}
                >
                    <EditProfileLink>
                        Edit Profile
                    </EditProfileLink>
                </TouchableOpacity>
            </HeaderWrapper>
        );
    }
}

export default ProfileHeader;

const AvatarWrapper = styled.View`
    width: 66px;
    border-radius: 33px;
`;

const HeaderWrapper = styled.ImageBackground`
    padding-left: ${spacing.small}px;
    padding-top: 40px;
    padding-bottom: ${spacing.medium}px;
`;

const NameText = styled.Text`
    font-size: ${fontSizes.big}px;
    font-weight: ${fontWeights.bold};
    color:${colors.black};
    margin-top: ${spacing.tiny}px;
`;

const LocationText = styled.Text`
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.medium};
    color: ${colors.black};
`;

const EditProfileLink = styled.Text`
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.medium};
    color: ${colors.purple};
`;
