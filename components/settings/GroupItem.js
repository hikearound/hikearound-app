import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Haptics from 'expo-haptics';
import {
    colors,
    spacing,
    opacities,
    settingsItems,
} from '../../constants/Index';
import { updateMap } from '../../actions/User';
import { ItemContainer, ItemText } from '../../styles/Settings';

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

        this.state = {
            textColor: colors.black,
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
        this.setState({
            textColor: colors.black,
            checkDisplay: 'none',
        });
    }

    render() {
        const { item } = this.props;
        const { checkDisplay, textColor } = this.state;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.itemPress}
            >
                <ItemContainer>
                    <ItemText key={item.key} textColor={textColor}>
                        {item.name}
                    </ItemText>
                    <Ionicons
                        name='ios-checkmark'
                        size={35}
                        color={colors.purple}
                        style={{
                            display: checkDisplay,
                            right: parseInt(spacing.small, 10),
                            top: 5,
                            position: 'absolute',
                        }}
                    />
                </ItemContainer>
            </TouchableOpacity>
        );
    }
}

GroupItem.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);
