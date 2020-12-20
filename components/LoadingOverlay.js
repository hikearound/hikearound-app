import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator, Keyboard } from 'react-native';
import { withTheme } from '../utils/Themes';
import { colors } from '../constants/Index';

const propTypes = {
    loading: PropTypes.bool,
    transparentBackground: PropTypes.bool,
    defaultColors: PropTypes.bool,
    scale: PropTypes.number,
};

const defaultProps = {
    loading: false,
    transparentBackground: false,
    defaultColors: true,
    scale: 1.5,
};

class LoadingOverlay extends React.Component {
    componentDidUpdate() {
        const { loading } = this.props;

        if (loading) {
            Keyboard.dismiss();
        }
    }

    render() {
        const {
            loading,
            transparentBackground,
            scale,
            defaultColors,
            theme,
        } = this.props;

        return (
            <LoadingView
                loading={loading}
                transparentBackground={transparentBackground}
            >
                <ActivityView>
                    <ActivityIndicator
                        size='small'
                        color={
                            defaultColors
                                ? theme.colors.loadingSpinner
                                : colors.white
                        }
                        style={{
                            zIndex: 1,
                            transform: [{ scaleX: scale }, { scaleY: scale }],
                        }}
                    />
                </ActivityView>
            </LoadingView>
        );
    }
}


LoadingOverlay.propTypes = propTypes;
LoadingOverlay.defaultProps = defaultProps;

export default withTheme(LoadingOverlay);

const ActivityView = styled.View`
    flex: 1;
    justify-content: center;
`;

const LoadingView = styled.View`
    display: ${(props) => (props.loading ? 'flex' : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: ${(props) => (props.transparentBackground ? 1 : 0.8)};
    background-color: ${(props) =>
        props.transparentBackground
            ? 'transparent'
            : props.theme.rootBackground};
`;
