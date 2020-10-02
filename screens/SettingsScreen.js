import React from 'react';
import { connect } from 'react-redux';
import { SectionList } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    GroupItem,
    SwitchItem,
    StaticItem,
    LinkItem,
    PushItem,
    ActionItem,
} from '../components/Index';
import { settingsControls } from '../constants/Index';
import { getSettingsData } from '../constants/lists/Settings';
import { StyledRootView, HeaderContainer, HeaderText } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';

const propTypes = {
    itemsPerBatch: PropTypes.number,
};

const defaultProps = {
    itemsPerBatch: 20,
};

function mapStateToProps() {
    return {};
}

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        const settingsData = getSettingsData(t);

        this.state = { settingsData };
    }

    renderItem = ({ item, index }) => {
        const { navigation } = this.props;

        if (item.control === settingsControls.switch) {
            return <SwitchItem item={item} index={index} />;
        }
        if (item.control === settingsControls.link) {
            return <LinkItem item={item} index={index} />;
        }
        if (item.control === settingsControls.static) {
            return <StaticItem item={item} index={index} />;
        }
        if (item.control === settingsControls.push) {
            return (
                <PushItem item={item} index={index} navigation={navigation} />
            );
        }
        if (item.control === settingsControls.action) {
            return <ActionItem item={item} index={index} />;
        }
        if (item.control === settingsControls.groupSelection) {
            return <GroupItem item={item} index={index} />;
        }

        return null;
    };

    renderSectionHeader = ({ section }) => (
        <HeaderContainer>
            <HeaderText>{section.title}</HeaderText>
        </HeaderContainer>
    );

    render() {
        const { settingsData } = this.state;
        const { itemsPerBatch } = this.props;

        return (
            <StyledRootView>
                <SetBarStyle barStyle='light-content' />
                {settingsData && (
                    <SectionList
                        extraData={this.state}
                        renderItem={this.renderItem}
                        stickySectionHeadersEnabled={false}
                        renderSectionHeader={this.renderSectionHeader}
                        sections={settingsData}
                        keyExtractor={(item, index) => item + index}
                        initialNumToRender={itemsPerBatch}
                        maxToRenderPerBatch={itemsPerBatch}
                    />
                )}
            </StyledRootView>
        );
    }
}

SettingsScreen.propTypes = propTypes;
SettingsScreen.defaultProps = defaultProps;

export default connect(mapStateToProps)(
    withTranslation()(withTheme(SettingsScreen)),
);
