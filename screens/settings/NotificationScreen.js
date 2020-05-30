import React from 'react';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import { withTranslation } from 'react-i18next';
import { NotificationSwitchItem } from '../../components/Index';
import { getSettingsData } from '../../constants/lists/NotificationSettings';
import {
    StyledRootView,
    HeaderContainer,
    HeaderText,
} from '../../styles/Screens';
import { withTheme, SetBarStyle } from '../../utils/Themes';

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
        const { t } = this.props;
        const settingsData = getSettingsData(t);

        return (
            <StyledRootView>
                <SetBarStyle barStyle='light-content' />
                <SectionList
                    extraData={this.state}
                    renderItem={this.renderItem}
                    stickySectionHeadersEnabled={false}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={settingsData}
                    keyExtractor={(item, index) => item + index}
                />
            </StyledRootView>
        );
    }
}

export default connect(mapStateToProps)(
    withTranslation()(withTheme(NotificationSettingsScreen)),
);
