import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Settings } from '../components/Index';
import {
    colors,
    spacing,
    fontSizes,
    fontWeights,
} from '../constants/Index';

const backgroundImg = require('../assets/profile-bg.png');

function mapStateToProps(state) {
    return {
        action: state.action,
        name: state.name,
    };
}

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'You',
        headerBackTitle: null,
        headerRight: <Settings navigation={navigation} />,
    })

    render() {
        const { name } = this.props;
        return (
            <RootView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <ProfileHeader
                        source={backgroundImg}
                    >
                        <AvatarWrapper>
                            <TouchableOpacity activeOpacity={0.4}>
                                <Avatar />
                            </TouchableOpacity>
                        </AvatarWrapper>
                        <NameText>{name}</NameText>
                        <LocationText>Seattle, WA</LocationText>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            style={{
                                position: 'absolute',
                                right: parseInt(spacing.small, 10),
                                bottom: 20,
                            }}
                        >
                            <EditProfileLink>Edit Profile</EditProfileLink>
                        </TouchableOpacity>
                    </ProfileHeader>
                </ScrollView>
            </RootView>
        );
    }
}

export default connect(
    mapStateToProps,
)(ProfileScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
`;

const AvatarWrapper = styled.View`
    width: 66px;
    border-radius: 33px;
`;

const ProfileHeader = styled.ImageBackground`
    padding-left: ${spacing.small}px;
    padding-top: 40px;
    padding-bottom: ${spacing.medium}px;
`;

const NameText = styled.Text`
    font-size: ${fontSizes.header}px;
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
    color: #935DFF;
`;
