import React from 'react';
import { connect } from 'react-redux';
import { SectionList, View } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    GroupItem,
    SwitchItem,
    StaticItem,
    LinkItem,
    PushItem,
    ActionItem,
} from '@components/Index';
import { settingsControls, spacing } from '@constants/Index';
import { getSettingsData } from '@constants/lists/Settings';
import { withTheme, SetBarStyle } from '@utils/Themes';
import {
    RootContainer,
    SectionContainer,
    SectionHeader,
} from '@styles/Settings';

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

    renderItem = ({ item, index, section }) => {
        const { navigation } = this.props;
        const isFirst = index === 0;
        const isLast = index === section.data.length - 1;

        if (item.control === settingsControls.switch) {
            return <SwitchItem item={item} isFirst={isFirst} isLast={isLast} />;
        }
        if (item.control === settingsControls.link) {
            return <LinkItem item={item} isFirst={isFirst} isLast={isLast} />;
        }
        if (item.control === settingsControls.static) {
            return <StaticItem item={item} isFirst={isFirst} isLast={isLast} />;
        }
        if (item.control === settingsControls.push) {
            return (
                <PushItem
                    item={item}
                    navigation={navigation}
                    isFirst={isFirst}
                    isLast={isLast}
                />
            );
        }
        if (item.control === settingsControls.action) {
            return <ActionItem item={item} isFirst={isFirst} isLast={isLast} />;
        }
        if (item.control === settingsControls.groupSelection) {
            return <GroupItem item={item} isFirst={isFirst} isLast={isLast} />;
        }

        return null;
    };

    renderSectionHeader = ({ section }) => (
        <SectionHeader>{section.title}</SectionHeader>
    );

    renderSection = ({ section, index: sectionIndex }) => {
        const { settingsData } = this.state;
        const isLastSection = sectionIndex === settingsData.length - 1;
        return (
            <SectionContainer lastSection={isLastSection}>
                {section.data.map((item, index) => (
                    <React.Fragment key={index}>
                        {this.renderItem({ item, index, section })}
                    </React.Fragment>
                ))}
            </SectionContainer>
        );
    };

    render() {
        const { settingsData } = this.state;
        const { itemsPerBatch } = this.props;

        return (
            <RootContainer>
                <SetBarStyle barStyle='light-content' />
                <View style={{ flex: 1, paddingBottom: spacing.xlarge }}>
                    {settingsData && (
                        <SectionList
                            extraData={this.state}
                            renderItem={this.renderItem}
                            renderSectionHeader={this.renderSectionHeader}
                            renderSection={this.renderSection}
                            sections={settingsData}
                            keyExtractor={(item, index) => item + index}
                            initialNumToRender={itemsPerBatch}
                            maxToRenderPerBatch={itemsPerBatch}
                            showsVerticalScrollIndicator={false}
                            stickySectionHeadersEnabled={false}
                            contentContainerStyle={{ paddingBottom: 24 }}
                        />
                    )}
                </View>
            </RootContainer>
        );
    }
}

SettingsScreen.propTypes = propTypes;
SettingsScreen.defaultProps = defaultProps;

export default connect(mapStateToProps)(
    withTranslation()(withTheme(SettingsScreen)),
);
