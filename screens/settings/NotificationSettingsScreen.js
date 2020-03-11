import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { SettingsStaticItem } from '../../components/Index';
import { themes } from '../../constants/Themes';
import { colors, fontSizes, spacing, fontWeights } from '../../constants/Index';
import { RootView } from '../../styles/Screens';

const EMAIL_SECTION = {
    title: 'Emails',
    data: ['Enable all emails'],
};

const PUSH_SECTION = {
    title: 'Push Notifications',
    data: ['Enable all push notifications'],
};

const SETTING_ITEMS = [EMAIL_SECTION, PUSH_SECTION];

function mapStateToProps() {
    return {};
}

class NotificationSettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Notification Settings',
    };

    renderItem = ({ item, index }) => {
        return (
            <SettingsStaticItem
                item={item}
                index={index}
                sections={SETTING_ITEMS}
            />
        );
    };

    renderSectionHeader = ({ section }) => (
        <HeaderContainer>
            <HeaderText>{section.title}</HeaderText>
        </HeaderContainer>
    );

    static contextType = ThemeContext;

    render() {
        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
                <StyledRootView>
                    <SectionList
                        extraData={this.state}
                        renderItem={this.renderItem}
                        stickySectionHeadersEnabled={false}
                        renderSectionHeader={this.renderSectionHeader}
                        sections={SETTING_ITEMS}
                        keyExtractor={(item, index) => item + index}
                    />
                </StyledRootView>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps)(NotificationSettingsScreen);

const StyledRootView = styled(RootView)`
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
