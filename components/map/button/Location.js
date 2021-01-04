import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import {
    colors,
    transparentColors,
    opacities,
    borderRadius,
    spacing,
} from '../../../constants/Index';
import { withTheme } from '../../../utils/Themes';

const propTypes = {
    position: PropTypes.object,
    mapRef: PropTypes.object,
    animationConfig: PropTypes.object.isRequired,
    bottomOffset: PropTypes.number,
};

const defaultProps = {
    position: null,
    mapRef: {},
    bottomOffset: 35,
};

function mapStateToProps(state) {
    return {
        position: state.userReducer.currentPosition,
    };
}

function mapDispatchToProps() {
    return {};
}

class LocationButton extends React.PureComponent {
    onPress = () => {
        const { mapRef, animationConfig, position } = this.props;

        const camera = {
            altitude: 20000,
            center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            },
            heading: 0,
            pitch: 0,
        };

        mapRef.current.animateCamera(camera, {
            duration: animationConfig.duration,
        });
    };

    render() {
        const { bottomOffset } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
                style={{
                    position: 'absolute',
                    bottom: bottomOffset,
                    right: parseInt(spacing.tiny, 10),
                }}
            >
                <ButtonWrapper>
                    <Ionicons
                        name='ios-navigate'
                        color={colors.purple}
                        size={24}
                        style={{
                            position: 'absolute',
                            top: 8,
                            left: 7,
                        }}
                    />
                </ButtonWrapper>
            </TouchableOpacity>
        );
    }
}

LocationButton.propTypes = propTypes;
LocationButton.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(LocationButton));

const ButtonWrapper = styled.View`
    display: flex;
    height: 40px;
    width: 40px;
    background-color: ${(props) => props.theme.mapButtonBackground};
    border-radius: ${borderRadius.large}px;
    box-shadow: 0 4px 4px ${transparentColors.grayLight};
    z-index: 2;
`;
