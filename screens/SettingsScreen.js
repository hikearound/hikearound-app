import React from 'react';
import styled from 'styled-components';
import {
    SectionList,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Updates } from 'expo';
import firebase from 'firebase';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

const SETTING_ITEMS = [
    {
        title: 'Default Map',
        data: ['Apple', 'Google Maps']
    },
    {
        title: 'Account',
        data: ['Logout']
    },
];

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Settings',
    };

    state = {
        defaultMap: 'Apple',
    };

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = async () => {
        firebase
            .auth()
            .signOut()
            .then(response => {
                Updates.reload()
            });
    };

    renderItem({item, index, section}) {
        var textColor = '#333';
        var checkDisplay = 'none';

        onItemPress = () => {
            if (item == 'Logout') {
                this.handleLogout()
            }
        };

        if (item == this.state.defaultMap) {
            textColor = '#935DFF';
            checkDisplay = 'flex';
        }

        return (
            <TouchableOpacity onPress={onItemPress}>
                <ItemContainer>
                    <ItemText
                        key={item.key}
                        textColor={textColor}>
                        {item}
                    </ItemText>
                    <Ionicons
                        name='ios-checkmark'
                        size={35}
                        color='#935DFF'
                        style={{
                            display: checkDisplay,
                            right: 15,
                            top: 5,
                            position: 'absolute',
                        }}
                    />
                </ItemContainer>
            </TouchableOpacity>
        )
    }

    renderSectionHeader({section}) {
        return (
            <HeaderContainer>
                <HeaderText>
                    {section.title}
                </HeaderText>
            </HeaderContainer>
        )
    }

    render() {
        return (
            <RootView>
                <SectionList
                    renderItem={this.renderItem}
                    stickySectionHeadersEnabled={false}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={SETTING_ITEMS}
                    keyExtractor={
                        (item, index) => item + index
                    }
                />
            </RootView>
        );
    }
}

export default SettingsScreen;

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
    margin-left: 15px;
`;

const HeaderContainer = styled.View`
    padding-bottom: 4px;
    margin-top: 15px;
`;

const HeaderText = styled.Text`
    color: #9C9C9C;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
`;

const ItemContainer = styled.View`
    border-color: #F0F0F0;
    border-top-width: 1px;
    padding: 15px 0;
`;

const ItemText = styled.Text`
    color: ${props => props.textColor || '#333'};
    font-size: 16px;
`;
