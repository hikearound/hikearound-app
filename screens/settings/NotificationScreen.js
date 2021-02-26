import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
    notifs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        notifs: state.userReducer.notifs,
    };
}

class NotificationSettingsScreen extends React.Component {
    renderItem = ({ item, index }) => (
        <NotificationSwitchItem item={item} index={index} />
    );

    renderSectionHeader = ({ section }) => (
        <HeaderContainer>
            <HeaderText>{section.title}</HeaderText>
        </HeaderContainer>
    );

    render() {
        const { t, notifs } = this.props;
        const settingsData = getSettingsData(t, notifs);

        return (
            <StyledRootView>
                <SetBarStyle barStyle='light-content' />
                <SectionList
                    extraData={notifs}
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

NotificationSettingsScreen.propTypes = propTypes;

export default connect(mapStateToProps)(
    withTranslation()(withTheme(NotificationSettingsScreen)),
);
