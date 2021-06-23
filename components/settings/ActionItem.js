import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { opacities, settingsItems } from '@constants/Index';
import { ItemContainer, ItemText } from '@styles/Settings';
import { logoutUser } from '@actions/User';
import { withNavigation } from '@utils/Navigation';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLogout: (navigation) => dispatch(logoutUser(navigation)),
    };
}

class ActionItem extends React.Component {
    itemPress = async () => {
        const { item, navigation, dispatchLogout } = this.props;

        if (item.type === settingsItems.logout) {
            dispatchLogout(navigation);
        }
    };

    render() {
        const { item } = this.props;

        return (
            <ItemContainer>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.itemPress}
                >
                    <ItemText key={item.key}>{item.name}</ItemText>
                </TouchableOpacity>
            </ItemContainer>
        );
    }
}

ActionItem.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(ActionItem));
