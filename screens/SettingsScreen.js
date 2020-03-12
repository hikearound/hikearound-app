import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import { ThemeContext } from 'react-navigation';
import {
    SettingsGroupItem,
    SettingsSwitchItem,
    SettingsStaticItem,
    SettingsLinkItem,
    SettingsPushItem,
    SettingsActionItem,
} from '../components/Index';
import { themes } from '../constants/Themes';
import { settingsControls } from '../constants/Index';
import { listData } from '../constants/lists/Settings';
import { StyledRootView, HeaderContainer, HeaderText } from '../styles/Screens';

function mapStateToProps() {
    return {};
}

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Settings',
    };

    renderItem = ({ item, index }) => {
        const { navigation } = this.props;

        if (item.control === settingsControls.switch) {
            return <SettingsSwitchItem item={item} index={index} />;
        }
        if (item.control === settingsControls.link) {
            return <SettingsLinkItem item={item} index={index} />;
        }
        if (item.control === settingsControls.static) {
            return <SettingsStaticItem item={item} index={index} />;
        }
        if (item.control === settingsControls.push) {
            return (
                <SettingsPushItem
                    item={item}
                    index={index}
                    navigation={navigation}
                />
            );
        }
        if (item.control === settingsControls.action) {
            return <SettingsActionItem item={item} index={index} />;
        }
        if (item.control === settingsControls.groupSelection) {
            return <SettingsGroupItem item={item} index={index} />;
        }

        return null;
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
                        sections={listData}
                        keyExtractor={(item, index) => item + index}
                    />
                </StyledRootView>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps)(SettingsScreen);
