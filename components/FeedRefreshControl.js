import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, View } from 'react-native';
import { withTheme } from '@utils/Themes';

const propTypes = {
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    topOffset: PropTypes.number,
    scale: PropTypes.number,
    color: PropTypes.string,
};

const defaultProps = {
    topOffset: 10,
    scale: 0.7,
    color: null,
};

class FeedRefreshControl extends React.PureComponent {
    getColor = () => {
        const { color, theme } = this.props;

        if (color) {
            return color;
        }

        return theme.colors.refreshControlTint;
    };

    render() {
        const { onRefresh, refreshing, scale } = this.props;

        return (
            <RefreshControl
                tintColor={this.getColor()}
                refreshing={refreshing}
                onRefresh={onRefresh}
                style={{
                    transform: [{ scaleX: scale }, { scaleY: scale }],
                }}
                progressViewOffset={0}
            />
        );
    }
}

FeedRefreshControl.propTypes = propTypes;
FeedRefreshControl.defaultProps = defaultProps;

export default withTheme(FeedRefreshControl);
