import React from 'react';
import styled from 'styled-components';
import { SectionList } from 'react-native';
import { SettingsItem } from '../components/Index';
import {
    colors,
    fontSizes,
    spacing,
    fontWeights,
} from '../constants/Index';

const SETTING_ITEMS = [
    {
        title: 'Default Map',
        data: ['Apple Maps', 'Google Maps'],
    },
    {
        title: 'Account',
        data: ['Logout'],
    },
];

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Settings',
    };

    renderItem = ({ item, index }) => (
        <SettingsItem item={item} index={index} />
    )

    renderSectionHeader = ({ section }) => (
        <HeaderContainer>
            <HeaderText>{section.title}</HeaderText>
        </HeaderContainer>
    )

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
    margin-left: ${spacing.small}px;
`;

const HeaderContainer = styled.View`
    padding-bottom: 4px;
    margin-top: ${spacing.small}px;
`;

const HeaderText = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
