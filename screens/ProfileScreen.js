import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Avatar, Settings } from '../components/Index';
import {
    colors,
    spacing,
    fontSizes,
    fontWeights,
    opacities,
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

    async componentDidMount() {
        // TODO: map this to a real collection
        // const hikeData = await this.queryHikeData();
    }

    getHikeArray = async () => AsyncStorage.getItem('favoritedHikes')

    getHikesRef = async () => {
        const firestore = firebase.firestore();
        return firestore.collection('hikes');
    }

    queryHikeData = async () => {
        const hikesRef = await this.getHikesRef();
        let hikeArray = await this.getHikeArray();

        if (hikeArray) {
            hikeArray = JSON.parse(hikeArray);
            return hikesRef.doc(hikeArray[0]).get();
        }
        return [];
    }

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
                            <TouchableOpacity
                                activeOpacity={opacities.regular}
                            >
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
