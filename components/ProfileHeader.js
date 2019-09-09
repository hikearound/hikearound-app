import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
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
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    async componentDidMount() {
        this.getUserData();
    }

    getUid = async () => firebase.auth().currentUser.uid

    getUserSnapshot = async () => {
        this.setState({ loading: true });
        const firestore = firebase.firestore();
        const uid = await this.getUid();
        return firestore.collection('users').doc(uid).get();
    }

    getUserData = async () => {
        const userSnapshot = await this.getUserSnapshot();
        const user = userSnapshot.data();

        this.setState({
            name: user.name,
            location: user.location,
            loading: false,
        });
    }

    render() {
        const { loading, name, location } = this.state;

        if (!loading) {
            return (
                <HeaderWrapper source={backgroundImg}>
                    <AvatarWrapper>
                        <TouchableOpacity activeOpacity={opacities.regular}>
                            <Avatar />
                        </TouchableOpacity>
                    </AvatarWrapper>
                    <NameText>{name}</NameText>
                    <LocationText>{location}</LocationText>
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
        return (null);
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
    color: ${colors.black};
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
