import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, View } from 'react-native';
import { withTheme } from '../utils/Themes';

const propTypes = {
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    topOffset: PropTypes.number,
};

const defaultProps = {
    topOffset: 35,
};

class FeedRefreshControl extends React.PureComponent {
    render() {
        const { onRefresh, refreshing, topOffset, theme } = this.props;

        return (
            <View style={{ position: 'absolute', top: topOffset }}>
                <RefreshControl
                    tintColor={theme.colors.refreshControlTint}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        );
    }
}

FeedRefreshControl.propTypes = propTypes;
FeedRefreshControl.defaultProps = defaultProps;

export default withTheme(FeedRefreshControl);
