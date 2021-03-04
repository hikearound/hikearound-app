import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, View } from 'react-native';
import { withTheme } from '../utils/Themes';

const propTypes = {
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    topOffset: PropTypes.number,
    scale: PropTypes.number,
};

const defaultProps = {
    topOffset: 41,
    scale: 0.7,
};

class FeedRefreshControl extends React.PureComponent {
    render() {
        const { onRefresh, refreshing, topOffset, scale, theme } = this.props;

        return (
            <View style={{ top: topOffset }}>
                <RefreshControl
                    tintColor={theme.colors.refreshControlTint}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    style={{
                        zIndex: 1,
                        transform: [{ scaleX: scale }, { scaleY: scale }],
                    }}
                />
            </View>
        );
    }
}

FeedRefreshControl.propTypes = propTypes;
FeedRefreshControl.defaultProps = defaultProps;

export default withTheme(FeedRefreshControl);
