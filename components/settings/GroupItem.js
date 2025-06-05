import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { colors, settingsItems } from '@constants/Index';
import { updateMap } from '@actions/User';
import { withTheme } from '@utils/Themes';
import BaseSettingsItem from './BaseSettingsItem';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchMap: PropTypes.func.isRequired,
    map: PropTypes.string.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
};

function mapStateToProps(state) {
    return {
        map: state.userReducer.map,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMap: (map) => dispatch(updateMap(map)),
    };
}

class GroupItem extends React.PureComponent {
    constructor(props) {
        super(props);
        const { theme } = this.props;

        this.state = {
            textColor: theme.text,
            checkDisplay: 'none',
        };
    }

    componentDidMount = async () => {
        const { item, map } = this.props;

        if (item.type === settingsItems.map && item.name === map) {
            this.selectItem();
        }
    };

    componentDidUpdate = async () => {
        const { item, map } = this.props;

        if (item.type === settingsItems.map && item.name !== map) {
            this.unselectItem();
        }
    };

    itemPress = () => {
        const { item, map } = this.props;

        if (item.type === settingsItems.map && item.name !== map) {
            this.updateMapSelection();
        }
    };

    updateMapSelection() {
        const { item, dispatchMap } = this.props;

        this.selectItem();
        Haptics.selectionAsync();
        dispatchMap(item.name);
    }

    selectItem() {
        this.setState({
            textColor: `${colors.purple}`,
            checkDisplay: 'flex',
        });
    }

    unselectItem() {
        const { theme } = this.props;
        this.setState({
            textColor: theme.text,
            checkDisplay: 'none',
        });
    }

    render() {
        const { item, isFirst, isLast } = this.props;
        const { checkDisplay, textColor } = this.state;

        return (
            <BaseSettingsItem
                item={item}
                isFirst={isFirst}
                isLast={isLast}
                onPress={this.itemPress}
                textColor={textColor}
            >
                <Ionicons
                    name='ios-checkmark-sharp'
                    size={22}
                    color={colors.purple}
                    style={{
                        display: checkDisplay,
                        right: -5,
                        top: 12,
                        position: 'absolute',
                    }}
                />
            </BaseSettingsItem>
        );
    }
}

GroupItem.propTypes = propTypes;
GroupItem.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(GroupItem));
