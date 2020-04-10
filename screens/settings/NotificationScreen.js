import React from 'react';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import { NotificationSwitchItem } from '../../components/Index';
import { listData } from '../../constants/lists/NotificationSettings';
import {
    StyledRootView,
    HeaderContainer,
    HeaderText,
} from '../../styles/Screens';
import { withTheme } from '../../utils/Themes';

function mapStateToProps() {
    return {};
}

class NotificationSettingsScreen extends React.Component {
    renderItem = ({ item, index }) => {
        return <NotificationSwitchItem item={item} index={index} />;
    };

    renderSectionHeader = ({ section }) => (
        <HeaderContainer>
            <HeaderText>{section.title}</HeaderText>
        </HeaderContainer>
    );

    render() {
        return (
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
        );
    }
}

export default connect(mapStateToProps)(withTheme(NotificationSettingsScreen));
