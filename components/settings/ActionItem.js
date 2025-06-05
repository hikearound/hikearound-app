import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { settingsItems } from '@constants/Index';
import { logoutUser } from '@actions/User';
import { withNavigation } from '@utils/Navigation';
import BaseSettingsItem from './BaseSettingsItem';

const propTypes = {
    item: PropTypes.object.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
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
        const { item, isFirst, isLast } = this.props;

        return (
            <BaseSettingsItem
                item={item}
                isFirst={isFirst}
                isLast={isLast}
                onPress={this.itemPress}
            />
        );
    }
}

ActionItem.propTypes = propTypes;
ActionItem.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(ActionItem));
