import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, spacing } from '../../constants/Index';
import { updateDarkMode, updateNotifications } from '../../actions/User';
import { ItemContainer, ItemText } from './Item';

const propTypes = {
    item: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired,
    dispatchDarkMode: PropTypes.func.isRequired,
    dispatchNotifications: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDarkMode: (darkMode) => dispatch(updateDarkMode(darkMode)),
        dispatchNotifications: (notificationData) =>
            dispatch(updateNotifications(notificationData)),
    };
}

class SettingsItem extends React.PureComponent {
    constructor(props) {
        super(props);
        const { sections } = this.props;
        this.state = {
            displaySectionData: null,
            notificationSectionData: null,
        };

        if (sections.length > 2) {
            this.state.displaySectionData = sections[1].data;
        } else {
            this.state.notificationSectionData = sections[0].data;
        }
    }

    handleToggleSwitch = (value) => {
        const { item, dispatchDarkMode, dispatchNotifications } = this.props;
        const { displaySectionData, notificationSectionData } = this.state;

        if (displaySectionData.includes(item) && item === 'Dark Mode') {
            dispatchDarkMode(value);
        } else if (notificationSectionData.includes(item)) {
            dispatchNotifications(value);
        }
    };

    render() {
        const { item, darkMode } = this.props;
        const { textColor } = this.state;

        return (
            <ItemContainer>
                <ItemText key={item.key} textColor={textColor}>
                    {item}
                </ItemText>
                <SettingsSwitch
                    onValueChange={(value) => this.handleToggleSwitch(value)}
                    value={darkMode}
                    trackColor={{ true: colors.purple, false: colors.gray }}
                    style={{
                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    }}
                />
            </ItemContainer>
        );
    }
}

SettingsItem.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsItem);

const SettingsSwitch = styled.Switch`
    position: absolute;
    right: ${spacing.tiny}px;
    top: ${spacing.tiny}px;
`;
