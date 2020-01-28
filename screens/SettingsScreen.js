import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import Constants from 'expo-constants';
import {
    SettingsItem,
    SettingsSwitchItem,
    SettingsStaticItem,
    SettingsLinkItem,
} from '../components/Index';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

const MAP_SECTION = {
    title: 'Default Map',
    data: ['Apple Maps', 'Google Maps'],
};

const DISPLAY_SECTION = {
    title: 'Display',
    data: ['Dark Mode'],
};

const TERMS_SECTION = {
    title: 'Terms & Privacy',
    data: ['Terms of Service', 'Privacy Policy'],
};

const ACCOUNT_SECTION = {
    title: 'Account',
    data: ['Logout'],
};

const VERSION_SECTION = {
    title: 'Version',
    data: [Constants.manifest.version],
};

const SETTING_ITEMS = [
    MAP_SECTION,
    DISPLAY_SECTION,
    TERMS_SECTION,
    ACCOUNT_SECTION,
    VERSION_SECTION,
];

function mapStateToProps() {
    return {};
}

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Settings',
    };

    renderItem = ({ item, index }) => {
        if (DISPLAY_SECTION.data.includes(item)) {
            return (
                <SettingsSwitchItem
                    item={item}
                    index={index}
                    sections={SETTING_ITEMS}
                />
            );
        }
        if (TERMS_SECTION.data.includes(item)) {
            return (
                <SettingsLinkItem
                    item={item}
                    index={index}
                    sections={SETTING_ITEMS}
                />
            );
        }
        if (VERSION_SECTION.data.includes(item)) {
            return (
                <SettingsStaticItem
                    item={item}
                    index={index}
                    sections={SETTING_ITEMS}
                />
            );
        }
        return (
            <SettingsItem item={item} index={index} sections={SETTING_ITEMS} />
        );
    };

    renderSectionHeader = ({ section }) => (
        <HeaderContainer>
            <HeaderText>{section.title}</HeaderText>
        </HeaderContainer>
    );

    render() {
        return (
            <RootView>
                <SectionList
                    extraData={this.state}
                    renderItem={this.renderItem}
                    stickySectionHeadersEnabled={false}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={SETTING_ITEMS}
                    keyExtractor={(item, index) => item + index}
                />
            </RootView>
        );
    }
}

export default connect(mapStateToProps)(SettingsScreen);

const RootView = styled.View`
    background: ${colors.white};
    flex: 1;
    overflow: hidden;
    padding-left: ${spacing.small}px;
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
