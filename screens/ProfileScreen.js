import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from '../components/Index'
import { connect } from 'react-redux';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

function mapStateToProps(state) {
    return {
        action: state.action,
        name: state.name
    };
}

class ProfileScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'You',
    };

    render() {
        return (
            <RootView>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <ProfileHeader>
                        <TouchableOpacity>
                            <Avatar />
                        </TouchableOpacity>
                        <Name>{this.props.name}</Name>
                        <Location>Seattle, WA</Location>
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

const ProfileHeader = styled.View`
    background: #F6F6F6;
    height: 150px;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
`;

const Name = styled.Text`
`;

const Location = styled.Text`
`;
