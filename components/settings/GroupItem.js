import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { colors, spacing, opacities, settingsItems } from '@constants/Index';
import { updateMap } from '@actions/User';
import { ItemContainer, ItemText } from '@styles/Settings';
import { withTheme } from '@utils/Themes';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchMap: PropTypes.func.isRequired,
    map: PropTypes.string.isRequired,
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
        const { item } = this.props;
        const { checkDisplay, textColor } = this.state;

        return (
            <ItemContainer>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.itemPress}
                >
                    <ItemText key={item.key} textColor={textColor}>
                        {item.name}
                    </ItemText>
                    <Ionicons
                        name='ios-checkmark-sharp'
                        size={26}
                        color={colors.purple}
                        style={{
                            display: checkDisplay,
                            right: parseInt(spacing.tiny, 10),
                            top: 7,
                            position: 'absolute',
                        }}
                    />
                </TouchableOpacity>
            </ItemContainer>
        );
    }
}

GroupItem.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(GroupItem));
