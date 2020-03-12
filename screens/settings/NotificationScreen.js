import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { NotificationSwitchItem } from '../../components/Index';
import { themes } from '../../constants/Themes';
import { listData } from '../../constants/lists/NotificationSettings';
import {
    StyledRootView,
    HeaderContainer,
    HeaderText,
} from '../../styles/Screens';

function mapStateToProps() {
    return {};
}

class NotificationSettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Notification Settings',
    };

    renderItem = ({ item, index }) => {
        return <NotificationSwitchItem item={item} index={index} />;
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

export default connect(mapStateToProps)(NotificationSettingsScreen);
