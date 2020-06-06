import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator, Keyboard } from 'react-native';
import { withTheme } from '../utils/Themes';
import { colors } from '../constants/Index';

const propTypes = {
    loading: PropTypes.bool,
    isLightbox: PropTypes.bool,
    scale: PropTypes.number,
};

const defaultProps = {
    loading: false,
    isLightbox: false,
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
        const { loading, isLightbox, scale, theme } = this.props;

        return (
            <LoadingView loading={loading} isLightbox={isLightbox}>
                <ActivityView>
                    <ActivityIndicator
                        size='small'
                        color={
                            isLightbox
                                ? colors.white
                                : theme.colors.loadingSpinner
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
    opacity: ${(props) => (props.isLightbox ? 1 : 0.8)};
    background-color: ${(props) =>
        props.isLightbox ? colors.black : props.theme.rootBackground};
`;
